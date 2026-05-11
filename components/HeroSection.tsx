"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { format } from "date-fns";
import { weddingData } from "@/lib/weddingData";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <motion.section ref={ref} style={{ opacity, y }} className="relative flex min-h-screen items-center justify-center px-5 py-16 text-center z-20">
      <div className="max-w-4xl">
        <p className="font-script text-[28px] text-saffron">With joy and blessings</p>
        <div className="my-4 flex items-center justify-center gap-3">
          <motion.h1 initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1 }} className="font-display text-[60px] leading-none tracking-tight text-temple md:text-[92px]">
            {weddingData.bride.name}
          </motion.h1>
        </div>
        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="font-script text-6xl text-copper">
          &
        </motion.div>
        <motion.h1 initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1, delay: 0.3 }} className="font-display text-[60px] leading-none tracking-tight text-temple md:text-[96px]">
          {weddingData.groom.name}
        </motion.h1>
        <p className="mt-6 font-ceremonial tracking-[0.25em] text-copper">{format(weddingData.wedding.date, "EEEE, MMMM do yyyy")}</p>
      </div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-saffron" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
        <ChevronDown />
      </motion.div>
    </motion.section>
  );
}
