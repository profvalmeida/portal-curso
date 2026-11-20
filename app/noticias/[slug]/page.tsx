import { notFound } from "next/navigation";
import { buscarNoticia } from "../../dados/noticias";
import estilos from "./page.module.css";

export default async function PaginaDaNoticia({
  params,
}: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  // só pra testar o carregando: finge que o banco demorou 15 segundos
  await new Promise((pronto) => setTimeout(pronto, 15000));
  const resultado = await buscarNoticia(slug);
  if (!resultado.ok) return <p>{resultado.erro}</p>;

  const noticia = resultado.dados;
  if (!noticia) notFound();

  const data = noticia.publicada_em.toLocaleDateString("pt-BR");
  const paragrafos = noticia.conteudo.split("\n\n");

  return (
    <main>
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
    </main>
  );
}
