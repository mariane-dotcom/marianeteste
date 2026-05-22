"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CALC } from "@/config/calc";
import {
  calcularCenarios,
  capitalParaFaixa,
  formatarBRL,
  horizonteAnosParaEnum,
} from "@/lib/calculadora";
import { trackLead } from "@/lib/analytics";

const RED = "#CC1316";
const GRAY = "#8C8C8C";

export default function Calculadora() {
  const [capital, setCapital] = useState<number>(CALC.capital.default);
  const [horizonte, setHorizonte] = useState<number>(
    CALC.horizonteAnos.default,
  );

  const resultado = useMemo(
    () => calcularCenarios({ capitalDisponivel: capital, horizonteAnos: horizonte }),
    [capital, horizonte],
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      <p className="text-xs uppercase tracking-widest text-r21-red font-medium">
        Calculadora de valorização
      </p>
      <h1 className="mt-3 text-4xl md:text-5xl font-medium text-r21-black leading-tight max-w-3xl">
        Quanto o mesmo capital vira a preço de custo.
      </h1>
      <p className="mt-4 text-r21-gray-600 max-w-2xl leading-relaxed">
        Simule o patrimônio final do mesmo aporte em dois cenários: comprando
        no mercado tradicional e entrando no preço de custo. Ajuste os campos
        e veja a diferença em tempo real.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <CapitalInput value={capital} onChange={setCapital} />
        <HorizonteInput value={horizonte} onChange={setHorizonte} />
      </div>

      <CardsResultado
        capital={capital}
        tradicional={resultado.cenarioTradicional}
        precoCusto={resultado.cenarioPrecoCusto}
        diferenca={resultado.diferencaPatrimonio}
        multiplicador={resultado.multiplicadorPoderCompra}
      />

      <div className="mt-10 bg-r21-white border border-r21-gray-100 rounded-lg p-4 md:p-6">
        <h2 className="text-lg font-medium text-r21-black px-2">
          Patrimônio projetado ao longo do tempo
        </h2>
        <div className="h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={resultado.serie}
              margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#D9D9D9" />
              <XAxis
                dataKey="ano"
                tickFormatter={(v) => `Ano ${v}`}
                stroke="#6A6A6A"
                fontSize={12}
              />
              <YAxis
                tickFormatter={(v) =>
                  v >= 1_000_000
                    ? `R$ ${(v / 1_000_000).toFixed(1)}M`
                    : `R$ ${Math.round(v / 1000)}k`
                }
                stroke="#6A6A6A"
                fontSize={12}
              />
              <Tooltip
                formatter={(v) => formatarBRL(Number(v))}
                labelFormatter={(label) => `Ano ${label}`}
                contentStyle={{
                  borderRadius: 6,
                  borderColor: "#D9D9D9",
                  fontSize: 13,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="tradicional"
                name="Mercado tradicional"
                stroke={GRAY}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="precoCusto"
                name="Preço de custo R21"
                stroke={RED}
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <CaptureGate capital={capital} horizonte={horizonte} />

      <Disclaimer />
    </section>
  );
}

function CapitalInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="bg-r21-white border border-r21-gray-100 rounded-lg p-6">
      <label
        htmlFor="capital"
        className="block text-sm font-medium text-r21-gray-800"
      >
        Capital disponível para investir
      </label>
      <div className="mt-2 text-3xl md:text-4xl font-medium text-r21-black">
        {formatarBRL(value)}
      </div>
      <input
        id="capital"
        type="range"
        min={CALC.capital.min}
        max={CALC.capital.max}
        step={CALC.capital.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-r21-red"
      />
      <div className="mt-1 flex justify-between text-xs text-r21-gray-500">
        <span>{formatarBRL(CALC.capital.min)}</span>
        <span>{formatarBRL(CALC.capital.max)}+</span>
      </div>
    </div>
  );
}

function HorizonteInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="bg-r21-white border border-r21-gray-100 rounded-lg p-6">
      <label
        htmlFor="horizonte"
        className="block text-sm font-medium text-r21-gray-800"
      >
        Horizonte do investimento
      </label>
      <div className="mt-2 text-3xl md:text-4xl font-medium text-r21-black">
        {value} {value === 1 ? "ano" : "anos"}
      </div>
      <input
        id="horizonte"
        type="range"
        min={CALC.horizonteAnos.min}
        max={CALC.horizonteAnos.max}
        step={CALC.horizonteAnos.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-r21-red"
      />
      <div className="mt-1 flex justify-between text-xs text-r21-gray-500">
        <span>{CALC.horizonteAnos.min} ano</span>
        <span>{CALC.horizonteAnos.max} anos</span>
      </div>
    </div>
  );
}

