import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// o mesmo texto de exemplo pra todas as notícias (parágrafos separados por linha em branco)
const conteudo = [
  "Este é um texto de exemplo, criado pra mostrar como fica a página de uma notícia do portal. Num portal de verdade, quem escreve este texto é o autor da notícia, lá no painel.",
  "Repare que o texto tem mais de um parágrafo. No banco, eles ficam todos na mesma coluna, separados por uma linha em branco. Na hora de mostrar, a página separa um do outro.",
  "Mais pra frente no curso, você vai criar o painel do autor, onde dá pra escrever, editar e publicar notícias de verdade, com o texto que quiser.",
].join("\n\n");

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
    ('Next.js ganha nova versão', 'Confira o que mudou no framework.', ${conteudo}, 4, 3, 1),
    ('Prefeitura inaugura ciclovia no centro', 'São oito quilômetros ligando os bairros à estação.', ${conteudo}, 3, 1, 1),
    ('Feira do livro começa neste sábado', 'O evento reúne autores da região e tem entrada gratuita.', ${conteudo}, 2, 4, 1),
    ('Time da cidade vence e sobe na tabela', 'A vitória por dois a zero veio no segundo tempo.', ${conteudo}, 3, 2, 1),
    ('Semana começa com chuva e frio', 'A temperatura só volta a subir na quinta-feira.', ${conteudo}, 1, 1, 1),
    ('Escola abre curso gratuito de programação', 'As aulas são à noite e as inscrições vão até sexta.', ${conteudo}, 5, 3, 1),
    ('Banco de dados chega ao portal', 'Agora as notícias moram no Postgres, lá no Neon.', ${conteudo}, 2, 3, 1)
`;

console.log("Dados de exemplo no banco!");
