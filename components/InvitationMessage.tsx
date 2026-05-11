"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "@/lib/weddingData";

export default function InvitationMessage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <motion.section ref={ref} style={{ opacity, y }} className="z-20 px-5 py-16">
      <motion.div initial={{ rotateY: 90 }} whileInView={{ rotateY: 0 }} viewport={{ once: true }} className="mx-auto max-w-5xl rounded-3xl bg-temple p-8 text-jasmine" style={{ transformStyle: "preserve-3d" }}>
        <p className="text-center font-script text-5xl text-turmeric">ॐ</p>
        <p className="text-center font-script text-4xl text-turmeric">Mangalyam tantunanena...</p>
        <p className="mt-6 text-center font-body text-[18px] italic leading-[1.9]">{weddingData.message}</p>
        <p className="mt-6 text-center font-script text-4xl text-saffron">With love and blessings,</p>
        <p className="text-center font-ceremonial text-xl text-turmeric">Venkat & Reddy Families</p>
      </motion.div>
    </motion.section>
  );
}
