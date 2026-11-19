import estilos from "./page.module.css";

export default function Sobre() {
  return (
    <main>
      <h1 className={estilos.titulo}>Sobre o portal</h1>
      <p>Este portal é o projeto do curso de Next.js.</p>
      <p>
        Aqui você encontra as notícias da cidade, escritas pela nossa equipe.
      </p>
    </main>
  );
}
