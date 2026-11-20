import type { CategoriaParaEscolher } from "../dados/categorias";
import estilos from "../formulario.module.css";
import { criar } from "./acoes";

type Props = {
  categorias: CategoriaParaEscolher[];
};

// o formulário da notícia: hoje ele cria, e mais pra frente o mesmo formulário vai editar
export default function FormularioDaNoticia({ categorias }: Props) {
  return (
    <form action={criar} className={estilos.formulario}>
      <label className={estilos.campo}>
        Título
        <input name="titulo" required />
      </label>
      <label className={estilos.campo}>
        Resumo
        <input name="resumo" required />
      </label>
      <label className={estilos.campo}>
        Categoria
        <select name="categoria" required>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </label>
      <label className={estilos.campo}>
        Texto
        <textarea name="conteudo" rows={10} required />
      </label>
      <button className={estilos.botao}>Publicar</button>
    </form>
  );
}
