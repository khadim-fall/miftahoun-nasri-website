import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

// Permet d'utiliser les variantes d'opacité de Tailwind (ex. bg-primary/90, bg-gold/50)
const color = (variable: string) => `hsl(var(${variable}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: color("--background"),
        foreground: color("--foreground"),
        card: { DEFAULT: color("--card"), foreground: color("--card-foreground") },
        popover: { DEFAULT: color("--popover"), foreground: color("--popover-foreground") },
        primary: {
          DEFAULT: color("--primary"),
          light: color("--primary-light"),
          foreground: color("--primary-foreground"),
        },
        secondary: { DEFAULT: color("--secondary"), foreground: color("--secondary-foreground") },
        muted: { DEFAULT: color("--muted"), foreground: color("--muted-foreground") },
        accent: { DEFAULT: color("--accent"), foreground: color("--accent-foreground") },
        destructive: { DEFAULT: color("--destructive"), foreground: color("--destructive-foreground") },
        border: color("--border"),
        input: color("--input"),
        ring: color("--ring"),
        gold: {
          DEFAULT: color("--gold"),
          light: color("--gold-light"),
          dark: color("--gold-dark"),
        },
        dark: color("--dark"),
      },
    },
  },
  plugins: [animate],
} satisfies Config;
