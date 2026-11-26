"use client";

import { useEffect, useState } from "react";

type Bit = { id: number; ch: string; x: number; y: number; d: number; o: number; s: number };

/** Floating 0/1 digits and faint network lines, like the Horuswave hero. */
export default function BinaryField() {
  const [bits, setBits] = useState<Bit[]>([]);

  useEffect(() => {
    setBits(
      Array.from({ length: 36 }, (_, id) => ({
        id,
        ch: Math.random() > 0.5 ? "1" : "0",
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: Math.random() * 6,
        o: 0.15 + Math.random() * 0.3,
        s: 10 + Math.random() * 6,
      })),
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full text-cyan-400/15" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g stroke="currentColor" strokeWidth="0.15" fill="none" vectorEffect="non-scaling-stroke">
          <path d="M10 2 L30 25" />
          <path d="M90 14 L62 30" />
          <path d="M44 92 L52 78" />
          <path d="M56 92 L64 80" />
        </g>
      </svg>
      {bits.map((b) => (
        <span
          key={b.id}
          className="animate-drift absolute font-mono text-cyan-300"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            fontSize: b.s,
            animationDelay: `${b.d}s`,
            ["--o" as string]: b.o,
          }}
        >
          {b.ch}
        </span>
      ))}
    </div>
  );
}
