import Link from "next/link";
import estilos from "./layout.module.css";

// o layout do painel fica dentro do layout do site: o cabeçalho e o rodapé continuam,
// e todas as páginas do painel ganham o menu do lado
export default function LayoutDoPainel({ children }: LayoutProps<"/painel">) {
  return (
    <main className={estilos.painel}>
      <aside className={estilos.lateral}>
        <p className={estilos.titulo}>Painel do autor</p>
        <nav className={estilos.menu}>
          <Link href="/painel">Minhas notícias</Link>
        </nav>
      </aside>
      <section>{children}</section>
    </main>
  );
}
