import Link from "next/link";
import { listarCategoriasDoMenu } from "../dados/categorias";
import estilos from "./Cabecalho.module.css";

// a faixa das categorias, embaixo do cabeçalho. Os dados vêm do cache: nem precisa de Suspense
export default async function MenuDeCategorias() {
  const resultado = await listarCategoriasDoMenu();
  if (!resultado.ok) return null;

  return (
    <nav className={estilos.categorias} aria-label="Categorias">
      <div className={estilos.listaDeCategorias}>
        {resultado.dados.map((categoria) => (
          <Link key={categoria.slug} href={`/categorias/${categoria.slug}`}>
            {categoria.nome}
          </Link>
        ))}
      </div>
    </nav>
  );
}
