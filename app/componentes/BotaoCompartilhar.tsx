"use client";

import { useState } from "react";
import estilos from "./BotaoCompartilhar.module.css";

// a única parte da página da notícia que roda no navegador: o botão
export default function BotaoCompartilhar() {
  const [copiado, setCopiado] = useState(false);

  async function copiarLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <button className={estilos.botao} onClick={copiarLink}>
      {copiado ? "Link copiado!" : "Compartilhar"}
    </button>
  );
}
