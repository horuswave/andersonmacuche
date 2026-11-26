"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "My Work", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sky-400/15 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="justify-self-start text-sm font-light uppercase tracking-[0.35em] text-white sm:text-base"
        >
          Anderson<span className="font-semibold text-sky-400">.</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[15px] font-medium text-slate-100 transition-colors hover:text-sky-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <a
            href="/ANDERSON-MACUCHE-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300 sm:block"
          >
            CV
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-700 text-slate-100 md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
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
            className="overflow-hidden border-t border-sky-400/10 md:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-slate-800 py-3.5 text-base font-medium text-slate-100 last:border-0 hover:text-sky-400"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
