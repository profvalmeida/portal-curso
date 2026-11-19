import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// apaga tudo e começa do zero: é só pra desenvolvimento
await sql`TRUNCATE noticias, usuarios, categorias RESTART IDENTITY CASCADE`;

await sql`
  INSERT INTO categorias (nome)
  VALUES ('Cidade'), ('Esportes'), ('Tecnologia'), ('Cultura')
`;

await sql`
  INSERT INTO usuarios (nome, email, senha_hash)
  VALUES ('Redação do Portal', 'redacao@example.com', 'sem-senha')
`;

await sql`
  INSERT INTO noticias (titulo, resumo, conteudo, minutos, categoria_id, autor_id)
  VALUES
    ('Next.js ganha nova versão', 'Confira o que mudou no framework.', 'Texto completo da notícia.', 4, 3, 1),
    ('Prefeitura inaugura ciclovia no centro', 'São oito quilômetros ligando os bairros à estação.', 'Texto completo da notícia.', 3, 1, 1),
    ('Feira do livro começa neste sábado', 'O evento reúne autores da região e tem entrada gratuita.', 'Texto completo da notícia.', 2, 4, 1),
    ('Time da cidade vence e sobe na tabela', 'A vitória por dois a zero veio no segundo tempo.', 'Texto completo da notícia.', 3, 2, 1),
    ('Semana começa com chuva e frio', 'A temperatura só volta a subir na quinta-feira.', 'Texto completo da notícia.', 1, 1, 1),
    ('Escola abre curso gratuito de programação', 'As aulas são à noite e as inscrições vão até sexta.', 'Texto completo da notícia.', 5, 3, 1),
    ('Banco de dados chega ao portal', 'Agora as notícias moram no Postgres, lá no Neon.', 'Texto completo da notícia.', 2, 3, 1)
`;

console.log("Dados de exemplo no banco!");
