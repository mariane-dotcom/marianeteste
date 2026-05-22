import type { Objetivo, FaixaCapital, Horizonte, LeadScore } from "@prisma/client";

type ScoringInput = {
  objetivo: Objetivo;
  capital: FaixaCapital;
  horizonte: Horizonte;
};

const pesoCapital: Record<FaixaCapital, number> = {
  ATE_300K: 1,
  DE_300K_700K: 2,
  DE_700K_1_5M: 4,
  ACIMA_1_5M: 5,
};

const pesoObjetivo: Record<Objetivo, number> = {
  INVESTIR: 3,
  AMBOS: 3,
  MORAR: 2,
};

const pesoHorizonte: Record<Horizonte, number> = {
  ATE_12M: 4,
  DE_12_36M: 3,
  ACIMA_36M: 2,
  SEM_PRESSA: 1,
};

export function calcularScore(input: ScoringInput): LeadScore {
  const total =
    pesoCapital[input.capital] +
    pesoObjetivo[input.objetivo] +
    pesoHorizonte[input.horizonte];

  if (total >= 10) return "A";
  if (total >= 7) return "B";
  return "C";
}

export const faixasCapitalLabel: Record<FaixaCapital, string> = {
  ATE_300K: "Até R$ 300 mil",
  DE_300K_700K: "R$ 300 mil a R$ 700 mil",
  DE_700K_1_5M: "R$ 700 mil a R$ 1,5 milhão",
  ACIMA_1_5M: "Acima de R$ 1,5 milhão",
};

export const horizonteLabel: Record<Horizonte, string> = {
  ATE_12M: "Quero entrar nos próximos 12 meses",
  DE_12_36M: "Entre 1 e 3 anos",
  ACIMA_36M: "Acima de 3 anos",
  SEM_PRESSA: "Estou só explorando o mercado",
};

export const objetivoLabel: Record<Objetivo, string> = {
  MORAR: "Para morar",
  INVESTIR: "Para investir / valorização",
  AMBOS: "Os dois — morar e investir",
};
