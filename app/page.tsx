import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Diferenciais } from "@/components/Diferenciais";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Portfolio } from "@/components/Portfolio";
import { OfertaGuia } from "@/components/OfertaGuia";
import { SecaoCaptura } from "@/components/SecaoCaptura";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Diferenciais />
        <ComoFunciona />
        <Portfolio />
        <OfertaGuia />
        <SecaoCaptura />
      </main>
      <Footer />
    </>
  );
}
