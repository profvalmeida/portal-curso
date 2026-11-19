import "server-only";
import { sql } from "../lib/db";
import type { Usuario } from "./tipos";

// DTO: só o que pode sair do servidor sobre um autor
export type AutorPublico = Pick<Usuario, "id" | "nome">;

function paraAutorPublico(usuario: Usuario): AutorPublico {
  return { id: usuario.id, nome: usuario.nome };
}

// todos os autores do portal, em ordem alfabética
export async function listarAutores() {
  const usuarios = (await sql`
    SELECT * FROM usuarios ORDER BY nome
  `) as Usuario[];
  return usuarios.map(paraAutorPublico);
}
