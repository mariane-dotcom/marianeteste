import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const c = await cookies();
  if (!verifySessionToken(c.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    where: { statusFinal: "fechou" },
    orderBy: { closedAt: "desc" },
    select: { nome: true, email: true, telefone: true },
  });

  // Formato Meta Custom Audience: email, phone, fn (first name).
  // https://www.facebook.com/business/help/606443329504150
  const header = ["email", "phone", "fn"];
  const rows = leads.map((l) => [
    l.email.trim().toLowerCase(),
    l.telefone.replace(/\D/g, ""),
    l.nome.trim().split(/\s+/)[0].toLowerCase(),
  ]);
  const csv = [header, ...rows]
    .map((r) => r.map(csvEscape).join(","))
    .join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="r21-fechou-lookalike.csv"',
      "Cache-Control": "private, no-store",
    },
  });
}
