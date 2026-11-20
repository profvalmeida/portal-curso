"use client";

import { useActionState } from "react";
import type { CategoriaParaEscolher } from "../dados/categorias";
import estilos from "../formulario.module.css";
import { criar, type EstadoDaNoticia } from "./acoes";

type Props = {
  categorias: CategoriaParaEscolher[];
};

const inicial: EstadoDaNoticia = { situacao: "preenchendo" };

// o formulário da notícia: hoje ele cria, e mais pra frente o mesmo formulário vai editar
export default function FormularioDaNoticia({ categorias }: Props) {
  const [estado, enviar, enviando] = useActionState(criar, inicial);
  const erros = estado.situacao === "erro" ? estado.erros : {};
  const valores = estado.situacao === "erro" ? estado.valores : undefined;

  return (
    <form action={enviar} className={estilos.formulario} noValidate>
      <label className={estilos.campo}>
        Título
        <input name="titulo" required defaultValue={valores?.titulo} />
        {erros.titulo && <span className={estilos.erro}>{erros.titulo}</span>}
      </label>
      <label className={estilos.campo}>
        Resumo
        <input name="resumo" required defaultValue={valores?.resumo} />
        {erros.resumo && <span className={estilos.erro}>{erros.resumo}</span>}
      </label>
      <label className={estilos.campo}>
        Categoria
        {/* depois da action, o React limpa o formulário. O select só aprende o valor padrão
            quando nasce: a key diferente faz ele nascer de novo, já com a categoria escolhida */}
        <select
          key={valores?.categoria}
          name="categoria"
          required
          defaultValue={valores?.categoria}
        >
          <option value="">Escolha uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {erros.categoria && (
          <span className={estilos.erro}>{erros.categoria}</span>
        )}
      </label>
      <label className={estilos.campo}>
        Texto
        <textarea
          name="conteudo"
          rows={10}
          required
          defaultValue={valores?.conteudo}
        />
        {erros.conteudo && (
          <span className={estilos.erro}>{erros.conteudo}</span>
        )}
      </label>
      <button className={estilos.botao} disabled={enviando}>
        {enviando ? "Publicando…" : "Publicar"}
      </button>
    </form>
  );
}
