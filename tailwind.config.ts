import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'american-x': ['var(--font-american-x)'],
        'american-simple': ['var(--font-american-simple)']
      }
    },
  },
  plugins: [],
};
export default config;
