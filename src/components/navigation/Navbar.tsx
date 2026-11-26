"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#case-studies" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-navy">
      <div className="mx-auto flex h-[88px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
        <div className="flex items-center gap-12">
          <a href="#home" className="text-[26px] font-extrabold tracking-tight">
            ander<span className="text-brand">s</span>on
          </a>
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[17px] font-semibold transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/ANDERSON-MACUCHE-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow hidden text-mist transition-colors hover:text-brand sm:block"
          >
            CV
          </a>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-white/70 px-6 py-3.5 text-[17px] font-semibold transition hover:border-brand hover:text-brand md:inline-flex"
          >
            Get in touch <ArrowRight size={18} />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/50 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-navy lg:hidden"
          >
            <div className="flex flex-col px-5 py-2 sm:px-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-lg font-semibold last:border-0 hover:text-brand"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="btn-yellow my-4 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-lg font-semibold"
              >
                Get in touch <ArrowRight size={18} />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
