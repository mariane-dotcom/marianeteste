const passos = [
  { numero: "01", titulo: "Você compra fração do terreno", texto: "Entra no condomínio de construção, regulado pela Lei nº 4.591/64. Todas as notas fiscais são emitidas no CNPJ do condomínio — não da construtora." },
  { numero: "02", titulo: "A R21 gerencia a obra", texto: "Atuamos como prestadora de serviços: planejamento, contratações, compras, controle de qualidade. Recebemos uma taxa de administração entre 10% e 15% do custo da obra." },
  { numero: "03", titulo: "Custos são rateados", texto: "Os gastos reais (materiais, mão de obra, encargos) são divididos entre os condôminos conforme a fração de cada um. As parcelas seguem o cronograma físico-financeiro." },
  { numero: "04", titulo: "Comissão fiscaliza", texto: "Vocês elegem ao menos três condôminos como Comissão de Representantes. Aprovam orçamentos, analisam balancetes e tomam medidas contra inadimplência." },
  { numero: "05", titulo: "Você recebe pelo custo", texto: "Na entrega, seu imóvel é avaliado a preço de mercado — mas você pagou apenas o custo real. A valorização já aparece no dia da entrega das chaves." },
];

export function ComoFunciona() {
  return (
    <section id="modelo" className="bg-r21-black text-r21-white">
      <div className="container-r21 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="eyebrow !text-r21-red">Como funciona, sem floreios</span>
          <h2 className="h-section mt-4">Cinco passos. Zero opacidade.</h2>
          <p className="mt-6 text-lg text-r21-fog leading-relaxed">
            O regime de construção por administração existe há décadas no Brasil. É como grandes fortunas
            constroem patrimônio imobiliário. A R21 traz esse modelo para investidores em Balneário Camboriú
            com a transparência que ele exige.
          </p>
        </div>
        <ol className="mt-14 grid gap-px bg-r21-graphite/40 md:grid-cols-5">
          {passos.map((p) => (
            <li key={p.numero} className="bg-r21-black p-6 md:p-7">
              <div className="text-r21-red font-display text-2xl font-bold tracking-tightest">{p.numero}</div>
              <h3 className="mt-3 text-lg font-semibold">{p.titulo}</h3>
              <p className="mt-2 text-sm text-r21-fog leading-relaxed">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
