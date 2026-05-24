"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/weddingData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { slideIn, staggerContainer } from "@/lib/animations";

const blur =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0iI0ZGRjhEQyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIi8+PC9zdmc+";

export default function CoupleSection() {
  const people = [
    { ...weddingData.bride, role: "The Bride" },
    { ...weddingData.groom, role: "The Groom" },
  ];

  return (
    <SectionWrapper id="couple" variant="warm">
      <SectionHeader
        label="The Couple"
        title="Two Hearts, One Journey"
        subtitle="Blessed by their families to begin a new chapter together"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-8 md:grid-cols-2 md:gap-10"
      >
        {people.map((person, idx) => (
          <motion.article
            key={person.name}
            variants={slideIn(idx === 0 ? "left" : "right")}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl glass p-8 shadow-card transition-shadow duration-500 hover:shadow-card-hover md:p-10"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/5 transition-transform duration-700 group-hover:scale-150" />

            <motion.div className="relative mx-auto mb-6 w-fit">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold via-gold-light to-rose-gold opacity-60"
              />
              <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-cream p-1 md:h-40 md:w-40">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={160}
                  height={160}
                  className="h-full w-full rounded-full object-cover"
                  placeholder="blur"
                  blurDataURL={blur}
                />
              </div>
            </motion.div>

            <p className="text-center font-ceremonial text-xs tracking-[0.3em] text-gold uppercase">
              {person.role}
            </p>
            <h3 className="mt-2 text-center font-display text-4xl text-maroon md:text-5xl">
              {person.name}
            </h3>
            <p className="mt-1 text-center font-body text-sm italic text-rose-gold">
              {person.surname}
            </p>
            <div className="mx-auto mt-5 h-px w-12 bg-gold/30" />
            <p className="mt-4 text-center font-body text-base leading-relaxed text-charcoal/70">
              {person.parents}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
