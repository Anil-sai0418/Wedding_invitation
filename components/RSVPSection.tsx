"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type RSVPForm = { name: string; phone: string; guests: number; attending: "yes" | "no" };

export default function RSVPSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const { register, handleSubmit, setValue, watch } = useForm<RSVPForm>({ defaultValues: { guests: 2, attending: "yes" } });
  const guests = watch("guests");
  const onSubmit = () => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.7 } });
    setOpen(false);
    setToast("We can't wait to see you! 🌸");
    setTimeout(() => setToast(""), 2200);
  };
  return (
    <motion.section ref={ref} style={{ opacity, y }} className="z-20 px-5 py-16">
      <h2 className="text-center font-script text-5xl text-temple">Will you join our celebration?</h2>
      <div className="mt-6 text-center">
        <button onClick={() => setOpen(true)} className="min-h-12 rounded-full bg-saffron px-10 py-4 text-white">RSVP Now</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[95] bg-black/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="absolute bottom-0 w-full rounded-t-3xl bg-marble p-5">
              <input {...register("name", { required: true })} placeholder="Your Name" className="mb-3 min-h-12 w-full rounded-xl border border-silk bg-jasmine px-3 focus:outline-none focus:ring-2 focus:ring-saffron" />
              <input {...register("phone", { required: true })} placeholder="Phone Number" className="mb-3 min-h-12 w-full rounded-xl border border-silk bg-jasmine px-3 focus:outline-none focus:ring-2 focus:ring-saffron" />
              <div className="mb-3 flex items-center gap-2">
                <button type="button" onClick={() => setValue("guests", Math.max(1, guests - 1))} className="min-h-12 min-w-12 rounded-xl border border-silk">-</button>
                <div className="min-h-12 flex-1 rounded-xl border border-silk bg-jasmine text-center leading-[3rem]">{guests} guests</div>
                <button type="button" onClick={() => setValue("guests", guests + 1)} className="min-h-12 min-w-12 rounded-xl border border-silk">+</button>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setValue("attending", "yes")} className="min-h-12 rounded-full border border-silk bg-jasmine">Yes, I&apos;ll be there!</button>
                <button type="button" onClick={() => setValue("attending", "no")} className="min-h-12 rounded-full border border-silk bg-jasmine">Sending love from afar</button>
              </div>
              <button className="min-h-12 w-full rounded-full bg-saffron text-white">Submit RSVP</button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
      {!!toast && <div className="fixed right-4 top-4 z-[99] rounded-xl bg-temple px-4 py-3 text-jasmine">{toast}</div>}
    </motion.section>
  );
}
