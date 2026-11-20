// o que vem de um formulário é "desconhecido" até a gente provar o contrário

// um type guard: se devolver true, o TypeScript passa a tratar o valor como texto
export function ehTexto(valor: unknown): valor is string {
  return typeof valor === "string";
}

// o texto de um campo, sem espaços nas pontas (ou vazio, se não veio texto)
export function campoDeTexto(dados: FormData, nome: string) {
  const valor = dados.get(nome);
  return ehTexto(valor) ? valor.trim() : "";
}
