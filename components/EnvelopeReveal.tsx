"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { weddingData } from "@/lib/weddingData";

export default function EnvelopeReveal({ onDone }: { onDone: () => void }) {
  const [completed, setCompleted] = useState(false);
  const controls = useAnimation();

  const reveal = async () => {
    await controls.start("seal");
    await controls.start("ribbon");
    await controls.start("flap");
    await controls.start("card");
    await controls.start("fade");
    setCompleted(true);
    onDone();
  };

  return (
    <AnimatePresence>
      {!completed && (
        <motion.div
          className="noise fixed inset-0 z-[120] flex items-center justify-center bg-charcoal p-4"
          initial={{ opacity: 1 }}
          animate={controls}
          variants={{ fade: { opacity: 0, transition: { duration: 0.8 } } }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />

          <div className="relative w-full max-w-md">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-center font-ceremonial text-xs tracking-[0.4em] uppercase text-gold/70"
            >
              A Special Invitation
            </motion.p>

            <div className="relative mx-auto h-72 rounded-2xl border border-gold/20 bg-gradient-to-b from-parchment to-cream shadow-gold-lg">
              <motion.div
                variants={{
                  flap: { rotateX: -180, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                }}
                initial={{ rotateX: 0 }}
                animate={controls}
                className="absolute inset-x-0 top-0 h-28 origin-top rounded-t-2xl bg-gradient-to-b from-gold-light/40 to-gold/20"
                style={{ transformStyle: "preserve-3d" }}
              />

              <motion.div
                variants={{
                  card: {
                    y: "-130%",
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 200, damping: 20 },
                  },
                }}
                animate={controls}
                className="absolute inset-x-6 top-20 rounded-xl border border-gold/15 bg-cream p-8 text-center shadow-card"
              >
                <p className="font-script text-4xl text-gradient-gold">Together Forever</p>
                <p className="mt-2 font-ceremonial text-xs tracking-[0.25em] text-rose-gold">
                  {weddingData.bride.name.split(" ")[0]} & {weddingData.groom.name}
                </p>
              </motion.div>

              <div className="absolute left-1/2 top-[42%] h-16 w-40 -translate-x-1/2">
                <motion.div
                  variants={{ ribbon: { x: -120, opacity: 0, transition: { duration: 0.5 } } }}
                  animate={controls}
                  className="absolute left-0 top-1/2 h-1.5 w-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-gold to-gold-light"
                />
                <motion.div
                  variants={{ ribbon: { x: 120, opacity: 0, transition: { duration: 0.5 } } }}
                  animate={controls}
                  className="absolute right-0 top-1/2 h-1.5 w-1/2 -translate-y-1/2 rounded-full bg-gradient-to-l from-gold to-gold-light"
                />
              </div>

              <motion.div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  type="button"
                  onClick={reveal}
                  variants={{
                    seal: { scale: 0, rotate: 90, opacity: 0, transition: { duration: 0.5 } },
                  }}
                  animate={controls}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-2xl text-charcoal shadow-gold-lg"
                >
                  ✿
                </motion.button>
              </motion.div>
            </div>

            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="mt-8 text-center font-body text-cream/70"
            >
              Tap the seal to reveal your invitation
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
