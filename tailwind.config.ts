import type { Config } from "tailwindcss";

// Color tokens mirror the CSS variables in src/app/globals.css. Change both together.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#0E1A12",
          900: "#13241A",
          800: "#1C3324",
          600: "#2F5A3E",
        },
        tan: {
          400: "#C8A97E",
          300: "#D9C19D",
        },
        cream: {
          50: "#F6F0E4",
          200: "#E6DCC8",
        },
        ink: "#0E1A12",
        muted: "#A7B3A3",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"], // fallbacks also set in layout.tsx
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        sm: ["14px", "1.5"],
        base: ["17px", "1.6"],
        lg: ["18px", "1.6"],
        xl: ["20px", "1.5"],
      },
      borderRadius: {
        card: "16px",
      },
      maxWidth: { site: "1200px" },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
      animation: {
        marquee: "marquee 70s linear infinite",
        rise: "rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
