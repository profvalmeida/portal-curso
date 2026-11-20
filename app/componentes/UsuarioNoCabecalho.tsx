import Link from "next/link";
import { sair } from "../conta/acoes";
import { usuarioLogado } from "../lib/sessao";
import estilos from "./UsuarioNoCabecalho.module.css";

// lê o cookie de quem pediu a página: por isso o cabeçalho põe ele dentro de um Suspense
export default async function UsuarioNoCabecalho() {
  const usuario = await usuarioLogado();

  if (!usuario) {
    return (
      <Link href="/entrar" className={estilos.entrar}>
        Entrar
      </Link>
    );
  }

  const primeiroNome = usuario.nome.split(" ")[0];
  return (
    <div className={estilos.usuario}>
      <Link href="/conta">Olá, {primeiroNome}</Link>
      <form action={sair}>
        <button className={estilos.sair}>Sair</button>
      </form>
    </div>
  );
}
