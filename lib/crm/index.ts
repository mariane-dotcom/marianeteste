import { prisma } from "@/lib/db";
import { STAGE_BY_CLASSIFICACAO, type CrmAdapter } from "./types";
import { consoleAdapter } from "./console";
import { rdStationAdapter } from "./rd-station";
import type { LeadInput } from "@/lib/lead-schema";
import type { Classificacao } from "@/lib/scoring";

function pickAdapter(): CrmAdapter {
  const provider = (process.env.CRM_PROVIDER || "console").toLowerCase();
  switch (provider) {
    case "rd-station":
    case "rdstation":
    case "rd":
      return rdStationAdapter;
    case "console":
    default:
      return consoleAdapter;
  }
}

/**
 * Roteia o lead para o CRM configurado. Reaproveita o crmContactId
 * de leads anteriores com o mesmo e-mail (idempotência por contato).
 * Persiste o ID retornado no lead atual para que próximas submissões
 * pulem para um update.
 */
export async function rotearParaCrm(args: {
  leadId: string;
  lead: LeadInput;
  score: number;
  classificacao: Classificacao;
}): Promise<{
  ok: boolean;
  provider: string;
  contactId?: string;
  reason?: string;
}> {
  const adapter = pickAdapter();
  const stage = STAGE_BY_CLASSIFICACAO[args.classificacao];

  const existing = await prisma.lead.findFirst({
    where: {
      email: args.lead.email,
      crmContactId: { not: null },
      id: { not: args.leadId },
    },
    select: { crmContactId: true },
    orderBy: { createdAt: "desc" },
  });

  const result = await adapter.upsertLead({
    leadId: args.leadId,
    lead: args.lead,
    score: args.score,
    classificacao: args.classificacao,
    stage,
    existingContactId: existing?.crmContactId ?? null,
  });

  if (result.ok) {
    await prisma.lead.update({
      where: { id: args.leadId },
      data: {
        crmProvider: result.provider,
        crmContactId: result.contactId,
      },
    });
  }

  return result.ok
    ? { ok: true, provider: result.provider, contactId: result.contactId }
    : { ok: false, provider: result.provider, reason: result.reason };
}
