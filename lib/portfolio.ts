export type EmpreendimentoStatus = "entregue" | "em-obra" | "captacao";

export type Empreendimento = {
  nome: string;
  bairro: string;
  status: EmpreendimentoStatus;
  resumo: string;
};

export const PORTFOLIO: Empreendimento[] = [
  {
    nome: "Florence Garden",
    bairro: "Centro · Balneário Camboriú",
    status: "entregue",
    resumo:
      "Empreendimento residencial de alto padrão entregue no modelo a preço de custo, com plantas personalizadas pelos condôminos.",
  },
  {
    nome: "Green Concept",
    bairro: "Pioneiros · Balneário Camboriú",
    status: "em-obra",
    resumo:
      "Torre única em fase avançada de obras. Acompanhamento mensal de custos abertos aos condôminos.",
  },
  {
    nome: "Interpraias Residence",
    bairro: "Interpraias · Balneário Camboriú",
    status: "captacao",
    resumo:
      "Em captação. Última oportunidade para entrar a preço de custo com escolha de unidade e personalização.",
  },
];

export const STATUS_LABEL: Record<EmpreendimentoStatus, string> = {
  entregue: "Entregue",
  "em-obra": "Em obras",
  captacao: "Em captação",
};
