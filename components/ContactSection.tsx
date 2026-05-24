"use client";

import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/weddingData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { slideIn, staggerContainer } from "@/lib/animations";

export default function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <SectionHeader
        label="Get in Touch"
        title="Contact the Family"
        subtitle="Reach out for any questions about the celebration"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2"
      >
        {weddingData.contacts.map((c, idx) => (
          <motion.article
            key={c.phone}
            variants={slideIn(idx === 0 ? "left" : "right")}
            whileHover={{ y: -4 }}
            className="group rounded-3xl border border-gold/15 bg-cream/80 p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
          >
            <p className="mb-1 font-ceremonial text-xs tracking-[0.3em] uppercase text-gold">
              {c.relation}
            </p>
            <h3 className="font-display text-3xl text-maroon">{c.name}</h3>

            <div className="mt-6 space-y-3">
              <a
                className="flex min-h-12 items-center gap-3 rounded-xl px-4 font-body text-charcoal transition-colors hover:bg-gold/5"
                href={`tel:${c.phone}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Phone size={16} />
                </span>
                {c.phone}
              </a>
              <Button
                as="a"
                href={`https://wa.me/${c.phone.replace(/\D/g, "")}`}
                variant="whatsapp"
                className="w-full gap-2"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </Button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
