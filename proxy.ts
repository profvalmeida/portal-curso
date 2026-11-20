import { NextResponse, type NextRequest } from "next/server";

// a primeira camada: só confere se o cookie da sessão existe (é rápido, não vai no banco)
export function proxy(pedido: NextRequest) {
  if (!pedido.cookies.has("sessao")) {
    return NextResponse.redirect(new URL("/entrar", pedido.url));
  }
  return NextResponse.next();
}

// só as páginas da área restrita passam por aqui
export const config = {
  matcher: ["/conta/:path*", "/painel/:path*"],
};