function CardsResultado({
  capital,
  tradicional,
  precoCusto,
  diferenca,
  multiplicador,
}: {
  capital: number;
  tradicional: number;
  precoCusto: number;
  diferenca: number;
  multiplicador: number;
}) {
  return (
    <div className="mt-6 grid md:grid-cols-3 gap-4">
      <ResultCard
        label="Mercado tradicional"
        value={formatarBRL(tradicional)}
        sub={`A partir de ${formatarBRL(capital)}`}
      />
      <ResultCard
        label="Preço de custo R21"
        value={formatarBRL(precoCusto)}
        sub={`Poder de compra ${multiplicador.toFixed(2).replace(".", ",")}× maior`}
        highlight
      />
      <ResultCard
        label="Diferença de patrimônio"
        value={formatarBRL(diferenca)}
        sub="A favor do preço de custo"
        accent
      />
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  highlight,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-lg p-6 border",
        highlight
          ? "bg-r21-black text-r21-white border-r21-black"
          : accent
            ? "bg-r21-red-50 border-r21-red-100 text-r21-red-deep"
            : "bg-r21-white border-r21-gray-100 text-r21-black",
      ].join(" ")}
    >
      <div
        className={`text-xs uppercase tracking-widest font-medium ${
          highlight ? "text-r21-red-200" : accent ? "text-r21-red-dark" : "text-r21-gray-500"
        }`}
      >
        {label}
      </div>
      <div className="mt-2 text-3xl md:text-4xl font-medium">{value}</div>
      <div
        className={`mt-1 text-sm ${
          highlight ? "text-r21-gray-200" : accent ? "text-r21-red-dark" : "text-r21-gray-600"
        }`}
      >
        {sub}
      </div>
    </div>
  );
}

function CaptureGate({
  capital,
  horizonte,
}: {
  capital: number;
  horizonte: number;
}) {
  const router = useRouter();
  const utmsRef = useRef<Record<string, string | undefined>>({});
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    utmsRef.current = {
      utmSource: p.get("utm_source") || undefined,
      utmMedium: p.get("utm_medium") || undefined,
      utmCampaign: p.get("utm_campaign") || undefined,
      utmTerm: p.get("utm_term") || undefined,
      utmContent: p.get("utm_content") || undefined,
      origem: "calculadora",
    };
  }, []);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErr(null);
    const body = {
      nome,
      email,
      telefone,
      objetivo: "investir" as const,
      faixaCapital: capitalParaFaixa(capital),
      horizonte: horizonteAnosParaEnum(horizonte),
      ...utmsRef.current,
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErr(data.error || "Não foi possível enviar.");
        return;
      }
      trackLead({ score: data.score, classificacao: data.classificacao });
      const q = new URLSearchParams();
      if (data.token) q.set("token", data.token);
      router.push(`/obrigado?${q.toString()}`);
    } catch {
      setStatus("error");
      setErr("Erro de rede. Tente novamente.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      id="receber"
      className="mt-12 bg-r21-black text-r21-white rounded-lg p-8 md:p-10 grid md:grid-cols-2 gap-8"
    >
      <div>
        <p className="text-xs uppercase tracking-widest text-r21-red-200 font-medium">
          Simulação detalhada
        </p>
        <h2 className="mt-3 text-2xl md:text-3xl font-medium leading-tight">
          Receba esta simulação por e-mail e o Guia do Preço de Custo.
        </h2>
        <p className="mt-3 text-r21-gray-200 text-sm leading-relaxed">
          Enviamos a projeção detalhada com seus números e o guia completo. Um
          consultor R21 pode entrar em contato para discutir empreendimentos
          em captação compatíveis com seu perfil.
        </p>
      </div>
      <div className="space-y-3">
        <input
          required
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={darkInputCls}
          autoComplete="name"
        />
        <input
          required
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={darkInputCls}
          autoComplete="email"
        />
        <input
          required
          type="tel"
          placeholder="Telefone (com DDD)"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className={darkInputCls}
          autoComplete="tel"
        />
        {err && <p className="text-sm text-r21-red-200">{err}</p>}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center px-5 py-3 rounded-md bg-r21-red text-r21-white font-medium hover:bg-r21-red-dark transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Enviando…" : "Quero receber a simulação"}
        </button>
        <p className="text-xs text-r21-gray-400 leading-relaxed">
          Ao enviar, você concorda em receber materiais da R21. Não
          compartilhamos seus dados.
        </p>
      </div>
    </form>
  );
}

const darkInputCls =
  "w-full rounded-md border border-r21-gray-800 bg-r21-gray-900 px-3 py-2.5 text-r21-white placeholder:text-r21-gray-400 focus:outline-none focus:border-r21-red focus:ring-2 focus:ring-r21-red-deep transition";

function Disclaimer() {
  return (
    <aside className="mt-10 text-xs text-r21-gray-500 border-t border-r21-gray-100 pt-6 leading-relaxed max-w-3xl">
      <p>
        <strong className="text-r21-gray-800">Esta é uma estimativa, não uma promessa de rentabilidade.</strong>{" "}
        Os números usam um desconto de preço de custo de{" "}
        {(CALC.descontoPrecoCusto * 100).toFixed(0)}% e uma valorização anual
        média de {(CALC.valorizacaoAnualBC * 100).toFixed(0)}% para Balneário
        Camboriú — parâmetros conservadores baseados em referências de mercado
        a validar com cada empreendimento. A valorização real depende do
        ciclo imobiliário, do INCC e da execução da obra. Investimentos em
        condomínio de construção têm riscos (variação por INCC, estouro de
        orçamento, inadimplência coletiva, ausência de financiamento durante
        a obra) que devem ser avaliados antes de qualquer decisão.
      </p>
    </aside>
  );
}
