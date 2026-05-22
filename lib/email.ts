import { Resend } from "resend";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { LeadScore } from "@prisma/client";
import { brand } from "./brand";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM ?? `${brand.name} <${brand.email}>`;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://r21empreendimentos.com";

export const resend = apiKey ? new Resend(apiKey) : null;

export async function enviarGuiaPorEmail(params: {
  nome: string;
  email: string;
}) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY ausente — envio mockado.", params.email);
    return { mocked: true };
  }

  const guiaUrl = `${siteUrl}/guia`;
  const downloadUrl = `${siteUrl}/guia-preco-de-custo-r21.pdf`;

  let attachments: { filename: string; content: string }[] | undefined;
  try {
    const pdf = await readFile(path.join(process.cwd(), "public", "guia-preco-de-custo-r21.pdf"));
    attachments = [{ filename: "guia-preco-de-custo-r21.pdf", content: pdf.toString("base64") }];
  } catch (e) {
    console.warn("[email] PDF não encontrado para anexar:", e instanceof Error ? e.message : e);
  }

  return resend.emails.send({
    from,
    to: params.email,
    subject: "Seu Guia da Construção a Preço de Custo — R21",
    html: emailGuiaHtml({ nome: params.nome, guiaUrl, downloadUrl }),
    attachments,
  });
}

export async function notificarLeadAlta(params: {
  nome: string;
  email: string;
  telefone: string;
  score: LeadScore;
  resumo: string;
  observacao?: string | null;
  origem?: string | null;
}) {
  const to = process.env.NOTIFY_LEAD_A_EMAIL;
  if (!resend || !to) {
    console.warn("[email] notificação de lead A não enviada (config ausente).", params.email);
    return { mocked: true };
  }

  const telDigits = params.telefone.replace(/\D/g, "");
  const waLink = telDigits.length >= 10
    ? `https://wa.me/${telDigits.startsWith("55") ? telDigits : "55" + telDigits}?text=${encodeURIComponent(
        `Olá ${params.nome.split(" ")[0]}, aqui é da R21 Empreendimentos. Recebi seu cadastro pelo nosso site — posso conversar com você sobre as opções de investimento que se encaixam no seu perfil?`
      )}`
    : null;

  return resend.emails.send({
    from,
    to,
    subject: `[Lead ${params.score}] ${params.nome} — atender em 24h`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#1A1A1A;max-width:560px;">
        <p style="background:#E30613;color:#fff;display:inline-block;padding:4px 10px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;">Lead ${params.score}</p>
        <h2 style="margin:8px 0 4px;">${params.nome}</h2>
        <p style="color:#3D3D3D;margin:0 0 16px;">${params.resumo}</p>
        <table style="font-size:14px;border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;">E-mail</td><td><a href="mailto:${params.email}">${params.email}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;">Telefone</td><td>${params.telefone}</td></tr>
          ${params.origem ? `<tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;">Origem</td><td>${params.origem}</td></tr>` : ""}
          ${params.observacao ? `<tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;vertical-align:top;">Observação</td><td>${params.observacao}</td></tr>` : ""}
        </table>
        ${waLink ? `<p style="margin:20px 0;"><a href="${waLink}" style="background:#0A0A0A;color:#fff;text-decoration:none;padding:12px 18px;font-weight:600;display:inline-block;">Abrir conversa no WhatsApp</a></p>` : ""}
      </div>
    `,
  });
}

function emailGuiaHtml(p: { nome: string; guiaUrl: string; downloadUrl: string }) {
  return `<!doctype html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#F5F5F5;margin:0;padding:32px;color:#1A1A1A;">
  <table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-top:6px solid #E30613;">
    <tr><td style="padding:32px 32px 8px;">
      <h1 style="margin:0;font-size:24px;letter-spacing:-0.02em;">Olá, ${escapeHtml(p.nome.split(" ")[0])}.</h1>
      <p style="font-size:16px;line-height:1.55;color:#3D3D3D;">
        Aqui está seu acesso ao <strong>Guia da Construção a Preço de Custo</strong> — o modelo que pode reduzir até <strong>35%</strong> do custo do seu imóvel em Balneário Camboriú.
      </p>
      <p style="margin:24px 0;">
        <a href="${p.guiaUrl}" style="background:#E30613;color:#FFFFFF;text-decoration:none;padding:14px 24px;font-weight:600;display:inline-block;">Ler o guia online</a>
        &nbsp;
        <a href="${p.downloadUrl}" style="color:#0A0A0A;text-decoration:underline;">Baixar PDF</a>
      </p>
      <p style="font-size:15px;line-height:1.55;color:#3D3D3D;">
        Leia com calma. Esse modelo não é para todo mundo — e o guia explica exatamente o porquê.
        Depois, se fizer sentido pra você, nosso time entra em contato.
      </p>
      <hr style="border:none;border-top:1px solid #D9D9D9;margin:32px 0;" />
      <p style="font-size:13px;color:#6B6B6B;margin:0;">
        R21 Empreendimentos &middot; ${brand.address}<br/>
        ${brand.phone} &middot; ${brand.email}
      </p>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}
