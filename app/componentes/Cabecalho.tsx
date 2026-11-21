import Link from "next/link";
import { Suspense } from "react";
import { site } from "../lib/site";
import estilos from "./Cabecalho.module.css";
import MenuDeCategorias from "./MenuDeCategorias";
import UsuarioNoCabecalho from "./UsuarioNoCabecalho";

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
        {/* o resto do cabeçalho é igual pra todo mundo; só esse pedaço depende do cookie */}
        <Suspense fallback={null}>
          <UsuarioNoCabecalho />
        </Suspense>
      </div>
      <MenuDeCategorias />
    </header>
  );
}
