import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Cabecalho from "./componentes/Cabecalho";
import Rodape from "./componentes/Rodape";
import { site } from "./lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--fonte-texto" });
const lora = Lora({ subsets: ["latin"], variable: "--fonte-titulo" });

export const metadata: Metadata = {
  // o endereço do site: as imagens do Open Graph precisam do endereço completo
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: site.nome,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <Cabecalho />
        {children}
        <Rodape />
      </body>
    </html>
  );
}
