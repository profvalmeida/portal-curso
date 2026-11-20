type ConfigDoSite = {
  nome: string;
  descricao: string;
  porPagina: number;
  menu: readonly { rotulo: string; href: string }[];
};

// as const: nada aqui muda depois · satisfies: confere o formato sem perder os detalhes
export const site = {
  nome: "Portal de Notícias",
  descricao: "As notícias do dia, feitas com Next.js",
  porPagina: 4,
  menu: [
    { rotulo: "Início", href: "/" },
    { rotulo: "Sobre", href: "/sobre" },
    { rotulo: "Buscar", href: "/busca" },
  ],
} as const satisfies ConfigDoSite;
