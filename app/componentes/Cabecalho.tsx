import Link from "next/link";
import estilos from "./Cabecalho.module.css";

export default function Cabecalho() {
  return (
    <header className={estilos.cabecalho}>
      <div className={estilos.conteudo}>
        <Link href="/" className={estilos.marca}>
          Portal de Notícias
        </Link>
        <nav className={estilos.menu}>
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
        </nav>
      </div>
    </header>
  );
}
