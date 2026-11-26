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
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-slate-200">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="pt-[72px]">
        <Hero />
        <About />
        <CaseStudies />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
