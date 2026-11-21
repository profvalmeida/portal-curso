"use client";

import { useActionState } from "react";
import estilos from "../formulario.module.css";
import { salvarSenha, type EstadoDaSenha } from "./acoes";

const inicial: EstadoDaSenha = { situacao: "preenchendo" };

// senha nunca volta pro campo depois de um erro: a pessoa digita de novo
export default function FormularioDaSenha() {
  const [estado, enviar, enviando] = useActionState(salvarSenha, inicial);
  const erros = estado.situacao === "erro" ? estado.erros : {};

  return (
    <form action={enviar} className={estilos.formulario} noValidate>
      <label className={estilos.campo}>
        Senha atual
        <input name="atual" type="password" autoComplete="current-password" />
        {erros.atual && <span className={estilos.erro}>{erros.atual}</span>}
      </label>
      <label className={estilos.campo}>
        Senha nova
        <input name="nova" type="password" autoComplete="new-password" />
        {erros.nova && <span className={estilos.erro}>{erros.nova}</span>}
      </label>
      <label className={estilos.campo}>
        Repita a senha nova
        <input name="confirmacao" type="password" autoComplete="new-password" />
        {erros.confirmacao && (
          <span className={estilos.erro}>{erros.confirmacao}</span>
        )}
      </label>
      {estado.situacao === "trocada" && (
        <span className={estilos.sucesso}>
          Senha trocada. Os outros aparelhos foram desconectados.
        </span>
      )}
      <button className={estilos.botao} disabled={enviando}>
        {enviando ? "Trocando…" : "Trocar a senha"}
      </button>
    </form>
  );
}
