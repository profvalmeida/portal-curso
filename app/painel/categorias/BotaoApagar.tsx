"use client";

import { useActionState } from "react";
import { apagar, type EstadoDoApagar } from "./acoes";
import estilos from "./BotaoApagar.module.css";

const inicial: EstadoDoApagar = { situacao: "pronto" };

// um formulário com um botão só: apagar muda o servidor, então é POST, nunca um link
export default function BotaoApagar({ id }: { id: number }) {
  const [estado, enviar, enviando] = useActionState(
    apagar.bind(null, id),
    inicial,
  );

  return (
    <form action={enviar} className={estilos.formulario}>
      {estado.situacao === "erro" && (
        <span className={estilos.erro}>{estado.erro}</span>
      )}
      <button className={estilos.botao} disabled={enviando}>
        {enviando ? "Apagando…" : "Apagar"}
      </button>
    </form>
  );
}
