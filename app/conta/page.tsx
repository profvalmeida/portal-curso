import type { Metadata } from "next";
import { Suspense } from "react";
import { buscarMeuPerfil } from "../dados/autores";
import estilos from "../formulario.module.css";
import { contarSessoes, exigirLogin } from "../lib/sessao";
import { sair, sairDeTodos } from "./acoes";
import FormularioDoPerfil from "./FormularioDoPerfil";
import pagina from "./page.module.css";

export const metadata: Metadata = {
  title: "Minha conta",
};

// lê o cookie da pessoa: por isso fica dentro de um Suspense
async function DadosDaConta() {
  // sem login, a pessoa nem chega aqui: o exigirLogin manda pro /entrar
  const usuario = await exigirLogin();
  const [perfil, sessoes] = await Promise.all([
    buscarMeuPerfil(),
    contarSessoes(usuario.id),
  ]);
  if (!perfil.ok) return <p>{perfil.erro}</p>;
  const { nome, email, bio, criado_em, publicadas } = perfil.dados;

  return (
    <>
      <section className={pagina.secao}>
        <h2>{nome}</h2>
        <p className={pagina.detalhe}>
          {email} · no portal desde {criado_em.toLocaleDateString("pt-BR")}
        </p>
        <p className={pagina.bio}>
          {bio || "Você ainda não escreveu a sua bio."}
        </p>
        <p className={pagina.numero}>
          <strong>{publicadas}</strong>{" "}
          {publicadas === 1 ? "notícia publicada" : "notícias publicadas"}
        </p>
      </section>
      <section className={pagina.secao}>
        <h2>Editar perfil</h2>
        <FormularioDoPerfil nome={nome} bio={bio} />
      </section>
      <section className={pagina.secao}>
        <h2>Segurança</h2>
        <p>Sessões abertas: {sessoes}</p>
        <form action={sair}>
          <button className={estilos.botao}>Sair</button>
        </form>
        <form action={sairDeTodos}>
          <button className={estilos.botaoSecundario}>
            Sair de todos os aparelhos
          </button>
        </form>
      </section>
    </>
  );
}

export default function Conta() {
  return (
    <main className={estilos.pagina}>
      <h1>Minha conta</h1>
      <Suspense fallback={<p>Carregando…</p>}>
        <DadosDaConta />
      </Suspense>
    </main>
  );
}
