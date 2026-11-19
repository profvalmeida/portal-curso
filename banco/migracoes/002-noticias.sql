CREATE TABLE noticias (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  resumo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  minutos INTEGER NOT NULL DEFAULT 3,
  publicada_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
