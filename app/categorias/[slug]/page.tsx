import { notFound } from "next/navigation";
import { Suspense } from "react";
import Manchete from "../../componentes/Manchete";
import { listarManchetesDaCategoria } from "../../dados/noticias";
import estilos from "../../page.module.css";

async function Categoria({ params }: PageProps<"/categorias/[slug]">) {
  const { slug } = await params;
  const resultado = await listarManchetesDaCategoria(slug);
  if (!resultado.ok) return <p>{resultado.erro}</p>;

  const categoria = resultado.dados;
  if (!categoria) notFound();

  return (
    <>
      <h1>{categoria.nome}</h1>
      {categoria.noticias.length === 0 && (
        <p>Ainda não tem nenhuma notícia nesta categoria.</p>
      )}
      <section className={estilos.grade}>
        {categoria.noticias.map((noticia) => (
          <Manchete
            key={noticia.id}
            slug={noticia.slug}
            categoria={noticia.categoria}
            categoriaSlug={noticia.categoria_slug}
            titulo={noticia.titulo}
            resumo={noticia.resumo}
            minutos={noticia.minutos}
          />
        ))}
      </section>
    </>
  );
}

export default function PaginaDaCategoria(
  props: PageProps<"/categorias/[slug]">,
) {
  return (
    <main>
      <Suspense fallback={<p>Carregando a categoria…</p>}>
        <Categoria {...props} />
      </Suspense>
    </main>
  );
}
