import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resend } from "@/lib/email";
import { sequenciaNutricao, templatesPendentes } from "@/lib/nutricao";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://r21empreendimentos.com";
const from = process.env.RESEND_FROM ?? `${brand.name} <${brand.email}>`;

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const agora = new Date();
  const candidatos = await prisma.lead.findMany({
    where: { score: { in: ["B", "C"] } },
    include: { emails: { select: { templateId: true } } },
    take: 500,
  });

  let enviados = 0;
  let pulados = 0;
  const erros: string[] = [];

  for (const lead of candidatos) {
    const diasDesdeCaptura = Math.floor(
      (agora.getTime() - lead.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    const jaEnviados = lead.emails.map((e) => e.templateId);
    const pendentes = templatesPendentes({
      score: lead.score,
      diasDesdeCaptura,
      jaEnviados,
    });

    for (const t of pendentes) {
      if (!resend) {
        pulados++;
        continue;
      }
      try {
        await resend.emails.send({
          from,
          to: lead.email,
          subject: t.assunto,
          html: t.html({ nome: lead.nome, siteUrl }),
        });
        await prisma.emailEnviado.create({
          data: { leadId: lead.id, templateId: t.id },
        });
        enviados++;
      } catch (e) {
        erros.push(`${lead.email}/${t.id}: ${e instanceof Error ? e.message : "erro"}`);
      }
    }
  }

  return NextResponse.json({
    ok: true,
    candidatos: candidatos.length,
    enviados,
    pulados,
    erros: erros.length ? erros : undefined,
    templatesDisponiveis: sequenciaNutricao.map((t) => ({ id: t.id, d: t.diasAposCaptura })),
  });
}
