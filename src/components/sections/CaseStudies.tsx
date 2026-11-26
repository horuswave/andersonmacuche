"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, Github } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/types/caseStudy";

function Thumb({ study }: { study: CaseStudy }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-sky-400/15 bg-gradient-to-br from-blue-950 to-slate-900">
      {failed ? (
        <div className="grid h-full place-items-center px-4 text-center text-xl font-semibold text-sky-200">
          {study.title}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={study.image}
          alt={`${study.title} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}

function List({ items, icon }: { items: string[]; icon: string }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2 text-sm leading-relaxed text-slate-300">
          <Check size={16} className={`mt-0.5 shrink-0 ${icon}`} />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Card({ id, study }: { id: string; study: CaseStudy }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="card-dark flex flex-col rounded-2xl p-4 md:p-5"
    >
      <Thumb study={study} />

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="text-xl font-semibold text-white">{study.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400 md:text-[15px]">
          {study.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {study.technologies.slice(0, open ? undefined : 5).map((t) => (
            <span key={t} className="rounded-md bg-sky-400/10 px-2.5 py-1 text-xs font-medium text-sky-200">
              {t}
            </span>
          ))}
          {!open && study.technologies.length > 5 && (
            <span className="rounded-md border border-dashed border-sky-400/30 px-2.5 py-1 text-xs text-sky-300">
              +{study.technologies.length - 5}
            </span>
          )}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`${id}-details`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-5 pt-5">
                <section>
                  <h4 className="mb-1 text-sm font-semibold uppercase tracking-wider text-sky-400">Challenge</h4>
                  <p className="text-sm leading-relaxed text-slate-300">{study.challenge}</p>
                </section>
                <section>
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400">Approach</h4>
                  <List items={study.approach} icon="text-cyan-400" />
                </section>
                <section>
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400">Results</h4>
                  <List items={study.results} icon="text-emerald-400" />
                </section>
                {study.dashboardFeatures && (
                  <section>
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400">Dashboard features</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.dashboardFeatures.map((f) => (
                        <span key={f} className="rounded-full border border-cyan-400/25 px-3 py-1 text-xs text-cyan-200">
                          {f}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${id}-details`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            {open ? "Show less" : "Case study"}
            <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {study.live && (
            <a
              href={study.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
            >
              Visit site <ArrowUpRight size={16} />
            </a>
          )}
          {study.github && (
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400"
            >
              <Github size={16} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="text-gradient text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight">
            My Work
          </h2>
          <p className="mt-4 text-lg text-sky-200/70">
            Real products for real people. Open any card for the full case study.
          </p>
        </motion.div>

        <div className="grid items-start gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(caseStudies).map(([id, study]) => (
            <Card key={id} id={id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
