/**
 * TODO MARIANE: ajustar com a sua tabela de referência real.
 * Todos os valores abaixo são ESTIMATIVAS conservadoras para Balneário Camboriú
 * em maio/2026. Substitua pelos números oficiais da R21 antes de subir a calculadora
 * para produção — qualquer projeção exibida ao investidor parte desses parâmetros.
 */
export const parametros = {
  // Preço médio por m² de imóvel novo a preço fechado em BC (alta padrão / centro)
  precoM2Mercado: 18000,

  // Preço médio por m² no regime de administração R21 (custo real + taxa de administração)
  // Calibrado para refletir a economia de até 35% citada no guia.
  precoM2Custo: 11700,

  // Valorização anual média histórica de imóveis prontos em BC (a.a.)
  valorizacaoAnualMercado: 0.10,

  // INCC médio anual estimado (corrige o custo da obra durante o cronograma)
  inccAnual: 0.08,

  // Prazo médio de obra (anos) — usado para a projeção até a entrega
  prazoObraAnos: 3,

  // Range de m² que a R21 entrega (afeta validações de "cabe no seu capital")
  metragemMin: 40,
  metragemMax: 280,
} as const;

export const economiaPercentual = Math.round(
  (1 - parametros.precoM2Custo / parametros.precoM2Mercado) * 100
);
