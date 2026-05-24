"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { weddingData } from "@/lib/weddingData";

const links = [
  { href: "#couple", label: "Couple" },
  { href: "#muhurtam", label: "Muhurtam" },
  { href: "#venue", label: "Venue" },
  { href: "#schedule", label: "Schedule" },
  { href: "#gallery", label: "Gallery" },
  { href: "#countdown", label: "Countdown" },
  { href: "#contact", label: "Contact" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Navigation({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!visible) return null;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-card py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#" className="group flex flex-col">
            <span className="font-script text-2xl text-gold transition-colors group-hover:text-gold-light md:text-3xl">
              {weddingData.bride.name.split(" ")[0]} & {weddingData.groom.name}
            </span>
            <span className="font-ceremonial text-[10px] tracking-[0.3em] uppercase text-rose-gold/80">
              Wedding Invitation
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 font-ceremonial text-xs tracking-wide text-charcoal/70 transition-colors hover:bg-gold/10 hover:text-maroon"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-gold/20 bg-cream/60 text-maroon lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] glass-dark lg:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-2 p-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full max-w-xs rounded-2xl px-6 py-4 text-center font-ceremonial text-lg tracking-wide text-cream transition-colors hover:bg-gold/10 hover:text-gold-light"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
