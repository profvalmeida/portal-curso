import { Suspense } from "react";
import Manchete from "./componentes/Manchete";
import type { NoticiaResumida } from "./dados/noticias";
import { sql } from "./lib/db";
import estilos from "./page.module.css";

async function ListaDeNoticias() {
  const noticias = (await sql`
    SELECT noticias.id, categorias.nome AS categoria, titulo, resumo, minutos
    FROM noticias
    JOIN categorias ON categorias.id = noticias.categoria_id
    ORDER BY noticias.id DESC
  `) as NoticiaResumida[];

  return (
    <>
      <p>Temos {noticias.length} notícias hoje.</p>
      <section className={estilos.grade}>
        {noticias.map((noticia) => (
          <Manchete
            key={noticia.id}
            categoria={noticia.categoria}
            titulo={noticia.titulo}
            resumo={noticia.resumo}
            minutos={noticia.minutos}
          />
        ))}
      </section>
    </>
  );
}

export default function Home() {
  const nome = "Portal de Notícias";

  return (
    <main>
      <h1>{nome}</h1>
      <Suspense fallback={<p>Carregando as notícias…</p>}>
        <ListaDeNoticias />
      </Suspense>
    </main>
  );
}
