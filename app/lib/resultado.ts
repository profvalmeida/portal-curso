// T é o "tipo dos dados": quem usa escolhe (uma lista de notícias, um usuário…)
export type Resultado<T> = { ok: true; dados: T } | { ok: false; erro: string };

// roda a tarefa e nunca estoura: devolve os dados, ou a mensagem de erro
export async function tentar<T>(
  tarefa: () => Promise<T>,
  erro: string,
): Promise<Resultado<T>> {
  try {
    return { ok: true, dados: await tarefa() };
  } catch {
    return { ok: false, erro };
  }
}
