import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { listarCategoriasComTotal } from "../../dados/categorias";
import estilos from "../page.module.css";
import Formulario from "./Formulario";

export const metadata: Metadata = {
  title: "Categorias",
};

// a lista confere o login (lê o cookie): por isso fica dentro de um Suspense
async function Lista() {
  const resultado = await listarCategoriasComTotal();
  if (!resultado.ok) return <p>{resultado.erro}</p>;

  return (
    <ul className={estilos.lista}>
      {resultado.dados.map((categoria) => (
        <li key={categoria.id} className={estilos.item}>
          <Link href={`/categorias/${categoria.slug}`}>{categoria.nome}</Link>
          <span className={estilos.data}>
            {categoria.total === 1
              ? "1 notícia"
              : `${categoria.total} notícias`}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Categorias() {
  return (
    <>
      <h1>Categorias</h1>
      <Formulario />
      <Suspense fallback={<p>Carregando…</p>}>
        <Lista />
      </Suspense>
    </>
  );
}
