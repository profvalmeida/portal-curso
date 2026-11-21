import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import EstadoVazio from "../../componentes/EstadoVazio";
import Manchete from "../../componentes/Manchete";
import { buscarPerfilPublico } from "../../dados/autores";
import { listarManchetesDoAutor } from "../../dados/noticias";
import grade from "../../page.module.css";
import estilos from "./page.module.css";

// o nome do autor na aba (e no link compartilhado)
export async function generateMetadata({
  params,
}: PageProps<"/autores/[id]">): Promise<Metadata> {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return {};
  const autor = await buscarPerfilPublico(id);
  if (!autor.ok || !autor.dados) return {};
  return { title: autor.dados.nome, description: autor.dados.bio || undefined };
}

async function Autor({ params }: PageProps<"/autores/[id]">) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  // o autor e as notícias dele ao mesmo tempo: uma busca não espera a outra
  const [autor, noticias] = await Promise.all([
    buscarPerfilPublico(id),
    listarManchetesDoAutor(id),
  ]);
  if (!autor.ok) return <p>{autor.erro}</p>;
  if (!autor.dados) notFound();
  if (!noticias.ok) return <p>{noticias.erro}</p>;

  const { nome, bio, criado_em } = autor.dados;
  return (
    <>
      <header className={estilos.autor}>
        <h1>{nome}</h1>
        {bio && <p className={estilos.bio}>{bio}</p>}
        <p className={estilos.desde}>
          Escreve no portal desde {criado_em.toLocaleDateString("pt-BR")}
        </p>
      </header>
      {noticias.dados.length === 0 && (
        <EstadoVazio
          titulo="Nenhuma notícia ainda"
          texto={`${nome} ainda não publicou nenhuma notícia.`}
        />
      )}
      <section className={grade.grade}>
        {noticias.dados.map((noticia) => (
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

export default function PaginaDoAutor(props: PageProps<"/autores/[id]">) {
  return (
    <main>
      <Suspense fallback={<p>Carregando o autor…</p>}>
        <Autor {...props} />
      </Suspense>
    </main>
  );
}
