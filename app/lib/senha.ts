import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

// o scrypt do Node usa callback: o promisify transforma ele numa função que dá pra usar com await
const scryptAsync = promisify(scrypt);

// guarda o salt e o hash juntos, separados por dois pontos: "salt:hash"
export async function gerarHash(senha: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(senha, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

// refaz a conta com o mesmo salt e compara com o hash guardado
export async function conferirSenha(senha: string, guardado: string) {
  const [salt, hashGuardado] = guardado.split(":");
  if (!salt || !hashGuardado) return false;

  const hash = (await scryptAsync(senha, salt, 64)) as Buffer;
  const esperado = Buffer.from(hashGuardado, "hex");
  // compara em tempo constante: o tempo da resposta não dá pista nenhuma
  return hash.length === esperado.length && timingSafeEqual(hash, esperado);
}
