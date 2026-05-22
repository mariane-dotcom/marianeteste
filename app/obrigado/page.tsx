import Link from "next/link";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ObrigadoPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const pdfHref = token
    ? `/api/guia/pdf?token=${encodeURIComponent(token)}`
    : "/guia-preco-de-custo";

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 md:py-28 text-center">
      <p className="text-xs uppercase tracking-widest text-r21-red font-medium">
        Cadastro recebido
      </p>
      <h1 className="mt-4 text-4xl md:text-5xl font-medium text-r21-black">
        Obrigado. Seu guia está pronto.
      </h1>
      <p className="mt-5 text-r21-gray-600 leading-relaxed">
        Enviamos uma cópia para o seu e-mail. Você também pode baixar agora —
        ou voltar a qualquer momento usando o link do e-mail.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={pdfHref}
          className="inline-flex items-center px-6 py-3 rounded-md bg-r21-red text-r21-white font-medium hover:bg-r21-red-dark transition-colors"
        >
          Baixar o guia em PDF
        </a>
        <Link
          href="/guia-preco-de-custo"
          className="inline-flex items-center px-6 py-3 rounded-md border border-r21-gray-300 text-r21-black font-medium hover:bg-r21-off-white transition-colors"
        >
          Ler online
        </Link>
      </div>
      <p className="mt-12 text-sm text-r21-gray-500">
        Um consultor da R21 pode entrar em contato em breve para tirar dúvidas
        e apresentar os empreendimentos em captação.
      </p>
    </section>
  );
}
