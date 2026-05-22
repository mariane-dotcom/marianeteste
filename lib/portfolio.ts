export type Empreendimento = {
  nome: string;
  endereco: string;
  cidade: string;
  categoria: "reforma" | "administracao" | "andamento" | "novo";
  ano?: string;
  status: "finalizado" | "em_andamento" | "lancamento";
};

export const empreendimentos: Empreendimento[] = [
  // Reformas e Construções
  { nome: "Residencial Baía dos Golfinhos", endereco: "Rua 2300, 248 — Centro", cidade: "Balneário Camboriú", categoria: "reforma", status: "finalizado" },
  { nome: "CDL — Câmara de Dirigentes Lojistas", endereco: "Rua 902, 530 — Centro", cidade: "Balneário Camboriú", categoria: "reforma", status: "finalizado" },
  { nome: "Barra Norte Centro Médico", endereco: "Rua Arthur Max Doose, 153 — Pioneiros", cidade: "Balneário Camboriú", categoria: "reforma", status: "finalizado" },
  { nome: "Key West Residencial", endereco: "Rua 1528, 142 — Centro", cidade: "Balneário Camboriú", categoria: "reforma", status: "finalizado" },
  { nome: "Celebration Residence", endereco: "Rua 3610, 200 — Centro", cidade: "Balneário Camboriú", categoria: "reforma", status: "finalizado" },
  { nome: "Maison San Lorenzo", endereco: "Rua 1822, 145 — Centro", cidade: "Balneário Camboriú", categoria: "reforma", status: "finalizado" },
  { nome: "Royal Garden Residence", endereco: "Rua 3160, 200 — Centro", cidade: "Balneário Camboriú", categoria: "reforma", status: "finalizado" },
  { nome: "Marina Palace Residence", endereco: "Av. Normando Tedesco, 1315 — Barra Sul", cidade: "Balneário Camboriú", categoria: "reforma", status: "finalizado" },
  { nome: "Parador Estaleiro Hotel", endereco: "Rua Jaime Jacinto Emerenciano — Estaleirinho", cidade: "Balneário Camboriú", categoria: "reforma", status: "finalizado" },

  // Administração e Construção (finalizados)
  { nome: "Porto Januária", endereco: "Rua Antônio Manoel Moreira, 175 — Fazenda", cidade: "Itajaí", categoria: "administracao", status: "finalizado" },
  { nome: "SKY Business", endereco: "Rua 1500, 820 — Centro", cidade: "Balneário Camboriú", categoria: "administracao", status: "finalizado" },
  { nome: "Barcelona Garden", endereco: "Rua 2830, 90 — Centro", cidade: "Balneário Camboriú", categoria: "administracao", status: "finalizado" },
  { nome: "Porto Rotterdam", endereco: "Rua 3310, 101 — Centro", cidade: "Balneário Camboriú", categoria: "administracao", status: "finalizado" },
  { nome: "Florence Garden", endereco: "Rua 3160 — Centro", cidade: "Balneário Camboriú", categoria: "administracao", status: "finalizado" },

  // Em andamento
  { nome: "Cape Town", endereco: "Rua 3198, 201 — Centro", cidade: "Balneário Camboriú", categoria: "andamento", status: "em_andamento", ano: "2027" },
  { nome: "Holmes Residence", endereco: "Rua 200, 100 — Centro", cidade: "Balneário Camboriú", categoria: "andamento", status: "em_andamento" },

  // Novos projetos
  { nome: "Green Concept", endereco: "Novo projeto", cidade: "Balneário Camboriú", categoria: "novo", status: "lancamento" },
  { nome: "Viva na Interpraias", endereco: "Interpraias", cidade: "Balneário Camboriú", categoria: "novo", status: "lancamento" },
  { nome: "Pátio Estaleiro", endereco: "Rua Ercelina Maria Vieira, 293 — Praia do Estaleiro", cidade: "Balneário Camboriú", categoria: "novo", status: "lancamento" },
];

export const totais = {
  finalizados: empreendimentos.filter((e) => e.status === "finalizado").length,
  emAndamento: empreendimentos.filter((e) => e.status === "em_andamento").length,
  lancamentos: empreendimentos.filter((e) => e.status === "lancamento").length,
  total: empreendimentos.length,
};
