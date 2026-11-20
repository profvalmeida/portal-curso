"use client";

import { useActionState } from "react";
import estilos from "../formulario.module.css";
import { entrar, type EstadoDoLogin } from "./acoes";

const inicial: EstadoDoLogin = { situacao: "preenchendo" };

export default function Formulario() {
  const [estado, enviar, enviando] = useActionState(entrar, inicial);

  return (
    <form action={enviar} className={estilos.formulario} noValidate>
      {estado.situacao === "erro" && (
        <p className={estilos.erro}>{estado.mensagem}</p>
      )}
      <label className={estilos.campo}>
        E-mail
        <input
          name="email"
          type="email"
          defaultValue={estado.situacao === "erro" ? estado.email : ""}
        />
      </label>
      <label className={estilos.campo}>
        Senha
        <input name="senha" type="password" />
      </label>
      <button className={estilos.botao} disabled={enviando}>
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
