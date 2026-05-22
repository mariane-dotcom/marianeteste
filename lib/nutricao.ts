import type { LeadScore } from "@prisma/client";
import { brand } from "./brand";

export type EmailTemplate = {
  id: string;
  diasAposCaptura: number;
  alvoScores: LeadScore[];
  assunto: string;
  html: (vars: { nome: string; siteUrl: string }) => string;
};

const wrap = (vars: { nome: string; siteUrl: string }, inner: string) => `<!doctype html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#F5F5F5;margin:0;padding:32px;color:#1A1A1A;">
  <table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-top:6px solid #E30613;">
    <tr><td style="padding:32px;">
      ${inner}
      <hr style="border:none;border-top:1px solid #D9D9D9;margin:32px 0;" />
      <p style="font-size:13px;color:#6B6B6B;margin:0;">
        R21 Empreendimentos &middot; ${brand.address}<br/>
        ${brand.phone} &middot; ${brand.email}<br/>
        <a href="${vars.siteUrl}/descadastrar" style="color:#6B6B6B;">Descadastrar</a>
      </p>
    </td></tr>
  </table>
</body></html>`;

const primeiroNome = (n: string) => n.split(" ")[0];

export const sequenciaNutricao: EmailTemplate[] = [
  {
    id: "d3-portfolio-real",
    diasAposCaptura: 3,
    alvoScores: ["B", "C"],
    assunto: "5 obras que entregamos sob esse mesmo modelo",
    html: (v) => wrap(v, `
      <h1 style="margin:0;font-size:22px;letter-spacing:-.02em;">Olá, ${primeiroNome(v.nome)}.</h1>
      <p style="font-size:16px;line-height:1.55;color:#3D3D3D;">
        Há alguns dias você baixou nosso guia da construção a preço de custo. Pra você ver que não é teoria:
        cinco empreendimentos que a R21 já entregou exatamente sob esse regime em Balneário Camboriú e Itajaí.
      </p>
      <ul style="font-size:15px;line-height:1.7;color:#1A1A1A;padding-left:20px;">
        <li><strong>SKY Business</strong> — Centro, BC</li>
        <li><strong>Florence Garden</strong> — Centro, BC</li>
        <li><strong>Porto Rotterdam</strong> — Centro, BC</li>
        <li><strong>Barcelona Garden</strong> — Centro, BC</li>
        <li><strong>Porto Januária</strong> — Fazenda, Itajaí</li>
      </ul>
      <p style="margin:24px 0;">
        <a href="${v.siteUrl}/#portfolio" style="background:#E30613;color:#FFFFFF;text-decoration:none;padding:14px 24px;font-weight:600;display:inline-block;">Ver portfólio completo</a>
      </p>
    `),
  },
  {
    id: "d7-calculadora",
    diasAposCaptura: 7,
    alvoScores: ["B", "C"],
    assunto: "Quanto seu capital rende a preço de custo? (calculadora)",
    html: (v) => wrap(v, `
      <h1 style="margin:0;font-size:22px;letter-spacing:-.02em;">${primeiroNome(v.nome)}, faz uma simulação.</h1>
      <p style="font-size:16px;line-height:1.55;color:#3D3D3D;">
        Em vez de te empurrar uma ligação, deixamos o número falar primeiro. Coloca quanto você pensa em
        investir e veja, em segundos, quantos m² isso compra a preço de custo R21 vs. preço fechado de mercado.
      </p>
      <p style="margin:24px 0;">
        <a href="${v.siteUrl}/calculadora" style="background:#E30613;color:#FFFFFF;text-decoration:none;padding:14px 24px;font-weight:600;display:inline-block;">Abrir a calculadora</a>
      </p>
      <p style="font-size:14px;color:#6B6B6B;">Quando fizer sentido pra você, basta responder este e-mail.</p>
    `),
  },
  {
    id: "d14-tres-perguntas",
    diasAposCaptura: 14,
    alvoScores: ["B", "C"],
    assunto: "Três perguntas que separam o investidor consciente do arrependido",
    html: (v) => wrap(v, `
      <h1 style="margin:0;font-size:22px;letter-spacing:-.02em;">As perguntas que importam, ${primeiroNome(v.nome)}.</h1>
      <p style="font-size:16px;line-height:1.55;color:#3D3D3D;">
        Antes de qualquer assinatura, esses três pontos definem se o regime de administração é, de fato, pra você:
      </p>
      <ol style="font-size:15px;line-height:1.7;color:#1A1A1A;padding-left:20px;">
        <li>Você tem reserva pra sustentar 24–36 meses de aportes com variação de até 15% nas parcelas?</li>
        <li>Você está confortável com transparência total (e a responsabilidade que vem junto via comissão)?</li>
        <li>Seu horizonte permite esperar a entrega antes de monetizar o ganho?</li>
      </ol>
      <p style="font-size:16px;line-height:1.55;color:#3D3D3D;">
        Se respondeu sim para as três, vamos conversar. Se ficou em dúvida em alguma, vamos conversar também —
        sem compromisso de fechar nada.
      </p>
      <p style="margin:24px 0;">
        <a href="${v.siteUrl}/#captura" style="background:#0A0A0A;color:#FFFFFF;text-decoration:none;padding:14px 24px;font-weight:600;display:inline-block;">Quero conversar</a>
      </p>
    `),
  },
];

export function templatesPendentes(params: {
  score: LeadScore;
  diasDesdeCaptura: number;
  jaEnviados: string[];
}): EmailTemplate[] {
  return sequenciaNutricao.filter(
    (t) =>
      t.alvoScores.includes(params.score) &&
      params.diasDesdeCaptura >= t.diasAposCaptura &&
      !params.jaEnviados.includes(t.id)
  );
}
