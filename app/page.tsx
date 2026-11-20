import { Suspense } from "react";
import Manchete from "./componentes/Manchete";
import Paginacao from "./componentes/Paginacao";
import { listarManchetes } from "./dados/noticias";
import estilos from "./page.module.css";

async function ListaDeNoticias({ searchParams }: PageProps<"/">) {
  const { pagina: valor } = await searchParams;
  // ?pagina=2 chega como texto: vira número, e qualquer coisa estranha vira 1
  const pagina = Math.max(1, Number(valor) || 1);

  const resultado = await listarManchetes(pagina);
  if (!resultado.ok) return <p>{resultado.erro}</p>;
  const { noticias, temProxima } = resultado.dados;
  // só a primeira página tem a manchete em destaque
  const principal = pagina === 1 ? noticias[0] : undefined;
  const outras = pagina === 1 ? noticias.slice(1) : noticias;

  return (
    <>
      {noticias.length === 0 && <p>Não tem mais notícias por aqui.</p>}
      <section className={estilos.grade}>
        {principal && (
          <Manchete
            destaque
            slug={principal.slug}
            categoria={principal.categoria}
            categoriaSlug={principal.categoria_slug}
            titulo={principal.titulo}
            resumo={principal.resumo}
            minutos={principal.minutos}
          />
        )}
        {outras.map((noticia) => (
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
      <Paginacao pagina={pagina} temProxima={temProxima} />
    </>
  );
}

export default function Home(props: PageProps<"/">) {
  const nome = "Portal de Notícias";

  return (
    <main>
      <h1>{nome}</h1>
      <Suspense fallback={<p>Carregando as notícias…</p>}>
        <ListaDeNoticias {...props} />
      </Suspense>
    </main>
  );
}
