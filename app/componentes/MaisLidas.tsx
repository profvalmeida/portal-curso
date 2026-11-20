import Link from "next/link";
import type { MaisLida } from "../dados/noticias";
import estilos from "./MaisLidas.module.css";

type Props = {
  noticias: MaisLida[];
};

export default function MaisLidas({ noticias }: Props) {
  return (
    <aside className={estilos.barra}>
      <h2 className={estilos.titulo}>Mais lidas</h2>
      <ol className={estilos.lista}>
        {noticias.map((noticia) => (
          <li key={noticia.slug}>
            <Link href={`/noticias/${noticia.slug}`}>{noticia.titulo}</Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
