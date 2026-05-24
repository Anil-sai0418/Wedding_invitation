"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/weddingData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, scaleIn } from "@/lib/animations";

export default function InvitationMessage() {
  return (
    <SectionWrapper id="message" variant="dark">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-gold/15 p-10 md:p-14"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-gold/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full border border-gold/5"
        />

        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-center font-script text-6xl text-gold md:text-7xl"
        >
          ॐ
        </motion.p>
        <motion.p
          variants={fadeUp}
          custom={0.1}
          className="mt-2 text-center font-script text-3xl text-gold-light/90 md:text-4xl"
        >
          Mangalyam tantunanena...
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={0.2}
          className="mx-auto my-8 h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />

        <motion.p
          variants={fadeUp}
          custom={0.3}
          className="text-center font-body text-lg italic leading-[2] text-cream/85 md:text-xl"
        >
          {weddingData.message}
        </motion.p>

        <motion.div variants={fadeUp} custom={0.4} className="mt-10 text-center">
          <p className="font-script text-4xl text-gold md:text-5xl">With love and blessings,</p>
          <p className="mt-3 font-ceremonial text-lg tracking-wide text-gold-light/80">
            Venkat & Reddy Families
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
