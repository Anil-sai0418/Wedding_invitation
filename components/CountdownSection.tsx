"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { weddingData } from "@/lib/weddingData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/animations";

function Digit({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
  );
}

export default function CountdownSection() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const target = weddingData.wedding.date;
  const sec = Math.max(0, differenceInSeconds(target, now));

  useEffect(() => {
    if (sec === 0) confetti({ particleCount: 140, spread: 120, origin: { y: 0.7 } });
  }, [sec]);

  const data = [
    { label: "Days", value: Math.max(0, differenceInDays(target, now)) },
    { label: "Hours", value: Math.max(0, differenceInHours(target, now) % 24) },
    { label: "Minutes", value: Math.max(0, differenceInMinutes(target, now) % 60) },
    { label: "Seconds", value: sec % 60 },
  ];

  return (
    <SectionWrapper id="countdown" variant="subtle">
      <SectionHeader
        label="Countdown"
        title="The Big Day is Almost Here"
        subtitle="Mark your calendar — we can't wait to celebrate with you"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
      >
        {data.map((item, idx) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            custom={idx * 0.08}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-charcoal p-6 text-center shadow-card md:p-8"
          >
            <motion.div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="relative font-display text-5xl text-gold md:text-6xl lg:text-7xl">
              <Digit value={item.value} />
            </p>
            <p className="relative mt-2 font-ceremonial text-[10px] tracking-[0.3em] text-cream/50 uppercase">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
