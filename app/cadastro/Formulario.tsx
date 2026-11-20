"use client";

import { useActionState } from "react";
import estilos from "../formulario.module.css";
import { cadastrar, type EstadoDoCadastro } from "./acoes";

const inicial: EstadoDoCadastro = { situacao: "preenchendo" };

export default function Formulario() {
  const [estado, enviar, enviando] = useActionState(cadastrar, inicial);
  // só existem erros e valores quando a situação é "erro": o TypeScript confere isso
  const erros = estado.situacao === "erro" ? estado.erros : {};
  const valores = estado.situacao === "erro" ? estado.valores : undefined;

  return (
    <form action={enviar} className={estilos.formulario} noValidate>
      <label className={estilos.campo}>
        Nome
        <input name="nome" required defaultValue={valores?.nome} />
        {erros.nome && <span className={estilos.erro}>{erros.nome}</span>}
      </label>
      <label className={estilos.campo}>
        E-mail
        <input
          name="email"
          type="email"
          required
          defaultValue={valores?.email}
        />
        {erros.email && <span className={estilos.erro}>{erros.email}</span>}
      </label>
      <label className={estilos.campo}>
        Senha
        <input name="senha" type="password" required minLength={8} />
        {erros.senha && <span className={estilos.erro}>{erros.senha}</span>}
      </label>
      <button className={estilos.botao} disabled={enviando}>
        {enviando ? "Criando a conta…" : "Criar conta"}
      </button>
    </form>
  );
}
