"use server";

import { redirect } from "next/navigation";
import type { Usuario } from "../dados/tipos";
import { sql } from "../lib/db";
import { conferirSenha } from "../lib/senha";
import { criarSessao } from "../lib/sessao";
import { campoDeTexto, ehTexto } from "../lib/validacao";

export type EstadoDoLogin =
  | { situacao: "preenchendo" }
  | { situacao: "erro"; mensagem: string; email: string };

export async function entrar(
  estado: EstadoDoLogin,
  dados: FormData,
): Promise<EstadoDoLogin> {
  const email = campoDeTexto(dados, "email").toLowerCase();
  const senhaRecebida = dados.get("senha");
  const senha = ehTexto(senhaRecebida) ? senhaRecebida : "";

  const [usuario] = (await sql`
    SELECT id, senha_hash FROM usuarios WHERE email = ${email}
  `) as Pick<Usuario, "id" | "senha_hash">[];

  // a mesma mensagem pros dois casos: ninguém descobre quais e-mails têm conta
  if (!usuario || !(await conferirSenha(senha, usuario.senha_hash))) {
    return { situacao: "erro", mensagem: "E-mail ou senha incorretos.", email };
  }

  await criarSessao(usuario.id);
  redirect("/");
}
