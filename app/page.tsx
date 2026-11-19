import { Suspense } from "react";
import Manchete from "./componentes/Manchete";
import { listarManchetes } from "./dados/noticias";
import estilos from "./page.module.css";

async function ListaDeNoticias() {
  const resultado = await listarManchetes();
  if (!resultado.ok) return <p>{resultado.erro}</p>;
  const noticias = resultado.dados;

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
