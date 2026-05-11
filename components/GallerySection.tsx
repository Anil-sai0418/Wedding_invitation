"use client";

import Image from "next/image";
import { AnimatePresence, motion, useDragControls, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const photos = Array.from({ length: 9 }).map(() => "/images/gallery.svg");
const blur = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0iI0ZGRjhEQyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIi8+PC9zdmc+";

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const controls = useDragControls();
  const [active, setActive] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  return (
    <motion.section ref={ref} style={{ opacity, y }} className="z-20 px-5 py-16">
      <h2 className="text-center font-display text-6xl text-temple">Our Moments</h2>
      <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2">
        {photos.map((photo, idx) => (
          <motion.button
            key={photo}
            whileHover={{ rotate: 2, scale: 1.04 }}
            whileTap={{ rotate: 2, scale: 1.04 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => setActive(idx)}
            className="mx-1 w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-silk"
          >
            <Image src={photo} alt={`Memory ${idx + 1}`} width={280} height={380} className="h-[380px] w-full object-cover" placeholder="blur" blurDataURL={blur} />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div className="fixed inset-0 z-[90] bg-black/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setActive(null)} className="absolute right-5 top-5 min-h-12 min-w-12 rounded-full bg-white/20 px-4 text-white">✕</button>
            <motion.div drag="x" dragControls={controls} onDragEnd={(_, info) => {
              if (info.offset.x < -80) setActive((v) => ((v ?? 0) + 1) % photos.length);
              if (info.offset.x > 80) setActive((v) => ((v ?? 0) - 1 + photos.length) % photos.length);
            }} className="mx-auto mt-20 max-w-md overflow-hidden rounded-2xl">
              <Image src={photos[active]} alt="Selected memory" width={700} height={900} className="h-[72vh] w-full object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
