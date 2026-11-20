"use client";

import estilos from "./error.module.css";

type Props = {
  error: unknown;
  retry: () => void;
};

// aparece no lugar da página quando acontece um erro inesperado
export default function Erro({ retry }: Props) {
  return (
    <main className={estilos.pagina}>
      <h1>Ops, algo deu errado</h1>
      <p className={estilos.texto}>
        Tivemos um problema pra mostrar esta página. Tente de novo daqui a
        pouco.
      </p>
      <button className={estilos.botao} onClick={retry}>
        Tentar de novo
      </button>
    </main>
  );
}
