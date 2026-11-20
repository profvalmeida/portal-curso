import estilos from "./Manchete.module.css";

type Props = {
  categoria: string;
  titulo: string;
  resumo: string;
  minutos: number;
  destaque?: boolean;
};

export default function Manchete({
  categoria,
  titulo,
  resumo,
  minutos,
  destaque = false,
}: Props) {
  const classe = destaque
    ? `${estilos.manchete} ${estilos.destaque}`
    : estilos.manchete;

  return (
    <article className={classe}>
      <span className={estilos.categoria}>{categoria}</span>
      <h2 className={estilos.titulo}>{titulo}</h2>
      <p className={estilos.resumo}>{resumo}</p>
      <small className={estilos.tempo}>{minutos} min de leitura</small>
    </article>
  );
}
