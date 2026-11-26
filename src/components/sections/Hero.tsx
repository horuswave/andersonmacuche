"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import SocialIcons from "../interface/SocialIcons";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { useMemo } from "react";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const CODE_STRINGS = [
  "01001000 01101111 01110010 01110101 01110011",
  "if (signal) return consciousness;",
  "const pattern = memory.map(shadow => shadow.truth)",
  "root@matrix:~$ decode reality",
  "neural.link(render.thought)",
  "while(alive){ searchForMeaning(); }",
  "01100110 01110101 01110100 01110101 01110010 01100101",
  "system.boot('self-awareness')",
  "archive://dreams/fragments/001",
  "sudo awaken --force",
  "const beauty = imperfection && time",
  "echo 'there is code beneath the skin'",
];

function MatrixColumn({
  text,
  delay = 0,
  duration = 14,
  left = "0%",
}: {
  text: string;
  delay?: number;
  duration?: number;
  left?: string;
}) {
  return (
    <motion.div
      initial={{ y: "-120%" }}
      animate={{ y: "120%" }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
      className="absolute top-0 select-none whitespace-pre leading-[1.15] text-[10px] font-medium text-emerald-400/10 md:text-xs"
      style={{ left }}
      aria-hidden="true"
    >
      <div className="flex flex-col gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="font-mono tracking-[0.16em] [text-shadow:0_0_8px_rgba(74,222,128,0.1)]"
          >
            {text}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const columns = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        text: CODE_STRINGS[i % CODE_STRINGS.length],
        left: `${i * 8.6}%`,
        delay: (i % 5) * 1.15,
        duration: 12 + (i % 4) * 2.5,
      })),
    [],
  );

  return (
    <section
      id="home"
      className={`relative isolate overflow-hidden text-zinc-100 ${serif.variable} ${mono.variable}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_20%,rgba(34,197,94,0.06),transparent_20%),radial-gradient(circle_at_82%_24%,rgba(16,185,129,0.04),transparent_22%),linear-gradient(to_bottom,transparent_0%,rgba(6,10,6,0.14)_40%,transparent_100%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {columns.map((col) => (
          <MatrixColumn
            key={col.id}
            text={col.text}
            left={col.left}
            delay={col.delay}
            duration={col.duration}
          />
        ))}
      </div>

      <motion.div
        className="absolute left-1/2 top-[16%] h-[14rem] w-[14rem] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl md:h-[20rem] md:w-[20rem]"
        animate={{
          scale: [1, 1.08, 0.96, 1],
          opacity: [0.12, 0.2, 0.12, 0.12],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_52%,rgba(0,0,0,0.22)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background:repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(255,255,255,0.08)_4px)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-soft-light bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.15%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.9%22/></svg>')]" />

      <div className="relative z-10 mx-auto flex min-h-[clamp(28rem,calc(100svh-9rem),40rem)] max-w-7xl items-center px-4 pb-8 pt-4 sm:px-6 sm:pt-5 md:px-8 md:pb-10 md:pt-6 lg:px-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.78fr)] lg:gap-8 xl:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-4xl"
          >
            {/* <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="mb-3 inline-flex items-center gap-3 border border-emerald-400/10 bg-emerald-500/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-emerald-300/75 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.55)]" />
              Signal detected
            </motion.div> */}

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.7 }}
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500 md:text-[11px]"
            >
              Software Engineer · Systems Design · Data Architecture
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.9 }}
              className="max-w-[14ch] font-serif text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.95] text-zinc-100"
            >
              Full-Stack
              <br />
              <span className="text-zinc-400">Systems Engineer</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "5rem" }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-4 h-px bg-gradient-to-r from-emerald-400/55 via-emerald-400/18 to-transparent"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.85 }}
              className="mt-4 max-w-lg font-mono text-[13px] leading-6 text-zinc-400 md:text-[14px]"
            >
              Software engineer and big data practitioner with experience
              building full-stack products, data workflows, and system
              integrations. Focused on clean architecture, maintainable code,
              and interfaces that serve real operational needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.85 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <motion.a
                href="#case-studies"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="group inline-flex items-center justify-center gap-2 border border-emerald-400/16 bg-emerald-400/8 px-5 py-3 font-mono text-sm tracking-[0.16em] text-emerald-200 backdrop-blur-md transition duration-300 hover:border-emerald-300/28 hover:bg-emerald-400/12 hover:shadow-[0_0_24px_rgba(74,222,128,0.08)]"
              >
                Enter Archive
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.a>

              <motion.a
                href="/ANDERSON-MACUCHE-CV.pdf"
                download
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="group inline-flex items-center justify-center gap-2 border border-zinc-800/80 bg-white/[0.02] px-5 py-3 font-mono text-sm tracking-[0.16em] text-zinc-300 transition duration-300 hover:border-emerald-400/16 hover:text-emerald-200"
              >
                Download CV
                <Download
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-[1px]"
                />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 1 }}
            className="relative mx-auto w-full max-w-[28rem] lg:ml-auto"
          >
            <div className="relative overflow-hidden border border-emerald-400/10 bg-emerald-500/[0.03] p-4 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(74,222,128,0.025),transparent_35%,transparent_100%)]" />

              <div className="relative mb-3 flex items-center justify-between border-b border-emerald-400/8 pb-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    terminal / identity
                  </p>
                  <p className="mt-1.5 font-serif text-xl text-zinc-200 md:text-2xl">
                    anderson.macuche
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/65 shadow-[0_0_10px_rgba(74,222,128,0.4)]" />
                </div>
              </div>

              <div className="relative space-y-3 font-mono text-[13px] text-zinc-400 md:text-sm">
                <div>
                  <span className="text-emerald-300">status:</span> online
                </div>
                <div>
                  <span className="text-emerald-300">focus:</span> full-stack
                  development, systems design, data architecture
                </div>
                <div>
                  <span className="text-emerald-300">approach:</span> precise
                  interfaces, durable logic, user-centered execution
                </div>
                <div>
                  <span className="text-emerald-300">philosophy:</span> clarity
                  over complexity
                </div>

                <motion.div
                  animate={{ opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="pt-2 text-emerald-300"
                >
                  &gt; ready for next challenge_
                </motion.div>
              </div>

              <div className="relative mt-5 border-t border-emerald-400/8 pt-4">
                <SocialIcons />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
