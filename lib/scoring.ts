import type { LeadInput } from "./lead-schema";

const SCORE_OBJETIVO = {
  investir: 40,
  ambos: 25,
  morar: 5,
} as const;

const SCORE_FAIXA_CAPITAL = {
  acima_1_5M: 40,
  de_700k_1_5M: 30,
  de_300k_700k: 15,
  ate_300k: 0,
} as const;

const SCORE_HORIZONTE = {
  ate_12m: 20,
  de_12m_36m: 10,
  acima_36m: 5,
} as const;

export type Classificacao = "A" | "B" | "C";

export function calcularScore(
  input: Pick<LeadInput, "objetivo" | "faixaCapital" | "horizonte">,
): number {
  return (
    SCORE_OBJETIVO[input.objetivo] +
    SCORE_FAIXA_CAPITAL[input.faixaCapital] +
    SCORE_HORIZONTE[input.horizonte]
  );
}

export function classificar(score: number): Classificacao {
  if (score >= 70) return "A";
  if (score >= 40) return "B";
  return "C";
}
