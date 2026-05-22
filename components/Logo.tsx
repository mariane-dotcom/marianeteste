export function Logo({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const txt = variant === "dark" ? "#0A0A0A" : "#FFFFFF";
  return (
    <svg
      role="img"
      aria-label="R21 Empreendimentos"
      viewBox="0 0 240 56"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect x="0" y="14" width="8" height="42" fill="#E30613" />
        <rect x="12" y="6" width="8" height="50" fill="#E30613" />
        <rect x="24" y="20" width="8" height="36" fill="#E30613" />
      </g>
      <text
        x="40"
        y="40"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="-1.2"
        fill={txt}
      >
        R21
      </text>
      <text
        x="108"
        y="38"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="500"
        fontSize="18"
        letterSpacing="2"
        fill={txt}
      >
        EMPREENDIMENTOS
      </text>
    </svg>
  );
}
