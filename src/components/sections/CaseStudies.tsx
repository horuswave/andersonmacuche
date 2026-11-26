"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, Github } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/types/caseStudy";

const cardColors = ["bg-sun", "bg-pink", "bg-mint", "bg-lilac", "bg-sky"];

function Thumb({ study, color }: { study: CaseStudy; color: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`sticker-sm relative aspect-[16/10] overflow-hidden rounded-2xl ${color}`}
    >
      {failed ? (
        <div className="grid h-full place-items-center px-4 text-center font-display text-2xl font-semibold">
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

function Card({
  id,
  study,
  index,
}: {
  id: string;
  study: CaseStudy;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const color = cardColors[index % cardColors.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="sticker flex flex-col rounded-3xl bg-paper p-4 md:p-5"
    >
      <Thumb study={study} color={color} />

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-display text-2xl font-semibold leading-tight">
          {study.title}
        </h3>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-ink-soft md:text-base">
          {study.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {study.technologies.slice(0, open ? undefined : 5).map((t) => (
            <span
              key={t}
              className="rounded-full border-2 border-ink bg-cream px-3 py-0.5 text-xs font-extrabold"
            >
              {t}
            </span>
          ))}
          {!open && study.technologies.length > 5 && (
            <span className="rounded-full border-2 border-dashed border-ink px-3 py-0.5 text-xs font-extrabold">
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
                  <h4 className="mb-1 font-display text-lg font-semibold">
                    🎯 The challenge
                  </h4>
                  <p className="text-sm font-semibold leading-relaxed text-ink-soft">
                    {study.challenge}
                  </p>
                </section>

                <section>
                  <h4 className="mb-2 font-display text-lg font-semibold">
                    🛠️ How I built it
                  </h4>
                  <ul className="space-y-2">
                    {study.approach.map((a) => (
                      <li
                        key={a}
                        className="flex gap-2 text-sm font-semibold leading-relaxed text-ink-soft"
                      >
                        <Check
                          size={16}
                          strokeWidth={3}
                          className="mt-1 shrink-0 text-coral"
                        />
                        {a}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="mb-2 font-display text-lg font-semibold">
                    🎉 The results
                  </h4>
                  <ul className="space-y-2">
                    {study.results.map((r) => (
                      <li
                        key={r}
                        className="flex gap-2 text-sm font-semibold leading-relaxed text-ink-soft"
                      >
                        <Check
                          size={16}
                          strokeWidth={3}
                          className="mt-1 shrink-0 text-mint"
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>

                {study.dashboardFeatures && (
                  <section>
                    <h4 className="mb-2 font-display text-lg font-semibold">
                      ✨ Dashboard features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {study.dashboardFeatures.map((f) => (
                        <span
                          key={f}
                          className={`sticker-sm rounded-full px-3 py-1 text-xs font-extrabold ${color}`}
                        >
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

        <div className="mt-5 flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${id}-details`}
            className="sticker-sm pop inline-flex items-center gap-1.5 rounded-full bg-sun px-4 py-2 text-sm font-extrabold"
          >
            {open ? "Show less" : "The full story"}
            <ChevronDown
              size={16}
              strokeWidth={3}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {study.live && (
            <a
              href={study.live}
              target="_blank"
              rel="noopener noreferrer"
              className="sticker-sm pop inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 text-sm font-extrabold text-white"
            >
              Visit site <ArrowUpRight size={16} strokeWidth={3} />
            </a>
          )}
          {study.github && (
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="sticker-sm pop inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-extrabold"
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
  const entries = Object.entries(caseStudies);

  return (
    <section id="case-studies" className="scroll-mt-28 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <span className="sticker-sm inline-block -rotate-2 rounded-full bg-pink px-4 py-1 text-sm font-extrabold">
          Projects
        </span>
        <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight">
          Things I&apos;ve{" "}
          <span className="underline decoration-mint decoration-[6px] underline-offset-[6px]">
            made &amp; shipped
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-semibold text-ink-soft">
          Real products for real people. Open any card for the full story.
        </p>
      </motion.div>

      <div className="grid items-start gap-8 md:grid-cols-2">
        {entries.map(([id, study], i) => (
          <Card key={id} id={id} study={study} index={i} />
        ))}
      </div>
    </section>
  );
}
