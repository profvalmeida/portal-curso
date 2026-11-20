-- o endereço de cada notícia, gerado pelo próprio banco a partir do título:
-- "Feira do livro começa" vira "feira-do-livro-comeca"
ALTER TABLE noticias
  ADD COLUMN slug TEXT NOT NULL UNIQUE GENERATED ALWAYS AS (
    trim(
      both '-'
      FROM regexp_replace(
        translate(lower(titulo), 'áàâãéêíóôõúüç', 'aaaaeeiooouuc'),
        '[^a-z0-9]+',
        '-',
        'g'
      )
    )
  ) STORED;
