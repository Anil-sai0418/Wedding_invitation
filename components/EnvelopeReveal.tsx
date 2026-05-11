"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";

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
        <motion.div className="noise fixed inset-0 z-[120] flex items-center justify-center bg-temple p-4" initial={{ opacity: 1 }} animate={controls} variants={{ fade: { opacity: 0 } }} exit={{ opacity: 0 }}>
          <div className="w-full max-w-md">
            <div className="relative mx-auto h-64 rounded-xl bg-marble shadow-2xl">
              <motion.div variants={{ flap: { rotateX: -180, transition: { duration: 0.8 } } }} initial={{ rotateX: 0 }} animate={controls} className="absolute inset-x-0 top-0 h-24 origin-top rounded-t-xl bg-jasmine" style={{ transformStyle: "preserve-3d" }} />
              <motion.div variants={{ card: { y: "-120%", scale: 1.05, transition: { type: "spring" } } }} animate={controls} className="absolute inset-x-8 top-16 rounded-lg bg-jasmine p-6 text-center">
                <p className="font-script text-3xl text-copper">Together Forever</p>
              </motion.div>
              <div className="absolute left-1/2 top-[40%] h-16 w-36 -translate-x-1/2">
                <motion.div variants={{ ribbon: { x: -100, opacity: 0 } }} animate={controls} className="absolute left-0 top-1/2 h-2 w-1/2 -translate-y-1/2 bg-saffron" />
                <motion.div variants={{ ribbon: { x: 100, opacity: 0 } }} animate={controls} className="absolute right-0 top-1/2 h-2 w-1/2 -translate-y-1/2 bg-saffron" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button onClick={reveal} variants={{ seal: { scale: 0, rotate: 90, opacity: 0 } }} animate={controls} className="h-16 w-16 rounded-full bg-saffron text-jasmine shadow-xl">
                  ✿
                </motion.button>
              </div>
            </div>
            <motion.p animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} className="mt-6 text-center font-body text-jasmine">
              Tap the seal to reveal your invitation
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
