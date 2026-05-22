export type NurturingTemplate = {
  step: number;
  diaOffset: number;
  subject: string;
  build: (ctx: { primeiroNome: string; baseUrl: string }) => string;
};

const BTN = (href: string, label: string) =>
  `<p style="margin: 24px 0;"><a href="${href}" style="display:inline-block;background:#CC1316;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:600;">${label}</a></p>`;

function wrap(inner: string): string {
  return `
<div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; color: #222222; max-width: 560px; margin: 0 auto;">
  ${inner}
  <hr style="border:none; border-top:1px solid #D9D9D9; margin-top:32px;" />
  <p style="color:#6A6A6A; font-size: 12px; margin-top: 16px;">R21 Construtora · Balneário Camboriú/SC · <a href="https://r21.com.br" style="color:#6A6A6A;">r21.com.br</a></p>
</div>
  `.trim();
}

export const NURTURING_TEMPLATES: NurturingTemplate[] = [
  {
    step: 2,
    diaOffset: 2,
    subject: "Os 3 medos do preço de custo — e por que o transparente vence",
    build: ({ primeiroNome, baseUrl }) =>
      wrap(`
        <p style="font-size: 12px; letter-spacing: 2px; color:#CC1316; text-transform:uppercase;">Nutrição · etapa 2 de 5</p>
        <h1 style="font-size: 24px; margin: 8px 0 16px;">${primeiroNome}, vamos olhar os medos de frente.</h1>
        <p>Todo investidor que ouve "preço de custo" pela primeira vez sente três coisas:</p>
        <ol style="padding-left:20px;">
          <li><strong>Medo do INCC.</strong> "E se o custo subir durante a obra?" — Sobe sim, e é por isso que toda parcela é reajustada por um índice público. O contrato não esconde nada.</li>
          <li><strong>Medo do estouro de orçamento.</strong> "E se vier surpresa?" — Pode vir. Mas as planilhas são abertas, com prestação de contas mensal. Você vê antes, não depois.</li>
          <li><strong>Medo de não conseguir bancar.</strong> "E se a parcela apertar?" — É exatamente por isso que o modelo seleciona quem entra. Liquidez de verdade, não promessa.</li>
        </ol>
        <p>A diferença não é a ausência de risco. É a transparência sobre ele.</p>
        ${BTN(`${baseUrl}/guia-preco-de-custo`, "Reler o guia completo")}
      `),
  },
  {
    step: 3,
    diaOffset: 5,
    subject: "Obras reais, não renders — o que a R21 já entregou em BC",
    build: ({ primeiroNome, baseUrl }) =>
      wrap(`
        <p style="font-size: 12px; letter-spacing: 2px; color:#CC1316; text-transform:uppercase;">Nutrição · etapa 3 de 5</p>
        <h1 style="font-size: 24px; margin: 8px 0 16px;">${primeiroNome}, dá pra confiar quem? Quem mostra a obra.</h1>
        <p>Florence Garden, Green Concept, Interpraias Residence — todos construídos no modelo a preço de custo, com prestação de contas aberta aos condôminos.</p>
        <p>Entregar uma planta bonita é o piso da indústria. Entregar uma planilha auditável é o diferencial.</p>
        ${BTN(`${baseUrl}/#portfolio`, "Ver portfólio")}
        <p style="color:#6A6A6A; font-size: 14px;">No próximo e-mail, mostramos o cálculo lado a lado: preço de custo vs. tradicional, com os números crus.</p>
      `),
  },
  {
    step: 4,
    diaOffset: 9,
    subject: "Quanto seu capital vira — número crus, lado a lado",
    build: ({ primeiroNome, baseUrl }) =>
      wrap(`
        <p style="font-size: 12px; letter-spacing: 2px; color:#CC1316; text-transform:uppercase;">Nutrição · etapa 4 de 5</p>
        <h1 style="font-size: 24px; margin: 8px 0 16px;">${primeiroNome}, deixa a calculadora falar.</h1>
        <p>Com R$ 1 milhão e horizonte de 5 anos, a diferença de patrimônio entre o modelo tradicional e o preço de custo passa de <strong>R$ 750 mil</strong> usando parâmetros conservadores.</p>
        <p>Rode com os <em>seus</em> números — capital e prazo reais — e veja onde isso te coloca:</p>
        ${BTN(`${baseUrl}/calculadora`, "Abrir a calculadora")}
        <p style="color:#6A6A6A; font-size: 12px; margin-top:24px;">Lembre-se: a projeção é uma estimativa baseada em médias históricas. Não é promessa de rentabilidade.</p>
      `),
  },
  {
    step: 5,
    diaOffset: 14,
    subject: "Próxima janela de captação — vale conversar?",
    build: ({ primeiroNome, baseUrl }) =>
      wrap(`
        <p style="font-size: 12px; letter-spacing: 2px; color:#CC1316; text-transform:uppercase;">Nutrição · etapa 5 de 5</p>
        <h1 style="font-size: 24px; margin: 8px 0 16px;">${primeiroNome}, hora de uma conversa direta.</h1>
        <p>O modelo a preço de custo só funciona com janelas claras — uma vez que a obra arranca, novos condôminos pagam mais (o que já foi gasto, foi gasto).</p>
        <p>Se você está pesando entrar, agora é o momento de sentar com um consultor R21 e ver o que faz sentido pro seu perfil. Sem compromisso.</p>
        ${BTN(`${baseUrl}/#captura`, "Falar com um consultor")}
        <p style="color:#6A6A6A; font-size: 14px;">Se ainda não é o momento, sem problema — você continua na lista quando o próximo empreendimento abrir.</p>
      `),
  },
];
