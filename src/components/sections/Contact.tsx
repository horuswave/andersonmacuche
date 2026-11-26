"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Email", value: "andersonmacuche@gmail.com", href: "mailto:andersonmacuche@gmail.com" },
  { label: "Phone", value: "+258 85 5651 603", href: "tel:+258855651603" },
  { label: "GitHub", value: "github.com/horuswave", href: "https://github.com/horuswave" },
  { label: "LinkedIn", value: "anderson-macuche", href: "https://www.linkedin.com/in/anderson-macuche/" },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-brand py-20 text-navy md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-navy/70">Contact · Maputo, Mozambique</p>
          <h2 className="headline mt-6 text-[clamp(3rem,8vw,6.4rem)]">
            Let&apos;s build
            <br />
            something solid.
          </h2>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-navy/85">
            Open to freelance, contract and full-time roles in software
            engineering, systems design and data engineering. Best for
            projects where clarity and delivery quality matter.
          </p>
        </motion.div>

        <div className="border-t-2 border-navy self-end">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.07 * i }}
              className="group flex items-center justify-between gap-4 border-b-2 border-navy py-5 transition-colors hover:bg-navy hover:px-4 hover:text-brand"
            >
              <span>
                <span className="eyebrow block text-[0.68rem] opacity-70">{l.label}</span>
                <span className="mt-1 block break-all text-xl font-semibold md:text-2xl">{l.value}</span>
              </span>
              <ArrowUpRight className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
