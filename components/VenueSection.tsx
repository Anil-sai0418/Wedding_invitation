"use client";

import { MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "@/lib/weddingData";

export default function VenueSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  return (
    <motion.section ref={ref} style={{ opacity, y }} className="z-20 px-5 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-silk bg-jasmine/80 p-6">
        <h2 className="font-display text-5xl text-temple">{weddingData.venue.name}</h2>
        <p className="mt-2 flex items-center gap-2 font-body text-xl text-copper"><MapPin size={18} /> {weddingData.venue.address}</p>
        <div className="mt-5 overflow-hidden rounded-xl">
          <iframe title="map" src={weddingData.venue.mapsEmbed} loading="lazy" className="aspect-video w-full border-0" />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href={weddingData.venue.mapUrl} target="_blank" className="min-h-12 rounded-full bg-saffron px-8 py-4 text-white">Get Directions</motion.a>
          <a href="#" className="min-h-12 rounded-full border border-saffron px-6 py-3 text-saffron">Google Calendar</a>
          <a href="#" className="min-h-12 rounded-full border border-saffron px-6 py-3 text-saffron">Apple Calendar</a>
        </div>
      </div>
    </motion.section>
  );
}
