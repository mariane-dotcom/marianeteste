import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  obterGastoTrafego,
  obterMetricas,
  salvarGastoTrafego,
  type Periodo,
} from "@/lib/metricas";
import { ADMIN_COOKIE, requireAdminOrRedirect } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ periodo?: string }>;
};

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const PCT = (n: number) => `${(n * 100).toFixed(1)}%`;

function normalizar(p: string | undefined): Periodo {
  if (p === "7d" || p === "all") return p;
  return "30d";
}

async function salvarGasto(formData: FormData) {
  "use server";
  const periodo = normalizar(String(formData.get("periodo") || "30d"));
  const raw = String(formData.get("gasto") || "0").replace(/[^\d.,]/g, "");
  const valor = Number(raw.replace(/\./g, "").replace(",", "."));
  await salvarGastoTrafego(periodo, Number.isFinite(valor) ? valor : 0);
  redirect(`/admin?periodo=${periodo}`);
}

async function logout() {
  "use server";
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export default async function AdminPage({ searchParams }: Props) {
  await requireAdminOrRedirect();
  const { periodo: pRaw } = await searchParams;
  const periodo = normalizar(pRaw);
  const gasto = await obterGastoTrafego(periodo);
  const m = await obterMetricas({ periodo, gastoTrafego: gasto });

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-r21-gray-100 pb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-r21-red font-medium">
            Admin R21 · Funil
          </p>
          <h1 className="mt-2 text-3xl font-medium text-r21-black">
            Dashboard de conversão
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <PeriodoSwitch atual={periodo} />
          <form action={logout}>
            <button className="text-sm text-r21-gray-500 hover:text-r21-red">
              Sair
            </button>
          </form>
        </div>
      </header>

      <div className="mt-8 grid md:grid-cols-4 gap-4">
        <Kpi label="Leads" value={String(m.totalLeads)} />
        <Kpi
          label="Classe A"
          value={String(m.porClassificacao.A)}
          sub={`${PCT(m.totalLeads ? m.porClassificacao.A / m.totalLeads : 0)} dos leads`}
        />
        <Kpi
          label="Fechou"
          value={String(m.funil.fechou)}
          sub={`Taxa ${PCT(m.funil.taxaFechamento)}`}
          accent
        />
        <Kpi
          label="Custo por lead"
          value={m.totalLeads ? BRL.format(Math.round(m.custoPorLead.cpl)) : "—"}
          sub={
            m.funil.fechou
              ? `CPA ${BRL.format(Math.round(m.custoPorLead.cpa))}`
              : "Sem fechamentos no período"
          }
        />
      </div>

      <section className="mt-10 grid md:grid-cols-2 gap-6">
        <Painel titulo="Distribuição por classificação">
          <BarrasClassif
            a={m.porClassificacao.A}
            b={m.porClassificacao.B}
            c={m.porClassificacao.C}
          />
        </Painel>
        <Painel titulo="Gasto de mídia (input manual)">
          <form action={salvarGasto} className="space-y-3">
            <input type="hidden" name="periodo" value={periodo} />
            <label className="block text-sm text-r21-gray-600">
              Gasto total no período ({periodo === "7d" ? "7 dias" : periodo === "30d" ? "30 dias" : "todo o histórico"})
            </label>
            <div className="flex items-center gap-2">
              <span className="text-r21-gray-500">R$</span>
              <input
                name="gasto"
                defaultValue={gasto ? gasto.toFixed(0) : ""}
                placeholder="0"
                className="flex-1 rounded-md border border-r21-gray-200 bg-r21-white px-3 py-2 focus:outline-none focus:border-r21-red focus:ring-2 focus:ring-r21-red-50"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-r21-black text-r21-white text-sm hover:bg-r21-gray-800"
              >
                Salvar
              </button>
            </div>
            <p className="text-xs text-r21-gray-500">
              CPL e CPA recalculados em tempo real com base nos leads do período.
            </p>
          </form>
        </Painel>
      </section>

      <Painel titulo="Origem (UTM source)" className="mt-6">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-r21-gray-500">
            <tr>
              <th className="py-2">Fonte</th>
              <th className="py-2 text-right">Leads</th>
              <th className="py-2 text-right">Fechou</th>
              <th className="py-2 text-right">Taxa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-r21-gray-100">
            {m.porFonte.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-r21-gray-500">
                  Sem dados no período.
                </td>
              </tr>
            )}
            {m.porFonte.map((f) => (
              <tr key={f.source}>
                <td className="py-2.5 text-r21-gray-800">{f.source}</td>
                <td className="py-2.5 text-right">{f.total}</td>
                <td className="py-2.5 text-right">{f.fechou}</td>
                <td className="py-2.5 text-right text-r21-gray-500">
                  {f.total ? PCT(f.fechou / f.total) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Painel>

      <Painel titulo="Últimas submissões" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-r21-gray-500">
              <tr>
                <th className="py-2">Lead</th>
                <th className="py-2">Classe</th>
                <th className="py-2">Score</th>
                <th className="py-2">Status</th>
                <th className="py-2">Origem</th>
                <th className="py-2">Quando</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-r21-gray-100">
              {m.ultimosLeads.map((l) => (
                <tr key={l.id}>
                  <td className="py-2.5">
                    <div className="font-medium text-r21-black">{l.nome}</div>
                    <div className="text-xs text-r21-gray-500">{l.email}</div>
                  </td>
                  <td className="py-2.5">
                    <ClassBadge classif={l.classificacao} />
                  </td>
                  <td className="py-2.5 text-r21-gray-800">{l.score}</td>
                  <td className="py-2.5 text-r21-gray-700">
                    {labelStatus(l.statusFinal)}
                  </td>
                  <td className="py-2.5 text-r21-gray-700">
                    {l.utmSource || l.origem || "direto"}
                  </td>
                  <td className="py-2.5 text-r21-gray-500 text-xs">
                    {new Date(l.createdAt).toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Painel>

      <section className="mt-6 rounded-lg border border-r21-gray-100 p-6 bg-r21-off-white">
        <h2 className="text-lg font-medium text-r21-black">
          Lookalike Meta — compradores reais
        </h2>
        <p className="mt-2 text-sm text-r21-gray-600">
          Exporte o CSV no formato Custom Audience do Meta com todos os leads
          marcados como <strong>fechou</strong>. Use isso como público-semente
          (público similar / lookalike) na configuração da próxima campanha.
        </p>
        <div className="mt-4 flex gap-3 items-center">
          <Link
            href="/api/admin/export/fechou.csv"
            className="inline-flex items-center px-4 py-2 rounded-md bg-r21-red text-r21-white text-sm font-medium hover:bg-r21-red-dark"
          >
            Baixar fechou.csv
          </Link>
          <span className="text-xs text-r21-gray-500">
            {m.porStatusFinal.fechou} contatos no período.
          </span>
        </div>
      </section>
    </section>
  );
}

function Kpi({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-5 border ${
        accent
          ? "bg-r21-red-50 border-r21-red-100"
          : "bg-r21-white border-r21-gray-100"
      }`}
    >
      <div
        className={`text-xs uppercase tracking-widest font-medium ${
          accent ? "text-r21-red-dark" : "text-r21-gray-500"
        }`}
      >
        {label}
      </div>
      <div
        className={`mt-1 text-3xl font-medium ${
          accent ? "text-r21-red-deep" : "text-r21-black"
        }`}
      >
        {value}
      </div>
      {sub && (
        <div
          className={`mt-1 text-xs ${
            accent ? "text-r21-red-dark" : "text-r21-gray-500"
          }`}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function Painel({
  titulo,
  className,
  children,
}: {
  titulo: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border border-r21-gray-100 bg-r21-white p-5 md:p-6 ${className || ""}`}
    >
      <h2 className="text-sm uppercase tracking-widest font-medium text-r21-gray-500">
        {titulo}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function BarrasClassif({ a, b, c }: { a: number; b: number; c: number }) {
  const total = Math.max(1, a + b + c);
  const rows: [string, number, string][] = [
    ["A · quente", a, "bg-r21-red"],
    ["B · morno", b, "bg-r21-red-200"],
    ["C · frio", c, "bg-r21-gray-300"],
  ];
  return (
    <div className="space-y-3">
      {rows.map(([label, val, color]) => (
        <div key={label}>
          <div className="flex justify-between text-xs text-r21-gray-600">
            <span>{label}</span>
            <span>{val}</span>
          </div>
          <div className="mt-1 h-2 bg-r21-off-white rounded-full overflow-hidden">
            <div
              className={`h-full ${color}`}
              style={{ width: `${(val / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ClassBadge({ classif }: { classif: string }) {
  const cls =
    classif === "A"
      ? "bg-r21-red text-r21-white"
      : classif === "B"
        ? "bg-r21-red-100 text-r21-red-deep"
        : "bg-r21-gray-100 text-r21-gray-800";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}
    >
      {classif}
    </span>
  );
}

function labelStatus(s: string): string {
  if (s === "fechou") return "Fechou";
  if (s === "perdeu") return "Perdeu";
  return "Em andamento";
}

function PeriodoSwitch({ atual }: { atual: Periodo }) {
  const opts: Periodo[] = ["7d", "30d", "all"];
  const labels: Record<Periodo, string> = {
    "7d": "7 dias",
    "30d": "30 dias",
    all: "Tudo",
  };
  return (
    <div className="inline-flex rounded-md border border-r21-gray-200 bg-r21-white text-sm overflow-hidden">
      {opts.map((o) => (
        <Link
          key={o}
          href={`/admin?periodo=${o}`}
          className={`px-3 py-1.5 ${
            atual === o
              ? "bg-r21-black text-r21-white"
              : "text-r21-gray-600 hover:bg-r21-off-white"
          }`}
        >
          {labels[o]}
        </Link>
      ))}
    </div>
  );
}
