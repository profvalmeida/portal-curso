"use server";

import { refresh } from "next/cache";
import { criarCategoria } from "../../dados/categorias";
import { campoDeTexto } from "../../lib/validacao";

// o que o formulário mostra: preenchendo, o erro (com o nome que a pessoa escreveu), ou criada
export type EstadoDaCategoria =
  | { situacao: "preenchendo" }
  | { situacao: "erro"; erro: string; nome: string }
  | { situacao: "criada"; nome: string };

export async function criar(
  estado: EstadoDaCategoria,
  dados: FormData,
): Promise<EstadoDaCategoria> {
  const nome = campoDeTexto(dados, "nome");
  if (nome.length < 3) {
    return {
      situacao: "erro",
      erro: "O nome precisa ter pelo menos 3 letras.",
      nome,
    };
  }

  const resultado = await criarCategoria(nome);
  if (!resultado.ok) return { situacao: "erro", erro: resultado.erro, nome };

  // a lista da página foi montada antes da categoria existir: o refresh monta de novo
  refresh();
  return { situacao: "criada", nome };
}
