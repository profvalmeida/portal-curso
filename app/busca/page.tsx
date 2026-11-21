import { Suspense } from "react";
import EstadoVazio from "../componentes/EstadoVazio";
import Manchete from "../componentes/Manchete";
import { buscarManchetes } from "../dados/noticias";
import estilos from "../page.module.css";
import busca from "./page.module.css";

// lê o termo do endereço (?q=...): por isso fica dentro de um Suspense
async function Resultados({ searchParams }: PageProps<"/busca">) {
  const { q } = await searchParams;
  const termo = typeof q === "string" ? q.trim() : "";

  return (
    <>
      {/* o campo já vem com o termo da busca: dá pra ajustar e buscar de novo */}
      <form className={busca.barra}>
        <input
          name="q"
          defaultValue={termo}
          placeholder="Digite uma palavra do título"
          aria-label="Palavra pra buscar"
          className={busca.campo}
        />
        <button className={busca.botao}>Buscar</button>
      </form>
      <Lista termo={termo} />
    </>
  );
}

async function Lista({ termo }: { termo: string }) {
  if (!termo) {
    return (
      <EstadoVazio
        titulo="O que você procura?"
        texto="Digite uma palavra do título da notícia e aperte buscar."
      />
    );
  }

  const resultado = await buscarManchetes(termo);
  if (!resultado.ok) return <p>{resultado.erro}</p>;
  if (resultado.dados.length === 0) {
    return (
      <EstadoVazio
        titulo={`Nenhuma notícia com “${termo}”`}
        texto="Confira se a palavra está certa, ou tente uma palavra mais curta."
        link={{ href: "/", rotulo: "Ver as últimas notícias" }}
      />
    );
  }

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
          foto={noticia.foto}
        />
      ))}
    </section>
  );
}

export default function Busca(props: PageProps<"/busca">) {
  return (
    <main>
      <h1>Buscar notícias</h1>
      <Suspense fallback={<p>Buscando…</p>}>
        <Resultados {...props} />
      </Suspense>
    </main>
  );
}
