-- cada login vira uma sessão. O id é o hash do token: o token mesmo só fica no cookie da pessoa
CREATE TABLE sessoes (
  id TEXT PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  expira_em TIMESTAMPTZ NOT NULL,
  criada_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
