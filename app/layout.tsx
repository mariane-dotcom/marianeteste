import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://r21empreendimentos.com"),
  title: {
    default: "R21 Empreendimentos — Imóveis a Preço de Custo em Balneário Camboriú",
    template: "%s · R21 Empreendimentos",
  },
  description:
    "Construímos sob o regime de administração em Balneário Camboriú. Investidores acessam até 35% de economia em relação ao preço fechado de mercado.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  openGraph: {
    title: "R21 Empreendimentos — Imóveis a Preço de Custo",
    description:
      "Imóveis em Balneário Camboriú no regime de construção por administração, com até 35% de economia sobre o preço fechado.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og/default.svg", width: 1200, height: 630, alt: "R21 Empreendimentos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "R21 Empreendimentos — Imóveis a Preço de Custo",
    description: "Construção por administração em Balneário Camboriú · até 35% de economia.",
    images: ["/og/default.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
