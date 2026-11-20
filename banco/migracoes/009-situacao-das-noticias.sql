-- rascunho: só o autor vê, no painel · publicada: aparece no portal pra todo mundo.
-- As notícias que já existem continuam publicadas (é o valor padrão)
ALTER TABLE noticias
  ADD COLUMN situacao TEXT NOT NULL DEFAULT 'publicada'
  CHECK (situacao IN ('rascunho', 'publicada'));
