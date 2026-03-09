// components/navigation/MobileMenu.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const navItems = [
  { label: "Home", href: "#home", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Case Studies", href: "#case-studies", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];

export default function MobileMenu({ menuOpen, setMenuOpen }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className={`md:hidden absolute top-full left-0 right-0 z-[9999] overflow-hidden ${serif.variable} ${mono.variable}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* backdrop panel */}
          <div className="relative border-x border-b border-emerald-400/10 bg-black/80 backdrop-blur-xl">
            {/* top separator line with glow */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

            {/* nav items */}
            <nav className="flex flex-col px-4 py-3">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: 0.06 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex items-center gap-4 border-b border-zinc-800/60 py-4 last:border-b-0"
                >
                  {/* index */}
                  <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 transition-colors duration-300 group-hover:text-emerald-400/70">
                    {item.index}
                  </span>

                  {/* label */}
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition-colors duration-300 group-hover:text-emerald-200">
                    {item.label}
                  </span>

                  {/* hover underline */}
                  <span className="absolute bottom-3 left-10 h-px w-0 bg-gradient-to-r from-emerald-400/70 via-emerald-300/30 to-transparent transition-all duration-300 group-hover:w-16" />

                  {/* right arrow hint */}
                  <span className="ml-auto font-mono text-[10px] text-zinc-700 transition-colors duration-300 group-hover:text-emerald-400/50">
                    →
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* bottom signature line */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700">
                signal / systems / interface
              </span>
              {/* animated dot */}
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/30" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
              </span>
            </div>

            {/* bottom glow line */}
            <motion.div
              className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
