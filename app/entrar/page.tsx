import type { Metadata } from "next";
import Link from "next/link";
import estilos from "../formulario.module.css";
import Formulario from "./Formulario";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function Entrar() {
  return (
    <main className={estilos.pagina}>
      <h1>Entrar</h1>
      <Formulario />
      <p>
        Ainda não tem conta? <Link href="/cadastro">Crie a sua</Link>.
      </p>
    </main>
  );
}
