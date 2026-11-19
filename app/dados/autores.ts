import "server-only";
import { sql } from "../lib/db";
import type { Usuario } from "./tipos";

// todos os autores do portal, em ordem alfabética
export async function listarAutores() {
  const usuarios = (await sql`
    SELECT * FROM usuarios ORDER BY nome
  `) as Usuario[];
  return usuarios;
}
