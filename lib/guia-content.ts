export type Bloco =
  | { tipo: "h2"; texto: string }
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "callout"; titulo: string; texto: string }
  | { tipo: "comparativo"; titulo: string; consciente: string[]; arrependido: string[] }
  | { tipo: "numero"; valor: string; texto: string };

export const guia: { hero: { titulo: string; subtitulo: string; lead: string }; blocos: Bloco[] } = {
  hero: {
    titulo: "O que ninguém te conta sobre Construção a Preço de Custo",
    subtitulo: "Um modelo amparado pela Lei 4.591/64 que pode reduzir até 35% do custo do seu imóvel — se você entender no que está entrando.",
    lead: "Este guia é deliberadamente honesto. Mostra a economia real, mas também os riscos que você precisa absorver. Lê quem está pronto pra decidir como investidor — não como comprador impulsivo.",
  },
  blocos: [
    { tipo: "h2", texto: "O que é, em uma frase" },
    {
      tipo: "p",
      texto:
        "Em vez de comprar uma unidade pronta de uma incorporadora pelo preço fechado dela, você se une a outros adquirentes para financiar o custo real da obra do início ao fim. Vocês formam um condomínio de construção, contratam uma construtora como prestadora de serviços, e pagam exatamente o que a obra custa — nada mais.",
    },
    {
      tipo: "callout",
      titulo: "A diferença que pesa no bolso",
      texto:
        "Quando você compra preço fechado, está pagando o custo da obra + a margem de risco da incorporadora + o lucro embutido. No preço de custo, essas duas últimas camadas simplesmente não existem. É daí que sai a economia de até 35%.",
    },
    { tipo: "h2", texto: "Como funciona, sem floreios" },
    {
      tipo: "lista",
      itens: [
        "1. Fração ideal: você compra uma fração do terreno e entra no condomínio de construção. Toda nota fiscal, recibo e fatura é emitida no CNPJ do condomínio — nunca da construtora.",
        "2. Construtora como prestadora: ela gerencia técnica e financeiramente (planejamento, contratações, compras, qualidade). Recebe uma taxa de administração — geralmente entre 10% e 15% do custo da obra.",
        "3. Rateio mensal: os custos reais (materiais, mão de obra, encargos) são orçados e divididos entre os condôminos conforme a fração de cada um. As parcelas acompanham o cronograma físico-financeiro.",
        "4. Comissão de Representantes: vocês elegem no mínimo três condôminos para fiscalizar a construtora. Essa comissão aprova orçamentos, analisa balancetes e age contra inadimplentes.",
        "5. Variação de custos: o preço final não é fixo. Acompanha o INCC e flutuações reais de insumos como aço e cimento. Sobe quando o mercado sobe. Cai quando o mercado cai.",
      ],
    },
    { tipo: "h2", texto: "Por que vale a pena (quando vale)" },
    {
      tipo: "numero",
      valor: "até 35%",
      texto:
        "de redução de custo em relação a empreendimentos comparáveis a preço fechado, em estimativas baseadas em obras na mesma região e padrão.",
    },
    {
      tipo: "lista",
      itens: [
        "Transparência máxima: você vê para onde cada real vai. Não existe \"caixa preta\" entre você e o custo da obra.",
        "Personalização: maior flexibilidade para modificar plantas e acabamentos da sua unidade, arcando com a diferença de custos.",
        "Ganho de patrimônio acelerado: como você entra pagando custo e o imóvel é avaliado a preço de mercado, a valorização aparece já na entrega.",
      ],
    },
    { tipo: "h2", texto: "Por que NÃO é para todo mundo" },
    {
      tipo: "callout",
      titulo: "Leia esta parte com atenção redobrada",
      texto:
        "Se algum destes três pontos te incomodar, o modelo provavelmente não é pra você — e tudo bem. É melhor descobrir agora.",
    },
    {
      tipo: "lista",
      itens: [
        "Risco de estouro de orçamento: se o aço, o cimento ou a mão de obra subirem, os condôminos absorvem. Não existe \"preço fechado de garantia\".",
        "Inadimplência do grupo: se um condômino atrasa, o fluxo de caixa coletivo é impactado e pode atrasar a obra. A comissão pode chegar a leiloar a unidade do inadimplente — mas isso leva tempo.",
        "Sem FGTS, sem financiamento bancário durante a obra: você precisa de liquidez para bancar os aportes mensais até a entrega das chaves. É um investimento descapitalizado.",
      ],
    },
    { tipo: "h2", texto: "O investidor consciente vs. o investidor arrependido" },
    {
      tipo: "comparativo",
      titulo: "Qual desses você quer ser na entrega das chaves?",
      consciente: [
        "Estudou o modelo antes de assinar — leu este tipo de guia.",
        "Entrou com liquidez suficiente pra absorver variações mensais sem apertar o orçamento.",
        "Entendeu que está comprando custo, não preço — e que isso significa volatilidade.",
        "Escolheu uma construtora com histórico de obras entregues e comissão atuante.",
        "Trata o aporte mensal como uma posição de investimento, não como uma despesa.",
      ],
      arrependido: [
        "Foi atraído só pelo \"35% mais barato\" sem entender o resto.",
        "Entrou no limite — qualquer variação no INCC vira aperto financeiro.",
        "Esperava parcela fixa, achou que \"preço de custo\" era preço travado.",
        "Não acompanhou a comissão, não leu balancete, descobriu o aumento tarde.",
        "Comparou com um financiamento bancário e se frustrou ao não poder usar FGTS.",
      ],
    },
    { tipo: "h2", texto: "A pergunta que separa um do outro" },
    {
      tipo: "p",
      texto:
        "Você tem reserva financeira para sustentar 24 a 36 meses de aportes, com margem para variações de até 15% no valor da parcela, sem comprometer seu fluxo pessoal?",
    },
    {
      tipo: "p",
      texto:
        "Se a resposta é sim, o preço de custo é provavelmente o caminho mais inteligente disponível pra você em Balneário Camboriú hoje. Se é não, o modelo tradicional, mesmo mais caro, vai te dar mais paz.",
    },
    { tipo: "h2", texto: "Como a R21 entra nessa história" },
    {
      tipo: "p",
      texto:
        "Somos uma construtora especializada em obras por administração em Balneário Camboriú e região. Já entregamos empreendimentos como SKY Business, Florence Garden, Porto Rotterdam, Barcelona Garden e Porto Januária — todos sob esse regime. Em andamento, Cape Town (entrega 2027) e Holmes Residence. A transparência radical do modelo é o que nos atrai: não tem como esconder números quando o condomínio é o dono do CNPJ.",
    },
    { tipo: "h2", texto: "Próximo passo" },
    {
      tipo: "p",
      texto:
        "Se chegou até aqui, você é exatamente o perfil de investidor com quem gostamos de conversar. Responda ao formulário no site e nosso time entra em contato com uma análise personalizada da sua faixa de investimento — sem pressão, sem script.",
    },
  ],
};
