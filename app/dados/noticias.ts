import type { Noticia } from "./tipos";

// o que a manchete mostra: alguns campos da notícia, mais o nome da categoria
export type NoticiaResumida = Pick<
  Noticia,
  "id" | "titulo" | "resumo" | "minutos"
> & {
  categoria: string;
};
