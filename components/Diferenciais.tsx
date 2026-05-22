const itens = [
  {
    titulo: "Localização Estratégica",
    texto: "Selecionamos zonas de crescimento ou regiões consolidadas em Balneário Camboriú, ampliando o potencial de apreciação.",
  },
  {
    titulo: "Projetos Únicos",
    texto: "Cada empreendimento é personalizado para o perfil do grupo de investidores, com flexibilidade de plantas e acabamentos.",
  },
  {
    titulo: "Qualidade Superior",
    texto: "Materiais selecionados e design contemporâneo que sustentam valor de revenda e demanda no mercado local.",
  },
  {
    titulo: "Soluções Sustentáveis",
    texto: "Tecnologias e práticas que reduzem custo operacional do imóvel e elevam seu valor de mercado no longo prazo.",
  },
];

export function Diferenciais() {
  return (
    <section id="valorizacao" className="container-r21 py-20 md:py-28">
      <div className="max-w-2xl">
        <span className="eyebrow">Como a R21 maximiza valorização</span>
        <h2 className="h-section mt-4 text-r21-black">Quatro alavancas que sustentam o ganho de patrimônio.</h2>
      </div>
      <div className="mt-12 grid gap-px bg-r21-fog md:grid-cols-2">
        {itens.map((it, i) => (
          <div key={i} className="bg-r21-white p-8 md:p-10 flex gap-6">
            <div className="text-r21-red font-display font-bold text-3xl tracking-tightest leading-none w-10">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-r21-black">{it.titulo}</h3>
              <p className="mt-2 text-r21-graphite leading-relaxed">{it.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
