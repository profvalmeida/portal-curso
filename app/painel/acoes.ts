"use server";

import { redirect } from "next/navigation";
import { criarNoticia } from "../dados/noticias";
import { campoDeTexto } from "../lib/validacao";

type Campo = "titulo" | "resumo" | "categoria" | "conteudo";

// o que o formulário mostra: ou está preenchendo, ou deu erro (com o que a pessoa já escreveu)
export type EstadoDaNoticia =
  | { situacao: "preenchendo" }
  | {
      situacao: "erro";
      erros: Partial<Record<Campo, string>>;
      valores: Record<Campo, string>;
    };

// recebe o formulário da notícia nova (com o useActionState: o estado anterior, e os dados)
export async function criar(
  estado: EstadoDaNoticia,
  dados: FormData,
): Promise<EstadoDaNoticia> {
  const valores = {
    titulo: campoDeTexto(dados, "titulo"),
    resumo: campoDeTexto(dados, "resumo"),
    categoria: campoDeTexto(dados, "categoria"),
    conteudo: campoDeTexto(dados, "conteudo"),
  };

  // a barreira de verdade: o navegador pode ser enganado, o servidor não
  const erros: Partial<Record<Campo, string>> = {};
  if (valores.titulo.length < 5)
    erros.titulo = "O título precisa ter pelo menos 5 letras.";
  if (valores.resumo.length < 10)
    erros.resumo = "O resumo precisa ter pelo menos 10 letras.";
  const categoriaId = Number(valores.categoria);
  if (!Number.isInteger(categoriaId) || categoriaId < 1)
    erros.categoria = "Escolha uma categoria.";
  if (valores.conteudo.length < 20)
    erros.conteudo = "O texto precisa ter pelo menos 20 letras.";
  if (Object.keys(erros).length > 0) {
    return { situacao: "erro", erros, valores };
  }

  const resultado = await criarNoticia({
    titulo: valores.titulo,
    resumo: valores.resumo,
    conteudo: valores.conteudo,
    categoria_id: categoriaId,
  });
  if (!resultado.ok) {
    return { situacao: "erro", erros: { titulo: resultado.erro }, valores };
  }
  redirect("/painel");
}
