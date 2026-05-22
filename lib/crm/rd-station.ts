import type { CrmAdapter, CrmStage, CrmUpsertPayload } from "./types";
import {
  FAIXA_CAPITAL_LABELS,
  HORIZONTE_LABELS,
  OBJETIVO_LABELS,
} from "@/lib/lead-schema";

/**
 * Adapter para o RD Station Marketing — endpoint Conversions API.
 * https://developers.rdstation.com/reference/conversions-creation
 *
 * Usa identificador de conversão por estágio (event_identifier).
 * Para vincular leads ao funil correto no RD Station, configure
 * conversões no RD com os mesmos event_identifier abaixo.
 */
const EVENT_IDENTIFIER_BY_STAGE: Record<CrmStage, string> = {
  quente_contato_imediato: "r21-lead-quente",
  qualificacao: "r21-lead-qualificacao",
  nutricao: "r21-lead-nutricao",
};

function buildPayload(p: CrmUpsertPayload) {
  const ip = undefined;
  return {
    event_type: "CONVERSION",
    event_family: "CDP",
    payload: {
      conversion_identifier: EVENT_IDENTIFIER_BY_STAGE[p.stage],
      name: p.lead.nome,
      email: p.lead.email,
      mobile_phone: p.lead.telefone,
      tags: ["r21-captacao", `classe-${p.classificacao}`],
      cf_origem: p.lead.origem || p.lead.utmSource || "direto",
      cf_objetivo: OBJETIVO_LABELS[p.lead.objetivo],
      cf_faixa_capital: FAIXA_CAPITAL_LABELS[p.lead.faixaCapital],
      cf_horizonte: HORIZONTE_LABELS[p.lead.horizonte],
      cf_lead_score: p.score,
      cf_lead_id: p.leadId,
      utm_source: p.lead.utmSource,
      utm_medium: p.lead.utmMedium,
      utm_campaign: p.lead.utmCampaign,
      utm_term: p.lead.utmTerm,
      utm_content: p.lead.utmContent,
      client_tracking_id: ip,
    },
  };
}

export const rdStationAdapter: CrmAdapter = {
  name: "rd-station",
  async upsertLead(payload) {
    const token = process.env.CRM_RD_STATION_TOKEN;
    if (!token) {
      return {
        ok: false,
        reason: "CRM_RD_STATION_TOKEN ausente",
        provider: "rd-station",
      };
    }

    try {
      const res = await fetch(
        "https://api.rd.services/platform/conversions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(buildPayload(payload)),
        },
      );

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        return {
          ok: false,
          reason: `HTTP ${res.status}: ${text.slice(0, 240)}`,
          provider: "rd-station",
        };
      }

      const data = (await res.json().catch(() => ({}))) as {
        event_uuid?: string;
        contact?: { uuid?: string };
      };
      const contactId =
        data.contact?.uuid || data.event_uuid || payload.lead.email;
      return {
        ok: true,
        contactId,
        created: !payload.existingContactId,
        provider: "rd-station",
      };
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      return { ok: false, reason, provider: "rd-station" };
    }
  },
};
