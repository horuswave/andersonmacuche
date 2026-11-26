"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/types/caseStudy";

function Thumb({ study }: { study: CaseStudy }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-navy-soft">
      {failed ? (
        <div className="headline grid h-full place-items-center px-4 text-center text-3xl text-brand">
          {study.title}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={study.image}
          alt={`${study.title} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top grayscale transition duration-500 group-hover:grayscale-0"
        />
      )}
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h4 className="eyebrow mb-3 text-[0.72rem] text-brand">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Card({ id, study, index }: { id: string; study: CaseStudy; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col border border-white/15 bg-navy-deep transition-colors hover:border-brand/70"
    >
      <Thumb study={study} />

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-[0.7rem] text-mist">
          {String(index + 1).padStart(2, "0")} / Project
        </p>
        <h3 className="headline mt-3 text-[clamp(1.8rem,3vw,2.4rem)]">{study.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-white/80">{study.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {study.technologies.slice(0, open ? undefined : 5).map((t) => (
            <span key={t} className="eyebrow border border-white/25 px-2.5 py-1 text-[0.65rem] text-white/85">
              {t}
            </span>
          ))}
          {!open && study.technologies.length > 5 && (
            <span className="eyebrow border border-dashed border-brand/60 px-2.5 py-1 text-[0.65rem] text-brand">
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
              <div className="space-y-6 pt-6">
                <section>
                  <h4 className="eyebrow mb-3 text-[0.72rem] text-brand">Challenge</h4>
                  <p className="text-[15px] leading-relaxed text-white/85">{study.challenge}</p>
                </section>
                <Block title="Approach" items={study.approach} />
                <Block title="Results" items={study.results} />
                {study.dashboardFeatures && (
                  <Block title="Dashboard features" items={study.dashboardFeatures} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${id}-details`}
            className="inline-flex items-center gap-2 text-base font-semibold underline decoration-2 underline-offset-[6px] hover:text-brand"
          >
            {open ? "Show less" : "Read the case study"}
            <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {study.live && (
            <a
              href={study.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yellow inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-semibold"
            >
              Visit site <ArrowUpRight size={16} />
            </a>
          )}
          {study.github && (
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold hover:text-brand"
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
    <section id="case-studies" className="scroll-mt-24 bg-navy-deep py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p className="eyebrow text-mist">Selected work</p>
          <h2 className="headline mt-6 text-[clamp(2.6rem,6vw,4.8rem)]">
            Built, shipped, <span className="hl">in use.</span>
          </h2>
          <p className="mt-6 text-lg text-white/80 md:text-xl">
            Real products for real people. Open any project for the full case
            study.
          </p>
        </motion.div>

        <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(caseStudies).map(([id, study], i) => (
            <Card key={id} id={id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
