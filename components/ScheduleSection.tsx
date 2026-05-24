"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "@/lib/weddingData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp } from "@/lib/animations";

export default function ScheduleSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionWrapper id="schedule">
      <SectionHeader
        label="Itinerary"
        title="Celebration Timeline"
        subtitle="Five moments of joy across two beautiful days"
      />

      <motion.div
        ref={timelineRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto max-w-4xl"
      >
        <motion.div className="absolute bottom-0 left-6 top-0 w-px bg-gold/15 md:left-1/2 md:-translate-x-px" />
        <motion.div
          style={{ scaleY: lineProgress }}
          className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-gold via-gold-light to-gold md:left-1/2 md:-translate-x-px"
        />

        <div className="space-y-6 md:space-y-8">
          {weddingData.schedule.map((event, idx) => (
            <motion.div
              key={event.event}
              variants={fadeUp}
              custom={idx * 0.1}
              className={`relative flex items-start gap-6 md:gap-0 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className={`absolute left-6 z-10 flex -translate-x-1/2 items-center justify-center rounded-full md:left-1/2 ${
                  event.isMain
                    ? "h-4 w-4 bg-gold shadow-gold ring-4 ring-gold/20"
                    : "h-3 w-3 bg-gold/60 ring-2 ring-gold/10"
                }`}
              />

              <div
                className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                  idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                }`}
              >
                <motion.article
                  whileHover={{ y: -4 }}
                  className={`group rounded-2xl border p-6 shadow-card transition-all duration-300 hover:shadow-card-hover ${
                    event.isMain
                      ? "border-gold/40 bg-gradient-to-br from-cream to-gold/10"
                      : "border-gold/15 bg-cream/80"
                  }`}
                >
                  {event.isMain && (
                    <span className="mb-3 inline-block rounded-full bg-gold/15 px-3 py-1 font-ceremonial text-[10px] tracking-[0.25em] uppercase text-gold">
                      Main Ceremony
                    </span>
                  )}
                  <div
                    className={`flex items-center gap-3 ${
                      idx % 2 === 0 ? "md:flex-row-reverse md:justify-start" : ""
                    }`}
                  >
                    <span className="text-2xl">{event.icon}</span>
                    <h3 className="font-ceremonial text-xl text-maroon md:text-2xl">
                      {event.event}
                    </h3>
                  </div>
                  <p className="mt-2 font-body text-rose-gold">
                    {event.day} · {event.time}
                  </p>
                  <p className="mt-1 font-body text-sm italic text-charcoal/60">
                    {event.venue}
                  </p>
                </motion.article>
              </div>

              <div className="hidden w-[calc(50%-2rem)] md:block" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
