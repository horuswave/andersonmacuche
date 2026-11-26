"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const links = [
  { label: "Email", value: "andersonmacuche@gmail.com", href: "mailto:andersonmacuche@gmail.com", icon: Mail },
  { label: "Phone", value: "+258 85 5651 603", href: "tel:+258855651603", icon: Phone },
  { label: "GitHub", value: "github.com/horuswave", href: "https://github.com/horuswave", icon: Github },
  { label: "LinkedIn", value: "anderson-macuche", href: "https://www.linkedin.com/in/anderson-macuche/", icon: Linkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-sky-400/10 bg-[#080b10] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-gradient text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight">
            Let&apos;s Talk
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-sky-200/70">
            Open to freelance, contract and full-time roles in software
            engineering, systems design and data engineering. Best for
            projects where clarity and delivery quality matter.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} /> Maputo, Mozambique
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {links.map((l, i) => {
            const Icon = l.icon;
            const external = l.href.startsWith("http");
            return (
              <motion.a
                key={l.label}
                href={l.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.07 * i }}
                className="card-dark flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/5 text-cyan-300">
                  <Icon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-slate-500">{l.label}</span>
                  <span className="block truncate font-medium text-white">{l.value}</span>
                </span>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="mailto:andersonmacuche@gmail.com"
            className="btn-glow inline-block rounded-xl px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white"
          >
            Say hello
          </a>
        </div>
      </div>
    </section>
  );
}
