import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        r21: {
          red: "#CC1316",
          "red-dark": "#A50413",
          "red-darker": "#80030F",
          "red-deep": "#61020B",
          "red-bright": "#E8051B",
          "red-300": "#ED3749",
          "red-200": "#F05866",
          "red-100": "#F48C96",
          "red-50": "#F8B2B8",
          black: "#222222",
          "gray-900": "#2F2F2F",
          "gray-800": "#3B3B3B",
          "gray-600": "#555555",
          "gray-500": "#6A6A6A",
          "gray-400": "#8C8C8C",
          "gray-300": "#A2A2A2",
          "gray-200": "#BFBFBF",
          "gray-100": "#D9D9D9",
          "off-white": "#F0F0F0",
          white: "#F4F5F7",
        },
      },
      fontFamily: {
        sans: ["var(--font-ubuntu)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
