// Cada tipo espelha uma tabela do banco: uma propriedade pra cada coluna.

export type Categoria = {
  id: number;
  nome: string;
  slug: string;
  criada_em: Date;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha_hash: string;
  criado_em: Date;
};

export type Sessao = {
  id: string;
  usuario_id: number;
  expira_em: Date;
  criada_em: Date;
};

export type Noticia = {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  minutos: number;
  publicada_em: Date;
  slug: string;
  visualizacoes: number;
  categoria_id: number;
  autor_id: number;
  situacao: "rascunho" | "publicada";
};

// pra cadastrar: tudo, menos o que o banco preenche sozinho
export type NovaNoticia = Omit<
  Noticia,
  "id" | "publicada_em" | "slug" | "visualizacoes"
>;

// pra editar: qualquer campo pode mudar, e nenhum é obrigatório
export type EdicaoDeNoticia = Partial<NovaNoticia>;
