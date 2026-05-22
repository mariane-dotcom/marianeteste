import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { guia } from "@/lib/guia-content";

export const metadata: Metadata = {
  title: "Guia da Construção a Preço de Custo",
  description:
    "O guia honesto sobre o regime de administração: economia, riscos e a pergunta que separa o investidor consciente do arrependido.",
};

export default function GuiaPage() {
  return (
    <>
      <Header />
      <article className="container-r21 max-w-3xl py-16 md:py-24">
        <header className="border-b border-r21-fog pb-10 mb-12">
          <span className="eyebrow">Guia · R21 Empreendimentos</span>
          <h1 className="h-display mt-3 text-r21-black">{guia.hero.titulo}</h1>
          <p className="mt-6 text-xl text-r21-graphite leading-relaxed">{guia.hero.subtitulo}</p>
          <p className="mt-4 italic text-r21-stone leading-relaxed">{guia.hero.lead}</p>
          <div className="mt-8 flex gap-3 no-print">
            <a href="/api/guia/pdf" className="btn-outline text-sm py-2.5 px-4">Baixar PDF</a>
            <Link href="/#captura" className="btn-primary text-sm py-2.5 px-4">Falar com consultor</Link>
          </div>
        </header>

        <div className="space-y-8 text-r21-ink leading-relaxed">
          {guia.blocos.map((b, i) => {
            if (b.tipo === "h2") {
              return (
                <h2 key={i} className="font-display text-2xl md:text-3xl font-bold tracking-tightest text-r21-black mt-12 first:mt-0">
                  {b.texto}
                </h2>
              );
            }
            if (b.tipo === "p") {
              return <p key={i} className="text-lg text-r21-graphite leading-relaxed">{b.texto}</p>;
            }
            if (b.tipo === "lista") {
              return (
                <ul key={i} className="space-y-3 text-lg text-r21-graphite">
                  {b.itens.map((it, j) => (
                    <li key={j} className="pl-6 relative leading-relaxed">
                      <span className="absolute left-0 top-[0.65rem] w-2 h-2 bg-r21-red" />
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }
            if (b.tipo === "callout") {
              return (
                <aside key={i} className="border-l-4 border-r21-red bg-r21-paper p-6">
                  <p className="eyebrow">{b.titulo}</p>
                  <p className="mt-2 text-r21-ink leading-relaxed">{b.texto}</p>
                </aside>
              );
            }
            if (b.tipo === "numero") {
              return (
                <div key={i} className="flex items-baseline gap-6 border-y border-r21-fog py-8">
                  <span className="font-display font-bold text-5xl md:text-6xl tracking-tightest text-r21-red">{b.valor}</span>
                  <p className="text-lg text-r21-graphite leading-relaxed">{b.texto}</p>
                </div>
              );
            }
            if (b.tipo === "comparativo") {
              return (
                <div key={i} className="bg-r21-black text-r21-white p-8">
                  <p className="font-display text-xl font-bold tracking-tightest">{b.titulo}</p>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="eyebrow !text-r21-red">Investidor consciente</p>
                      <ul className="mt-3 space-y-2 text-r21-fog text-sm leading-relaxed">
                        {b.consciente.map((c, k) => <li key={k}>✓ {c}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow !text-r21-fog">Investidor arrependido</p>
                      <ul className="mt-3 space-y-2 text-r21-fog text-sm leading-relaxed">
                        {b.arrependido.map((c, k) => <li key={k}>✗ {c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <footer className="mt-16 pt-10 border-t border-r21-fog no-print">
          <div className="bg-r21-paper p-8">
            <p className="eyebrow">Próximo passo</p>
            <p className="mt-3 font-display text-2xl font-bold tracking-tightest text-r21-black">
              Se você se identificou com o "investidor consciente", vamos conversar.
            </p>
            <Link href="/#captura" className="btn-primary mt-6">Receber análise personalizada</Link>
          </div>
        </footer>
      </article>
      <Footer />
    </>
  );
}
