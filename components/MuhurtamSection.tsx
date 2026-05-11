"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { weddingData } from "@/lib/weddingData";

export default function MuhurtamSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
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
    <motion.section ref={ref} style={{ opacity, y }} className="z-20 bg-gradient-to-b from-saffron/10 to-turmeric/20 px-5 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-ceremonial text-4xl text-temple">ॐ ಶುಭ ಮುಹೂರ್ತ / Shubh Muhurtam</h2>
        <motion.div className="mx-auto mt-8 rounded-3xl border-2 border-silk bg-jasmine/60 p-8 animate-glow max-w-3xl">
          <div className="font-display text-7xl text-saffron md:text-8xl">{visibleTime} AM</div>
          <p className="font-display text-4xl text-copper">to {weddingData.wedding.muhurtamEnd}</p>
        </motion.div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-silk bg-jasmine px-4 py-2 font-ceremonial">🌙 Nakshatra: {weddingData.wedding.nakshatra}</span>
          <span className="rounded-full border border-silk bg-jasmine px-4 py-2 font-ceremonial">📅 Tithi: {weddingData.wedding.tithi}</span>
          <span className="rounded-full border border-silk bg-jasmine px-4 py-2 font-ceremonial">♈ Rashi: {weddingData.wedding.rashi}</span>
        </div>
      </div>
    </motion.section>
  );
}
