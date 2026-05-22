"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { simular, formatBRL, formatNumero, capitalToFaixa, horizonteToEnum } from "@/lib/calculadora";
import { economiaPercentual, parametros } from "@/lib/parametros-mercado";

const presets = [
  { label: "R$ 500 mil", v: 500_000 },
  { label: "R$ 800 mil", v: 800_000 },
  { label: "R$ 1,2 mi", v: 1_200_000 },
  { label: "R$ 2 mi", v: 2_000_000 },
];

export function Calculadora() {
  const [capital, setCapital] = useState(800_000);
  const [horizonte, setHorizonte] = useState(5);

  const sim = useMemo(() => simular({ capital, horizonteAnos: horizonte }), [capital, horizonte]);

  const dentroDaFaixa = sim.metragemCustoReal >= parametros.metragemMin && sim.metragemCustoReal <= parametros.metragemMax;

  const ctaHref = `/#captura?capital=${capitalToFaixa(capital)}&horizonte=${horizonteToEnum(horizonte)}&origem=calculadora`;

  return (
    <section className="container-r21 py-12 md:py-16 grid gap-10 md:grid-cols-[0.9fr,1.1fr] items-start">
      <div className="bg-r21-paper border border-r21-fog p-6 md:p-8 md:sticky md:top-24">
        <p className="eyebrow">Sua simulação</p>
        <h2 className="font-display text-2xl font-bold tracking-tightest text-r21-black mt-3">
          Quanto seu capital rende a preço de custo?
        </h2>
        <p className="mt-3 text-sm text-r21-graphite leading-relaxed">
          Informe quanto você pretende investir e em quantos anos quer realizar o ganho. A simulação compara seu
          investimento R21 com o preço fechado de mercado equivalente em Balneário Camboriú.
        </p>

        <div className="mt-8">
          <label className="block">
            <span className="text-sm font-medium text-r21-graphite">Capital disponível para investir</span>
            <div className="mt-2 flex items-center bg-r21-white border border-r21-fog focus-within:border-r21-red">
              <span className="px-3 text-r21-stone text-sm">R$</span>
              <input
                type="number"
                min={100_000}
                max={10_000_000}
                step={50_000}
                value={capital}
                onChange={(e) => setCapital(Math.max(100_000, Number(e.target.value) || 0))}
                className="flex-1 py-3 pr-3 outline-none bg-transparent text-r21-black font-semibold"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.v}
                  type="button"
                  onClick={() => setCapital(p.v)}
                  className={`text-xs px-3 py-1.5 border ${
                    capital === p.v
                      ? "bg-r21-black text-r21-white border-r21-black"
                      : "border-r21-fog text-r21-graphite hover:border-r21-black"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </label>

          <label className="block mt-6">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium text-r21-graphite">Horizonte de investimento</span>
              <span className="text-r21-black font-semibold text-sm">{horizonte} {horizonte === 1 ? "ano" : "anos"}</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={horizonte}
              onChange={(e) => setHorizonte(Number(e.target.value))}
              className="mt-3 w-full accent-r21-red"
            />
            <div className="flex justify-between text-xs text-r21-stone mt-1">
              <span>1 ano</span><span>5 anos</span><span>10 anos</span>
            </div>
          </label>
        </div>

        {!dentroDaFaixa && (
          <div className="mt-6 text-xs text-r21-red bg-r21-red-soft px-3 py-2">
            Sua metragem simulada ({formatNumero(sim.metragemCustoReal, 1)} m²) está fora da faixa típica de
            unidades R21 ({parametros.metragemMin}–{parametros.metragemMax} m²). Vale conversar com um consultor.
          </div>
        )}

        <p className="mt-6 text-xs text-r21-stone leading-relaxed">
          Parâmetros: preço médio de mercado em BC {formatBRL(parametros.precoM2Mercado)}/m²; preço de custo R21{" "}
          {formatBRL(parametros.precoM2Custo)}/m²; valorização anual estimada{" "}
          {Math.round(parametros.valorizacaoAnualMercado * 100)}% a.a.; INCC{" "}
          {Math.round(parametros.inccAnual * 100)}% a.a.
        </p>
      </div>

      <div className="space-y-6">
        <ResultadoDestaque
          eyebrow="Você compra a preço de custo"
          numero={`${formatNumero(sim.metragemCustoReal, 1)} m²`}
          texto={`O mesmo imóvel a preço fechado custaria ${formatBRL(sim.precoMercadoEquivalente)} — você economiza ${formatBRL(sim.economiaAbsoluta)} já na entrada (${Math.round(sim.economiaPercentual)}%).`}
        />

        <div className="grid sm:grid-cols-2 gap-px bg-r21-fog">
          <Card label="Seu investimento total" valor={formatBRL(sim.custoTotalCustoReal)} sub="Custo real + taxa de administração" />
          <Card label="Aporte mensal médio" valor={formatBRL(sim.aporteMensalMedio)} sub={`Diluído em ${Math.min(parametros.prazoObraAnos, horizonte) * 12} meses de obra`} />
        </div>

        <BarComparativo
          mercado={sim.precoMercadoEquivalente}
          custo={sim.custoTotalCustoReal}
        />

        <div className="bg-r21-black text-r21-white p-6 md:p-8">
          <p className="eyebrow !text-r21-red">Projeção em {horizonte} {horizonte === 1 ? "ano" : "anos"}</p>
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tightest mt-2">
            Seu imóvel pode valer {formatBRL(sim.valorMercadoNoHorizonte)}
          </h3>
          <div className="mt-5 grid sm:grid-cols-3 gap-6">
            <Mini label="Ganho patrimonial" valor={formatBRL(sim.ganhoPatrimonialNoHorizonte)} />
            <Mini label="Múltiplo sobre capital" valor={`${sim.multiploSobreCapital.toFixed(2)}x`} />
            <Mini label="Valor na entrega" valor={formatBRL(sim.valorMercadoNaEntrega)} />
          </div>
          <p className="mt-5 text-xs text-r21-fog leading-relaxed">
            Projeção ilustrativa. Resultados reais variam conforme INCC, insumos, cronograma físico-financeiro e
            condições de mercado. Imóveis não têm rentabilidade garantida.
          </p>
        </div>

        <div className="bg-r21-paper p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-display text-xl font-bold tracking-tightest text-r21-black">
              Gostou da simulação? Vamos detalhar.
            </p>
            <p className="mt-1 text-sm text-r21-graphite">
              Recebemos seus dados, enviamos o guia e marcamos uma conversa com um consultor sênior.
            </p>
          </div>
          <Link href={ctaHref} className="btn-primary whitespace-nowrap">
            Falar com a R21
          </Link>
        </div>
      </div>
    </section>
  );
}

function ResultadoDestaque({ eyebrow, numero, texto }: { eyebrow: string; numero: string; texto: string }) {
  return (
    <div className="bg-r21-white border border-r21-fog border-l-4 border-l-r21-red p-6 md:p-8">
      <p className="eyebrow">{eyebrow}</p>
      <p className="font-display text-4xl md:text-5xl font-bold tracking-tightest text-r21-black mt-2">
        {numero}
      </p>
      <p className="mt-3 text-r21-graphite leading-relaxed">{texto}</p>
    </div>
  );
}

function Card({ label, valor, sub }: { label: string; valor: string; sub: string }) {
  return (
    <div className="bg-r21-white p-5">
      <p className="text-xs uppercase tracking-wider text-r21-stone">{label}</p>
      <p className="font-display text-2xl font-bold tracking-tightest text-r21-black mt-1">{valor}</p>
      <p className="text-xs text-r21-stone mt-1">{sub}</p>
    </div>
  );
}

function Mini({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-r21-fog">{label}</p>
      <p className="font-display text-xl font-bold tracking-tightest mt-1">{valor}</p>
    </div>
  );
}

function BarComparativo({ mercado, custo }: { mercado: number; custo: number }) {
  const max = Math.max(mercado, custo);
  const wMercado = (mercado / max) * 100;
  const wCusto = (custo / max) * 100;
  return (
    <div className="bg-r21-white border border-r21-fog p-5 space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-r21-graphite">Preço fechado de mercado</span>
          <span className="text-r21-stone">{formatBRL(mercado)}</span>
        </div>
        <div className="relative h-8 bg-r21-paper">
          <div className="h-full bg-r21-fog" style={{ width: `${wMercado}%` }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-r21-black">Preço de custo R21</span>
          <span className="font-semibold text-r21-red">{formatBRL(custo)}</span>
        </div>
        <div className="relative h-8 bg-r21-paper">
          <div className="h-full bg-r21-red" style={{ width: `${wCusto}%` }} />
        </div>
      </div>
      <p className="text-xs text-r21-stone">
        Economia estrutural de até {economiaPercentual}% sobre empreendimentos comparáveis a preço fechado.
      </p>
    </div>
  );
}
