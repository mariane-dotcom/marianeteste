import Link from "next/link";
import { GUIA } from "@/lib/guia/content";

export const metadata = {
  title: `${GUIA.titulo} · R21`,
  description: GUIA.subtitulo,
};

export default function GuiaPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 leading-relaxed">
      <header className="border-b border-r21-gray-100 pb-10 mb-12">
        <p className="text-xs uppercase tracking-widest text-r21-red font-medium">
          Guia R21 para investidores
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium text-r21-black">
          {GUIA.titulo}
        </h1>
        <p className="mt-4 text-lg text-r21-gray-600 max-w-2xl">
          {GUIA.subtitulo}
        </p>
        <div className="mt-8">
          <DownloadPdfButton />
        </div>
      </header>

      <Secao secao={GUIA.abertura} />
      <Secao secao={GUIA.comoFunciona} />
      <Secao secao={GUIA.vantagens} />

      <Secao secao={GUIA.desvantagens} destaque="risco" />

      <section
        id={GUIA.checklist.id}
        className="my-14 rounded-lg border border-r21-gray-100 bg-r21-off-white p-8"
      >
        <h2 className="text-2xl font-medium text-r21-black">
          {GUIA.checklist.titulo}
        </h2>
        <p className="mt-2 text-r21-gray-600">{GUIA.checklist.intro}</p>
        <ul className="mt-6 space-y-4">
          {GUIA.checklist.itens.map((item, i) => (
            <li key={item.id} className="flex gap-4">
              <span
                aria-hidden
                className="flex-shrink-0 w-7 h-7 rounded-full bg-r21-red text-r21-white text-sm font-medium flex items-center justify-center"
              >
                {i + 1}
              </span>
              <p className="text-r21-gray-800">{item.pergunta}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id={GUIA.fechamento.id} className="my-14">
        <h2 className="text-2xl font-medium text-r21-black">
          {GUIA.fechamento.titulo}
        </h2>
        {GUIA.fechamento.paragrafos.map((p, i) => (
          <p key={i} className="mt-4 text-r21-gray-800">
            {p}
          </p>
        ))}
        <div className="mt-8 flex flex-wrap gap-3">
          {GUIA.fechamento.ctas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="inline-flex items-center px-5 py-3 rounded-md bg-r21-red text-r21-white font-medium hover:bg-r21-red-dark transition-colors"
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

function Secao({
  secao,
  destaque,
}: {
  secao: { id: string; titulo: string; paragrafos: string[] };
  destaque?: "risco";
}) {
  return (
    <section id={secao.id} className="my-14">
      <h2
        className={`text-2xl font-medium ${
          destaque === "risco" ? "text-r21-red-dark" : "text-r21-black"
        }`}
      >
        {secao.titulo}
      </h2>
      {secao.paragrafos.map((p, i) => (
        <p key={i} className="mt-4 text-r21-gray-800">
          {p}
        </p>
      ))}
    </section>
  );
}

function DownloadPdfButton() {
  return (
    <Link
      href="/api/guia/pdf?token=preview"
      className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-r21-black text-r21-black font-medium hover:bg-r21-black hover:text-r21-white transition-colors"
    >
      Baixar guia em PDF
      <span aria-hidden>↓</span>
    </Link>
  );
}
