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
  { label: "Projects", href: "#case-studies" },
  { label: "Say hi", href: "#contact" },
];

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="sticker mx-auto max-w-5xl rounded-full bg-paper px-3 py-2">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2 rounded-full px-2 py-1 font-display text-lg font-semibold"
          >
            <span className="sticker-sm grid h-9 w-9 place-items-center rounded-full bg-sun text-base">
              A
            </span>
            <span>Anderson</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-ink hover:text-cream ${
                  i === navItems.length - 1 ? "bg-coral text-white" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="sticker-sm grid h-10 w-10 place-items-center rounded-full bg-mint md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-2 px-2 pb-3 pt-3">
                {navItems.map((item, i) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`sticker-sm rounded-2xl px-4 py-3 font-display text-lg font-medium ${
                      ["bg-sun", "bg-mint", "bg-lilac", "bg-coral text-white"][i]
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
