import "server-only";
import { ehValorRepetido, sql } from "../lib/db";
import { tentar, type Resultado } from "../lib/resultado";
import { exigirLogin } from "../lib/sessao";
import { site } from "../lib/site";
import type { Categoria, NovaNoticia, Noticia } from "./tipos";

// o que a manchete mostra: alguns campos da notícia, mais o nome da categoria
export type NoticiaResumida = Pick<
  Noticia,
  "id" | "slug" | "titulo" | "resumo" | "minutos"
> & {
  categoria: string;
  categoria_slug: string;
};

// as manchetes de uma página da página inicial, das mais novas pras mais antigas
export function listarManchetes(pagina: number) {
  return tentar(async () => {
    // pede uma a mais que o tamanho da página: se ela vier, existe uma próxima página
    const noticias = (await sql`
      SELECT noticias.id, noticias.slug, categorias.nome AS categoria,
        categorias.slug AS categoria_slug, titulo, resumo, minutos
      FROM noticias
      JOIN categorias ON categorias.id = noticias.categoria_id
      ORDER BY noticias.id DESC
      LIMIT ${site.porPagina + 1}
      OFFSET ${(pagina - 1) * site.porPagina}
    `) as NoticiaResumida[];
    const temProxima = noticias.length > site.porPagina;
    return { noticias: noticias.slice(0, site.porPagina), temProxima };
  }, "Não foi possível carregar as notícias agora.");
}

// as manchetes cujo título tem o termo (o termo vai como parâmetro)
export function buscarManchetes(termo: string) {
  return tentar(
    async () =>
      (await sql`
        SELECT noticias.id, noticias.slug, categorias.nome AS categoria,
          categorias.slug AS categoria_slug,
          titulo, resumo, minutos
        FROM noticias
        JOIN categorias ON categorias.id = noticias.categoria_id
        WHERE titulo ILIKE ${"%" + termo + "%"}
        ORDER BY noticias.id DESC
      `) as NoticiaResumida[],
    "Não foi possível buscar as notícias agora.",
  );
}

// uma categoria pelo slug, com as manchetes dela (ou null, se a categoria não existir)
export function listarManchetesDaCategoria(slug: string) {
  return tentar(async () => {
    const [categoria] = (await sql`
      SELECT nome FROM categorias WHERE slug = ${slug}
    `) as Pick<Categoria, "nome">[];
    if (!categoria) return null;

    const noticias = (await sql`
      SELECT noticias.id, noticias.slug, categorias.nome AS categoria,
        categorias.slug AS categoria_slug, titulo, resumo, minutos
      FROM noticias
      JOIN categorias ON categorias.id = noticias.categoria_id
      WHERE categorias.slug = ${slug}
      ORDER BY noticias.id DESC
    `) as NoticiaResumida[];
    return { nome: categoria.nome, noticias };
  }, "Não foi possível carregar a categoria agora.");
}

// as três notícias mais lidas do portal
export type MaisLida = Pick<Noticia, "slug" | "titulo">;

export function listarMaisLidas() {
  return tentar(
    async () =>
      (await sql`
        SELECT slug, titulo
        FROM noticias
        ORDER BY visualizacoes DESC
        LIMIT 3
      `) as MaisLida[],
    "Não foi possível carregar as mais lidas.",
  );
}

// tudo o que a página da notícia mostra
export type NoticiaCompleta = Pick<
  Noticia,
  "titulo" | "resumo" | "conteudo" | "minutos" | "publicada_em"
> & {
  categoria: string;
  autor: string;
};

// uma notícia pelo slug, ou null se não existir nenhuma com esse endereço
export function buscarNoticia(slug: string) {
  return tentar(async () => {
    const [noticia] = (await sql`
      SELECT titulo, resumo, conteudo, minutos, publicada_em,
        categorias.nome AS categoria, usuarios.nome AS autor
      FROM noticias
      JOIN categorias ON categorias.id = noticias.categoria_id
      JOIN usuarios ON usuarios.id = noticias.autor_id
      WHERE noticias.slug = ${slug}
    `) as NoticiaCompleta[];
    return noticia ?? null;
  }, "Não foi possível carregar a notícia agora.");
}

// o que a lista do painel mostra
export type NoticiaDoPainel = Pick<
  Noticia,
  "id" | "slug" | "titulo" | "publicada_em"
>;

// as notícias de quem está logado. A checagem do login fica aqui, perto dos dados:
// quem chamar essa função nunca esquece de conferir
export async function listarMinhasNoticias() {
  const usuario = await exigirLogin();
  return tentar(
    async () =>
      (await sql`
        SELECT id, slug, titulo, publicada_em
        FROM noticias
        WHERE autor_id = ${usuario.id}
        ORDER BY id DESC
      `) as NoticiaDoPainel[],
    "Não foi possível carregar as suas notícias agora.",
  );
}

// o que o autor preenche no formulário (quem é o autor e os minutos, o servidor descobre)
export type DadosDaNoticia = Omit<NovaNoticia, "autor_id" | "minutos">;

// o tempo de leitura: umas 200 palavras por minuto, e nunca menos de 1 minuto
function minutosDeLeitura(conteudo: string) {
  const palavras = conteudo.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

// cria uma notícia de quem está logado: o autor vem da sessão, nunca do formulário
export async function criarNoticia(
  dados: DadosDaNoticia,
): Promise<Resultado<null>> {
  const usuario = await exigirLogin();
  try {
    await sql`
      INSERT INTO noticias (titulo, resumo, conteudo, minutos, categoria_id, autor_id)
      VALUES (${dados.titulo}, ${dados.resumo}, ${dados.conteudo},
        ${minutosDeLeitura(dados.conteudo)}, ${dados.categoria_id}, ${usuario.id})
    `;
    return { ok: true, dados: null };
  } catch (erro) {
    // o slug é UNIQUE: dois títulos que viram o mesmo endereço não podem existir
    if (ehValorRepetido(erro)) {
      return {
        ok: false,
        erro: "Já existe uma notícia com um título igual a esse.",
      };
    }
    throw erro;
  }
}
