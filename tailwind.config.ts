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
        green: {
          50:  "#f0faf5",
          100: "#d0eddf",
          200: "#a3d9bf",
          300: "#70c09a",
          400: "#47a67a",
          500: "#2e8a60",
          600: "#1e6b49",
          700: "#155236",
          800: "#0d3d28",
          900: "#072d1d",
          950: "#03372a",  /* exact logo background */
        },
        gold: {
          50:  "#fffde7",
          100: "#fff3b0",
          200: "#ffe566",
          300: "#ffd60a",
          400: "#f4c430",
          500: "#e9a800",
          600: "#c78c00",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(210deg, rgba(0,0,0,0.35) 36%, rgba(7,26,14,0.92) 99%)",
      },
    },
  },
  plugins: [],
};

export default config;
