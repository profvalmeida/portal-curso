-- a bio: um texto curto sobre a pessoa, que aparece no perfil e na página pública do autor.
-- Quem já tem conta começa com a bio vazia
ALTER TABLE usuarios
  ADD COLUMN bio TEXT NOT NULL DEFAULT '';
