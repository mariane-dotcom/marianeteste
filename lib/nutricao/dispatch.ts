import { prisma } from "@/lib/db";
import { Resend } from "resend";
import { NURTURING_TEMPLATES, type NurturingTemplate } from "./templates";

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

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

type DispatchOutcome = {
  step: number;
  found: number;
  sent: number;
  skipped: number;
  errors: number;
};

export async function processarNutricao(opts: {
  now?: Date;
  /** Quando true, não envia e-mail nem grava dispatch (modo planejamento). */
  dryRun?: boolean;
}): Promise<{ runAt: string; results: DispatchOutcome[] }> {
  const now = opts.now ?? new Date();
  const client = opts.dryRun ? null : getResend();
  const results: DispatchOutcome[] = [];

  for (const tpl of NURTURING_TEMPLATES) {
    results.push(
      await processarPasso({ tpl, now, dryRun: !!opts.dryRun, client }),
    );
  }

  return { runAt: now.toISOString(), results };
}

async function processarPasso(args: {
  tpl: NurturingTemplate;
  now: Date;
  dryRun: boolean;
  client: Resend | null;
}): Promise<DispatchOutcome> {
  const { tpl, now, dryRun, client } = args;
  const dayStart = startOfDay(now);
  const targetDay = new Date(dayStart);
  targetDay.setUTCDate(targetDay.getUTCDate() - tpl.diaOffset);
  const dayEnd = new Date(targetDay);
  dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

  const candidatos = await prisma.lead.findMany({
    where: {
      classificacao: { in: ["B", "C"] },
      createdAt: { gte: targetDay, lt: dayEnd },
      nurturingSteps: { none: { step: tpl.step } },
    },
    select: { id: true, nome: true, email: true },
  });

  const outcome: DispatchOutcome = {
    step: tpl.step,
    found: candidatos.length,
    sent: 0,
    skipped: 0,
    errors: 0,
  };

  for (const c of candidatos) {
    if (dryRun) {
      outcome.skipped++;
      continue;
    }
    const html = tpl.build({
      primeiroNome: c.nome.split(" ")[0],
      baseUrl: baseUrl(),
    });
    let attemptedOk = false;

    if (!client) {
      // Dev: sem Resend, marcamos como enviado pra não loopar a fila.
      attemptedOk = true;
    } else {
      try {
        const { error } = await client.emails.send({
          from: FROM,
          to: c.email,
          subject: tpl.subject,
          html,
        });
        if (error) {
          console.error("[nutricao] send fail", {
            step: tpl.step,
            leadId: c.id,
            reason: error.message,
          });
          outcome.errors++;
        } else {
          attemptedOk = true;
        }
      } catch (err) {
        console.error("[nutricao] throw", err);
        outcome.errors++;
      }
    }

    if (attemptedOk) {
      try {
        await prisma.nurturingDispatch.create({
          data: { leadId: c.id, step: tpl.step },
        });
        outcome.sent++;
      } catch {
        // Corrida: alguém já gravou esse dispatch — não é erro.
        outcome.skipped++;
      }
    }
  }

  return outcome;
}
