import type { Noticia } from "./tipos";

// o que a manchete mostra: alguns campos da notícia, mais o nome da categoria
export type NoticiaResumida = Pick<
  Noticia,
  "id" | "titulo" | "resumo" | "minutos"
> & {
  categoria: string;
};

// ou deu certo e vêm as notícias, ou deu errado e vem a mensagem: nunca os dois
export type ResultadoDaBusca =
  { ok: true; noticias: NoticiaResumida[] } | { ok: false; erro: string };
