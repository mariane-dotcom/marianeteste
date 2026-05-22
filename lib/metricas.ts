import { prisma } from "@/lib/db";

export type Periodo = "7d" | "30d" | "all";

function start(periodo: Periodo): Date | null {
  if (periodo === "all") return null;
  const dias = periodo === "7d" ? 7 : 30;
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - dias);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export type Metricas = {
  periodo: Periodo;
  totalLeads: number;
  porClassificacao: { A: number; B: number; C: number };
  porStatusFinal: { em_andamento: number; fechou: number; perdeu: number };
  porFonte: { source: string; total: number; fechou: number }[];
  funil: {
    submissoes: number;
    classeA: number;
    fechou: number;
    perdeu: number;
    taxaFechamento: number;
  };
  custoPorLead: {
    gastoTrafego: number;
    cpl: number;
    cpa: number;
  };
  ultimosLeads: {
    id: string;
    nome: string;
    email: string;
    classificacao: string;
    score: number;
    statusFinal: string;
    origem: string | null;
    utmSource: string | null;
    createdAt: Date;
  }[];
};

export async function obterMetricas(args: {
  periodo: Periodo;
  gastoTrafego: number;
}): Promise<Metricas> {
  const since = start(args.periodo);
  const where = since ? { createdAt: { gte: since } } : {};

  const [
    totalLeads,
    porClassRaw,
    porStatusRaw,
    porFonteRaw,
    fonteFechouRaw,
    ultimos,
  ] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.groupBy({
      by: ["classificacao"],
      where,
      _count: { _all: true },
    }),
    prisma.lead.groupBy({
      by: ["statusFinal"],
      where,
      _count: { _all: true },
    }),
    prisma.lead.groupBy({
      by: ["utmSource"],
      where,
      _count: { _all: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.lead.groupBy({
      by: ["utmSource"],
      where: { ...where, statusFinal: "fechou" },
      _count: { _all: true },
    }),
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 15,
      select: {
        id: true,
        nome: true,
        email: true,
        classificacao: true,
        score: true,
        statusFinal: true,
        origem: true,
        utmSource: true,
        createdAt: true,
      },
    }),
  ]);

  const porClassificacao = { A: 0, B: 0, C: 0 };
  for (const r of porClassRaw) {
    porClassificacao[r.classificacao] = r._count._all;
  }
  const porStatusFinal = { em_andamento: 0, fechou: 0, perdeu: 0 };
  for (const r of porStatusRaw) {
    porStatusFinal[r.statusFinal] = r._count._all;
  }
  const fechouPorFonte = new Map<string | null, number>();
  for (const r of fonteFechouRaw) {
    fechouPorFonte.set(r.utmSource, r._count._all);
  }
  const porFonte = porFonteRaw.map((r) => ({
    source: r.utmSource || "direto",
    total: r._count._all,
    fechou: fechouPorFonte.get(r.utmSource) || 0,
  }));

  const fechou = porStatusFinal.fechou;
  const perdeu = porStatusFinal.perdeu;
  const taxaFechamento = totalLeads ? fechou / totalLeads : 0;
  const cpl = totalLeads ? args.gastoTrafego / totalLeads : 0;
  const cpa = fechou ? args.gastoTrafego / fechou : 0;

  return {
    periodo: args.periodo,
    totalLeads,
    porClassificacao,
    porStatusFinal,
    porFonte,
    funil: {
      submissoes: totalLeads,
      classeA: porClassificacao.A,
      fechou,
      perdeu,
      taxaFechamento,
    },
    custoPorLead: {
      gastoTrafego: args.gastoTrafego,
      cpl,
      cpa,
    },
    ultimosLeads: ultimos.map((l) => ({
      ...l,
      statusFinal: l.statusFinal,
      classificacao: l.classificacao,
    })),
  };
}

export async function obterGastoTrafego(periodo: Periodo): Promise<number> {
  const row = await prisma.adminSetting.findUnique({
    where: { key: `gasto_${periodo}` },
  });
  return row ? Number(row.value) || 0 : 0;
}

export async function salvarGastoTrafego(
  periodo: Periodo,
  valor: number,
): Promise<void> {
  await prisma.adminSetting.upsert({
    where: { key: `gasto_${periodo}` },
    create: { key: `gasto_${periodo}`, value: String(valor) },
    update: { value: String(valor) },
  });
}
