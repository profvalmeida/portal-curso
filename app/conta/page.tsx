import type { Metadata } from "next";
import { Suspense } from "react";
import estilos from "../formulario.module.css";
import { contarSessoes, exigirLogin } from "../lib/sessao";
import { sair, sairDeTodos } from "./acoes";

export const metadata: Metadata = {
  title: "Minha conta",
};

// lê o cookie da pessoa: por isso fica dentro de um Suspense
async function DadosDaConta() {
  // sem login, a pessoa nem chega aqui: o exigirLogin manda pro /entrar
  const usuario = await exigirLogin();
  const sessoes = await contarSessoes(usuario.id);

  return (
    <>
      <p>
        Olá, <strong>{usuario.nome}</strong>!
      </p>
      <p>Você entrou com o e-mail {usuario.email}.</p>
      <p>Sessões abertas: {sessoes}</p>
      <form action={sair}>
        <button className={estilos.botao}>Sair</button>
      </form>
      <form action={sairDeTodos}>
        <button className={estilos.botaoSecundario}>
          Sair de todos os aparelhos
        </button>
      </form>
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
