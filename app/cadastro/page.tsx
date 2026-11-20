import type { Metadata } from "next";
import estilos from "../formulario.module.css";
import Formulario from "./Formulario";

export const metadata: Metadata = {
  title: "Criar conta",
};

export default function Cadastro() {
  return (
    <main className={estilos.pagina}>
      <h1>Criar conta</h1>
      <Formulario />
    </main>
  );
}
