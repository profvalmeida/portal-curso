import { Suspense } from "react";
import Manchete from "../componentes/Manchete";
import { buscarManchetes } from "../dados/noticias";
import estilos from "../page.module.css";

async function Resultados({ searchParams }: PageProps<"/busca">) {
  const { q } = await searchParams;
  const termo = typeof q === "string" ? q : "";
  if (!termo) return null;

  const resultado = await buscarManchetes(termo);
  if (!resultado.ok) return <p>{resultado.erro}</p>;
  if (resultado.dados.length === 0) return <p>Nenhuma notícia encontrada.</p>;

  return (
    <section className={estilos.grade}>
      {resultado.dados.map((noticia) => (
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
  );
}

export default function Busca(props: PageProps<"/busca">) {
  return (
    <main>
      <h1>Buscar notícias</h1>
      <form>
        <input name="q" placeholder="Digite uma palavra do título" />
        <button>Buscar</button>
      </form>
      <Suspense fallback={<p>Buscando…</p>}>
        <Resultados {...props} />
      </Suspense>
    </main>
  );
}
