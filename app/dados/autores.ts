import "server-only";
import { sql } from "../lib/db";
import { tentar, type Resultado } from "../lib/resultado";
import { conferirSenha, gerarHash } from "../lib/senha";
import { encerrarOutrasSessoes, exigirLogin } from "../lib/sessao";
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

// o que a pessoa pode mudar no próprio perfil
export type DadosDoPerfil = Pick<Usuario, "nome" | "bio">;

// grava o nome e a bio de quem está logado: o WHERE usa o id da sessão, nunca um id do formulário
export async function atualizarPerfil(dados: DadosDoPerfil) {
  const usuario = await exigirLogin();
  await sql`
    UPDATE usuarios SET nome = ${dados.nome}, bio = ${dados.bio}
    WHERE id = ${usuario.id}
  `;
}

// troca a senha de quem está logado, depois de conferir a senha atual
export async function trocarSenha(
  atual: string,
  nova: string,
): Promise<Resultado<null>> {
  const usuario = await exigirLogin();
  const [linha] = (await sql`
    SELECT senha_hash FROM usuarios WHERE id = ${usuario.id}
  `) as Pick<Usuario, "senha_hash">[];

  // quem esqueceu o computador aberto não pode trocar a senha de ninguém: pede a atual
  if (!(await conferirSenha(atual, linha.senha_hash))) {
    return { ok: false, erro: "A senha atual não confere." };
  }

  const senhaHash = await gerarHash(nova);
  await sql`UPDATE usuarios SET senha_hash = ${senhaHash} WHERE id = ${usuario.id}`;
  // senha nova: os outros aparelhos (que talvez não sejam dela) saem
  await encerrarOutrasSessoes(usuario.id);
  return { ok: true, dados: null };
}

// DTO da página pública do autor: o que qualquer visitante pode ver (o e-mail fica de fora)
export type PerfilPublico = Pick<Usuario, "id" | "nome" | "bio" | "criado_em">;

// um autor pelo id, ou null se não existir
export function buscarPerfilPublico(id: number) {
  return tentar(async () => {
    const [autor] = (await sql`
      SELECT id, nome, bio, criado_em FROM usuarios WHERE id = ${id}
    `) as PerfilPublico[];
    return autor ?? null;
  }, "Não foi possível carregar o autor agora.");
}
