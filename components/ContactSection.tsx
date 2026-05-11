"use client";

import { Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "@/lib/weddingData";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  return (
    <motion.section ref={ref} style={{ opacity, y }} className="z-20 px-5 py-16">
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {weddingData.contacts.map((c) => (
          <article key={c.phone} className="mx-4 rounded-2xl border border-silk bg-jasmine p-6 shadow-md">
            <h3 className="font-ceremonial text-2xl text-temple">{c.name}</h3>
            <p className="font-body italic text-copper">{c.relation}</p>
            <a className="mt-3 flex min-h-12 items-center gap-2 font-body text-inkstone" href={`tel:${c.phone}`}><Phone size={18} /> {c.phone}</a>
            <a className="mt-3 inline-flex min-h-12 items-center rounded-full bg-[#25D366] px-5 text-white" href={`https://wa.me/${c.phone.replace(/\D/g, "")}`} target="_blank">Chat on WhatsApp</a>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
