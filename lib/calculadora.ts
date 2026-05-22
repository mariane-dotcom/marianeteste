import { CALC } from "@/config/calc";
import type { FaixaCapital, Horizonte } from "@/lib/lead-schema";

export type CalcInput = {
  capitalDisponivel: number;
  horizonteAnos: number;
};

export type SerieAno = {
  ano: number;
  tradicional: number;
  precoCusto: number;
};

export type CalcResultado = {
  cenarioTradicional: number;
  cenarioPrecoCusto: number;
  diferencaPatrimonio: number;
  multiplicadorPoderCompra: number;
  serie: SerieAno[];
};

export function calcularCenarios(input: CalcInput): CalcResultado {
  const r = CALC.valorizacaoAnualBC;
  const desc = CALC.descontoPrecoCusto;
  const multiplicador = 1 / (1 - desc);

  const serie: SerieAno[] = [];
  for (let ano = 0; ano <= input.horizonteAnos; ano++) {
    const fator = Math.pow(1 + r, ano);
    serie.push({
      ano,
      tradicional: input.capitalDisponivel * fator,
      precoCusto: input.capitalDisponivel * multiplicador * fator,
    });
  }

  const final = serie[serie.length - 1];
  return {
    cenarioTradicional: final.tradicional,
    cenarioPrecoCusto: final.precoCusto,
    diferencaPatrimonio: final.precoCusto - final.tradicional,
    multiplicadorPoderCompra: multiplicador,
    serie,
  };
}

/**
 * Mapeia o valor de capital digitado para a faixa enum usada pelo /api/lead.
 * Mantemos os mesmos limiares do formulário qualificador da Fase 2.
 */
export function capitalParaFaixa(capital: number): FaixaCapital {
  if (capital >= 1_500_000) return "acima_1_5M";
  if (capital >= 700_000) return "de_700k_1_5M";
  if (capital >= 300_000) return "de_300k_700k";
  return "ate_300k";
}

/**
 * Mapeia o horizonte em anos para o enum de horizonte do /api/lead.
 */
export function horizonteAnosParaEnum(anos: number): Horizonte {
  if (anos <= 1) return "ate_12m";
  if (anos <= 3) return "de_12m_36m";
  return "acima_36m";
}

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function formatarBRL(valor: number): string {
  return BRL.format(Math.round(valor));
}
