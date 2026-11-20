import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import estilos from "../formulario.module.css";
import { usuarioLogado } from "../lib/sessao";

export const metadata: Metadata = {
  title: "Minha conta",
};

// lê o cookie da pessoa: por isso fica dentro de um Suspense
async function DadosDaConta() {
  const usuario = await usuarioLogado();
  if (!usuario) {
    return (
      <p>
        Você não está logado. <Link href="/entrar">Entrar</Link>
      </p>
    );
  }

  return (
    <>
      <p>
        Olá, <strong>{usuario.nome}</strong>!
      </p>
      <p>Você entrou com o e-mail {usuario.email}.</p>
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
