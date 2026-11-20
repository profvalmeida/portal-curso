-- quantas vezes cada notícia foi lida (começa em zero)
ALTER TABLE noticias
  ADD COLUMN visualizacoes INTEGER NOT NULL DEFAULT 0;
