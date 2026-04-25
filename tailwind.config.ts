import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        panel: "var(--panel)",
        "panel-strong": "var(--panel-strong)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        deep: "var(--deep)",
        "deep-2": "var(--deep-2)"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)",
        lift: "0 26px 70px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "hero-navy":
          "radial-gradient(circle at top left, rgba(181, 146, 89, 0.28), transparent 30%), radial-gradient(circle at top right, rgba(255, 255, 255, 0.12), transparent 20%), linear-gradient(135deg, #0f172a 0%, #15233f 52%, #1b2c4e 100%)",
        "hero-soft":
          "radial-gradient(circle at top left, rgba(181, 146, 89, 0.16), transparent 34%), radial-gradient(circle at bottom right, rgba(15, 23, 42, 0.1), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,247,251,0.98))"
      }
    }
  },
  plugins: []
};

export default config;
