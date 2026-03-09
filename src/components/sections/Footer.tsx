// components/sections/Footer.tsx
"use client";

import { TerminalSquare } from "lucide-react";
import { IBM_Plex_Mono } from "next/font/google";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export default function Footer() {
  return (
    <footer
      className={`${mono.variable} relative mt-20 border-t`}
      style={{
        borderColor: "rgba(0,255,65,0.08)",
        background: "rgba(0,255,65,0.01)",
      }}
    >
      {/* subtle scanline texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,255,65,0.05) 4px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em]">
        <div
          className="flex items-center gap-2"
          style={{ color: "rgba(0,255,65,0.5)" }}
        >
          <TerminalSquare size={13} style={{ color: "rgba(0,255,65,0.6)" }} />
          <span>ARCHIVE_NODE</span>
        </div>

        <p style={{ color: "rgba(0,255,65,0.35)" }}>
          © {new Date().getFullYear()} Anderson Macuche
        </p>

        <div
          className="flex items-center gap-3"
          style={{ color: "rgba(0,255,65,0.3)" }}
        >
          <span>STATUS</span>
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "#00ff41",
              boxShadow: "0 0 6px #00ff41",
              animation: "blink 2s step-end infinite",
            }}
          />
          <span>ONLINE</span>
        </div>
      </div>
    </footer>
  );
}
