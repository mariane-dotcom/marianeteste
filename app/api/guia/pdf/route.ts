import { NextResponse } from "next/server";
import { guia } from "@/lib/guia-content";

export const dynamic = "force-static";

export async function GET() {
  const html = renderGuiaHtml();
  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-disposition": 'inline; filename="guia-preco-de-custo-r21.html"',
    },
  });
}

function renderGuiaHtml() {
  const blocos = guia.blocos
    .map((b) => {
      if (b.tipo === "h2") return `<h2>${b.texto}</h2>`;
      if (b.tipo === "p") return `<p>${b.texto}</p>`;
      if (b.tipo === "lista") return `<ul>${b.itens.map((i) => `<li>${i}</li>`).join("")}</ul>`;
      if (b.tipo === "callout") return `<aside class="callout"><strong>${b.titulo}</strong><p>${b.texto}</p></aside>`;
      if (b.tipo === "numero") return `<div class="numero"><span>${b.valor}</span><p>${b.texto}</p></div>`;
      if (b.tipo === "comparativo") {
        return `<section class="comp">
          <h3>${b.titulo}</h3>
          <div class="cols">
            <div><h4>Investidor consciente</h4><ul>${b.consciente.map((c) => `<li>✓ ${c}</li>`).join("")}</ul></div>
            <div><h4>Investidor arrependido</h4><ul>${b.arrependido.map((c) => `<li>✗ ${c}</li>`).join("")}</ul></div>
          </div>
        </section>`;
      }
      return "";
    })
    .join("\n");

  return `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8" />
<title>Guia da Construção a Preço de Custo — R21</title>
<style>
  @page { size: A4; margin: 24mm 18mm; }
  body { font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; color:#1A1A1A; max-width: 720px; margin: 40px auto; padding: 0 24px; line-height: 1.55; }
  header { border-bottom: 4px solid #E30613; padding-bottom: 24px; margin-bottom: 32px; }
  header .eyebrow { color:#E30613; font-size:12px; letter-spacing:.18em; text-transform:uppercase; font-weight:600; }
  h1 { font-size: 32px; letter-spacing:-.02em; line-height:1.1; margin: 8px 0 16px; }
  h2 { font-size: 22px; letter-spacing:-.02em; margin-top: 32px; }
  h3 { font-size: 18px; margin-top: 24px; }
  p, li { font-size: 15px; }
  ul { padding-left: 18px; }
  li { margin-bottom: 6px; }
  .callout { border-left: 4px solid #E30613; background:#F5F5F5; padding: 14px 18px; margin: 18px 0; }
  .callout strong { color:#E30613; font-size:11px; letter-spacing:.18em; text-transform:uppercase; }
  .numero { display:flex; gap:18px; align-items:baseline; border-top:1px solid #D9D9D9; border-bottom:1px solid #D9D9D9; padding: 16px 0; }
  .numero span { color:#E30613; font-size:48px; font-weight:800; letter-spacing:-.04em; }
  .comp { background:#0A0A0A; color:#fff; padding: 24px; margin: 24px 0; }
  .comp h3 { margin-top: 0; }
  .comp h4 { color:#E30613; font-size:11px; letter-spacing:.18em; text-transform:uppercase; margin-bottom: 6px; }
  .comp .cols { display:grid; grid-template-columns: 1fr 1fr; gap:24px; }
  .comp li { color:#D9D9D9; }
  footer { margin-top: 48px; padding-top: 16px; border-top:1px solid #D9D9D9; font-size:12px; color:#6B6B6B; }
  .lead { font-style: italic; color:#6B6B6B; }
</style>
</head><body>
<header>
  <div class="eyebrow">Guia · R21 Empreendimentos</div>
  <h1>${guia.hero.titulo}</h1>
  <p>${guia.hero.subtitulo}</p>
  <p class="lead">${guia.hero.lead}</p>
</header>
${blocos}
<footer>
  R21 Empreendimentos · Rua 3310, 101 — sala 01, Balneário Camboriú/SC · contato@r21empreendimentos.com<br/>
  Para imprimir este guia em PDF, use o atalho Ctrl/⌘ + P.
</footer>
</body></html>`;
}
