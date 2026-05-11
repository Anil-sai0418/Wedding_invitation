"use client";

import { useState } from "react";
import CountdownSection from "@/components/CountdownSection";
import CoupleSection from "@/components/CoupleSection";
import EnvelopeReveal from "@/components/EnvelopeReveal";
import FloatingPetals from "@/components/FloatingPetals";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import InvitationMessage from "@/components/InvitationMessage";
import MuhurtamSection from "@/components/MuhurtamSection";
import RSVPSection from "@/components/RSVPSection";
import ScheduleSection from "@/components/ScheduleSection";
import SectionDivider from "@/components/SectionDivider";
import ThreeBackground from "@/components/ThreeBackground";
import VenueSection from "@/components/VenueSection";
import ContactSection from "@/components/ContactSection";
import { weddingData } from "@/lib/weddingData";
import { format } from "date-fns";

export default function Home() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="relative overflow-x-hidden bg-marble">
      <ThreeBackground />
      <FloatingPetals />
      {!revealed && <EnvelopeReveal onDone={() => setRevealed(true)} />}
      <main className={`relative z-20 transition-opacity duration-1000 ${revealed ? "opacity-100" : "opacity-0"}`}>
        <HeroSection />
        <SectionDivider />
        <CoupleSection />
        <MuhurtamSection />
        <VenueSection />
        <ScheduleSection />
        <InvitationMessage />
        <GallerySection />
        <CountdownSection />
        <ContactSection />
        <RSVPSection />
        <footer className="bg-inkstone px-5 py-12 text-center">
          <h3 className="font-display text-6xl text-turmeric">{weddingData.bride.name} & {weddingData.groom.name}</h3>
          <p className="font-ceremonial text-silk">{format(weddingData.wedding.date, "MMMM do, yyyy")}</p>
          <p className="mt-2 font-script text-2xl text-copper">Made with love ♥</p>
          <p className="mt-1 text-xs text-silk/80">© 2026</p>
        </footer>
      </main>
      <a href="#" className="fixed bottom-6 right-4 z-50 rounded-full bg-saffron px-5 py-3 text-sm text-white shadow-xl">📅 Add to Calendar</a>
    </div>
  );
}
