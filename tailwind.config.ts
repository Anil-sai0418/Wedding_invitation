import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        parchment: "#F5EFE6",
        cream: "#FFFBF5",
        gold: "#C9A962",
        "gold-light": "#E8D5A3",
        maroon: "#5C0A0A",
        "maroon-light": "#8B2323",
        "rose-gold": "#B8736B",
        charcoal: "#1A1210",
        inkstone: "#1C1008",
        marble: "#F8F4EE",
        jasmine: "#FFF8DC",
        saffron: "#E8882A",
        turmeric: "#F2C94C",
        temple: "#8B1A1A",
        copper: "#B5540B",
        moss: "#2D5016",
        silk: "#D4856A",
        rose: "#C4A088",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        ceremonial: ["var(--font-cinzel)", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        body: ["var(--font-crimson)", "serif"],
      },
      boxShadow: {
        gold: "0 4px 24px -4px rgba(201, 169, 98, 0.35)",
        "gold-lg": "0 8px 40px -8px rgba(201, 169, 98, 0.5)",
        card: "0 1px 3px rgba(26, 18, 16, 0.04), 0 12px 40px -12px rgba(92, 10, 10, 0.08)",
        "card-hover": "0 20px 60px -20px rgba(92, 10, 10, 0.15)",
        glow: "0 0 60px rgba(201, 169, 98, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-warm":
          "radial-gradient(at 40% 20%, rgba(201, 169, 98, 0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(184, 115, 107, 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(232, 213, 163, 0.1) 0px, transparent 50%)",
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
          "0%, 100%": { boxShadow: "0 0 30px rgba(201, 169, 98, 0.2)" },
          "50%": { boxShadow: "0 0 60px rgba(201, 169, 98, 0.45)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        revealLine: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        petal: "petalDrift 12s linear infinite",
        glow: "glowPulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "reveal-line": "revealLine 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
