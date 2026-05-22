import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed, logout } from "@/lib/admin-auth";
import { carregarMetricas } from "@/lib/metricas";
import { faixasCapitalLabel, horizonteLabel, objetivoLabel } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Dashboard de captação",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  const m = await carregarMetricas();

  async function sair() {
    "use server";
    await logout();
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-r21-paper">
      <header className="bg-r21-black text-r21-white">
        <div className="container-r21 py-5 flex items-center justify-between">
          <div>
            <p className="eyebrow !text-r21-red">Painel R21</p>
            <h1 className="font-display text-xl font-bold tracking-tightest">Dashboard de captação</h1>
          </div>
          <form action={sair}>
            <button className="text-sm text-r21-fog hover:text-r21-white underline">Sair</button>
          </form>
        </div>
      </header>

      <section className="container-r21 py-10 space-y-10">
        <div className="grid gap-px bg-r21-fog md:grid-cols-5">
          <Stat label="Leads totais" valor={m.total} />
          <Stat label="Últimos 30 dias" valor={m.ultimos30d} />
          <Stat label="Últimos 7 dias" valor={m.ultimos7d} />
          <Stat label="Leads A (prioritários)" valor={m.scoreCounts.A} destaque />
          <Stat label="Taxa de A sobre total" valor={`${m.taxaA.toFixed(1)}%`} destaque />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card titulo="Distribuição por score">
            <BarRow label="A — Prioridade" total={m.scoreCounts.A} max={m.total} cor="bg-r21-red" />
            <BarRow label="B — Nutrição" total={m.scoreCounts.B} max={m.total} cor="bg-r21-graphite" />
            <BarRow label="C — Exploratório" total={m.scoreCounts.C} max={m.total} cor="bg-r21-fog" />
          </Card>

          <Card titulo="Origem">
            {m.porOrigem.length === 0 ? <Vazio /> : m.porOrigem.slice(0, 8).map((r) => (
              <BarRow key={r.origem} label={r.origem} total={r.total} max={m.total} cor="bg-r21-black" />
            ))}
          </Card>

          <Card titulo="UTM source">
            {m.porUtm.length === 0 ? <Vazio /> : m.porUtm.slice(0, 8).map((r) => (
              <BarRow key={r.utm} label={r.utm} total={r.total} max={m.total} cor="bg-r21-black" />
            ))}
          </Card>
        </div>

        <Card titulo={`Últimos ${m.ultimos.length} leads`} largura="full">
          {m.ultimos.length === 0 ? (
            <Vazio />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wider text-r21-stone">
                  <tr className="border-b border-r21-fog">
                    <th className="py-2 pr-4">Data</th>
                    <th className="py-2 pr-4">Score</th>
                    <th className="py-2 pr-4">Nome</th>
                    <th className="py-2 pr-4">Contato</th>
                    <th className="py-2 pr-4">Objetivo</th>
                    <th className="py-2 pr-4">Capital</th>
                    <th className="py-2 pr-4">Horizonte</th>
                    <th className="py-2 pr-4">Origem</th>
                  </tr>
                </thead>
                <tbody>
                  {m.ultimos.map((l) => (
                    <tr key={l.id} className="border-b border-r21-fog">
                      <td className="py-2 pr-4 whitespace-nowrap text-r21-stone">{l.createdAt.toLocaleString("pt-BR")}</td>
                      <td className="py-2 pr-4">
                        <ScoreTag s={l.score} />
                      </td>
                      <td className="py-2 pr-4 font-medium text-r21-black">{l.nome}</td>
                      <td className="py-2 pr-4 text-r21-graphite">
                        <div>{l.email}</div>
                        <div className="text-xs text-r21-stone">{l.telefone}</div>
                      </td>
                      <td className="py-2 pr-4 text-r21-graphite">{objetivoLabel[l.objetivo]}</td>
                      <td className="py-2 pr-4 text-r21-graphite">{faixasCapitalLabel[l.capital]}</td>
                      <td className="py-2 pr-4 text-r21-graphite">{horizonteLabel[l.horizonte]}</td>
                      <td className="py-2 pr-4 text-r21-stone">{l.origem ?? l.utmSource ?? "direto"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>
    </main>
  );
}

function Stat({ label, valor, destaque }: { label: string; valor: number | string; destaque?: boolean }) {
  return (
    <div className="bg-r21-white p-5">
      <p className="text-xs uppercase tracking-wider text-r21-stone">{label}</p>
      <p className={`font-display text-3xl font-bold tracking-tightest mt-1 ${destaque ? "text-r21-red" : "text-r21-black"}`}>
        {valor}
      </p>
    </div>
  );
}

function Card({ titulo, children, largura }: { titulo: string; children: React.ReactNode; largura?: "full" }) {
  return (
    <section className={`bg-r21-white border border-r21-fog p-6 ${largura === "full" ? "md:col-span-3" : ""}`}>
      <h2 className="text-sm uppercase tracking-wider text-r21-stone mb-4">{titulo}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function BarRow({ label, total, max, cor }: { label: string; total: number; max: number; cor: string }) {
  const pct = max === 0 ? 0 : (total / max) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-r21-graphite truncate max-w-[70%]">{label}</span>
        <span className="text-r21-black font-medium">{total}</span>
      </div>
      <div className="h-2 bg-r21-paper">
        <div className={`h-full ${cor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ScoreTag({ s }: { s: "A" | "B" | "C" }) {
  const map = {
    A: "bg-r21-red text-r21-white",
    B: "bg-r21-graphite text-r21-white",
    C: "bg-r21-fog text-r21-ink",
  };
  return <span className={`inline-block px-2 py-0.5 text-xs font-bold ${map[s]}`}>{s}</span>;
}

function Vazio() {
  return <p className="text-sm text-r21-stone italic">Sem dados ainda.</p>;
}
