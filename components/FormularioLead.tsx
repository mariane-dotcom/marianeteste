"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const objetivos = [
  { value: "INVESTIR", label: "Para investir / valorização" },
  { value: "AMBOS", label: "Os dois — morar e investir" },
  { value: "MORAR", label: "Para morar" },
];

const capitais = [
  { value: "ATE_300K", label: "Até R$ 300 mil" },
  { value: "DE_300K_700K", label: "R$ 300 mil a R$ 700 mil" },
  { value: "DE_700K_1_5M", label: "R$ 700 mil a R$ 1,5 milhão" },
  { value: "ACIMA_1_5M", label: "Acima de R$ 1,5 milhão" },
];

const horizontes = [
  { value: "ATE_12M", label: "Quero entrar nos próximos 12 meses" },
  { value: "DE_12_36M", label: "Entre 1 e 3 anos" },
  { value: "ACIMA_36M", label: "Acima de 3 anos" },
  { value: "SEM_PRESSA", label: "Estou só explorando o mercado" },
];

export function FormularioLead() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const capitalPre = searchParams.get("capital") ?? "";
  const horizontePre = searchParams.get("horizonte") ?? "";
  const origemPre = searchParams.get("origem") ?? "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    if (origemPre) payload.origem = origemPre;

    const usp = new URLSearchParams(window.location.search);
    const utm = {
      utmSource: usp.get("utm_source") ?? undefined,
      utmMedium: usp.get("utm_medium") ?? undefined,
      utmCampaign: usp.get("utm_campaign") ?? undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, ...utm }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erro ao enviar.");
      router.push(`/obrigado?score=${json.score}`);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro desconhecido");
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-r21-white border border-r21-fog p-6 md:p-10 space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Campo label="Nome completo" name="nome" required />
        <Campo label="E-mail" name="email" type="email" required />
      </div>
      <Campo label="WhatsApp / Telefone" name="telefone" required placeholder="(47) 9 9999-9999" />

      <Select label="Seu objetivo principal" name="objetivo" required opcoes={objetivos} />
      <Select label="Faixa de investimento" name="capital" required opcoes={capitais} defaultValue={capitalPre} />
      <Select label="Quando você pensa em entrar?" name="horizonte" required opcoes={horizontes} defaultValue={horizontePre} />

      <label className="block text-sm">
        <span className="text-r21-graphite">Algo que você gostaria que soubéssemos? (opcional)</span>
        <textarea
          name="observacao"
          rows={3}
          className="mt-1 w-full border border-r21-fog px-3 py-2.5 focus:outline-none focus:border-r21-red"
        />
      </label>

      {erro && <p className="text-sm text-r21-red">{erro}</p>}

      <button type="submit" disabled={enviando} className="btn-primary w-full disabled:opacity-60">
        {enviando ? "Enviando…" : "Receber o guia"}
      </button>

      <p className="text-xs text-r21-stone">
        Ao enviar, você concorda em receber o guia em PDF e comunicações ocasionais da R21.
        Você pode descadastrar a qualquer momento. Não compartilhamos seus dados.
      </p>
    </form>
  );
}

function Campo({ label, name, required, type = "text", placeholder }: {
  label: string; name: string; required?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-r21-graphite">{label}{required && <span className="text-r21-red"> *</span>}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full border border-r21-fog px-3 py-2.5 focus:outline-none focus:border-r21-red"
      />
    </label>
  );
}

function Select({ label, name, required, opcoes, defaultValue = "" }: {
  label: string; name: string; required?: boolean; opcoes: { value: string; label: string }[]; defaultValue?: string;
}) {
  const valid = opcoes.some((o) => o.value === defaultValue) ? defaultValue : "";
  return (
    <label className="block text-sm">
      <span className="text-r21-graphite">{label}{required && <span className="text-r21-red"> *</span>}</span>
      <select
        name={name}
        required={required}
        defaultValue={valid}
        className="mt-1 w-full border border-r21-fog px-3 py-2.5 bg-r21-white focus:outline-none focus:border-r21-red"
      >
        <option value="" disabled>Selecione…</option>
        {opcoes.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
