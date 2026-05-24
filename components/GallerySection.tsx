"use client";

import Image from "next/image";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, scaleIn } from "@/lib/animations";

const photos = Array.from({ length: 9 }).map(() => "/images/gallery.svg");
const blur =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0iI0ZGRjhEQyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIi8+PC9zdmc+";

export default function GallerySection() {
  const controls = useDragControls();
  const [active, setActive] = useState<number | null>(null);

  const navigate = (dir: -1 | 1) => {
    setActive((v) => ((v ?? 0) + dir + photos.length) % photos.length);
  };

  return (
    <SectionWrapper id="gallery" variant="warm">
      <SectionHeader
        label="Memories"
        title="Our Moments"
        subtitle="Precious chapters from our journey together"
      />

      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4 scrollbar-hide md:gap-5"
      >
        {photos.map((photo, idx) => (
          <motion.button
            key={`${photo}-${idx}`}
            variants={fadeUp}
            custom={idx * 0.06}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActive(idx)}
            className="group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gold/15 shadow-card md:w-[300px]"
          >
            <Image
              src={photo}
              alt={`Memory ${idx + 1}`}
              width={300}
              height={400}
              className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[400px]"
              placeholder="blur"
              blurDataURL={blur}
            />
            <motion.div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 font-ceremonial text-xs tracking-widest text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View
            </span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 z-10 flex min-h-12 min-w-12 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream backdrop-blur-sm transition-colors hover:bg-cream/20"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              className="absolute left-4 z-10 hidden min-h-12 min-w-12 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream md:flex"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              className="absolute right-4 z-10 hidden min-h-12 min-w-12 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream md:flex"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              drag="x"
              dragControls={controls}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) navigate(1);
                if (info.offset.x > 80) navigate(-1);
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[85vh] max-w-lg overflow-hidden rounded-2xl border border-gold/20 shadow-glow"
            >
              <Image
                src={photos[active]}
                alt="Selected memory"
                width={700}
                height={900}
                className="max-h-[85vh] w-full object-contain"
              />
            </motion.div>

            <p className="absolute bottom-6 font-ceremonial text-sm tracking-widest text-cream/60">
              {active + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
