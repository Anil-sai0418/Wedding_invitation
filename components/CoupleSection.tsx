"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "@/lib/weddingData";

const blur = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0iI0ZGRjhEQyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIi8+PC9zdmc+";

export default function CoupleSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <motion.section ref={ref} style={{ opacity, y }} className="z-20 px-5 py-16">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {[weddingData.bride, weddingData.groom].map((person, idx) => (
          <motion.article
            key={person.name}
            initial={{ opacity: 0, x: idx ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: idx * 0.15 }}
            className="mx-4 rounded-2xl border-2 border-silk bg-jasmine/90 p-6 shadow-lg"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="mx-auto mb-4 h-32 w-32 rounded-full border-2 border-saffron p-1">
              <Image src={person.photo} alt={person.name} width={120} height={120} className="h-full w-full rounded-full object-cover" placeholder="blur" blurDataURL={blur} />
            </motion.div>
            <h3 className="text-center font-display text-5xl text-temple">{person.name}</h3>
            <p className="text-center font-body italic text-copper">{person.parents}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
