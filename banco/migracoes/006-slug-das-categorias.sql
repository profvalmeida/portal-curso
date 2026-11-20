-- o endereço de cada categoria, do mesmo jeito que o das notícias: "Cidade" vira "cidade"
ALTER TABLE categorias
  ADD COLUMN slug TEXT NOT NULL UNIQUE GENERATED ALWAYS AS (
    trim(
      both '-'
      FROM regexp_replace(
        translate(lower(nome), 'áàâãéêíóôõúüç', 'aaaaeeiooouuc'),
        '[^a-z0-9]+',
        '-',
        'g'
      )
    )
  ) STORED;
