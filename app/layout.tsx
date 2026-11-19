import type { Metadata } from "next";
import Cabecalho from "./componentes/Cabecalho";
import Rodape from "./componentes/Rodape";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal de Notícias",
  description: "As notícias do dia, feitas com Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        <Cabecalho />
        {children}
        <Rodape />
      </body>
    </html>
  );
}
