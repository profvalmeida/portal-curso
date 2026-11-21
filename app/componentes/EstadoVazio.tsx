import Link from "next/link";
import estilos from "./EstadoVazio.module.css";

type Props = {
  titulo: string;
  texto: string;
  link?: { href: string; rotulo: string };
};

// quando uma lista não tem nada pra mostrar: diz o porquê e sugere o próximo passo
export default function EstadoVazio({ titulo, texto, link }: Props) {
  return (
    <div className={estilos.vazio}>
      <p className={estilos.titulo}>{titulo}</p>
      <p className={estilos.texto}>{texto}</p>
      {link && (
        <Link href={link.href} className={estilos.link}>
          {link.rotulo}
        </Link>
      )}
    </div>
  );
}
