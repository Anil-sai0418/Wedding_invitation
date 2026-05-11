"use client";

import { motion } from "framer-motion";

const colors = ["#E8882A", "#F2C94C", "#D4856A", "#FFF8DC"];

export default function FloatingPetals() {
  const petals = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    duration: 8 + (i % 9),
    scale: 0.4 + ((i * 13) % 8) / 10,
    opacity: 0.3 + ((i * 7) % 4) / 10,
    color: colors[i % colors.length],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute -top-20"
          style={{ left: petal.left }}
          animate={{ y: ["-100px", "110vh"], x: [0, 30, -30, 15, 0], rotate: [0, 90, 180, 360] }}
          transition={{ duration: petal.duration, repeat: Infinity, ease: "linear", delay: petal.id * 0.2 }}
        >
          <svg width="30" height="36" viewBox="0 0 24 24" style={{ opacity: petal.opacity, transform: `scale(${petal.scale})` }}>
            <path fill={petal.color} d="M12 2C8 7 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-7-8-12Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
