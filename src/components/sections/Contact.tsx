"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const links = [
  {
    label: "Email",
    value: "andersonmacuche@gmail.com",
    href: "mailto:andersonmacuche@gmail.com",
    icon: Mail,
    color: "bg-sun",
  },
  {
    label: "Phone",
    value: "+258 85 5651 603",
    href: "tel:+258855651603",
    icon: Phone,
    color: "bg-mint",
  },
  {
    label: "GitHub",
    value: "github.com/horuswave",
    href: "https://github.com/horuswave",
    icon: Github,
    color: "bg-lilac",
  },
  {
    label: "LinkedIn",
    value: "anderson-macuche",
    href: "https://www.linkedin.com/in/anderson-macuche/",
    icon: Linkedin,
    color: "bg-sky",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="sticker relative overflow-hidden rounded-[2rem] bg-coral p-6 text-white md:p-12"
      >
        <div
          aria-hidden
          className="animate-floaty absolute -right-8 -top-8 h-32 w-32 rounded-full border-[2.5px] border-ink bg-sun"
        />
        <div
          aria-hidden
          className="animate-floaty absolute -bottom-10 left-1/3 h-24 w-24 rounded-full border-[2.5px] border-ink bg-pink [animation-delay:1.5s]"
        />

        <div className="relative max-w-2xl">
          <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.02]">
            Let&apos;s make something nice together
            <span className="animate-wiggle ml-2 inline-block">👋</span>
          </h2>
          <p className="mt-4 text-lg font-bold text-white/90">
            Open to freelance, contract and full-time roles in software
            engineering, systems design and data engineering. Best for
            projects where clarity and delivery quality matter.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 font-extrabold">
            <MapPin size={18} /> Maputo, Mozambique
          </p>
        </div>

        <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
          {links.map((l) => {
            const Icon = l.icon;
            const external = l.href.startsWith("http");
            return (
              <a
                key={l.label}
                href={l.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`sticker pop flex items-center gap-4 rounded-2xl p-4 text-ink ${l.color}`}
              >
                <span className="sticker-sm grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-paper">
                  <Icon size={22} strokeWidth={2.5} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-extrabold uppercase tracking-wider">
                    {l.label}
                  </span>
                  <span className="block truncate font-display text-lg font-medium">
                    {l.value}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
