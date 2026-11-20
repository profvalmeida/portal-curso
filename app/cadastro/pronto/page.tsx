import Link from "next/link";
import { Suspense } from "react";
import estilos from "../../formulario.module.css";

async function Mensagem({ searchParams }: PageProps<"/cadastro/pronto">) {
  const { nome } = await searchParams;
  return <h1>Oi, {nome}!</h1>;
}

export default function Pronto(props: PageProps<"/cadastro/pronto">) {
  return (
    <main className={estilos.pagina}>
      <Suspense fallback={<h1>Oi!</h1>}>
        <Mensagem {...props} />
      </Suspense>
      <p>A sua conta foi criada.</p>
      <p>
        Agora é só <Link href="/entrar">entrar</Link>.
      </p>
    </main>
  );
}
