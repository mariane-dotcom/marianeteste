import { FormularioLead } from "./FormularioLead";

export function SecaoCaptura() {
  return (
    <section id="captura" className="container-r21 py-20 md:py-28 grid gap-12 md:grid-cols-[1fr,1fr] items-start">
      <div>
        <span className="eyebrow">Formulário qualificador</span>
        <h2 className="h-section mt-4 text-r21-black">
          Receba o guia e uma análise do seu perfil de investimento.
        </h2>
        <p className="mt-6 text-r21-graphite leading-relaxed text-lg">
          Três perguntas. Em troca, você recebe o guia em PDF imediatamente — e, se fizer sentido pelo seu perfil,
          nosso time entra em contato com uma análise personalizada da sua faixa de capital.
        </p>
        <ul className="mt-8 space-y-4 text-r21-graphite">
          <li className="flex gap-3"><Check /> Sem ligações de pressão. Sem script.</li>
          <li className="flex gap-3"><Check /> Análise feita por um consultor sênior, não por um SDR aleatório.</li>
          <li className="flex gap-3"><Check /> Se o modelo não couber pra você, dizemos isso na cara — e indicamos alternativas.</li>
        </ul>
      </div>
      <FormularioLead />
    </section>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-none mt-0.5 text-r21-red" fill="currentColor">
      <path d="M9.55 17.6 4.4 12.45l1.4-1.4 3.75 3.75 8.65-8.65 1.4 1.4z" />
    </svg>
  );
}
