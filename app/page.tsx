"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CountdownSection from "@/components/CountdownSection";
import CoupleSection from "@/components/CoupleSection";
import EnvelopeReveal from "@/components/EnvelopeReveal";
import FloatingPetals from "@/components/FloatingPetals";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import InvitationMessage from "@/components/InvitationMessage";
import MuhurtamSection from "@/components/MuhurtamSection";
import Navigation from "@/components/Navigation";
import RSVPSection from "@/components/RSVPSection";
import ScheduleSection from "@/components/ScheduleSection";
import ThreeBackground from "@/components/ThreeBackground";
import VenueSection from "@/components/VenueSection";
import ContactSection from "@/components/ContactSection";
import { weddingData } from "@/lib/weddingData";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

export default function Home() {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div className="relative min-h-screen overflow-x-hidden bg-ivory bg-mesh-warm grain">
      <ThreeBackground />
      <FloatingPetals />
      {!revealed && <EnvelopeReveal onDone={() => setRevealed(true)} />}
      <Navigation visible={revealed} />
      <main
        className={`relative z-20 transition-opacity duration-1000 ${
          revealed ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <HeroSection />
        <CoupleSection />
        <MuhurtamSection />
        <VenueSection />
        <ScheduleSection />
        <InvitationMessage />
        <GallerySection />
        <CountdownSection />
        <ContactSection />
        <RSVPSection />
        <footer className="relative z-20 overflow-hidden bg-charcoal px-5 py-16 text-center md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl"
          >
            <p className="font-ceremonial text-xs tracking-[0.4em] uppercase text-gold/60">
              With love & blessings
            </p>
            <h3 className="mt-4 font-display text-5xl text-cream md:text-6xl">
              {weddingData.bride.name} & {weddingData.groom.name}
            </h3>
            <p className="mt-3 font-ceremonial text-gold-light/80">
              {format(weddingData.wedding.date, "MMMM do, yyyy")}
            </p>
            <div className="mx-auto my-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <p className="font-script text-3xl text-gold">Made with love ♥</p>
            <p className="mt-3 text-xs text-cream/40">© 2026</p>
          </motion.div>
        </footer>
      </main>
      <a
        href="#"
        className="group fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-light px-5 py-3.5 font-ceremonial text-xs tracking-wide text-charcoal shadow-gold transition-all hover:shadow-gold-lg md:bottom-8 md:right-8"
      >
        <Calendar size={16} className="transition-transform group-hover:scale-110" />
        Add to Calendar
      </a>
    </motion.div>
  );
}
