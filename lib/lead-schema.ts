import { z } from "zod";

export const ObjetivoEnum = z.enum(["morar", "investir", "ambos"]);
export const FaixaCapitalEnum = z.enum([
  "ate_300k",
  "de_300k_700k",
  "de_700k_1_5M",
  "acima_1_5M",
]);
export const HorizonteEnum = z.enum([
  "ate_12m",
  "de_12m_36m",
  "acima_36m",
]);

export const LeadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo"),
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  telefone: z
    .string()
    .trim()
    .min(10, "Informe um telefone com DDD"),
  objetivo: ObjetivoEnum,
  faixaCapital: FaixaCapitalEnum,
  horizonte: HorizonteEnum,
  origem: z.string().max(120).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
  utmTerm: z.string().max(120).optional(),
  utmContent: z.string().max(120).optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;
export type Objetivo = z.infer<typeof ObjetivoEnum>;
export type FaixaCapital = z.infer<typeof FaixaCapitalEnum>;
export type Horizonte = z.infer<typeof HorizonteEnum>;

export const FAIXA_CAPITAL_LABELS: Record<FaixaCapital, string> = {
  ate_300k: "Até R$ 300 mil",
  de_300k_700k: "R$ 300 mil a R$ 700 mil",
  de_700k_1_5M: "R$ 700 mil a R$ 1,5 milhão",
  acima_1_5M: "Acima de R$ 1,5 milhão",
};

export const OBJETIVO_LABELS: Record<Objetivo, string> = {
  investir: "Investir (locação ou revenda)",
  ambos: "Investir e morar",
  morar: "Morar",
};

export const HORIZONTE_LABELS: Record<Horizonte, string> = {
  ate_12m: "Nos próximos 12 meses",
  de_12m_36m: "Entre 12 e 36 meses",
  acima_36m: "Acima de 36 meses",
};
