import Image from "next/image";

type Variant = "red" | "white" | "black" | "gray" | "gray-dark";

const SRC: Record<Variant, string> = {
  red: "/brand/R21_Logo_Tracado_Vermelha.png",
  white: "/brand/R21_Logo_Tracado_Cinza.png",
  black: "/brand/R21_Logo_Tracado_Preto.png",
  gray: "/brand/R21_Logo_Tracado_Cinza.png",
  "gray-dark": "/brand/R21_Logo_Tracado_Cinza_Escuro.png",
};

type Props = {
  variant?: Variant;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  variant = "red",
  width = 120,
  height = 40,
  className,
  priority,
}: Props) {
  return (
    <Image
      src={SRC[variant]}
      alt="R21"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
