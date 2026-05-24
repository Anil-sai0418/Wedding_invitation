"use client";

import { MapPin, Navigation2, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/weddingData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { fadeUp, scaleIn } from "@/lib/animations";

export default function VenueSection() {
  return (
    <SectionWrapper id="venue" variant="warm">
      <SectionHeader
        label="Location"
        title={weddingData.venue.name}
        subtitle="Join us at this sacred venue for our celebration"
      />

      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="overflow-hidden rounded-3xl glass shadow-card"
      >
        <div className="p-6 md:p-8">
          <motion.p
            variants={fadeUp}
            custom={0}
            className="flex items-start gap-3 font-body text-lg text-charcoal/80 md:text-xl"
          >
            <MapPin size={22} className="mt-1 shrink-0 text-gold" />
            {weddingData.venue.address}
          </motion.p>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-cream/80 to-transparent" />
          <iframe
            title="map"
            src={weddingData.venue.mapsEmbed}
            loading="lazy"
            className="aspect-[16/10] w-full border-0 md:aspect-video"
          />
        </div>

        <div className="flex flex-wrap gap-3 p-6 md:p-8">
          <Button as="a" href={weddingData.venue.mapUrl} variant="primary" className="gap-2">
            <Navigation2 size={16} />
            Get Directions
          </Button>
          <Button as="a" href="#" variant="secondary" className="gap-2">
            <Calendar size={16} />
            Google Calendar
          </Button>
          <Button as="a" href="#" variant="secondary" className="gap-2">
            <Calendar size={16} />
            Apple Calendar
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
