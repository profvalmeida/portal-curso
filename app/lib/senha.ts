import "server-only";
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

// o scrypt do Node usa callback: o promisify transforma ele numa função que dá pra usar com await
const scryptAsync = promisify(scrypt);

// guarda o salt e o hash juntos, separados por dois pontos: "salt:hash"
export async function gerarHash(senha: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(senha, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}
