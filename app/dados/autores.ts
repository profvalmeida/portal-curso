import "server-only";
import { sql } from "../lib/db";
import { tentar } from "../lib/resultado";
import { exigirLogin } from "../lib/sessao";
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

// o perfil de quem está logado: os dados, a bio e quantas notícias já publicou
export type MeuPerfil = Pick<
  Usuario,
  "nome" | "email" | "bio" | "criado_em"
> & {
  publicadas: number;
};

export async function buscarMeuPerfil() {
  const usuario = await exigirLogin();
  return tentar(async () => {
    // a contagem vem de uma subconsulta: um SELECT dentro do outro, que roda pra essa pessoa
    const [perfil] = (await sql`
      SELECT nome, email, bio, criado_em,
        (SELECT count(*)::int FROM noticias
          WHERE autor_id = usuarios.id AND situacao = 'publicada') AS publicadas
      FROM usuarios
      WHERE id = ${usuario.id}
    `) as MeuPerfil[];
    return perfil;
  }, "Não foi possível carregar o seu perfil agora.");
}
