"use client";

import Image from "next/image";
import { useActionState } from "react";
import type { CategoriaParaEscolher } from "../dados/categorias";
import estilos from "../formulario.module.css";
import { fotos } from "../lib/fotos";
import galeria from "./galeria.module.css";
import type { EstadoDaNoticia, ValoresDaNoticia } from "./acoes";

type Props = {
  categorias: CategoriaParaEscolher[];
  // quem recebe o formulário: a action de criar, ou a de editar
  acao: (estado: EstadoDaNoticia, dados: FormData) => Promise<EstadoDaNoticia>;
  // o que já vem preenchido (na hora de editar)
  inicio?: ValoresDaNoticia;
  botao: string;
};

const inicial: EstadoDaNoticia = { situacao: "preenchendo" };

// o formulário da notícia: o mesmo pra criar e pra editar
export default function FormularioDaNoticia({
  categorias,
  acao,
  inicio,
  botao,
}: Props) {
  const [estado, enviar, enviando] = useActionState(acao, inicial);
  const erros = estado.situacao === "erro" ? estado.erros : {};
  // depois de um erro, o que a pessoa escreveu; antes, o que veio preenchido
  const valores = estado.situacao === "erro" ? estado.valores : inicio;

  return (
    <form action={enviar} className={estilos.formulario} noValidate>
      <label className={estilos.campo}>
        Título
        <input name="titulo" required defaultValue={valores?.titulo} />
        {erros.titulo && <span className={estilos.erro}>{erros.titulo}</span>}
      </label>
      <label className={estilos.campo}>
        Resumo
        <input name="resumo" required defaultValue={valores?.resumo} />
        {erros.resumo && <span className={estilos.erro}>{erros.resumo}</span>}
      </label>
      <label className={estilos.campo}>
        Categoria
        {/* depois da action, o React limpa o formulário. O select só aprende o valor padrão
            quando nasce: a key diferente faz ele nascer de novo, já com a categoria escolhida */}
        <select
          key={valores?.categoria}
          name="categoria"
          required
          defaultValue={valores?.categoria}
        >
          <option value="">Escolha uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {erros.categoria && (
          <span className={estilos.erro}>{erros.categoria}</span>
        )}
      </label>
      {/* um radio pra cada foto, escondido: o que aparece é a miniatura dentro do label */}
      <fieldset className={galeria.campo}>
        <legend>Foto</legend>
        <div key={valores?.foto} className={galeria.grade}>
          {fotos.map((foto) => (
            <label key={foto} className={galeria.opcao}>
              <input
                type="radio"
                name="foto"
                value={foto}
                defaultChecked={valores?.foto === foto}
              />
              <Image
                src={`/fotos/${foto}`}
                alt={foto.replace(".jpg", "")}
                width={240}
                height={135}
              />
            </label>
          ))}
        </div>
        {erros.foto && <span className={estilos.erro}>{erros.foto}</span>}
      </fieldset>
      <label className={estilos.campo}>
        Texto
        <textarea
          name="conteudo"
          rows={10}
          required
          defaultValue={valores?.conteudo}
        />
        {erros.conteudo && (
          <span className={estilos.erro}>{erros.conteudo}</span>
        )}
      </label>
      {/* dois botões com o mesmo name: o valor que chega é o do botão apertado */}
      <button
        name="situacao"
        value="publicada"
        className={estilos.botao}
        disabled={enviando}
      >
        {enviando ? "Salvando…" : botao}
      </button>
      <button
        name="situacao"
        value="rascunho"
        className={estilos.botaoSecundario}
        disabled={enviando}
      >
        Guardar como rascunho
      </button>
    </form>
  );
}
