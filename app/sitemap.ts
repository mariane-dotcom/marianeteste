import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://r21empreendimentos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/calculadora`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/guia`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
