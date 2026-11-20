import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { listarCategorias } from "../../../dados/categorias";
import { buscarNoticiaParaEditar } from "../../../dados/noticias";
import { editar } from "../../acoes";
import FormularioDaNoticia from "../../FormularioDaNoticia";

export const metadata: Metadata = {
  title: "Editar notícia",
};

// busca a notícia e as categorias ao mesmo tempo, e entrega o formulário preenchido
async function Edicao({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const [noticia, categorias] = await Promise.all([
    buscarNoticiaParaEditar(id),
    listarCategorias(),
  ]);
  if (!noticia.ok) return <p>{noticia.erro}</p>;
  if (!categorias.ok) return <p>{categorias.erro}</p>;
  if (!noticia.dados) notFound();

  const { titulo, resumo, conteudo, categoria_id } = noticia.dados;
  return (
    <FormularioDaNoticia
      categorias={categorias.dados}
      acao={editar.bind(null, id)}
      inicio={{ titulo, resumo, conteudo, categoria: String(categoria_id) }}
      botao="Salvar e publicar"
    />
  );
}

export default function EditarNoticia({
  params,
}: PageProps<"/painel/[id]/editar">) {
  return (
    <>
      <h1>Editar notícia</h1>
      <Suspense fallback={<p>Carregando…</p>}>
        <Edicao params={params} />
      </Suspense>
    </>
  );
}
