import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-r21-black text-r21-gray-200 mt-16">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <BrandLogo variant="white" />
        <div className="text-sm leading-relaxed">
          <p className="font-medium text-r21-white">R21 Construtora</p>
          <p>CNPJ: 00.000.000/0000-00</p>
          <p>Contato: contato@r21.com.br</p>
        </div>
      </div>
    </footer>
  );
}
