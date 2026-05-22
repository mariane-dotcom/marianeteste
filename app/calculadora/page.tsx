import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calculadora } from "@/components/Calculadora";

export const metadata: Metadata = {
  title: "Calculadora de Valorização",
  description:
    "Simule quanto seu capital rende sob o regime de construção por administração R21 em Balneário Camboriú.",
};

export default function CalculadoraPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-r21-paper border-b border-r21-fog">
          <div className="container-r21 py-14 md:py-20 max-w-3xl">
            <span className="eyebrow">Calculadora de Valorização</span>
            <h1 className="h-display mt-3 text-r21-black">
              O mesmo capital. <span className="text-r21-red">Mais metros quadrados.</span>
            </h1>
            <p className="mt-5 text-lg text-r21-graphite leading-relaxed">
              Veja exatamente quanto seu investimento vale quando você compra custo real em vez de preço fechado.
              Os números são baseados nos parâmetros médios de Balneário Camboriú — ajuste capital e prazo abaixo
              para ver sua simulação.
            </p>
          </div>
        </section>
        <Calculadora />
      </main>
      <Footer />
    </>
  );
}
