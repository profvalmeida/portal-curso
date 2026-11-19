type Props = {
  titulo: string;
  resumo: string;
  minutos: number;
};

export default function Manchete({ titulo, resumo, minutos }: Props) {
  return (
    <article className="manchete">
      <h2>{titulo}</h2>
      <p>{resumo}</p>
      <small>{minutos} min de leitura</small>
    </article>
  );
}
