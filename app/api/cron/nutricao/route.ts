import { NextRequest, NextResponse } from "next/server";
import { processarNutricao } from "@/lib/nutricao/dispatch";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorize(req: NextRequest): boolean {
  // Em produção exigimos o secret. Em dev sem secret, autoriza.
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization") || "";
  return auth === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const dryRun = req.nextUrl.searchParams.get("dry") === "1";
  const result = await processarNutricao({ dryRun });
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  return GET(req);
}
