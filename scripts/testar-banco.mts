import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const [resposta] = await sql`SELECT now() AS agora`;

console.log("Conectado ao banco!");
console.log("Hora lá no Neon:", resposta.agora.toLocaleString("pt-BR"));
