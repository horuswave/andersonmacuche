"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
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

const contactItems = [
  {
    label: "Email",
    value: "andersonmacuche@gmail.com",
    href: "mailto:andersonmacuche@gmail.com",
    icon: Mail,
    index: "01",
  },
  {
    label: "Phone",
    value: "+258 85 5651 603",
    href: "tel:+258855651603",
    icon: Phone,
    index: "02",
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/horuswave", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anderson-macuche/",
    icon: Linkedin,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className={`relative py-20 md:py-28 ${serif.variable} ${mono.variable}`}
    >
      {/* background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(34,197,94,0.05),transparent_40%),radial-gradient(ellipse_at_10%_100%,rgba(16,185,129,0.03),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* ── HEADER ROW ── */}
        <div className="mb-14 grid items-end gap-6 md:grid-cols-[1fr_auto] md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.36em] text-zinc-500">
              04 / Contact
            </p>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[0.95] text-zinc-100">
              Let&apos;s work on
              <br />
              <span className="text-emerald-300/80">something worthwhile.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mb-1 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 md:flex-col md:items-end md:gap-2"
          >
            <span className="flex items-center gap-2">
              <MapPin size={11} className="text-emerald-400/60" />
              Maputo, Mozambique
            </span>
            <span className="hidden md:block h-px w-10 bg-emerald-400/20" />
            <span className="flex items-center gap-2 text-emerald-300/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Available now
            </span>
          </motion.div>
        </div>

        {/* ── CONTACT CHANNELS — full-width horizontal cards ── */}
        <div className="mb-5 space-y-2">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="group relative flex items-center justify-between overflow-hidden border border-emerald-400/10 bg-emerald-500/[0.025] px-6 py-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/25 hover:bg-emerald-500/[0.05] md:px-8 md:py-6"
              >
                {/* hover fill line */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-emerald-400/60 via-emerald-300/20 to-transparent transition-all duration-500 group-hover:w-full" />

                <div className="flex items-center gap-5 md:gap-7">
                  {/* index */}
                  <span className="hidden font-mono text-[10px] tracking-[0.28em] text-zinc-600 transition-colors duration-300 group-hover:text-emerald-400/50 sm:block">
                    {item.index}
                  </span>

                  {/* icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-emerald-400/15 bg-black/25 text-emerald-300 transition-all duration-300 group-hover:border-emerald-400/30 group-hover:text-emerald-200 group-hover:shadow-[0_0_14px_rgba(74,222,128,0.1)]">
                    <Icon size={16} />
                  </div>

                  {/* text */}
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600 transition-colors duration-300 group-hover:text-zinc-500">
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-serif text-xl text-zinc-100 transition-colors duration-300 group-hover:text-emerald-100 md:text-2xl lg:text-[1.6rem]">
                      {item.value}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  size={18}
                  className="-translate-x-1 text-zinc-700 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-emerald-300 group-hover:opacity-100"
                />
              </motion.a>
            );
          })}
        </div>

        {/* ── BOTTOM ROW: availability + socials ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-4 border border-emerald-400/10 bg-emerald-500/[0.02] backdrop-blur-sm md:grid-cols-[1fr_auto]"
        >
          {/* availability blurb */}
          <div className="border-b border-emerald-400/8 px-6 py-5 md:border-b-0 md:border-r md:py-6">
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
              Availability
            </p>
            <p className="font-mono text-[13px] leading-7 text-zinc-400 md:text-[13.5px]">
              Open to freelance, contract, and full-time roles in software
              engineering, systems design, and data engineering. Best for
              projects where clarity and delivery quality matter.
            </p>
          </div>

          {/* socials */}
          <div className="flex flex-row items-center gap-3 px-6 py-5 md:flex-col md:items-start md:justify-center md:px-7 md:py-6">
            <p className="hidden font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 md:block">
              Social
            </p>
            <div className="flex flex-wrap gap-2 md:flex-col">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-2.5 border border-emerald-400/10 bg-black/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition-all duration-300 hover:border-emerald-400/25 hover:text-emerald-200"
                  >
                    <Icon
                      size={13}
                      className="text-emerald-400/70 transition-colors duration-300 group-hover:text-emerald-300"
                    />
                    {social.label}
                    <ArrowUpRight
                      size={11}
                      className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
