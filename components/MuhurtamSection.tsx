"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { weddingData } from "@/lib/weddingData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Moon, Star, Sun } from "lucide-react";

const badges = [
  { key: "nakshatra", label: "Nakshatra", value: weddingData.wedding.nakshatra, icon: Moon },
  { key: "tithi", label: "Tithi", value: weddingData.wedding.tithi, icon: Sun },
  { key: "rashi", label: "Rashi", value: weddingData.wedding.rashi, icon: Star },
] as const;

export default function MuhurtamSection() {
  const [visibleTime, setVisibleTime] = useState("00:00");

  useEffect(() => {
    const steps = ["01:15", "03:30", "05:45", "08:00", "10:45"];
    let i = 0;
    const id = setInterval(() => {
      setVisibleTime(steps[i] ?? "10:45");
      i += 1;
      if (i >= steps.length) clearInterval(id);
    }, 250);
    return () => clearInterval(id);
  }, []);

  return (
    <SectionWrapper id="muhurtam" variant="subtle">
      <SectionHeader
        label="Sacred Timing"
        title="ॐ ಶುಭ ಮುಹೂರ್ತ / Shubh Muhurtam"
        subtitle="An auspicious moment chosen under divine guidance"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-3xl"
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-br from-cream via-parchment to-gold/10 p-10 shadow-glow animate-glow md:p-14"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-gold/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full border border-gold/10"
          />

          <p className="text-center font-ceremonial text-xs tracking-[0.35em] uppercase text-gold">
            Ceremony begins at
          </p>
          <div className="mt-4 text-center">
            <motion.div
              key={visibleTime}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-6xl text-maroon md:text-8xl lg:text-9xl"
            >
              {visibleTime}
              <span className="ml-2 text-3xl text-gold md:text-4xl">AM</span>
            </motion.div>
            <p className="mt-3 font-display text-2xl text-rose-gold md:text-3xl">
              to {weddingData.wedding.muhurtamEnd}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={0.2}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {badges.map(({ key, label, value, icon: Icon }) => (
            <span
              key={key}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-cream/80 px-5 py-2.5 font-ceremonial text-sm text-maroon shadow-sm backdrop-blur-sm"
            >
              <Icon size={14} className="text-gold" />
              {label}: {value}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
