import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal de Notícias",
  description: "As notícias do dia, feitas com Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
