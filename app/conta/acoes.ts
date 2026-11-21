"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { atualizarPerfil } from "../dados/autores";
import {
  encerrarSessao,
  encerrarTodasAsSessoes,
  usuarioLogado,
} from "../lib/sessao";
import { campoDeTexto } from "../lib/validacao";

export async function sair() {
  await encerrarSessao();
  redirect("/entrar");
}

export async function sairDeTodos() {
  // a action confere quem está pedindo: nunca confie só na página que mostrou o botão
  const usuario = await usuarioLogado();
  if (usuario) await encerrarTodasAsSessoes(usuario.id);
  redirect("/entrar");
}

type ErrosDoPerfil = { nome?: string; bio?: string };

// o formulário do perfil: preenchendo, salvo, ou com erro (e o que a pessoa escreveu)
export type EstadoDoPerfil =
  | { situacao: "preenchendo" }
  | { situacao: "salvo" }
  | {
      situacao: "erro";
      erros: ErrosDoPerfil;
      valores: { nome: string; bio: string };
    };

export async function salvarPerfil(
  estado: EstadoDoPerfil,
  dados: FormData,
): Promise<EstadoDoPerfil> {
  const nome = campoDeTexto(dados, "nome");
  const bio = campoDeTexto(dados, "bio");

  const erros: ErrosDoPerfil = {};
  if (nome.length < 2) erros.nome = "Escreva o seu nome.";
  if (bio.length > 280) erros.bio = "A bio pode ter no máximo 280 letras.";
  if (Object.keys(erros).length > 0) {
    return { situacao: "erro", erros, valores: { nome, bio } };
  }

  await atualizarPerfil({ nome, bio });
  // a página (e o "Olá" do cabeçalho) foram montados com o nome antigo: monta de novo
  refresh();
  return { situacao: "salvo" };
}
