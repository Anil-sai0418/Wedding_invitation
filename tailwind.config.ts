import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marble: "#F8F4EE",
        jasmine: "#FFF8DC",
        saffron: "#E8882A",
        turmeric: "#F2C94C",
        temple: "#8B1A1A",
        copper: "#B5540B",
        moss: "#2D5016",
        inkstone: "#1C1008",
        silk: "#D4856A",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        ceremonial: ["var(--font-cinzel)", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        body: ["var(--font-crimson)", "serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        petalDrift: {
          "0%": { transform: "translateY(-10px) rotate(0deg)" },
          "100%": { transform: "translateY(100vh) rotate(720deg)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px #E8882A44" },
          "50%": { boxShadow: "0 0 60px #E8882A99" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        petal: "petalDrift 12s linear infinite",
        glow: "glowPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
