ALTER TABLE noticias
  ADD COLUMN categoria_id INTEGER NOT NULL REFERENCES categorias (id),
  ADD COLUMN autor_id INTEGER NOT NULL REFERENCES usuarios (id);
