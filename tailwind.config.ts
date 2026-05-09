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
        canvas: {
          DEFAULT: "#f4f6f4",
          muted: "#e8ede9",
        },
        ink: {
          DEFAULT: "#1c2420",
          subtle: "#5a665f",
          faint: "#8a958e",
        },
        sage: {
          DEFAULT: "#7d9b87",
          soft: "#b8cdbf",
          mist: "#dce8df",
        },
        cream: "#faf9f6",
        accent: {
          DEFAULT: "#6b8f9e",
          soft: "#a8c4cf",
        },
      },
      boxShadow: {
        soft: "0 8px 32px -12px rgba(28, 36, 32, 0.12)",
        card: "0 4px 24px -8px rgba(28, 36, 32, 0.08)",
      },
      borderRadius: {
        "3xl": "1.5rem",
      },
      minHeight: {
        touch: "48px",
      },
    },
  },
  plugins: [],
};

export default config;
