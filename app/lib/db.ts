import "server-only";
import { neon, NeonDbError } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

// o banco recusou um valor repetido numa coluna UNIQUE? (o código 23505 é do próprio Postgres)
export function ehValorRepetido(erro: unknown) {
  return erro instanceof NeonDbError && erro.code === "23505";
}

// o banco recusou apagar uma linha que outra tabela ainda usa? (FOREIGN KEY: código 23503)
export function ehReferenciaEmUso(erro: unknown) {
  return erro instanceof NeonDbError && erro.code === "23503";
}
