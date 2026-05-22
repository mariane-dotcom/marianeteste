import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WebhookSchema = z.object({
  email: z.string().email(),
  status: z.enum(["fechou", "perdeu", "em_andamento"]),
  motivo: z.string().max(240).optional(),
  closedAt: z.string().datetime().optional(),
});

function authorize(req: NextRequest): boolean {
  const expected = process.env.WEBHOOK_CRM_SECRET;
  if (!expected) return process.env.NODE_ENV !== "production";
  const header =
    req.headers.get("x-webhook-secret") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/, "");
  return header === expected;
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON malformado." }, { status: 400 });
  }
  const parsed = WebhookSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Payload inválido.",
        issues: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }
  const { email, status, motivo, closedAt } = parsed.data;

  const result = await prisma.lead.updateMany({
    where: { email },
    data: {
      statusFinal: status,
      motivoPerda: status === "perdeu" ? motivo || null : null,
      closedAt:
        status === "fechou"
          ? closedAt
            ? new Date(closedAt)
            : new Date()
          : status === "em_andamento"
            ? null
            : undefined,
    },
  });

  return NextResponse.json({
    ok: true,
    email,
    status,
    leadsAtualizados: result.count,
  });
}
