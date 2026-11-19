import { Suspense } from "react";
import Manchete from "../componentes/Manchete";
import type { NoticiaResumida, ResultadoDaBusca } from "../dados/noticias";
import { sql } from "../lib/db";
import estilos from "../page.module.css";

async function buscarNoticias(termo: string): Promise<ResultadoDaBusca> {
  try {
    // o texto da pessoa vai separado do comando: o banco nunca trata ele como SQL
    const noticias = (await sql`
      SELECT noticias.id, categorias.nome AS categoria, titulo, resumo, minutos
      FROM noticias
      JOIN categorias ON categorias.id = noticias.categoria_id
      WHERE titulo ILIKE ${"%" + termo + "%"}
      ORDER BY noticias.id DESC
    `) as NoticiaResumida[];
    return { ok: true, noticias };
  } catch {
    return { ok: false, erro: "Não foi possível buscar as notícias agora." };
  }
}

async function Resultados({ searchParams }: PageProps<"/busca">) {
  const { q } = await searchParams;
  const termo = typeof q === "string" ? q : "";
  if (!termo) return null;

  const resultado = await buscarNoticias(termo);
  if (!resultado.ok) return <p>{resultado.erro}</p>;
  if (resultado.noticias.length === 0)
    return <p>Nenhuma notícia encontrada.</p>;

  return (
    <section className={estilos.grade}>
      {resultado.noticias.map((noticia) => (
        <Manchete
          key={noticia.id}
          categoria={noticia.categoria}
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
