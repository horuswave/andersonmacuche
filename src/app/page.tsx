"use client";

import { useState } from "react";
import ParticleBackground from "@/components/interface/ParticleBackground";
import IntroTerminal from "@/components/interface/IntroTerminal";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import CaseStudies from "@/components/sections/CaseStudies";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <IntroTerminal>
      <main className="relative min-h-screen overflow-x-hidden bg-[#050805] text-zinc-100 selection:bg-emerald-300/20 selection:text-emerald-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.08),transparent_18%),radial-gradient(circle_at_85%_18%,rgba(16,185,129,0.05),transparent_22%),linear-gradient(to_bottom,#040604_0%,#050805_20%,#030503_55%,#020302_100%)]" />

        <div className="pointer-events-none absolute inset-0 opacity-35">
          <ParticleBackground />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background:repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(255,255,255,0.08)_4px)]" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.08%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.9%22/></svg>')]" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.42)_100%)]" />

        {/* Navbar lives outside all stacking contexts — fixed positioning handles placement */}
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div className="relative z-10">
          {/* Top padding offsets the fixed navbar height (~72px) */}
          <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 md:px-8 md:pt-24 lg:px-10">
            <Hero />
          </div>
        </div>

        <div className="pointer-events-none relative z-10 mx-auto h-20 max-w-7xl bg-gradient-to-b from-transparent via-[#050805]/70 to-[#050805]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 md:px-8 md:pb-14 lg:px-10">
          <section className="relative">
            <About />
          </section>

          <section className="relative mt-20 md:mt-28">
            <CaseStudies />
          </section>

          <section className="relative mt-20 md:mt-28">
            <Contact />
          </section>

          <section className="relative mt-16 md:mt-20">
            <Footer />
          </section>
        </div>
      </main>
    </IntroTerminal>
  );
}
