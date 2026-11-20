import estilos from "./loading.module.css";

// aparece na hora, enquanto a notícia ainda está vindo do banco
export default function Carregando() {
  return (
    <main>
      <div className={estilos.esqueleto}>
        <div className={`${estilos.barra} ${estilos.curta}`} />
        <div className={`${estilos.barra} ${estilos.titulo}`} />
        <div className={`${estilos.barra} ${estilos.titulo}`} />
        <div className={estilos.barra} />
        <div className={estilos.barra} />
        <div className={`${estilos.barra} ${estilos.curta}`} />
      </div>
    </main>
  );
}
