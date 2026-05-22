import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const file = path.join(process.cwd(), "public", "guia-preco-de-custo-r21.pdf");
  const buf = await readFile(file);
  return new NextResponse(buf, {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": 'inline; filename="guia-preco-de-custo-r21.pdf"',
      "cache-control": "public, max-age=3600",
    },
  });
}
