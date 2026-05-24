"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useRef } from "react";
import { format } from "date-fns";
import { weddingData } from "@/lib/weddingData";
import { fadeUp } from "@/lib/animations";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-5 py-24 text-center md:py-32"
    >
      <motion.div style={{ opacity, scale, y }} className="relative max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto mb-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60 md:w-20" />
          <Sparkles size={18} className="animate-pulse-soft text-gold" />
          <span className="font-ceremonial text-xs tracking-[0.4em] text-gold uppercase">
            Save the Date
          </span>
          <Sparkles size={18} className="animate-pulse-soft text-gold" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60 md:w-20" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="font-script text-3xl text-gold md:text-4xl"
        >
          With joy and blessings
        </motion.p>

        <motion.div className="my-6 space-y-2 md:my-8">
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[52px] leading-[0.95] tracking-tight text-maroon md:text-[88px] lg:text-[100px]"
          >
            {weddingData.bride.name}
          </motion.h1>

          <motion.div
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="font-script text-5xl text-gradient-gold md:text-7xl"
          >
            &
          </motion.div>

          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[52px] leading-[0.95] tracking-tight text-maroon md:text-[88px] lg:text-[100px]"
          >
            {weddingData.groom.name}
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="inline-flex flex-col items-center gap-2 rounded-2xl glass px-8 py-5 shadow-card"
        >
          <p className="font-ceremonial text-sm tracking-[0.3em] text-rose-gold uppercase">
            {format(weddingData.wedding.date, "EEEE")}
          </p>
          <p className="font-display text-2xl text-maroon md:text-3xl">
            {format(weddingData.wedding.date, "MMMM do, yyyy")}
          </p>
        </motion.div>
      </motion.div>

      <motion.a
        href="#couple"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gold/70 transition-colors hover:text-gold"
      >
        <span className="font-ceremonial text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
