import estilos from "./Manchete.module.css";

type Props = {
  categoria: string;
  titulo: string;
  resumo: string;
  minutos: number;
};

export default function Manchete({
  categoria,
  titulo,
  resumo,
  minutos,
}: Props) {
  return (
    <article className={estilos.manchete}>
      <span className={estilos.categoria}>{categoria}</span>
      <h2 className={estilos.titulo}>{titulo}</h2>
      <p className={estilos.resumo}>{resumo}</p>
      <small className={estilos.tempo}>{minutos} min de leitura</small>
    </article>
  );
}
