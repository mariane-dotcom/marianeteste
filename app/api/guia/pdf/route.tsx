import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { GuiaPdf } from "@/lib/guia/pdf";
import { verifyLeadToken } from "@/lib/lead-token";

export const runtime = "nodejs";

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  if (token === "preview" && process.env.NODE_ENV !== "production") return true;
  try {
    return verifyLeadToken(token) !== null;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!isTokenValid(token)) {
    return NextResponse.json(
      {
        error:
          "Preencha o formulário qualificador para liberar o download do guia.",
      },
      { status: 403 },
    );
  }

  const buffer = await renderToBuffer(<GuiaPdf />);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'inline; filename="r21-guia-preco-de-custo.pdf"',
      "Cache-Control": "private, no-store",
    },
  });
}
