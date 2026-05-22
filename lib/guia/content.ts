export type ChecklistItem = { id: string; pergunta: string };
export type Section = { id: string; titulo: string; paragrafos: string[] };

export const GUIA = {
  titulo: "Guia do Preço de Custo",
  subtitulo:
    "Como investidores conscientes ganham até 35% mais comprando o que outros temem entender.",
  autor: "R21 Construtora · Balneário Camboriú/SC",
  versao: "2025.1",

  abertura: {
    id: "abertura",
    titulo: "Por que o preço de custo assusta — e por que é onde o capital inteligente está",
    paragrafos: [
      "Quem nunca operou no modelo a preço de custo escuta sobre ele e recua. “Variação por INCC”, “estouro de orçamento”, “sem financiamento” — essas palavras soam como risco para o investidor desavisado. Mas elas são, na verdade, a descrição honesta do mecanismo que entrega imóveis até 35% mais baratos que o mercado tradicional.",
      "O investidor consciente não teme o que entende. O modelo a preço de custo (Lei 4.591/64) elimina a margem da incorporadora — o que sobra é exatamente o que você paga a mais quando compra na planta convencional. Este guia existe para te dar o vocabulário e a transparência necessários para decidir se este é o seu jogo.",
    ],
  } satisfies Section,

  comoFunciona: {
    id: "como-funciona",
    titulo: "Como funciona, em 30 segundos",
    paragrafos: [
      "Você não compra um apartamento de uma incorporadora — você entra em um condomínio de construção. Cada investidor adquire uma fração ideal do terreno e participa do rateio das despesas reais da obra: materiais, mão de obra, projetos, taxas. As notas fiscais são emitidas em nome do condomínio, e você tem acesso a tudo.",
      "A R21 atua como administradora, não como vendedora. Cobramos uma taxa de administração de 10% a 15% sobre o custo da obra, além da Comissão de Representantes prevista em lei. Não há lucro embutido no preço do imóvel — porque não há “preço de imóvel”. Há custo real, dividido entre os condôminos.",
    ],
  } satisfies Section,

  vantagens: {
    id: "vantagens",
    titulo: "As vantagens, com números",
    paragrafos: [
      "Economia direta de até 35% em comparação ao mesmo padrão construtivo vendido pelo mercado tradicional. Em um apartamento de R$ 1,5 milhão na planta, isso representa cerca de R$ 525 mil que ficam no seu bolso — ou se traduzem em um imóvel maior, melhor localizado ou mais bem acabado pelo mesmo aporte.",
      "Transparência total: extratos mensais, prestação de contas auditável, notas fiscais em nome do condomínio. Você acompanha cada compra de cimento, cada folha de pagamento, cada contrato.",
      "Personalização real: como a obra é coletiva mas a unidade é sua, é possível negociar acabamentos, plantas e detalhes que em uma incorporação tradicional seriam impossíveis.",
    ],
  } satisfies Section,

  desvantagens: {
    id: "desvantagens",
    titulo: "As desvantagens, abertamente",
    paragrafos: [
      "Variação por INCC. O custo final flutua com o Índice Nacional de Custo da Construção. Se o INCC dispara, sua parcela mensal sobe. Não há “preço travado” — esse é o trade-off de pagar custo real.",
      "Risco de estouro de orçamento. Estimativas iniciais podem ser revistas. Boa governança e contingência mitigam isso, mas o investidor precisa entender que o orçamento é uma previsão, não uma promessa.",
      "Inadimplência coletiva. Se condôminos atrasarem, a obra desacelera. O grupo deve estar alinhado em capacidade financeira e seriedade de propósito.",
      "Exigência de liquidez. Não há financiamento bancário nem FGTS durante a obra. Você aporta com capital próprio, parcela a parcela. Esse é o filtro mais forte do modelo — e a razão pela qual ele atrai investidores sérios.",
    ],
  } satisfies Section,

  checklist: {
    id: "checklist",
    titulo: "Você está pronto para investir a preço de custo?",
    intro:
      "Se responder “sim” às cinco perguntas, este modelo provavelmente é para você.",
    itens: [
      {
        id: "liquidez",
        pergunta:
          "Tenho liquidez para aportes mensais durante toda a obra, sem comprometer minha reserva de emergência?",
      },
      {
        id: "incc",
        pergunta:
          "Entendo que o valor final pode variar conforme INCC e ajustes de orçamento — e estou confortável com isso?",
      },
      {
        id: "sem-financiamento",
        pergunta:
          "Aceito investir sem usar financiamento bancário ou FGTS durante a fase de construção?",
      },
      {
        id: "horizonte",
        pergunta:
          "Tenho horizonte de pelo menos 24–36 meses para realizar a valorização do imóvel?",
      },
      {
        id: "participacao",
        pergunta:
          "Quero participar de decisões coletivas do empreendimento, com acesso a prestações de contas e assembleias?",
      },
    ] as ChecklistItem[],
  },

  fechamento: {
    id: "fechamento",
    titulo: "Próximo passo",
    paragrafos: [
      "Se o modelo faz sentido para o seu perfil, o próximo passo é entender quanto o seu capital cresce dentro dele. Use a calculadora de valorização da R21 para projetar o cenário ou converse com um consultor para discutir empreendimentos em captação.",
    ],
    ctas: [
      { label: "Calcular minha valorização", href: "/calculadora" },
      { label: "Falar com um consultor R21", href: "/#contato" },
    ],
  },
};
