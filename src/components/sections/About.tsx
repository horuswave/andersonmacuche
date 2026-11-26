"use client";

import { motion } from "framer-motion";
import { Code, Cloud, Cpu, Database, MapPin } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Frontend",
    color: "bg-pink",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Database,
    title: "Backend",
    color: "bg-sky",
    skills: ["Node.js", "Python", "SQL", "Prisma"],
  },
  {
    icon: Cloud,
    title: "Cloud / Data",
    color: "bg-mint",
    skills: ["AWS", "GCP", "PostgreSQL"],
  },
  {
    icon: Cpu,
    title: "Tools",
    color: "bg-lilac",
    skills: ["Git", "Figma", "Postman", "Linux"],
  },
];

const stats = [
  { value: "4+", label: "Years building", color: "bg-sun" },
  { value: "8+", label: "Projects shipped", color: "bg-coral text-white" },
  { value: "4", label: "Tech domains", color: "bg-mint" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-28 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <span className="sticker-sm inline-block rotate-2 rounded-full bg-lilac px-4 py-1 text-sm font-extrabold">
          About me
        </span>
        <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight">
          Building software that{" "}
          <span className="underline decoration-coral decoration-[6px] underline-offset-[6px]">
            scales with intent
          </span>
        </h2>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* story */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="sticker rounded-3xl bg-paper p-6 md:p-8 lg:col-span-3"
        >
          <div className="space-y-4 text-base font-semibold leading-relaxed text-ink-soft md:text-lg">
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
              I love software architecture, data systems and API design, and I
              keep my tools robust, maintainable and well-documented.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="sticker-sm inline-flex items-center gap-2 rounded-full bg-sky px-4 py-1.5 text-sm font-extrabold">
              <MapPin size={16} /> Maputo, MZ
            </span>
            <span className="sticker-sm inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-extrabold">
              ● Available now
            </span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.1 * i }}
                className={`sticker-sm rounded-2xl p-3 text-center md:p-4 ${s.color} ${
                  i === 1 ? "-rotate-2" : i === 2 ? "rotate-2" : ""
                }`}
              >
                <div className="font-display text-3xl font-semibold md:text-4xl">
                  {s.value}
                </div>
                <div className="text-xs font-extrabold md:text-sm">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* skills */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className={`sticker-sm pop flex items-center gap-4 rounded-2xl p-4 ${cat.color}`}
              >
                <div className="sticker-sm grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-paper">
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {cat.title}
                  </h3>
                  <p className="text-sm font-bold">{cat.skills.join(" · ")}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
