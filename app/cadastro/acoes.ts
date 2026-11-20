"use server";

import { redirect } from "next/navigation";
import { sql } from "../lib/db";
import { gerarHash } from "../lib/senha";

// uma Server Action: roda no servidor quando o formulário é enviado
export async function cadastrar(dados: FormData) {
  const nome = String(dados.get("nome"));
  const email = String(dados.get("email"));
  const senha = String(dados.get("senha"));

  // a senha nunca vai pro banco: só o hash dela
  const senhaHash = await gerarHash(senha);
  await sql`
    INSERT INTO usuarios (nome, email, senha_hash)
    VALUES (${nome}, ${email}, ${senhaHash})
  `;

  redirect(`/cadastro/pronto?nome=${encodeURIComponent(nome)}`);
}
