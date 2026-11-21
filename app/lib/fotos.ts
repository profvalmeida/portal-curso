// as fotos que vêm com o portal, na pasta public/fotos.
// as const: a lista não muda, e o TypeScript conhece cada nome
export const fotos = [
  "cidade.jpg",
  "prefeitura.jpg",
  "ciclovia.jpg",
  "chuva.jpg",
  "futebol.jpg",
  "show.jpg",
  "festival.jpg",
  "livros.jpg",
  "biblioteca.jpg",
  "estudo.jpg",
  "codigo.jpg",
  "servidores.jpg",
] as const;

// o tipo Foto é um dos nomes da lista: "cidade.jpg" | "prefeitura.jpg" | ...
export type Foto = (typeof fotos)[number];

// um type guard: se devolver true, o texto passa a ser tratado como uma Foto
export function ehFoto(valor: string): valor is Foto {
  return (fotos as readonly string[]).includes(valor);
}
