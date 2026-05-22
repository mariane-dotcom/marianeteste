import type { Empreendimento } from "@/lib/portfolio";

const statusLabel: Record<Empreendimento["status"], string> = {
  finalizado: "Entregue",
  em_andamento: "Em obra",
  lancamento: "Lançamento",
};

const statusCor: Record<Empreendimento["status"], string> = {
  finalizado: "bg-r21-black text-r21-white",
  em_andamento: "bg-r21-red text-r21-white",
  lancamento: "bg-r21-paper text-r21-black border border-r21-fog",
};

export function CardEmpreendimento({ e }: { e: Empreendimento }) {
  return (
    <li className="bg-r21-white p-6 group">
      <PlaceholderArt nome={e.nome} categoria={e.categoria} />
      <div className="mt-4 flex items-center justify-between gap-3">
        <h4 className="font-semibold text-r21-black leading-tight">{e.nome}</h4>
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 whitespace-nowrap ${statusCor[e.status]}`}>
          {statusLabel[e.status]}
        </span>
      </div>
      <p className="text-sm text-r21-graphite mt-1">{e.endereco}</p>
      <p className="text-xs text-r21-stone mt-1">
        {e.cidade}
        {e.ano ? ` · Entrega ${e.ano}` : ""}
      </p>
    </li>
  );
}

function PlaceholderArt({ nome, categoria }: { nome: string; categoria: Empreendimento["categoria"] }) {
  // Gera silhuetas de prédio derivadas do nome (determinístico, sem foto).
  const seed = hash(nome);
  const barras = 5 + (seed % 4);
  const alturas = Array.from({ length: barras }, (_, i) => 30 + ((seed >> (i + 1)) % 55));

  const corFundo =
    categoria === "novo"
      ? "from-r21-red/15 to-r21-paper"
      : categoria === "andamento"
      ? "from-r21-red/10 to-r21-paper"
      : "from-r21-paper to-r21-fog/40";

  const iniciais = nome
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`aspect-[4/3] bg-gradient-to-br ${corFundo} relative overflow-hidden`}>
      <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
        {alturas.map((h, i) => (
          <rect
            key={i}
            x={20 + i * (160 / barras)}
            y={150 - h}
            width={(160 / barras) - 6}
            height={h}
            fill={i % 3 === 1 ? "#E30613" : "#0A0A0A"}
            opacity={i % 3 === 1 ? 0.9 : 0.85}
          />
        ))}
        <rect x="0" y="148" width="200" height="2" fill="#0A0A0A" opacity="0.2" />
      </svg>
      <div className="absolute top-3 left-3 text-r21-black/60 font-display font-bold text-2xl tracking-tightest">
        {iniciais}
      </div>
    </div>
  );
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h;
}
