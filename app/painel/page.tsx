import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { listarMinhasNoticias } from "../dados/noticias";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Minhas notícias",
};

// lê o cookie de quem está logado: por isso fica dentro de um Suspense
async function MinhasNoticias() {
  const resultado = await listarMinhasNoticias();
  if (!resultado.ok) return <p>{resultado.erro}</p>;

  const noticias = resultado.dados;
  if (noticias.length === 0) {
    return (
      <p className={estilos.vazio}>Você ainda não escreveu nenhuma notícia.</p>
    );
  }

  return (
    <ul className={estilos.lista}>
      {noticias.map((noticia) => (
        <li key={noticia.id} className={estilos.item}>
          <Link href={`/noticias/${noticia.slug}`}>{noticia.titulo}</Link>
          <span className={estilos.data}>
            {noticia.publicada_em.toLocaleDateString("pt-BR")}
          </span>
          <Link href={`/painel/${noticia.id}/editar`} className={estilos.acao}>
            Editar
          </Link>
          <Link href={`/painel/${noticia.id}/excluir`} className={estilos.acao}>
            Excluir
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Painel() {
  return (
    <>
      <h1>Minhas notícias</h1>
      <Suspense fallback={<p>Carregando…</p>}>
        <MinhasNoticias />
      </Suspense>
    </>
  );
}
