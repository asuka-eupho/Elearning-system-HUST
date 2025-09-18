import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E43636"
      },
      fontFamily: {
        primary: ["var(--font-manrope)"]
      }
    },
  },
  plugins: [],
};
export default config;
