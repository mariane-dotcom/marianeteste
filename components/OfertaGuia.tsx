export function OfertaGuia() {
  return (
    <section className="bg-r21-paper">
      <div className="container-r21 py-20 md:py-28 grid gap-12 md:grid-cols-[1fr,1.1fr] items-center">
        <div className="relative">
          <div className="bg-r21-white border-t-4 border-r21-red p-8 md:p-10 shadow-sm max-w-md">
            <p className="eyebrow">Material gratuito</p>
            <p className="font-display text-2xl md:text-3xl font-bold tracking-tightest mt-3 leading-tight text-r21-black">
              Guia da Construção a Preço de Custo
            </p>
            <ul className="mt-5 space-y-2 text-sm text-r21-graphite">
              <li className="flex gap-2"><span className="text-r21-red">●</span> Como funciona o regime, na prática</li>
              <li className="flex gap-2"><span className="text-r21-red">●</span> De onde sai a economia de até 35%</li>
              <li className="flex gap-2"><span className="text-r21-red">●</span> Os 3 riscos que você precisa absorver</li>
              <li className="flex gap-2"><span className="text-r21-red">●</span> A pergunta que separa o investidor consciente do arrependido</li>
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-r21-stone">
              <span className="inline-block w-2 h-2 bg-r21-red" />
              Entregue por e-mail em segundos
            </div>
          </div>
        </div>
        <div>
          <span className="eyebrow">Leia antes de investir</span>
          <h2 className="h-section mt-4 text-r21-black">
            Tudo o que ninguém te conta sobre construção a preço de custo.
          </h2>
          <p className="mt-6 text-lg text-r21-graphite leading-relaxed">
            Este guia é deliberadamente honesto. Mostra a economia real, mas também explica por que esse modelo
            não é para todo investidor. Se você está avaliando entrar num empreendimento por administração,
            leia antes de assinar qualquer coisa.
          </p>
          <a href="#captura" className="btn-primary mt-8">Quero o guia agora</a>
        </div>
      </div>
    </section>
  );
}
