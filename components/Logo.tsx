import Image from "next/image";

export function Logo({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const src = variant === "light" ? "/logo-light.svg" : "/logo.svg";
  return (
    <Image
      src={src}
      alt="R21 Empreendimentos"
      width={240}
      height={56}
      priority
      className={className}
    />
  );
}
