import BrandLogo from "./BrandLogo";

export default function Header() {
  return (
    <header className="border-b border-r21-gray-100 bg-r21-white">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <BrandLogo variant="red" />
        <nav className="text-sm text-r21-gray-600">
          <span>R21 Construtora · Balneário Camboriú/SC</span>
        </nav>
      </div>
    </header>
  );
}
