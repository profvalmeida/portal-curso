import Link from "next/link";
import { site } from "../lib/site";
import estilos from "./Cabecalho.module.css";

export default function Cabecalho() {
  return (
    <header className={estilos.cabecalho}>
      <div className={estilos.conteudo}>
        <Link href="/" className={estilos.marca}>
          {site.nome}
        </Link>
        <nav className={estilos.menu}>
          {site.menu.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.rotulo}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
