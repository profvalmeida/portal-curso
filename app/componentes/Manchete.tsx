import Image from "next/image";
import Link from "next/link";
import estilos from "./Manchete.module.css";

type Props = {
  slug: string;
  categoria: string;
  categoriaSlug: string;
  titulo: string;
  resumo: string;
  minutos: number;
  foto: string;
  destaque?: boolean;
};

export default function Manchete({
  slug,
  categoria,
  categoriaSlug,
  titulo,
  resumo,
  minutos,
  foto,
  destaque = false,
}: Props) {
  const classe = destaque
    ? `${estilos.manchete} ${estilos.destaque}`
    : estilos.manchete;

  return (
    <article className={classe}>
      {/* o contêiner reserva o espaço da foto antes de ela chegar: nada pula na tela */}
      <div className={estilos.foto}>
        <Image
          src={`/fotos/${foto}`}
          alt=""
          fill
          sizes={destaque ? "1100px" : "(max-width: 600px) 100vw, 360px"}
          className={estilos.imagem}
        />
      </div>
      <Link href={`/categorias/${categoriaSlug}`} className={estilos.categoria}>
        {categoria}
      </Link>
      <h2 className={estilos.titulo}>
        <Link href={`/noticias/${slug}`}>{titulo}</Link>
      </h2>
      <p className={estilos.resumo}>{resumo}</p>
      <small className={estilos.tempo}>{minutos} min de leitura</small>
    </article>
  );
}
