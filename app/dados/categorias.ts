import "server-only";
import { ehValorRepetido, sql } from "../lib/db";
import { tentar, type Resultado } from "../lib/resultado";
import { exigirLogin } from "../lib/sessao";
import type { Categoria } from "./tipos";

// o que um formulário precisa saber de cada categoria
export type CategoriaParaEscolher = Pick<Categoria, "id" | "nome">;

// todas as categorias, em ordem alfabética
export function listarCategorias() {
  return tentar(
    async () =>
      (await sql`
        SELECT id, nome FROM categorias ORDER BY nome
      `) as CategoriaParaEscolher[],
    "Não foi possível carregar as categorias agora.",
  );
}

// o que a página de categorias do painel mostra: a categoria e quantas notícias ela tem
export type CategoriaComTotal = Pick<Categoria, "id" | "nome" | "slug"> & {
  total: number;
};

// todas as categorias, com o total de notícias de cada uma (inclusive as que têm zero)
export async function listarCategoriasComTotal() {
  await exigirLogin();
  return tentar(
    async () =>
      (await sql`
        SELECT categorias.id, categorias.nome, categorias.slug,
          count(noticias.id)::int AS total
        FROM categorias
        LEFT JOIN noticias ON noticias.categoria_id = categorias.id
        GROUP BY categorias.id
        ORDER BY categorias.nome
      `) as CategoriaComTotal[],
    "Não foi possível carregar as categorias agora.",
  );
}

// cria uma categoria (o nome e o slug são UNIQUE: repetido, o banco recusa)
export async function criarCategoria(nome: string): Promise<Resultado<null>> {
  await exigirLogin();
  try {
    await sql`INSERT INTO categorias (nome) VALUES (${nome})`;
    return { ok: true, dados: null };
  } catch (erro) {
    if (ehValorRepetido(erro)) {
      return { ok: false, erro: "Já existe uma categoria com esse nome." };
    }
    throw erro;
  }
}
