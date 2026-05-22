import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        r21: {
          red: "#E30613",
          "red-dark": "#B30410",
          "red-soft": "#FCE8EA",
          black: "#0A0A0A",
          ink: "#1A1A1A",
          graphite: "#3D3D3D",
          stone: "#6B6B6B",
          fog: "#D9D9D9",
          paper: "#F5F5F5",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
