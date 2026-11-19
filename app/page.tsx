import Manchete from "./componentes/Manchete";

export default function Home() {
  const nome = "Portal de Notícias";
  const total = 3;

  return (
    <main>
      <h1>{nome}</h1>
      <p>Temos {total} notícias hoje.</p>
      <hr />
      <Manchete
        titulo="Next.js ganha nova versão"
        resumo="Confira o que mudou no framework."
        minutos={4}
      />
      <Manchete
        titulo="Prefeitura inaugura ciclovia no centro"
        resumo="São oito quilômetros ligando os bairros à estação."
        minutos={3}
      />
      <Manchete
        titulo="Feira do livro começa neste sábado"
        resumo="O evento reúne autores da região e tem entrada gratuita."
        minutos={2}
      />
    </main>
  );
}
