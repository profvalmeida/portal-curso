export type Noticia = {
  id: number;
  titulo: string;
  resumo: string;
  minutos: number;
};

export const noticias: Noticia[] = [
  {
    id: 1,
    titulo: "Next.js ganha nova versão",
    resumo: "Confira o que mudou no framework.",
    minutos: 4,
  },
  {
    id: 2,
    titulo: "Prefeitura inaugura ciclovia no centro",
    resumo: "São oito quilômetros ligando os bairros à estação.",
    minutos: 3,
  },
  {
    id: 3,
    titulo: "Feira do livro começa neste sábado",
    resumo: "O evento reúne autores da região e tem entrada gratuita.",
    minutos: 2,
  },
  {
    id: 4,
    titulo: "Time da cidade vence e sobe na tabela",
    resumo: "A vitória por dois a zero veio no segundo tempo.",
    minutos: 3,
  },
  {
    id: 5,
    titulo: "Semana começa com chuva e frio",
    resumo: "A temperatura só volta a subir na quinta-feira.",
    minutos: 1,
  },
  {
    id: 6,
    titulo: "Escola abre curso gratuito de programação",
    resumo: "As aulas são à noite e as inscrições vão até sexta.",
    minutos: 5,
  },
];
