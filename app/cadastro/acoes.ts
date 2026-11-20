"use server";

import { redirect } from "next/navigation";

// uma Server Action: roda no servidor quando o formulário é enviado
export async function cadastrar(dados: FormData) {
  const nome = dados.get("nome");
  console.log("Chegou um cadastro:", nome, dados.get("email"));

  // por enquanto, só mostra que os dados chegaram (nada é salvo ainda)
  redirect(`/cadastro/pronto?nome=${encodeURIComponent(String(nome))}`);
}
