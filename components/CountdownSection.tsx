"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { weddingData } from "@/lib/weddingData";

function Digit({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span key={value} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: 0.25 }} className="inline-block">
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
  );
}

export default function CountdownSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
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
    { label: "DAYS", value: differenceInDays(target, now) },
    { label: "HOURS", value: differenceInHours(target, now) % 24 },
    { label: "MINUTES", value: differenceInMinutes(target, now) % 60 },
    { label: "SECONDS", value: sec % 60 },
  ];

  return (
    <motion.section ref={ref} style={{ opacity, y }} className="z-20 px-5 py-16">
      <h2 className="text-center font-script text-4xl text-saffron">The Big Day is Almost Here</h2>
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {data.map((item) => (
          <div key={item.label} className="rounded-2xl bg-temple p-5 text-center shadow-xl">
            <p className="font-display text-6xl text-turmeric md:text-7xl"><Digit value={item.value} /></p>
            <p className="font-ceremonial text-xs tracking-[0.2em] text-silk">{item.label}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
