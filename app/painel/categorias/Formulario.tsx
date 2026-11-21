"use client";

import { useActionState } from "react";
import estilos from "../../formulario.module.css";
import { criar, type EstadoDaCategoria } from "./acoes";

const inicial: EstadoDaCategoria = { situacao: "preenchendo" };

export default function Formulario() {
  const [estado, enviar, enviando] = useActionState(criar, inicial);

  return (
    <form action={enviar} className={estilos.formulario} noValidate>
      <label className={estilos.campo}>
        Nova categoria
        <input
          name="nome"
          defaultValue={estado.situacao === "erro" ? estado.nome : ""}
        />
        {estado.situacao === "erro" && (
          <span className={estilos.erro}>{estado.erro}</span>
        )}
        {estado.situacao === "criada" && (
          <span className={estilos.sucesso}>
            A categoria {estado.nome} foi criada.
          </span>
        )}
      </label>
      <button className={estilos.botao} disabled={enviando}>
        {enviando ? "Criando…" : "Criar categoria"}
      </button>
    </form>
  );
}
