import Link from "next/link";
import FormularioLead from "@/components/FormularioLead";
import { PORTFOLIO, STATUS_LABEL } from "@/lib/portfolio";

export default function Home() {
  return (
    <>
      <Hero />
      <Prova />
      <Modelo />
      <OfertaGuia />
      <SecaoCaptura />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-r21-white">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <p className="text-xs uppercase tracking-widest text-r21-red font-medium">
          R21 · Balneário Camboriú/SC
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-medium text-r21-black leading-[1.05] max-w-3xl">
          Invista a preço de custo em Balneário Camboriú —{" "}
          <span className="text-r21-red">até 35% mais barato</span> que o mercado
          tradicional.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-r21-gray-600 max-w-2xl leading-relaxed">
          Você não compra um imóvel pronto: entra como condômino na construção,
          paga o custo real, acompanha cada nota fiscal. Sem margem de
          incorporadora embutida.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#captura"
            className="inline-flex items-center px-6 py-3 rounded-md bg-r21-red text-r21-white font-medium hover:bg-r21-red-dark transition-colors"
          >
            Receber o Guia do Preço de Custo
          </a>
          <Link
            href="/guia-preco-de-custo"
            className="inline-flex items-center px-6 py-3 rounded-md border border-r21-gray-300 text-r21-black font-medium hover:bg-r21-off-white transition-colors"
          >
            Ler o guia online
          </Link>
        </div>
      </div>
    </section>
  );
}

function Prova() {
  return (
    <section id="portfolio" className="bg-r21-off-white border-y border-r21-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="text-xs uppercase tracking-widest text-r21-red font-medium">
          Portfólio
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-medium text-r21-black max-w-2xl">
          Obras reais, não renders.
        </h2>
        <p className="mt-4 text-r21-gray-600 max-w-2xl">
          Empreendimentos entregues, em obras e em captação no modelo a preço
          de custo — administrados pela R21 com transparência total de
          orçamento.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {PORTFOLIO.map((emp) => (
            <article
              key={emp.nome}
              className="bg-r21-white rounded-lg border border-r21-gray-100 overflow-hidden flex flex-col"
            >
              <div
                className="aspect-[4/3] bg-r21-gray-100 flex items-center justify-center text-r21-gray-300"
                aria-hidden
              >
                {/* Placeholder pra foto de obra (substituir por foto real) */}
                <svg viewBox="0 0 45 56" width="48" height="60">
                  <g fill="currentColor">
                    <path d="M2,54 L2,24 L13,30 L13,54 Z" />
                    <path d="M17,54 L17,4 L29,11 L29,54 Z" />
                    <path d="M33,54 L33,26 L43,32 L43,54 Z" />
                  </g>
                </svg>
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <span className="text-xs uppercase tracking-wider text-r21-red font-medium">
                  {STATUS_LABEL[emp.status]}
                </span>
                <h3 className="text-lg font-medium text-r21-black">
                  {emp.nome}
                </h3>
                <p className="text-sm text-r21-gray-500">{emp.bairro}</p>
                <p className="mt-1 text-sm text-r21-gray-800 leading-relaxed">
                  {emp.resumo}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modelo() {
  const itens = [
    {
      titulo: "Até 35% mais barato",
      texto:
        "Sem margem de incorporadora. Você paga o custo real da obra rateado entre os condôminos.",
    },
    {
      titulo: "Transparência total",
      texto:
        "Notas fiscais em nome do condomínio. Extratos mensais e prestação de contas auditável.",
    },
    {
      titulo: "Personalização real",
      texto:
        "Acabamentos, plantas e detalhes negociáveis — uma vantagem do modelo coletivo.",
    },
  ];
  return (
    <section className="bg-r21-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="text-xs uppercase tracking-widest text-r21-red font-medium">
          O modelo em 30 segundos
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-medium text-r21-black max-w-2xl">
          Construção por administração, com base na Lei 4.591/64.
        </h2>
        <p className="mt-4 text-r21-gray-600 max-w-2xl">
          Investidores formam um condomínio de construção. A R21 administra,
          cobrando taxa de 10% a 15% sobre o custo da obra — não há lucro
          embutido no preço do imóvel.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {itens.map((i) => (
            <div
              key={i.titulo}
              className="border-l-2 border-r21-red pl-5 py-2"
            >
              <h3 className="text-lg font-medium text-r21-black">{i.titulo}</h3>
              <p className="mt-2 text-sm text-r21-gray-600 leading-relaxed">
                {i.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfertaGuia() {
  return (
    <section className="bg-r21-black text-r21-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-r21-red-200 font-medium">
            Guia gratuito
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-medium leading-tight">
            Entenda o modelo antes de decidir.
          </h2>
          <p className="mt-4 text-r21-gray-200 leading-relaxed max-w-md">
            O <strong>Guia do Preço de Custo</strong> explica como funciona,
            quanto custa, e expõe abertamente os riscos — para você decidir com
            informação, não com adrenalina.
          </p>
          <ul className="mt-6 space-y-3 text-r21-gray-200">
            <li className="flex gap-3">
              <span className="text-r21-red-200">→</span>
              <span>Vantagens com números e exemplos reais</span>
            </li>
            <li className="flex gap-3">
              <span className="text-r21-red-200">→</span>
              <span>Riscos (INCC, orçamento, liquidez) explicados</span>
            </li>
            <li className="flex gap-3">
              <span className="text-r21-red-200">→</span>
              <span>Checklist: 5 perguntas para se autoavaliar</span>
            </li>
          </ul>
        </div>
        <div className="bg-r21-gray-900 border border-r21-gray-800 rounded-lg p-8 md:p-10 text-center">
          <div className="text-6xl md:text-7xl font-medium text-r21-red">35%</div>
          <p className="mt-2 text-r21-gray-200 max-w-xs mx-auto">
            de economia média em relação ao mesmo imóvel vendido pelo mercado
            tradicional.
          </p>
          <a
            href="#captura"
            className="mt-6 inline-flex items-center px-5 py-3 rounded-md bg-r21-red text-r21-white font-medium hover:bg-r21-red-dark transition-colors"
          >
            Quero o guia
          </a>
        </div>
      </div>
    </section>
  );
}

function SecaoCaptura() {
  return (
    <section id="captura" className="bg-r21-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-r21-red font-medium">
            Receba o guia
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-medium text-r21-black leading-tight">
            5 perguntas. O guia chega no seu e-mail em segundos.
          </h2>
          <p className="mt-4 text-r21-gray-600 leading-relaxed">
            Suas respostas ajudam o consultor R21 a entender seu perfil antes
            do contato — economiza tempo dos dois lados.
          </p>
          <div className="mt-8 text-sm text-r21-gray-500 leading-relaxed">
            <p>
              <strong className="text-r21-gray-800">Por que perguntamos sobre capital?</strong>
              <br />
              No modelo a preço de custo não há financiamento bancário durante a
              obra. Saber sua faixa de investimento ajuda a indicar o
              empreendimento certo — ou explicar honestamente se este não é o
              modelo para você agora.
            </p>
          </div>
        </div>
        <div>
          <FormularioLead />
        </div>
      </div>
    </section>
  );
}
