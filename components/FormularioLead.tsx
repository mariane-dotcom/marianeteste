"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FAIXA_CAPITAL_LABELS,
  HORIZONTE_LABELS,
  OBJETIVO_LABELS,
  type LeadInput,
} from "@/lib/lead-schema";
import { trackLead } from "@/lib/analytics";

type FormState = Pick<
  LeadInput,
  "nome" | "email" | "telefone" | "objetivo" | "faixaCapital" | "horizonte"
>;

const EMPTY: FormState = {
  nome: "",
  email: "",
  telefone: "",
  objetivo: "investir",
  faixaCapital: "de_300k_700k",
  horizonte: "de_12m_36m",
};

export default function FormularioLead() {
  const [state, setState] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const utmsRef = useRef<Partial<LeadInput>>({});
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    utmsRef.current = {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
      origem:
        params.get("utm_source") ||
        document.referrer ||
        undefined,
    };
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);

    const body = { ...state, ...utmsRef.current };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Não foi possível registrar seu cadastro.");
        return;
      }
      trackLead({ score: data.score, classificacao: data.classificacao });
      const params = new URLSearchParams();
      if (data.token) params.set("token", data.token);
      router.push(`/obrigado?${params.toString()}`);
    } catch {
      setStatus("error");
      setErrorMsg("Erro de rede. Tente novamente em alguns segundos.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 max-w-xl bg-r21-white border border-r21-gray-100 rounded-lg p-6 md:p-8 shadow-sm"
      noValidate
    >
      <Field label="Nome completo" htmlFor="nome">
        <input
          id="nome"
          type="text"
          required
          autoComplete="name"
          value={state.nome}
          onChange={(e) => update("nome", e.target.value)}
          className={inputCls}
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="E-mail" htmlFor="email">
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Telefone (com DDD)" htmlFor="telefone">
          <input
            id="telefone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(47) 9 0000-0000"
            value={state.telefone}
            onChange={(e) => update("telefone", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Meu objetivo é" htmlFor="objetivo">
        <select
          id="objetivo"
          value={state.objetivo}
          onChange={(e) => update("objetivo", e.target.value as LeadInput["objetivo"])}
          className={inputCls}
        >
          {(Object.entries(OBJETIVO_LABELS) as [LeadInput["objetivo"], string][]).map(
            ([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ),
          )}
        </select>
      </Field>

      <Field label="Capital disponível para investir" htmlFor="faixaCapital">
        <select
          id="faixaCapital"
          value={state.faixaCapital}
          onChange={(e) =>
            update("faixaCapital", e.target.value as LeadInput["faixaCapital"])
          }
          className={inputCls}
        >
          {(
            Object.entries(FAIXA_CAPITAL_LABELS) as [
              LeadInput["faixaCapital"],
              string,
            ][]
          ).map(([v, label]) => (
            <option key={v} value={v}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Quando pretendo investir" htmlFor="horizonte">
        <select
          id="horizonte"
          value={state.horizonte}
          onChange={(e) =>
            update("horizonte", e.target.value as LeadInput["horizonte"])
          }
          className={inputCls}
        >
          {(
            Object.entries(HORIZONTE_LABELS) as [
              LeadInput["horizonte"],
              string,
            ][]
          ).map(([v, label]) => (
            <option key={v} value={v}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      {status === "error" && errorMsg && (
        <p className="text-sm text-r21-red-dark">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center px-6 py-3 rounded-md bg-r21-red text-r21-white font-medium hover:bg-r21-red-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Enviando…" : "Receber o guia agora"}
      </button>

      <p className="text-xs text-r21-gray-500 leading-relaxed">
        Ao enviar, você concorda em receber o guia e materiais relacionados da R21.
        Não compartilhamos seus dados.
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-md border border-r21-gray-200 bg-r21-white px-3 py-2.5 text-r21-black focus:outline-none focus:border-r21-red focus:ring-2 focus:ring-r21-red-50 transition";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-r21-gray-800 mb-1.5"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
