"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Minus, Plus, X } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { fadeUp } from "@/lib/animations";

type RSVPForm = { name: string; phone: string; guests: number; attending: "yes" | "no" };

export default function RSVPSection() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const { register, handleSubmit, setValue, watch } = useForm<RSVPForm>({
    defaultValues: { guests: 2, attending: "yes" },
  });
  const guests = watch("guests");
  const attending = watch("attending");

  const onSubmit = () => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.7 } });
    setOpen(false);
    setToast("We can't wait to see you! 🌸");
    setTimeout(() => setToast(""), 2200);
  };

  const inputClass =
    "min-h-12 w-full rounded-xl border border-gold/20 bg-cream px-4 font-body text-charcoal placeholder:text-charcoal/40 transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

  return (
    <SectionWrapper id="rsvp" variant="warm">
      <SectionHeader
        label="RSVP"
        title="Will you join our celebration?"
        subtitle="Your presence would mean the world to us"
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center"
      >
        <Button onClick={() => setOpen(true)} variant="primary" className="px-12 py-4 text-base">
          RSVP Now
        </Button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-end justify-center bg-charcoal/40 backdrop-blur-sm md:items-center md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%", opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0.8 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full max-w-lg rounded-t-3xl border border-gold/15 bg-ivory p-6 shadow-gold-lg md:rounded-3xl md:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-2xl text-maroon">Your RSVP</h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex min-h-10 min-w-10 items-center justify-center rounded-full border border-gold/20 text-charcoal/60 hover:bg-gold/5"
                >
                  <X size={18} />
                </button>
              </div>

              <input
                {...register("name", { required: true })}
                placeholder="Your Name"
                className={`${inputClass} mb-4`}
              />
              <input
                {...register("phone", { required: true })}
                placeholder="Phone Number"
                className={`${inputClass} mb-4`}
              />

              <div className="mb-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setValue("guests", Math.max(1, guests - 1))}
                  className="flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-gold/20 bg-cream transition-colors hover:border-gold"
                >
                  <Minus size={18} />
                </button>
                <motion.div
                  key={guests}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="min-h-12 flex-1 rounded-xl border border-gold/20 bg-cream text-center font-ceremonial leading-[3rem] text-maroon"
                >
                  {guests} {guests === 1 ? "guest" : "guests"}
                </motion.div>
                <button
                  type="button"
                  onClick={() => setValue("guests", guests + 1)}
                  className="flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-gold/20 bg-cream transition-colors hover:border-gold"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "yes" as const, label: "Yes, I'll be there!" },
                    { value: "no" as const, label: "Sending love from afar" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setValue("attending", opt.value)}
                    className={`relative min-h-12 rounded-xl border px-3 font-ceremonial text-xs transition-all md:text-sm ${
                      attending === opt.value
                        ? "border-gold bg-gold/10 text-maroon"
                        : "border-gold/20 bg-cream text-charcoal/70 hover:border-gold/40"
                    }`}
                  >
                    {attending === opt.value && (
                      <Check size={14} className="absolute right-2 top-2 text-gold" />
                    )}
                    {opt.label}
                  </button>
                ))}
              </div>

              <Button type="submit" variant="primary" className="w-full py-4">
                Submit RSVP
              </Button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!!toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed right-5 top-24 z-[99] rounded-2xl border border-gold/20 bg-charcoal px-5 py-4 font-body text-cream shadow-gold"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
