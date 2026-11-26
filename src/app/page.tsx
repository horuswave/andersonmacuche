"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import CaseStudies from "@/components/sections/CaseStudies";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream bg-[radial-gradient(var(--color-ink)_1px,transparent_1px)] bg-[length:28px_28px] bg-fixed text-ink">
      {/* soften the dot grid so it stays a whisper */}
      <div className="pointer-events-none fixed inset-0 bg-cream/90" />

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="relative mx-auto max-w-6xl px-4 pt-20 sm:px-6 md:pt-24">
        <Hero />
        <About />
        <CaseStudies />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
