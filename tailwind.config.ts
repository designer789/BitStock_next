import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-source-serif-4)", "serif"],
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        silver: {
          DEFAULT: "var(--color-silver)",
          light: "var(--color-silver-light)",
          dark: "var(--color-silver-dark)",
        },
        border: "var(--color-border)",
      },
      maxWidth: {
        '8xl': '1440px',
        '9xl': '1600px',
      },
    },
  },
  plugins: [],
} satisfies Config; 