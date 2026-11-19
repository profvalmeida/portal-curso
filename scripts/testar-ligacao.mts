import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

try {
  await sql`
    INSERT INTO noticias (titulo, resumo, conteudo, categoria_id, autor_id)
    VALUES ('Teste', 'Teste', 'Teste', 999, 999)
  `;
  console.log("A notícia entrou! A ligação não está protegida.");
} catch (erro) {
  console.log("O banco recusou a notícia:");
  console.log((erro as Error).message);
}
