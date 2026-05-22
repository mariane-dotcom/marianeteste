import { empreendimentos, totais } from "@/lib/portfolio";
import { CardEmpreendimento } from "./CardEmpreendimento";

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
                <CardEmpreendimento key={e.nome} e={e} />
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
