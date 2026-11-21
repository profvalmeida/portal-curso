import { notFound } from "next/navigation";
import { Suspense } from "react";
import EstadoVazio from "../../componentes/EstadoVazio";
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
        <EstadoVazio
          titulo="Nada por aqui ainda"
          texto={`Ainda não tem nenhuma notícia em ${categoria.nome}.`}
          link={{ href: "/", rotulo: "Ver as últimas notícias" }}
        />
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
            foto={noticia.foto}
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
