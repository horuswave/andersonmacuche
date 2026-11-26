"use client";

import { motion } from "framer-motion";
import { Code, Cloud, Cpu, Database, MapPin } from "lucide-react";

const skillCategories = [
  { icon: Code, title: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { icon: Database, title: "Backend", skills: ["Node.js", "Python", "SQL", "Prisma"] },
  { icon: Cloud, title: "Cloud / Data", skills: ["AWS", "GCP", "PostgreSQL"] },
  { icon: Cpu, title: "Tools", skills: ["Git", "Figma", "Postman", "Linux"] },
];

const stats = [
  { value: "4+", label: "Years building" },
  { value: "8+", label: "Projects shipped" },
  { value: "4", label: "Tech domains" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-sky-400/10 bg-[#080b10] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="text-gradient text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight">
            About Me
          </h2>
          <p className="mt-4 text-lg text-sky-200/70">
            Building software that scales with intent.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="card-dark rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-4 leading-relaxed text-slate-300">
              <p>
                I&apos;m a Computer Science graduate and software engineer with
                hands-on experience across full-stack development, systems
                architecture and production-ready digital products.
              </p>
              <p>
                My work includes reservation platforms, operations dashboards,
                data pipelines and health-sector systems, all built for
                real-world deployment and daily use.
              </p>
              <p>
                I have a strong interest in software architecture, data
                systems and API design, with a consistent focus on tools that
                are robust, maintainable and well-documented.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 px-4 py-1.5 text-sky-200">
                <MapPin size={15} /> Maputo, MZ
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 px-4 py-1.5 text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Available now
              </span>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-sky-400/15 bg-black/30 p-4 text-center">
                  <div className="text-gradient text-3xl font-bold md:text-4xl">{s.value}</div>
                  <div className="mt-1 text-xs text-slate-400 md:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {skillCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  className="card-dark rounded-2xl p-6"
                >
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/5 text-cyan-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span key={s} className="rounded-md bg-sky-400/10 px-2.5 py-1 text-xs font-medium text-sky-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
