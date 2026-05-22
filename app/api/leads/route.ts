import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { calcularScore, faixasCapitalLabel, horizonteLabel, objetivoLabel } from "@/lib/scoring";
import { enviarGuiaPorEmail, notificarLeadAlta } from "@/lib/email";

const schema = z.object({
  nome: z.string().min(2).max(120),
  email: z.string().email(),
  telefone: z.string().min(8).max(40),
  objetivo: z.enum(["MORAR", "INVESTIR", "AMBOS"]),
  capital: z.enum(["ATE_300K", "DE_300K_700K", "DE_700K_1_5M", "ACIMA_1_5M"]),
  horizonte: z.enum(["ATE_12M", "DE_12_36M", "ACIMA_36M", "SEM_PRESSA"]),
  observacao: z.string().max(2000).optional(),
  origem: z.string().max(120).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados incompletos.", detail: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const score = calcularScore({
    objetivo: data.objetivo,
    capital: data.capital,
    horizonte: data.horizonte,
  });

  const lead = await prisma.lead.create({
    data: { ...data, score },
  });

  const resumo = `${objetivoLabel[data.objetivo]} · ${faixasCapitalLabel[data.capital]} · ${horizonteLabel[data.horizonte]}`;

  await Promise.allSettled([
    enviarGuiaPorEmail({ nome: data.nome, email: data.email }),
    score === "A"
      ? notificarLeadAlta({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          score,
          resumo,
        })
      : Promise.resolve(),
  ]);

  return NextResponse.json({ ok: true, id: lead.id, score });
}
