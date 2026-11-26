"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, Star } from "lucide-react";

const marquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Prisma",
  "Tailwind",
  "Big Data",
];

export default function Hero() {
  return (
    <section id="home" className="relative pb-10 pt-12 md:pt-20">
      {/* floating decorations */}
      <Star
        aria-hidden
        className="animate-floaty absolute left-2 top-10 fill-sun text-ink md:left-10"
        size={44}
        strokeWidth={2.5}
      />
      <div
        aria-hidden
        className="animate-floaty absolute right-4 top-32 h-14 w-14 rounded-full border-[2.5px] border-ink bg-pink [animation-delay:1s] md:right-24"
      />
      <Sparkles
        aria-hidden
        className="animate-wiggle absolute bottom-40 left-6 text-coral md:left-24"
        size={36}
        strokeWidth={2.5}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="sticker-sm mb-6 inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-extrabold"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ink" />
          </span>
          Open to new projects · Maputo, MZ
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[clamp(2.8rem,9vw,6rem)] font-semibold leading-[1.02] tracking-tight"
        >
          Hi, I&apos;m{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Anderson</span>
            <span
              aria-hidden
              className="absolute inset-x-[-0.15em] bottom-[0.08em] z-0 h-[0.4em] -rotate-1 rounded-full bg-sun"
            />
          </span>
          <br />
          I build{" "}
          <span className="inline-block -rotate-2 rounded-3xl border-[3px] border-ink bg-coral px-3 text-white shadow-[5px_5px_0_0_var(--color-ink)]">
            friendly
          </span>{" "}
          software.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-ink-soft md:text-xl"
        >
          Software engineer and big data practitioner making full-stack
          products, data workflows and system integrations that are clean,
          sturdy and actually a joy to use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#case-studies"
            className="sticker pop inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 font-display text-lg font-medium text-white"
          >
            See my work <ArrowRight size={20} strokeWidth={3} />
          </a>
          <a
            href="/ANDERSON-MACUCHE-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="sticker pop inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 font-display text-lg font-medium"
          >
            <Download size={20} strokeWidth={3} /> Get my CV
          </a>
        </motion.div>
      </div>

      {/* skills ticker */}
      <div
        aria-hidden
        className="sticker -mx-4 mt-16 -rotate-1 overflow-hidden rounded-2xl bg-sun py-3 md:mx-0"
      >
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-display text-xl font-medium">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              {item}
              <Star size={18} className="fill-ink" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
