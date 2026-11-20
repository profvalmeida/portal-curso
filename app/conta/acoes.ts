"use server";

import { redirect } from "next/navigation";
import {
  encerrarSessao,
  encerrarTodasAsSessoes,
  usuarioLogado,
} from "../lib/sessao";

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
