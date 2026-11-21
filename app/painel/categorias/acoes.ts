"use server";

import { refresh, updateTag } from "next/cache";
import { apagarCategoria, criarCategoria } from "../../dados/categorias";
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

  // o menu do cabeçalho está em cache: joga fora, pra ele já mostrar a categoria nova
  updateTag("categorias");
  // a lista da página foi montada antes da categoria existir: o refresh monta de novo
  refresh();
  return { situacao: "criada", nome };
}

// o botão de apagar de cada categoria: ou está pronto, ou mostra o erro
export type EstadoDoApagar =
  { situacao: "pronto" } | { situacao: "erro"; erro: string };

// o id vem do bind, como no editar das notícias
export async function apagar(id: number): Promise<EstadoDoApagar> {
  const resultado = await apagarCategoria(id);
  if (!resultado.ok) return { situacao: "erro", erro: resultado.erro };
  updateTag("categorias");
  refresh();
  return { situacao: "pronto" };
}
