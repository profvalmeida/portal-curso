"use client";

import { useActionState } from "react";
import estilos from "../formulario.module.css";
import { salvarPerfil, type EstadoDoPerfil } from "./acoes";

const inicial: EstadoDoPerfil = { situacao: "preenchendo" };

type Props = { nome: string; bio: string };

// o formulário já vem com o nome e a bio de agora (que a página buscou no banco)
export default function FormularioDoPerfil({ nome, bio }: Props) {
  const [estado, enviar, enviando] = useActionState(salvarPerfil, inicial);
  const erros = estado.situacao === "erro" ? estado.erros : {};
  const valores = estado.situacao === "erro" ? estado.valores : { nome, bio };

  return (
    <form action={enviar} className={estilos.formulario} noValidate>
      <label className={estilos.campo}>
        Nome
        <input name="nome" defaultValue={valores.nome} />
        {erros.nome && <span className={estilos.erro}>{erros.nome}</span>}
      </label>
      <label className={estilos.campo}>
        Bio
        <textarea name="bio" rows={4} defaultValue={valores.bio} />
        {erros.bio && <span className={estilos.erro}>{erros.bio}</span>}
      </label>
      {estado.situacao === "salvo" && (
        <span className={estilos.sucesso}>Perfil salvo.</span>
      )}
      <button className={estilos.botao} disabled={enviando}>
        {enviando ? "Salvando…" : "Salvar perfil"}
      </button>
    </form>
  );
}
