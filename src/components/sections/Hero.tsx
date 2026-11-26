"use client";

import { motion } from "framer-motion";
import BinaryField from "../interface/BinaryField";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden"
    >
      <BinaryField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(56,189,248,0.07),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-gradient text-[clamp(2.4rem,7vw,4.6rem)] font-bold leading-[1.1] tracking-tight"
        >
          Hi, I&apos;m Anderson Macuche.
          <br />
          I build software that scales.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-sky-200/80 md:text-xl"
        >
          Software engineer and big data practitioner building full-stack
          products, data workflows and system integrations, with clean
          architecture and interfaces that serve real needs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="btn-glow inline-block rounded-xl px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white"
          >
            Let&apos;s talk
          </a>
          <a
            href="#case-studies"
            className="inline-block rounded-xl border border-slate-700 px-8 py-3.5 text-base font-semibold uppercase tracking-wide text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            My work
          </a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 grid h-9 w-9 -translate-x-1/2 place-items-center"
      >
        <span className="animate-pulse-ring absolute h-9 w-9 rounded-full border border-sky-500/60" />
        <span className="h-9 w-9 rounded-full border-2 border-sky-500" />
        <span className="absolute h-2 w-2 rounded-full border border-sky-400" />
      </a>
    </section>
  );
}
