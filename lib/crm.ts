import type { Lead } from "@prisma/client";

/**
 * Adapter de CRM. Hoje suporta dois modos:
 *  - "webhook": dispara POST para CRM_WEBHOOK_URL com o lead inteiro (funciona com Zapier, Make,
 *    n8n, ou qualquer endpoint custom de RD Station / HubSpot / Pipedrive)
 *  - "noop": grava apenas no Postgres (default)
 *
 * Quando você decidir o CRM final, implementar aqui (ou trocar a URL do webhook).
 */

const modo = (process.env.CRM_MODE ?? "noop") as "webhook" | "noop";
const webhookUrl = process.env.CRM_WEBHOOK_URL;
const webhookSecret = process.env.CRM_WEBHOOK_SECRET;

export async function syncLeadParaCRM(lead: Lead): Promise<{ ok: boolean; mode: string; detail?: string }> {
  if (modo === "noop") return { ok: true, mode: "noop" };

  if (modo === "webhook") {
    if (!webhookUrl) {
      console.warn("[crm] CRM_MODE=webhook mas CRM_WEBHOOK_URL ausente.");
      return { ok: false, mode: "webhook", detail: "CRM_WEBHOOK_URL ausente" };
    }
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(webhookSecret ? { "x-r21-secret": webhookSecret } : {}),
        },
        body: JSON.stringify({
          event: "lead.created",
          lead: {
            id: lead.id,
            nome: lead.nome,
            email: lead.email,
            telefone: lead.telefone,
            score: lead.score,
            objetivo: lead.objetivo,
            capital: lead.capital,
            horizonte: lead.horizonte,
            origem: lead.origem,
            utmSource: lead.utmSource,
            utmMedium: lead.utmMedium,
            utmCampaign: lead.utmCampaign,
            observacao: lead.observacao,
            createdAt: lead.createdAt.toISOString(),
          },
        }),
      });
      return { ok: res.ok, mode: "webhook", detail: `status=${res.status}` };
    } catch (e) {
      return { ok: false, mode: "webhook", detail: e instanceof Error ? e.message : "erro" };
    }
  }

  return { ok: false, mode: modo };
}
