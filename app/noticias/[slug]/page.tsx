import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BotaoCompartilhar from "../../componentes/BotaoCompartilhar";
import MaisLidas from "../../componentes/MaisLidas";
import { buscarNoticia, listarMaisLidas } from "../../dados/noticias";
import estilos from "./page.module.css";

// o título da aba, e o que aparece quando alguém compartilha o link (Open Graph)
export async function generateMetadata({
  params,
}: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resultado = await buscarNoticia(slug);
  if (!resultado.ok || !resultado.dados) return {};

  const { titulo, resumo, foto, publicada_em, autor } = resultado.dados;
  return {
    title: titulo,
    description: resumo,
    openGraph: {
      type: "article",
      title: titulo,
      description: resumo,
      publishedTime: publicada_em.toISOString(),
      authors: [autor],
      images: [{ url: `/fotos/${foto}`, alt: titulo }],
    },
  };
}

export default async function PaginaDaNoticia({
  params,
}: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  // as duas consultas ao mesmo tempo: uma não espera a outra
  const [resultado, maisLidas] = await Promise.all([
    buscarNoticia(slug),
    listarMaisLidas(),
  ]);
  if (!resultado.ok) return <p>{resultado.erro}</p>;

  const noticia = resultado.dados;
  if (!noticia) notFound();

  const data = noticia.publicada_em.toLocaleDateString("pt-BR");
  const paragrafos = noticia.conteudo.split("\n\n");

  return (
    <main>
      <article className={estilos.artigo}>
        <div className={estilos.capa}>
          <Image
            src={`/fotos/${noticia.foto}`}
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 760px"
            loading="eager"
            fetchPriority="high"
            className={estilos.imagem}
          />
        </div>
        <span className={estilos.categoria}>{noticia.categoria}</span>
        <h1 className={estilos.titulo}>{noticia.titulo}</h1>
        <p className={estilos.resumo}>{noticia.resumo}</p>
        <p className={estilos.detalhes}>
          Por <Link href={`/autores/${noticia.autor_id}`}>{noticia.autor}</Link>{" "}
          · {data} · {noticia.minutos} min de leitura
        </p>
        <BotaoCompartilhar />
        {paragrafos.map((paragrafo, i) => (
          <p key={i} className={estilos.paragrafo}>
            {paragrafo}
          </p>
        ))}
      </article>
      {maisLidas.ok && <MaisLidas noticias={maisLidas.dados} />}
    </main>
  );
}
