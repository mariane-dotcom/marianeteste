import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LeadSchema } from "@/lib/lead-schema";
import { calcularScore, classificar } from "@/lib/scoring";
import { signLeadToken } from "@/lib/lead-token";
import { enviarGuiaParaLead, notificarLeadQuente } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Payload inválido (JSON malformado)." },
      { status: 400 },
    );
  }

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Dados inválidos.",
        issues: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const score = calcularScore(input);
  const classificacao = classificar(score);
  const userAgent = req.headers.get("user-agent") || undefined;

  const lead = await prisma.lead.create({
    data: {
      nome: input.nome,
      email: input.email,
      telefone: input.telefone,
      objetivo: input.objetivo,
      faixaCapital: input.faixaCapital,
      horizonte: input.horizonte,
      score,
      classificacao,
      origem: input.origem,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      utmTerm: input.utmTerm,
      utmContent: input.utmContent,
      userAgent,
    },
    select: { id: true },
  });

  let token: string | null = null;
  try {
    token = signLeadToken(lead.id);
  } catch (err) {
    console.error("token sign failed", err);
  }

  // Disparos de e-mail acontecem em background — não bloqueiam a resposta.
  if (token) {
    void enviarGuiaParaLead({
      leadId: lead.id,
      nome: input.nome,
      email: input.email,
      token,
    }).catch((err) => console.error("envio guia falhou", err));
  }

  if (classificacao === "A") {
    void notificarLeadQuente({
      leadId: lead.id,
      lead: input,
      score,
      classificacao,
    }).catch((err) => console.error("notificação A falhou", err));
  }

  return NextResponse.json(
    {
      leadId: lead.id,
      score,
      classificacao,
      token,
    },
    { status: 201 },
  );
}
