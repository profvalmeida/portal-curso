-- a foto de cada notícia: o nome de um arquivo da pasta public/fotos.
-- As notícias que já existem (e as novas, por enquanto) ficam com a foto padrão
ALTER TABLE noticias
  ADD COLUMN foto TEXT NOT NULL DEFAULT 'cidade.jpg';
