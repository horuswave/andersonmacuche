"use client";

import { motion } from "framer-motion";
import { Code, Database, Cloud, Cpu, MapPin } from "lucide-react";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";

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

const skillCategories = [
  {
    icon: Code,
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Database,
    title: "Backend",
    skills: ["Node.js", "Python", "SQL", "Prisma"],
  },
  {
    icon: Cloud,
    title: "Cloud / Data",
    skills: ["AWS", "GCP", "PostgreSQL"],
  },
  {
    icon: Cpu,
    title: "Tools",
    skills: ["Git", "Figma", "Postman", "Linux"],
  },
];

const stats = [
  { value: "4+", label: "Years building" },
  { value: "8+", label: "Projects shipped" },
  { value: "4", label: "Tech domains" },
];

export default function About() {
  return (
    <section
      id="about"
      className={`relative py-20 md:py-28 ${serif.variable} ${mono.variable}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(34,197,94,0.04),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.36em] text-zinc-500">
              02 / About
            </p>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[0.95] text-zinc-100">
              Building software that
              <br />
              <span className="text-zinc-400">scales with intent.</span>
            </h2>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 md:gap-10 md:pb-1">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <span className="font-serif text-3xl font-medium text-emerald-300/90 md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── MAIN CONTENT ── */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          {/* LEFT — bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-5 font-mono text-[13px] leading-[1.85] text-zinc-400 md:text-[13.5px]">
              <p>
                Computer Science graduate and software engineer with hands-on
                experience across full-stack development, systems architecture,
                and production-ready digital products.
              </p>
              <p>
                My work includes reservation platforms, operations dashboards,
                data pipelines, and health-sector systems — all built for
                real-world deployment and daily use.
              </p>
              <p>
                I have a strong interest in software architecture, data systems,
                and API design, with a consistent focus on building tools that
                are robust, maintainable, and well-documented.
              </p>
            </div>

            {/* Meta strip */}
            <div className="grid grid-cols-2 gap-3 border-t border-emerald-400/10 pt-6 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600">
                  Location
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                  <MapPin size={11} className="text-emerald-400/60" />
                  Maputo, MZ
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600">
                  Availability
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Open now
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600">
                  Focus
                </span>
                <span className="font-mono text-[11px] text-zinc-400">
                  Full-stack · Data
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-3"
          >
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.32em] text-zinc-600">
              Core capabilities
            </p>

            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 * index }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-4 border border-emerald-400/10 bg-emerald-500/[0.025] px-4 py-4 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/25 hover:bg-emerald-500/[0.05]"
                >
                  {/* icon */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-emerald-400/15 bg-black/25 text-emerald-300/80 transition-all duration-300 group-hover:border-emerald-400/30 group-hover:text-emerald-200">
                    <Icon size={15} />
                  </div>

                  {/* title */}
                  <span className="w-20 shrink-0 font-serif text-[1.05rem] text-zinc-300 transition-colors duration-300 group-hover:text-zinc-100">
                    {category.title}
                  </span>

                  {/* divider */}
                  <div className="h-4 w-px shrink-0 bg-emerald-400/15" />

                  {/* skills inline */}
                  <div className="flex min-w-0 flex-wrap gap-x-3 gap-y-1">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
