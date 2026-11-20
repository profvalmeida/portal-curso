import "server-only";
import { sql } from "../lib/db";
import { tentar } from "../lib/resultado";
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
