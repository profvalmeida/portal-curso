"use server";

import { redirect } from "next/navigation";
import { encerrarSessao } from "../lib/sessao";

export async function sair() {
  await encerrarSessao();
  redirect("/entrar");
}
