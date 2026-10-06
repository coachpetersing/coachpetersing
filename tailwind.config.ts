import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1A12",
        forest: "#1F3D2B",
        cream: "#F6F1E7",
        tan: "#C9A96E",
        offblack: "#141414",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        base: ["17px", "1.6"],
        lg: ["19px", "1.6"],
        xl: ["22px", "1.5"],
      },
      maxWidth: { site: "1200px" },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        "marquee-reverse": "marqueeReverse 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
