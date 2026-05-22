import { brand } from "@/lib/brand";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-r21-black text-r21-white mt-24">
      <div className="container-r21 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <Logo className="h-9 w-auto" variant="light" />
          <p className="mt-4 text-sm text-r21-fog max-w-xs">
            Construção por administração em Balneário Camboriú. Investidores acessam imóveis pelo custo real,
            sem margem embutida.
          </p>
        </div>
        <div className="text-sm text-r21-fog space-y-2">
          <p className="font-semibold text-r21-white">Contato</p>
          <p>{brand.address}</p>
          <p>{brand.phone}</p>
          <p>{brand.email}</p>
          <a href={brand.instagramUrl} className="underline hover:text-r21-white" target="_blank" rel="noreferrer">
            @{brand.instagram}
          </a>
        </div>
        <div className="text-sm text-r21-fog space-y-2">
          <p className="font-semibold text-r21-white">Aviso</p>
          <p>
            As projeções de economia de até 35% são estimativas baseadas em estudos comparativos do regime de
            administração frente a obras de preço fechado, e podem variar conforme insumos, INCC e
            cronograma físico-financeiro de cada obra.
          </p>
        </div>
      </div>
      <div className="border-t border-r21-graphite/40">
        <div className="container-r21 py-6 text-xs text-r21-stone flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} R21 Empreendimentos — Todos os direitos reservados.</span>
          <span>Regime regulado pela Lei nº 4.591/64.</span>
        </div>
      </div>
    </footer>
  );
}
