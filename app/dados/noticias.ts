import "server-only";
import { sql } from "../lib/db";
import { tentar } from "../lib/resultado";
import type { Noticia } from "./tipos";

// o que a manchete mostra: alguns campos da notícia, mais o nome da categoria
export type NoticiaResumida = Pick<
  Noticia,
  "id" | "slug" | "titulo" | "resumo" | "minutos"
> & {
  categoria: string;
};

// as manchetes da página inicial, das mais novas pras mais antigas
export function listarManchetes() {
  return tentar(
    async () =>
      (await sql`
        SELECT noticias.id, noticias.slug, categorias.nome AS categoria,
          titulo, resumo, minutos
        FROM noticias
        JOIN categorias ON categorias.id = noticias.categoria_id
        ORDER BY noticias.id DESC
      `) as NoticiaResumida[],
    "Não foi possível carregar as notícias agora.",
  );
}

// as manchetes cujo título tem o termo (o termo vai como parâmetro)
export function buscarManchetes(termo: string) {
  return tentar(
    async () =>
      (await sql`
        SELECT noticias.id, noticias.slug, categorias.nome AS categoria,
          titulo, resumo, minutos
        FROM noticias
        JOIN categorias ON categorias.id = noticias.categoria_id
        WHERE titulo ILIKE ${"%" + termo + "%"}
        ORDER BY noticias.id DESC
      `) as NoticiaResumida[],
    "Não foi possível buscar as notícias agora.",
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
