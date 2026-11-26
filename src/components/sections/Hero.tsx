"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const points = [
  "Full-stack & data engineering",
  "Open to freelance & full-time",
  "Production-ready delivery",
  "Based in Maputo",
];

/** Right-hand photo panel. Drop a photo at /public/hero.jpg to use it. */
function HeroPanel() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative h-full w-full overflow-hidden bg-navy-soft">
      {failed ? (
        <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,#1a2e52_0%,#0c1830_100%)]">
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:56px_56px]" />
          <span className="headline relative text-[clamp(6rem,16vw,14rem)] text-brand/90">
            A.M
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/hero.jpg"
          alt="Anderson Macuche"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover grayscale"
        />
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative pt-[88px]">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[1.15fr_1fr]">
        <div className="px-5 pb-16 pt-14 sm:px-8 md:pt-20 lg:pl-14 lg:pr-10 lg:pt-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="eyebrow text-mist"
          >
            Software · Data · Systems
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="headline mt-8 text-[clamp(3.4rem,9.5vw,7.4rem)]"
          >
            I build software
            <br />
            that works,
            <br />
            <span className="hl mt-2">reliably.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 max-w-xl text-xl leading-relaxed text-white/85 md:text-[22px]"
          >
            I&apos;m Anderson Macuche, a software engineer and big data
            practitioner. I build full-stack products, data workflows and
            system integrations with clean architecture and interfaces that
            serve real needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <a
              href="#contact"
              className="btn-yellow inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-semibold"
            >
              Get in touch <ArrowRight size={20} />
            </a>
            <a
              href="#case-studies"
              className="inline-flex items-center gap-2 text-lg font-semibold underline decoration-2 underline-offset-[6px] transition hover:text-brand"
            >
              See my work <ArrowRight size={18} />
            </a>
          </motion.div>

          <ul className="eyebrow mt-12 grid gap-x-8 gap-y-3 text-[0.72rem] text-white/80 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 bg-brand" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden min-h-[640px] lg:block">
          <HeroPanel />
        </div>
      </div>
    </section>
  );
}
