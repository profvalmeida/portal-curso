import { Suspense } from "react";
import Manchete from "./componentes/Manchete";
import type { Noticia } from "./dados/noticias";
import { sql } from "./lib/db";
import estilos from "./page.module.css";

async function ListaDeNoticias() {
  const noticias = (await sql`
    SELECT id, titulo, resumo, minutos
    FROM noticias
    ORDER BY id DESC
  `) as Noticia[];

  return (
    <>
      <p>Temos {noticias.length} notícias hoje.</p>
      <section className={estilos.grade}>
        {noticias.map((noticia) => (
          <Manchete
            key={noticia.id}
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
