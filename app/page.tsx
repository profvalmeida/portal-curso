import Manchete from "./componentes/Manchete";
import { noticias } from "./dados/noticias";
import estilos from "./page.module.css";

export default function Home() {
  const nome = "Portal de Notícias";
  const total = noticias.length;

  return (
    <main>
      <h1>{nome}</h1>
      <p>Temos {total} notícias hoje.</p>
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
    </main>
  );
}
