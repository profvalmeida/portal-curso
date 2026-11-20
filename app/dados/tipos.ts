// Cada tipo espelha uma tabela do banco: uma propriedade pra cada coluna.

export type Categoria = {
  id: number;
  nome: string;
  criada_em: Date;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha_hash: string;
  criado_em: Date;
};

export type Noticia = {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  minutos: number;
  publicada_em: Date;
  slug: string;
  categoria_id: number;
  autor_id: number;
};

// pra cadastrar: tudo, menos o que o banco preenche sozinho
export type NovaNoticia = Omit<Noticia, "id" | "publicada_em" | "slug">;

// pra editar: qualquer campo pode mudar, e nenhum é obrigatório
export type EdicaoDeNoticia = Partial<NovaNoticia>;
