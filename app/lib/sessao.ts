import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Usuario } from "../dados/tipos";
import { sql } from "./db";

export const COOKIE_DA_SESSAO = "sessao";
const SETE_DIAS = 7 * 24 * 60 * 60 * 1000;

// o que vai pro banco é o hash do token, nunca o token
function hashDoToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

// cria a sessão no banco e manda o token pro navegador, num cookie
export async function criarSessao(usuarioId: number) {
  const token = randomBytes(32).toString("base64url");
  const expiraEm = new Date(Date.now() + SETE_DIAS);

  // aproveita o login pra jogar fora as sessões que já venceram
  await sql`DELETE FROM sessoes WHERE expira_em < now()`;

  await sql`
    INSERT INTO sessoes (id, usuario_id, expira_em)
    VALUES (${hashDoToken(token)}, ${usuarioId}, ${expiraEm})
  `;

  const cookiesDaResposta = await cookies();
  cookiesDaResposta.set(COOKIE_DA_SESSAO, token, {
    httpOnly: true, // o JavaScript da página não consegue ler
    secure: process.env.NODE_ENV === "production", // no site publicado, só por HTTPS
    sameSite: "lax", // outro site não consegue usar
    expires: expiraEm,
    path: "/",
  });
}

// o que o site pode saber sobre quem está logado (sem o hash da senha)
export type UsuarioLogado = Pick<Usuario, "id" | "nome" | "email">;

// quem está logado, ou null: lê o cookie, procura a sessão que ainda vale, e o dono dela
export async function usuarioLogado() {
  const token = (await cookies()).get(COOKIE_DA_SESSAO)?.value;
  if (!token) return null;

  const [usuario] = (await sql`
    SELECT usuarios.id, usuarios.nome, usuarios.email
    FROM sessoes
    JOIN usuarios ON usuarios.id = sessoes.usuario_id
    WHERE sessoes.id = ${hashDoToken(token)} AND sessoes.expira_em > now()
  `) as UsuarioLogado[];
  return usuario ?? null;
}

// a segunda camada: confere a sessão no banco. Sem sessão válida, vai pro login
export async function exigirLogin() {
  const usuario = await usuarioLogado();
  if (!usuario) redirect("/entrar");
  return usuario;
}

// o logout: apaga a sessão do banco e o cookie do navegador
export async function encerrarSessao() {
  const cookiesDoPedido = await cookies();
  const token = cookiesDoPedido.get(COOKIE_DA_SESSAO)?.value;
  if (token) {
    await sql`DELETE FROM sessoes WHERE id = ${hashDoToken(token)}`;
  }
  cookiesDoPedido.delete(COOKIE_DA_SESSAO);
}

// quantas sessões abertas (que ainda valem) o usuário tem
export async function contarSessoes(usuarioId: number) {
  const [{ total }] = (await sql`
    SELECT count(*)::int AS total
    FROM sessoes
    WHERE usuario_id = ${usuarioId} AND expira_em > now()
  `) as { total: number }[];
  return total;
}

// sair de todos os aparelhos: apaga todas as sessões do usuário, e o cookie deste navegador
export async function encerrarTodasAsSessoes(usuarioId: number) {
  await sql`DELETE FROM sessoes WHERE usuario_id = ${usuarioId}`;
  (await cookies()).delete(COOKIE_DA_SESSAO);
}

// encerra as sessões dos outros aparelhos, e mantém a deste (quem acabou de trocar a senha continua logado)
export async function encerrarOutrasSessoes(usuarioId: number) {
  const token = (await cookies()).get(COOKIE_DA_SESSAO)?.value ?? "";
  await sql`
    DELETE FROM sessoes
    WHERE usuario_id = ${usuarioId} AND id <> ${hashDoToken(token)}
  `;
}
