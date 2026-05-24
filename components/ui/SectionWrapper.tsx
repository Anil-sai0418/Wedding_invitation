"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type SectionWrapperProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "warm" | "subtle";
};

const variants = {
  default: "bg-transparent",
  dark: "bg-gradient-to-b from-charcoal via-charcoal to-inkstone text-cream",
  warm: "bg-gradient-to-b from-parchment/80 via-ivory to-parchment/60",
  subtle: "bg-gradient-to-b from-gold/5 via-transparent to-rose/5",
};

export default function SectionWrapper({
  id,
  children,
  className = "",
  variant = "default",
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [48, 0]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity, y }}
      className={`relative z-20 scroll-mt-24 px-5 py-20 md:px-8 md:py-28 ${variants[variant]} ${className}`}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-6xl"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
