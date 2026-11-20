"use server";

import { redirect } from "next/navigation";
import { sql } from "../lib/db";
import { gerarHash } from "../lib/senha";

// o que o formulário mostra: ou a pessoa ainda está preenchendo, ou deu erro (com a mensagem de cada campo)
export type EstadoDoCadastro =
  | { situacao: "preenchendo" }
  | {
      situacao: "erro";
      erros: { nome?: string; email?: string; senha?: string };
      valores: { nome: string; email: string };
    };

// com o useActionState, a action recebe primeiro o estado anterior, e depois os dados
export async function cadastrar(
  estado: EstadoDoCadastro,
  dados: FormData,
): Promise<EstadoDoCadastro> {
  const nome = String(dados.get("nome"));
  const email = String(dados.get("email"));
  const senha = String(dados.get("senha"));

  const [existente] = await sql`SELECT 1 FROM usuarios WHERE email = ${email}`;
  if (existente) {
    return {
      situacao: "erro",
      erros: { email: "Já existe uma conta com esse e-mail." },
      valores: { nome, email },
    };
  }

  // a senha nunca vai pro banco: só o hash dela
  const senhaHash = await gerarHash(senha);
  await sql`
    INSERT INTO usuarios (nome, email, senha_hash)
    VALUES (${nome}, ${email}, ${senhaHash})
  `;

  redirect(`/cadastro/pronto?nome=${encodeURIComponent(nome)}`);
}
