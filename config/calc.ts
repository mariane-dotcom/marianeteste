/**
 * Parâmetros da Calculadora de Valorização — Fase 3.
 *
 * Estes números são placeholders conservadores. Validar com o financeiro da R21
 * antes de divulgar publicamente. Toda alteração deve ser refletida no
 * disclaimer da página /calculadora.
 */
export const CALC = {
  /**
   * Desconto médio do preço de custo em relação ao mesmo padrão construtivo
   * vendido no mercado tradicional. A spec menciona "até 35%"; usamos um
   * piso conservador para não superestimar.
   */
  descontoPrecoCusto: 0.3,

  /**
   * Valorização anual média de imóveis em Balneário Camboriú/SC.
   * Histórico recente do bairro central tem variado em torno desse patamar
   * em ciclos de alta — validar com dados do CRECI/Secovi-SC.
   */
  valorizacaoAnualBC: 0.12,

  /** Bounds e defaults para os inputs do usuário. */
  capital: {
    min: 100_000,
    max: 5_000_000,
    step: 50_000,
    default: 1_000_000,
  },
  horizonteAnos: {
    min: 1,
    max: 10,
    step: 1,
    default: 5,
  },
} as const;
