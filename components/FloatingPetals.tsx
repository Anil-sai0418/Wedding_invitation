"use client";

import { motion } from "framer-motion";

const colors = ["#C9A962", "#E8D5A3", "#B8736B", "#FFFBF5"];

export default function FloatingPetals() {
  const petals = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    duration: 10 + (i % 8),
    scale: 0.35 + ((i * 13) % 8) / 12,
    opacity: 0.25 + ((i * 7) % 4) / 12,
    color: colors[i % colors.length],
    delay: i * 0.4,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute -top-16"
          style={{ left: petal.left }}
          animate={{
            y: ["-80px", "110vh"],
            x: [0, 24, -18, 12, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: "linear",
            delay: petal.delay,
          }}
        >
          <svg
            width="24"
            height="28"
            viewBox="0 0 24 24"
            style={{ opacity: petal.opacity, transform: `scale(${petal.scale})` }}
          >
            <path
              fill={petal.color}
              d="M12 2C8 7 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-7-8-12Z"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
