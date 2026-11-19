import Manchete from "./componentes/Manchete";

export default function Home() {
  const nome = "Portal de Notícias";
  const total = 3;

  return (
    <main>
      <h1>{nome}</h1>
      <p>Temos {total} notícias hoje.</p>
      <hr />
      <Manchete />
      <Manchete />
      <Manchete />
    </main>
  );
}
