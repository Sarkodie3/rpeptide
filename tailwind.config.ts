import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        brand: {
          blue: "#28479E",
          "blue-dark": "#14244F",
          "blue-hover": "#20397E",
          "blue-light": "#EEF4FB",
          gold: "#DDAC40",
          "gold-hover": "#C29022",
          "gold-light": "#FDF6E7",
          charcoal: "#2B2C23",
          gray: "#636D77",
          light: "#F2F1F1",
          border: "#D2DAF3",
        },
      },
      fontFamily: {
        sans: ["Open Sans", "Helvetica", "Arial", "sans-serif"],
        display: ["Kamerik 105", "Open Sans", "sans-serif"],
        serif: ["Sorts Mill Goudy", "Georgia", "Cambria", "serif"],
        mono: ["Consolas", "Liberation Mono", "Courier", "monospace"],
      },
      maxWidth: {
        container: "75rem", // 1200px Zurb Foundation container standard
      },
    },
  },
  plugins: [],
};
export default config;
