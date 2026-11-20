import { Suspense } from "react";
import { buscarNoticia } from "../../dados/noticias";
import estilos from "./page.module.css";

async function Artigo({ params }: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const resultado = await buscarNoticia(slug);
  if (!resultado.ok) return <p>{resultado.erro}</p>;

  const noticia = resultado.dados;
  if (!noticia) return <p>Notícia não encontrada.</p>;

  const data = noticia.publicada_em.toLocaleDateString("pt-BR");
  const paragrafos = noticia.conteudo.split("\n\n");

  return (
    <article className={estilos.artigo}>
      <span className={estilos.categoria}>{noticia.categoria}</span>
      <h1 className={estilos.titulo}>{noticia.titulo}</h1>
      <p className={estilos.resumo}>{noticia.resumo}</p>
      <p className={estilos.detalhes}>
        Por {noticia.autor} · {data} · {noticia.minutos} min de leitura
      </p>
      {paragrafos.map((paragrafo, i) => (
        <p key={i} className={estilos.paragrafo}>
          {paragrafo}
        </p>
      ))}
    </article>
  );
}

export default function PaginaDaNoticia(props: PageProps<"/noticias/[slug]">) {
  return (
    <main>
      <Suspense fallback={<p>Carregando a notícia…</p>}>
        <Artigo {...props} />
      </Suspense>
    </main>
  );
}
