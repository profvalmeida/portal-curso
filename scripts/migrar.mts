import { readdir, readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const pasta = "banco/migracoes";

await sql`
  CREATE TABLE IF NOT EXISTS migracoes (
    nome TEXT PRIMARY KEY,
    aplicada_em TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

const linhas = await sql`SELECT nome FROM migracoes`;
const jaAplicadas = new Set(linhas.map((linha) => linha.nome));

const arquivos = (await readdir(pasta))
  .filter((nome) => nome.endsWith(".sql"))
  .sort();

for (const arquivo of arquivos) {
  if (jaAplicadas.has(arquivo)) continue;

  const comando = await readFile(`${pasta}/${arquivo}`, "utf8");
  await sql.transaction([
    sql.query(comando),
    sql`INSERT INTO migracoes (nome) VALUES (${arquivo})`,
  ]);
  console.log("Aplicada:", arquivo);
}

console.log("O banco está em dia!");
