import type { CrmAdapter } from "./types";

/**
 * Adapter de fallback usado quando CRM_PROVIDER não está configurado.
 * Não envia nada para fora; apenas registra um ID determinístico para
 * mantermos rastreabilidade em desenvolvimento.
 */
export const consoleAdapter: CrmAdapter = {
  name: "console",
  async upsertLead(payload) {
    const contactId = payload.existingContactId || `console_${payload.leadId}`;
    if (process.env.NODE_ENV !== "test") {
      console.log("[crm:console] upsert", {
        contactId,
        stage: payload.stage,
        score: payload.score,
        classificacao: payload.classificacao,
        email: payload.lead.email,
      });
    }
    return {
      ok: true,
      contactId,
      created: !payload.existingContactId,
      provider: "console",
    };
  },
};
