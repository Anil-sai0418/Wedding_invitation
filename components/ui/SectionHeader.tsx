"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

type SectionHeaderProps = {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
};

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-12 md:mb-16 max-w-3xl ${alignClass}`}>
      {label && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className={`mb-3 font-ceremonial text-xs tracking-[0.35em] uppercase ${
            light ? "text-gold-light/80" : "text-gold"
          }`}
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.08}
        className={`font-display text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl ${
          light ? "text-cream" : "text-maroon"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.16}
          className={`mt-4 font-body text-lg leading-relaxed md:text-xl ${
            light ? "text-cream/70" : "text-rose-gold"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.2}
        className={`mt-6 h-px w-16 bg-gradient-to-r from-gold to-gold-light ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
