import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="border-b border-r21-fog bg-r21-white sticky top-0 z-40">
      <div className="container-r21 flex items-center justify-between h-16 md:h-20">
        <Link href="/" aria-label="R21 Empreendimentos">
          <Logo className="h-7 md:h-9 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-r21-graphite">
          <a href="#valorizacao" className="hover:text-r21-black">Valorização</a>
          <a href="#modelo" className="hover:text-r21-black">Modelo</a>
          <a href="#portfolio" className="hover:text-r21-black">Portfólio</a>
          <Link href="/calculadora" className="hover:text-r21-black">Calculadora</Link>
          <Link href="/guia" className="hover:text-r21-black">Guia</Link>
        </nav>
        <a href="#captura" className="btn-primary text-sm py-2.5 px-4 md:px-5">
          Receber o guia
        </a>
      </div>
    </header>
  );
}
