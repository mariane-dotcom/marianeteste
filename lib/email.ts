import { Resend } from "resend";
import {
  FAIXA_CAPITAL_LABELS,
  HORIZONTE_LABELS,
  OBJETIVO_LABELS,
  type LeadInput,
} from "./lead-schema";
import type { Classificacao } from "./scoring";

let resend: Resend | null = null;
function getResend(): Resend | null {
  if (resend) return resend;
  if (!process.env.RESEND_API_KEY) return null;
  resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const FROM =
  process.env.RESEND_FROM_EMAIL || "R21 Investidores <onboarding@resend.dev>";

function baseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000"
  ).replace(/\/+$/g, "");
}

export async function enviarGuiaParaLead(args: {
  leadId: string;
  nome: string;
  email: string;
  token: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const client = getResend();
  if (!client) return { sent: false, reason: "RESEND_API_KEY ausente (dev)" };

  const downloadUrl = `${baseUrl()}/api/guia/pdf?token=${encodeURIComponent(
    args.token,
  )}`;
  const obrigadoUrl = `${baseUrl()}/obrigado?token=${encodeURIComponent(
    args.token,
  )}`;

  const html = `
    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; color: #222222; max-width: 560px; margin: 0 auto;">
      <p style="font-size: 12px; letter-spacing: 2px; color: #CC1316; text-transform: uppercase;">Guia R21</p>
      <h1 style="font-size: 24px; margin: 8px 0 16px;">Aqui está seu guia, ${args.nome.split(" ")[0]}.</h1>
      <p>Como combinamos, segue o <strong>Guia do Preço de Custo</strong> da R21 — o material que explica, sem rodeios, o modelo que entrega imóveis até 35% mais baratos em Balneário Camboriú.</p>
      <p style="margin: 24px 0;">
        <a href="${downloadUrl}" style="display: inline-block; background: #CC1316; color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 6px; font-weight: 600;">
          Baixar o guia em PDF
        </a>
      </p>
      <p>Ou abra <a href="${obrigadoUrl}">esta página</a> para acessar quando quiser.</p>
      <p style="color: #6A6A6A; font-size: 12px; margin-top: 32px;">R21 Construtora · Balneário Camboriú/SC</p>
    </div>
  `.trim();

  const { error } = await client.emails.send({
    from: FROM,
    to: args.email,
    subject: "Seu guia R21 do preço de custo",
    html,
  });

  if (error) return { sent: false, reason: error.message };
  return { sent: true };
}

export async function notificarLeadQuente(args: {
  leadId: string;
  lead: LeadInput;
  score: number;
  classificacao: Classificacao;
}): Promise<{ sent: boolean; reason?: string }> {
  const client = getResend();
  if (!client) return { sent: false, reason: "RESEND_API_KEY ausente (dev)" };
  const to = process.env.INTERNAL_NOTIFY_EMAIL;
  if (!to) return { sent: false, reason: "INTERNAL_NOTIFY_EMAIL ausente" };

  const linhas = [
    ["Nome", args.lead.nome],
    ["E-mail", args.lead.email],
    ["Telefone", args.lead.telefone],
    ["Objetivo", OBJETIVO_LABELS[args.lead.objetivo]],
    ["Faixa de capital", FAIXA_CAPITAL_LABELS[args.lead.faixaCapital]],
    ["Horizonte", HORIZONTE_LABELS[args.lead.horizonte]],
    ["Origem (utm_source)", args.lead.utmSource || args.lead.origem || "—"],
    ["Score", `${args.score} (classificação ${args.classificacao})`],
    ["Lead ID", args.leadId],
  ];

  const html = `
    <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; color: #222222;">
      <p style="font-size: 12px; letter-spacing: 2px; color: #CC1316; text-transform: uppercase;">Lead classe A — contato imediato</p>
      <h1 style="font-size: 22px; margin: 6px 0 16px;">${args.lead.nome}</h1>
      <table cellspacing="0" cellpadding="6" style="border-collapse: collapse;">
        ${linhas
          .map(
            ([k, v]) => `
              <tr>
                <td style="color: #6A6A6A; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding-right: 12px; vertical-align: top;">${k}</td>
                <td style="color: #222222;">${v}</td>
              </tr>`,
          )
          .join("")}
      </table>
    </div>
  `.trim();

  const { error } = await client.emails.send({
    from: FROM,
    to,
    subject: `Lead A: ${args.lead.nome} — score ${args.score}`,
    html,
  });

  if (error) return { sent: false, reason: error.message };
  return { sent: true };
}
