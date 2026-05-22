import { parametros } from "./parametros-mercado";

export type SimulacaoInput = {
  capital: number;
  horizonteAnos: number;
};

export type SimulacaoResultado = {
  metragemCustoReal: number;
  custoTotalCustoReal: number;
  precoMercadoEquivalente: number;
  economiaAbsoluta: number;
  economiaPercentual: number;

  // Projeção de valor na entrega
  valorMercadoNaEntrega: number;
  ganhoPatrimonialNaEntrega: number;

  // Projeção de valorização pós-entrega
  valorMercadoNoHorizonte: number;
  ganhoPatrimonialNoHorizonte: number;
  multiploSobreCapital: number;

  // Aporte mensal estimado (linear, simplificação)
  aporteMensalMedio: number;
};

export function simular({ capital, horizonteAnos }: SimulacaoInput): SimulacaoResultado {
  const {
    precoM2Mercado, precoM2Custo, valorizacaoAnualMercado, inccAnual, prazoObraAnos,
  } = parametros;

  const metragemCustoReal = capital / precoM2Custo;
  const custoTotalCustoReal = metragemCustoReal * precoM2Custo;
  const precoMercadoEquivalente = metragemCustoReal * precoM2Mercado;
  const economiaAbsoluta = precoMercadoEquivalente - custoTotalCustoReal;
  const economiaPct = (1 - precoM2Custo / precoM2Mercado) * 100;

  const anosAteEntrega = Math.min(prazoObraAnos, Math.max(1, horizonteAnos));
  const valorMercadoNaEntrega = precoMercadoEquivalente * Math.pow(1 + valorizacaoAnualMercado, anosAteEntrega);
  const custoCorrigidoNaEntrega = custoTotalCustoReal * Math.pow(1 + inccAnual, anosAteEntrega);
  const ganhoPatrimonialNaEntrega = valorMercadoNaEntrega - custoCorrigidoNaEntrega;

  const anosPosEntrega = Math.max(0, horizonteAnos - prazoObraAnos);
  const valorMercadoNoHorizonte = valorMercadoNaEntrega * Math.pow(1 + valorizacaoAnualMercado, anosPosEntrega);
  const ganhoPatrimonialNoHorizonte = valorMercadoNoHorizonte - custoCorrigidoNaEntrega;
  const multiploSobreCapital = valorMercadoNoHorizonte / custoTotalCustoReal;

  const aporteMensalMedio = custoTotalCustoReal / (anosAteEntrega * 12);

  return {
    metragemCustoReal,
    custoTotalCustoReal,
    precoMercadoEquivalente,
    economiaAbsoluta,
    economiaPercentual: economiaPct,
    valorMercadoNaEntrega,
    ganhoPatrimonialNaEntrega,
    valorMercadoNoHorizonte,
    ganhoPatrimonialNoHorizonte,
    multiploSobreCapital,
    aporteMensalMedio,
  };
}

export function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export function formatNumero(v: number, casas = 0): string {
  return v.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

// Mapeia capital em reais para a faixa do enum (alimenta scoring direto da calculadora)
export function capitalToFaixa(capital: number): "ATE_300K" | "DE_300K_700K" | "DE_700K_1_5M" | "ACIMA_1_5M" {
  if (capital < 300_000) return "ATE_300K";
  if (capital < 700_000) return "DE_300K_700K";
  if (capital < 1_500_000) return "DE_700K_1_5M";
  return "ACIMA_1_5M";
}

export function horizonteToEnum(anos: number): "ATE_12M" | "DE_12_36M" | "ACIMA_36M" {
  if (anos <= 1) return "ATE_12M";
  if (anos <= 3) return "DE_12_36M";
  return "ACIMA_36M";
}
