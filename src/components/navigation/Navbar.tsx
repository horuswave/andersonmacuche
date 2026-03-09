// components/navigation/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import MobileMenu from "./MobileMenu";

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

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const navItems = [
    { label: "Home", href: "#home", index: "01" },
    { label: "About", href: "#about", index: "02" },
    { label: "Case Studies", href: "#case-studies", index: "03" },
    { label: "Contact", href: "#contact", index: "04" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  const { scrollY } = useScroll();

  // Scroll direction + threshold logic
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      const isScrolled = y > 20;
      setScrolled(isScrolled);

      // Hide on scroll down, show on scroll up
      if (y < 60) {
        setVisible(true); // always visible near top
      } else if (y > lastY + 8) {
        setVisible(false); // scrolling down — hide
      } else if (y < lastY - 8) {
        setVisible(true); // scrolling up — reveal
      }

      setLastY(y);
    });

    return () => unsubscribe();
  }, [scrollY, lastY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="navbar"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed top-0 left-0 right-0 z-[9999] isolate ${serif.variable} ${mono.variable}`}
          style={{
            // Subtle top margin when scrolled so it floats
            paddingTop: scrolled ? "0.5rem" : "0",
            paddingLeft: scrolled ? "1rem" : "0",
            paddingRight: scrolled ? "1rem" : "0",
            transition: "padding 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <motion.div
            className="flex items-center justify-between border border-emerald-400/10 bg-black/25 px-4 py-4 backdrop-blur-xl sm:px-5 md:px-6"
            animate={{
              backgroundColor: scrolled
                ? "rgba(0,0,0,0.72)"
                : "rgba(0,0,0,0.25)",
              borderColor: scrolled
                ? "rgba(74,222,128,0.18)"
                : "rgba(74,222,128,0.10)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(74,222,128,0.08)"
                : "none",
            }}
            transition={{ duration: 0.4 }}
            style={{ borderRadius: scrolled ? "0.25rem" : "0" }}
          >
            {/* Brand */}
            <a
              href="#home"
              className="group relative inline-flex items-center gap-3 text-zinc-200"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/30" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
              </span>

              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl tracking-[0.03em] text-zinc-100 transition-colors duration-300 group-hover:text-emerald-200">
                  Anderson Macuche
                </span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 transition-colors duration-300 group-hover:text-emerald-300/70">
                  signal / systems / interface
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative inline-flex items-center gap-3 overflow-hidden px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-emerald-200"
                >
                  <span className="text-zinc-600 transition-colors duration-300 group-hover:text-emerald-400/70">
                    {item.index}
                  </span>
                  <span>{item.label}</span>

                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-emerald-400/70 via-emerald-300/30 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-emerald-400/[0.03]" />
                </a>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="group inline-flex items-center justify-center border border-zinc-800 bg-black/30 p-3 text-zinc-300 transition duration-300 hover:border-emerald-400/20 hover:text-emerald-200 md:hidden"
            >
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -12, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </button>
          </motion.div>

          {/* subtle accent lines */}
          <motion.div
            className="pointer-events-none absolute -left-3 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent md:block"
            animate={{ opacity: [0.25, 0.8, 0.25], scaleY: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4.2, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute -right-2 bottom-0 hidden h-px w-16 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent md:block"
            animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [0.9, 1.05, 0.9] }}
            transition={{ duration: 5.1, repeat: Infinity }}
          />

          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
