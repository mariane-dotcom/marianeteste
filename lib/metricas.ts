import { prisma } from "./db";
import type { LeadScore } from "@prisma/client";

export async function carregarMetricas() {
  const [total, porScore, porOrigem, porUtm, ultimos, ultimos7d, ultimos30d] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["score"], _count: { _all: true } }),
    prisma.lead.groupBy({ by: ["origem"], _count: { _all: true }, orderBy: { _count: { id: "desc" } } }),
    prisma.lead.groupBy({
      by: ["utmSource"],
      _count: { _all: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.lead.count({ where: { createdAt: { gte: diasAtras(7) } } }),
    prisma.lead.count({ where: { createdAt: { gte: diasAtras(30) } } }),
  ]);

  const scoreCounts: Record<LeadScore, number> = { A: 0, B: 0, C: 0 };
  for (const r of porScore) scoreCounts[r.score] = r._count._all;

  const taxaA = total === 0 ? 0 : (scoreCounts.A / total) * 100;

  return {
    total,
    ultimos7d,
    ultimos30d,
    scoreCounts,
    taxaA,
    porOrigem: porOrigem.map((r) => ({ origem: r.origem ?? "direto", total: r._count._all })),
    porUtm: porUtm.map((r) => ({ utm: r.utmSource ?? "direto", total: r._count._all })),
    ultimos,
  };
}

function diasAtras(d: number): Date {
  const x = new Date();
  x.setDate(x.getDate() - d);
  return x;
}
