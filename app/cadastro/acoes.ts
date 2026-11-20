"use server";

import { redirect } from "next/navigation";
import { sql } from "../lib/db";
import { gerarHash } from "../lib/senha";
import { campoDeTexto, ehTexto } from "../lib/validacao";

type ErrosDoCadastro = { nome?: string; email?: string; senha?: string };

// o que o formulário mostra: ou a pessoa ainda está preenchendo, ou deu erro (com a mensagem de cada campo)
export type EstadoDoCadastro =
  | { situacao: "preenchendo" }
  | {
      situacao: "erro";
      erros: ErrosDoCadastro;
      valores: { nome: string; email: string };
    };

// com o useActionState, a action recebe primeiro o estado anterior, e depois os dados
export async function cadastrar(
  estado: EstadoDoCadastro,
  dados: FormData,
): Promise<EstadoDoCadastro> {
  const nome = campoDeTexto(dados, "nome");
  const email = campoDeTexto(dados, "email").toLowerCase();
  // a senha não perde os espaços das pontas: eles podem fazer parte dela
  const senhaRecebida = dados.get("senha");
  const senha = ehTexto(senhaRecebida) ? senhaRecebida : "";

  // a barreira de verdade: o navegador pode ser enganado, o servidor não
  const erros: ErrosDoCadastro = {};
  if (nome.length < 2) erros.nome = "Escreva o seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    erros.email = "Esse e-mail não parece certo.";
  if (senha.length < 8)
    erros.senha = "A senha precisa ter pelo menos 8 caracteres.";
  if (Object.keys(erros).length > 0) {
    return { situacao: "erro", erros, valores: { nome, email } };
  }

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
