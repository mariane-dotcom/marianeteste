type Variant =
  | "red"
  | "white"
  | "mark-red"
  | "mark-black"
  | "mark-gray-dark"
  | "mark-gray";

type Props = {
  variant?: Variant;
  height?: number;
  withTagline?: boolean;
  className?: string;
  title?: string;
};

const COLORS = {
  red: "#CC1316",
  black: "#222222",
  grayDark: "#3B3B3B",
  gray: "#A2A2A2",
  white: "#F4F5F7",
};

function Buildings({
  fill,
  stroke,
  strokeWidth = 0,
}: {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const common = {
    fill: fill ?? "none",
    stroke: stroke ?? "none",
    strokeWidth,
    strokeLinejoin: "miter" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };
  return (
    <g {...common}>
      <path d="M2,54 L2,24 L13,30 L13,54 Z" />
      <path d="M17,54 L17,4 L29,11 L29,54 Z" />
      <path d="M33,54 L33,26 L43,32 L43,54 Z" />
    </g>
  );
}

function Wordmark({ fill }: { fill: string }) {
  return (
    <text
      x="52"
      y="46"
      fill={fill}
      fontFamily="var(--font-ubuntu), Ubuntu, system-ui, sans-serif"
      fontWeight={700}
      fontSize="44"
      letterSpacing="-1"
    >
      R21
    </text>
  );
}

export default function BrandLogo({
  variant = "red",
  height = 40,
  withTagline = false,
  className,
  title = "R21",
}: Props) {
  const isMark = variant.startsWith("mark-");

  if (isMark) {
    const strokeColor =
      variant === "mark-red"
        ? COLORS.red
        : variant === "mark-black"
          ? COLORS.black
          : variant === "mark-gray-dark"
            ? COLORS.grayDark
            : COLORS.gray;

    const aspect = 45 / 56;
    const width = Math.round(height * aspect);
    return (
      <svg
        viewBox="0 0 45 56"
        height={height}
        width={width}
        className={className}
        role="img"
        aria-label={title}
      >
        <title>{title}</title>
        <Buildings stroke={strokeColor} strokeWidth={2} />
      </svg>
    );
  }

  const wordmarkFill = variant === "white" ? COLORS.white : COLORS.black;
  const tagFill = variant === "white" ? COLORS.gray : COLORS.grayDark;
  const vbHeight = withTagline ? 72 : 56;
  const aspect = 132 / vbHeight;
  const width = Math.round(height * aspect);

  return (
    <svg
      viewBox={`0 0 132 ${vbHeight}`}
      height={height}
      width={width}
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <Buildings fill={COLORS.red} />
      <Wordmark fill={wordmarkFill} />
      {withTagline && (
        <text
          x="2"
          y="68"
          fill={tagFill}
          fontFamily="var(--font-ubuntu), Ubuntu, system-ui, sans-serif"
          fontWeight={400}
          fontSize="7.5"
          letterSpacing="2.5"
        >
          EMPREENDIMENTOS
        </text>
      )}
    </svg>
  );
}
