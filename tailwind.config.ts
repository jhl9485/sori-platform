import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F5F3EE",
        surface: "#FFFFFF",
        sori: {
          text: "#181614",
          muted: "#888070",
          accent: "#D04020",
          "accent-light": "#FBF0EC",
          green: "#2B7A50",
          "green-light": "#EBF5F0",
          blue: "#2050A0",
          "blue-light": "#EBF0FB",
          amber: "#B07010",
          "amber-light": "#FBF5E8",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto)", "Noto Sans KR", "sans-serif"],
        display: ["var(--font-syne)", "Syne", "sans-serif"],
        mono: ["var(--font-ibm)", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
      maxWidth: {
        phone: "390px",
      },
    },
  },
  plugins: [],
};
export default config;
