import type { LeadInput } from "@/lib/lead-schema";
import type { Classificacao } from "@/lib/scoring";

export type CrmStage =
  | "quente_contato_imediato"
  | "qualificacao"
  | "nutricao";

export const STAGE_BY_CLASSIFICACAO: Record<Classificacao, CrmStage> = {
  A: "quente_contato_imediato",
  B: "qualificacao",
  C: "nutricao",
};

export type CrmUpsertPayload = {
  leadId: string;
  lead: LeadInput;
  score: number;
  classificacao: Classificacao;
  stage: CrmStage;
  /** ID do contato já criado em uma submissão anterior, se houver. */
  existingContactId?: string | null;
};

export type CrmUpsertResult =
  | { ok: true; contactId: string; created: boolean; provider: string }
  | { ok: false; reason: string; provider: string };

export interface CrmAdapter {
  name: string;
  upsertLead(payload: CrmUpsertPayload): Promise<CrmUpsertResult>;
}
