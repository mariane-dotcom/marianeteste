import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Obrigado pelo cadastro",
  robots: { index: false, follow: false },
};

const mensagemPorScore: Record<string, { titulo: string; corpo: string }> = {
  A: {
    titulo: "Seu guia está a caminho — e um consultor sênior também.",
    corpo: "Pelo perfil que você nos passou, encaixamos sua análise na fila prioritária. Nosso time entra em contato em até 24 horas úteis pelo WhatsApp.",
  },
  B: {
    titulo: "Seu guia está a caminho.",
    corpo: "Recebemos seu cadastro. Em breve um consultor entra em contato para entender melhor seu momento e ver se faz sentido conversar agora ou daqui a alguns meses.",
  },
  C: {
    titulo: "Seu guia está a caminho.",
    corpo: "Vamos te enviar materiais relevantes nas próximas semanas — sem pressão. Quando estiver mais próximo de decidir, é só responder qualquer e-mail nosso.",
  },
};

export default async function ObrigadoPage({ searchParams }: { searchParams: Promise<{ score?: string }> }) {
  const { score: scoreParam } = await searchParams;
  const score = (scoreParam?.toUpperCase() ?? "B") as "A" | "B" | "C";
  const msg = mensagemPorScore[score] ?? mensagemPorScore.B;

  return (
    <>
      <Header />
      <main className="container-r21 max-w-2xl py-20 md:py-28">
        <span className="eyebrow">Cadastro recebido</span>
        <h1 className="h-display mt-3 text-r21-black">{msg.titulo}</h1>
        <p className="mt-6 text-lg text-r21-graphite leading-relaxed">{msg.corpo}</p>

        <div className="mt-10 bg-r21-paper p-8">
          <p className="eyebrow">Enquanto isso</p>
          <p className="mt-3 text-r21-ink">
            Você já pode ler o guia agora, direto no navegador:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/guia" className="btn-primary">Ler o guia online</Link>
            <a href="/api/guia/pdf" className="btn-outline">Baixar PDF</a>
          </div>
        </div>

        <p className="mt-10 text-sm text-r21-stone">
          Se preferir falar agora, chame no WhatsApp{" "}
          <a href={`https://wa.me/${brand.phoneRaw}`} className="underline text-r21-black">
            {brand.phone}
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
