import { listarAutores } from "../../dados/autores";

// GET /api/autores: a lista de autores, em JSON
export async function GET() {
  const autores = await listarAutores();
  return Response.json(autores);
}
