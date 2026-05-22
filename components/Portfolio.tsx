import { empreendimentos, totais } from "@/lib/portfolio";

const categoriaLabel: Record<string, string> = {
  administracao: "Administração e Construção",
  reforma: "Reformas e Construções",
  andamento: "Em andamento",
  novo: "Novos projetos",
};

export function Portfolio() {
  const grupos = ["administracao", "andamento", "novo", "reforma"] as const;

  return (
    <section id="portfolio" className="container-r21 py-20 md:py-28">
      <div className="max-w-2xl">
        <span className="eyebrow">Portfólio</span>
        <h2 className="h-section mt-4 text-r21-black">
          {totais.finalizados} obras entregues. {totais.emAndamento} em andamento. {totais.lancamentos} em lançamento.
        </h2>
        <p className="mt-6 text-r21-graphite leading-relaxed">
          Histórico real em Balneário Camboriú e região — incluindo Itajaí. Cada uma dessas obras passou pela mesma
          fiscalização que o seu investimento terá: comissão de representantes, balancetes mensais, transparência completa.
        </p>
      </div>

      {grupos.map((g) => {
        const lista = empreendimentos.filter((e) => e.categoria === g);
        if (lista.length === 0) return null;
        return (
          <div key={g} className="mt-14">
            <div className="flex items-baseline justify-between border-b border-r21-fog pb-4">
              <h3 className="text-xl md:text-2xl font-semibold text-r21-black">{categoriaLabel[g]}</h3>
              <span className="text-sm text-r21-stone">{lista.length} {lista.length === 1 ? "empreendimento" : "empreendimentos"}</span>
            </div>
            <ul className="mt-6 grid gap-px bg-r21-fog md:grid-cols-3">
              {lista.map((e) => (
                <li key={e.nome} className="bg-r21-white p-6">
                  <div className="aspect-[4/3] bg-r21-paper mb-4 flex items-center justify-center text-r21-stone text-xs">
                    {/* TODO: trocar por foto real do empreendimento */}
                    foto · {e.nome}
                  </div>
                  <h4 className="font-semibold text-r21-black">{e.nome}</h4>
                  <p className="text-sm text-r21-graphite mt-1">{e.endereco}</p>
                  <p className="text-xs text-r21-stone mt-1">
                    {e.cidade}
                    {e.ano ? ` · Entrega ${e.ano}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
