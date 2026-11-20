import type { Metadata } from "next";
import { Suspense } from "react";
import { listarCategorias } from "../../dados/categorias";
import { criar } from "../acoes";
import FormularioDaNoticia from "../FormularioDaNoticia";

export const metadata: Metadata = {
  title: "Nova notícia",
};

// as categorias vêm do banco: por isso o formulário fica dentro de um Suspense
async function Formulario() {
  const categorias = await listarCategorias();
  if (!categorias.ok) return <p>{categorias.erro}</p>;
  return (
    <FormularioDaNoticia
      categorias={categorias.dados}
      acao={criar}
      botao="Publicar"
    />
  );
}

export default function NovaNoticia() {
  return (
    <>
      <h1>Nova notícia</h1>
      <Suspense fallback={<p>Carregando…</p>}>
        <Formulario />
      </Suspense>
    </>
  );
}
