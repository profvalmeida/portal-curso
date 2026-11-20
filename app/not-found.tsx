import type { Metadata } from "next";
import Link from "next/link";
import estilos from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NaoEncontrada() {
  return (
    <main className={estilos.pagina}>
      <p className={estilos.codigo}>404</p>
      <h1 className={estilos.titulo}>Essa página não existe</h1>
      <p className={estilos.texto}>
        O endereço pode estar errado, ou a notícia pode ter saído do ar.
      </p>
      <Link href="/" className={estilos.botao}>
        Voltar pra página inicial
      </Link>
    </main>
  );
}
