"use client";

import { motion } from "framer-motion";

const skillCategories = [
  { title: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { title: "Backend", skills: ["Node.js", "Python", "SQL", "Prisma"] },
  { title: "Cloud / Data", skills: ["AWS", "GCP", "PostgreSQL"] },
  { title: "Tools", skills: ["Git", "Figma", "Postman", "Linux"] },
];

const stats = [
  { value: "4+", label: "Years building" },
  { value: "8+", label: "Projects shipped" },
  { value: "4", label: "Tech domains" },
];

export default function About() {
  return (
    <>
      <section id="about" className="scroll-mt-24 bg-navy-deep py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow text-mist">About</p>
            <h2 className="headline mt-6 text-[clamp(2.6rem,6vw,4.8rem)]">
              Software that
              <br />
              scales <span className="hl">with intent.</span>
            </h2>
            <div className="eyebrow mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[0.72rem] text-white/80">
              <span className="flex items-center gap-3">
                <span className="h-2 w-2 bg-brand" /> Maputo, MZ
              </span>
              <span className="flex items-center gap-3">
                <span className="h-2 w-2 bg-brand" /> Available now
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-5 text-lg leading-relaxed text-white/85 md:text-xl">
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

            <dl className="mt-10 grid grid-cols-3 border-t border-white/15">
              {stats.map((s) => (
                <div key={s.label} className="border-b border-white/15 py-6 pr-4">
                  <dt className="headline text-5xl text-brand md:text-6xl">{s.value}</dt>
                  <dd className="eyebrow mt-2 text-[0.68rem] text-mist">{s.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
          <p className="eyebrow text-mist">Capabilities</p>
          <div className="mt-8 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.07 * i }}
                className="border-b border-white/15 py-8 sm:pr-6 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:pl-6 lg:first:pl-0"
              >
                <h3 className="headline text-3xl">{cat.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {cat.skills.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-lg text-white/85">
                      <span className="h-2 w-2 bg-brand" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
