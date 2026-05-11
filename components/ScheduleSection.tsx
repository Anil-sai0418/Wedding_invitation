"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "@/lib/weddingData";

export default function ScheduleSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const line = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.section ref={ref} style={{ opacity, y }} className="z-20 px-5 py-16">
      <h2 className="text-center font-ceremonial text-4xl text-temple">Celebration Timeline</h2>
      <div className="relative mx-auto mt-8 max-w-5xl">
        <motion.div style={{ scaleY: line }} className="absolute left-4 top-0 h-full w-0.5 origin-top bg-saffron md:left-1/2" />
        <div className="space-y-5">
          {weddingData.schedule.map((event, idx) => (
            <motion.div
              key={event.event}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.15 }}
              className={`ml-10 rounded-xl border bg-jasmine p-5 ${event.isMain ? "border-turmeric shadow-[0_0_35px_#F2C94C55]" : "border-silk"} md:ml-0 md:w-[47%] ${idx % 2 ? "md:ml-auto" : ""}`}
            >
              <div className="font-ceremonial text-2xl text-temple">{event.icon} {event.event}</div>
              <p className="font-body text-copper">{event.day} • {event.time}</p>
              <p className="font-body italic text-copper/80">{event.venue}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
