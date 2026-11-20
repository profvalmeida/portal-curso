"use server";

import { redirect } from "next/navigation";
import { criarNoticia } from "../dados/noticias";
import { campoDeTexto } from "../lib/validacao";

// recebe o formulário da notícia nova
export async function criar(dados: FormData) {
  await criarNoticia({
    titulo: campoDeTexto(dados, "titulo"),
    resumo: campoDeTexto(dados, "resumo"),
    conteudo: campoDeTexto(dados, "conteudo"),
    categoria_id: Number(campoDeTexto(dados, "categoria")),
  });
  redirect("/painel");
}
