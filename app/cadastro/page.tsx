import type { Metadata } from "next";
import estilos from "../formulario.module.css";
import { cadastrar } from "./acoes";

export const metadata: Metadata = {
  title: "Criar conta",
};

export default function Cadastro() {
  return (
    <main className={estilos.pagina}>
      <h1>Criar conta</h1>
      <form action={cadastrar} className={estilos.formulario}>
        <label className={estilos.campo}>
          Nome
          <input name="nome" required />
        </label>
        <label className={estilos.campo}>
          E-mail
          <input name="email" type="email" required />
        </label>
        <label className={estilos.campo}>
          Senha
          <input name="senha" type="password" required minLength={8} />
        </label>
        <button className={estilos.botao}>Criar conta</button>
      </form>
    </main>
  );
}
