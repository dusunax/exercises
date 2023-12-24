import type { Config } from "tailwindcss";
import { tailwindTheme } from "./src/styles/tailwind.theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: tailwindTheme,
  extend: {},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
export default config;
