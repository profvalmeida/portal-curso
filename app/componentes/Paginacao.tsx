import Link from "next/link";
import estilos from "./Paginacao.module.css";

type Props = {
  pagina: number;
  temProxima: boolean;
};

export default function Paginacao({ pagina, temProxima }: Props) {
  return (
    <nav className={estilos.paginacao}>
      {pagina > 1 ? (
        <Link href={`/?pagina=${pagina - 1}`}>← Mais novas</Link>
      ) : (
        <span />
      )}
      <span className={estilos.atual}>Página {pagina}</span>
      {temProxima ? (
        <Link href={`/?pagina=${pagina + 1}`}>Mais antigas →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
