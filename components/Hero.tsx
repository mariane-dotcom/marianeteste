export function Hero() {
  return (
    <section className="relative bg-r21-paper overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-24 -top-24 w-[480px] h-[480px] bg-r21-red/5 rounded-full blur-3xl" />
        <div className="absolute -left-32 bottom-0 w-[420px] h-[420px] bg-r21-red/5 rounded-full blur-3xl" />
      </div>
      <div className="container-r21 relative py-20 md:py-28 grid gap-12 md:grid-cols-[1.1fr,0.9fr] items-center">
        <div>
          <span className="eyebrow">Balneário Camboriú · Construção por administração</span>
          <h1 className="h-display mt-4 text-r21-black">
            Compre o <span className="text-r21-red">custo real</span> do imóvel —<br />não o preço da incorporadora.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-r21-graphite max-w-xl leading-relaxed">
            Na R21, você investe sob o regime de administração: sem margem de risco embutida, sem lucro inflado.
            Com transparência radical e até <strong className="text-r21-black">35% de economia</strong> em relação a
            empreendimentos comparáveis a preço fechado.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#captura" className="btn-primary">Receber o guia completo</a>
            <a href="#modelo" className="btn-outline">Entender o modelo</a>
          </div>
          <p className="mt-6 text-sm text-r21-stone">
            Sem spam. O guia é honesto sobre vantagens E desvantagens — leia antes de investir.
          </p>
        </div>
        <div className="relative">
          <div className="bg-r21-white border border-r21-fog p-8 md:p-10 shadow-sm">
            <p className="eyebrow">A diferença que pesa no bolso</p>
            <div className="mt-6 space-y-5">
              <ComparativoBar label="Preço fechado de mercado" valor={100} cor="bg-r21-fog" textoBarra="R$ 100" textoLado="custo + margem + lucro" />
              <ComparativoBar label="Preço de custo R21" valor={65} cor="bg-r21-red" textoBarra="R$ 65" textoLado="até -35%" highlight />
            </div>
            <p className="mt-6 text-xs text-r21-stone leading-relaxed">
              Ilustração comparativa. Economia real varia com INCC, insumos e cronograma físico-financeiro de cada obra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparativoBar({
  label, valor, cor, textoBarra, textoLado, highlight,
}: { label: string; valor: number; cor: string; textoBarra: string; textoLado: string; highlight?: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className={highlight ? "font-semibold text-r21-black" : "text-r21-graphite"}>{label}</span>
        <span className={highlight ? "font-semibold text-r21-red" : "text-r21-stone"}>{textoLado}</span>
      </div>
      <div className="relative h-10 bg-r21-paper">
        <div className={`h-full ${cor} flex items-center px-3 text-sm font-semibold ${highlight ? "text-r21-white" : "text-r21-graphite"}`} style={{ width: `${valor}%` }}>
          {textoBarra}
        </div>
      </div>
    </div>
  );
}
