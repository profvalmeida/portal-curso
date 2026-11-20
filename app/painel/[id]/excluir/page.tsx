import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { buscarNoticiaParaEditar } from "../../../dados/noticias";
import estilos from "../../../formulario.module.css";
import { excluir } from "../../acoes";

export const metadata: Metadata = {
  title: "Excluir notícia",
};

// pergunta antes de apagar: o DELETE só acontece quando a pessoa confirma no botão
async function Confirmacao({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const noticia = await buscarNoticiaParaEditar(id);
  if (!noticia.ok) return <p>{noticia.erro}</p>;
  if (!noticia.dados) notFound();

  return (
    <>
      <p>
        Tem certeza que quer excluir a notícia{" "}
        <strong>{noticia.dados.titulo}</strong>? Isso não tem volta.
      </p>
      <form action={excluir.bind(null, id)} className={estilos.formulario}>
        <button className={estilos.botao}>Sim, excluir</button>
        <Link href="/painel">Não, voltar pro painel</Link>
      </form>
    </>
  );
}

export default function ExcluirNoticia({
  params,
}: PageProps<"/painel/[id]/excluir">) {
  return (
    <>
      <h1>Excluir notícia</h1>
      <Suspense fallback={<p>Carregando…</p>}>
        <Confirmacao params={params} />
      </Suspense>
    </>
  );
}
