// app/loading.tsx
"use client";

import { useEffect, useState } from "react";

const lines = [
  { text: "Wake up, Anderson...", delay: 400 },
  { text: "The system is not what it seems.", delay: 1700 },
  { text: "Following the signal...", delay: 3000 },
  { text: "Entering archive...", delay: 4300 },
];

export default function Loading() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    const timers = lines.map((line, index) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, line.delay),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="fixed inset-0 z-[9999] overflow-hidden bg-[#030503] text-emerald-300">
      {/* ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.08),transparent_28%),linear-gradient(to_bottom,#020302_0%,#040604_45%,#020302_100%)]" />

      {/* scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(255,255,255,0.08)_4px)]" />

      {/* noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.15%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.9%22/></svg>')]" />

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

      {/* terminal shell */}
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-4xl border border-emerald-400/10 bg-black/20 shadow-[0_0_60px_rgba(34,197,94,0.08)] backdrop-blur-xl">
          {/* top bar */}
          <div className="flex items-center justify-between border-b border-emerald-400/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70 shadow-[0_0_12px_rgba(74,222,128,0.5)]" />
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500">
              terminal / boot sequence
            </div>
          </div>

          {/* terminal content */}
          <div className="relative px-5 py-6 sm:px-7 sm:py-8">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              root@horuswave:~$ initialize consciousness
            </div>

            <div className="space-y-3 font-mono text-sm sm:text-base">
              {lines.map((line, index) => {
                const isVisible = visibleLines.includes(index);

                return (
                  <div
                    key={line.text}
                    className={`transition-all duration-500 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0"
                    }`}
                  >
                    <span className="mr-3 text-emerald-500/70">&gt;</span>
                    <span className="text-emerald-300 [text-shadow:0_0_10px_rgba(74,222,128,0.2)]">
                      {isVisible ? line.text : ""}
                    </span>
                    {isVisible &&
                    index === visibleLines[visibleLines.length - 1] ? (
                      <span className="ml-1 inline-block h-[1em] w-[0.65ch] translate-y-[2px] animate-pulse bg-emerald-300/90 shadow-[0_0_10px_rgba(74,222,128,0.45)]" />
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* bottom status */}
            <div className="mt-10 grid gap-3 border-t border-emerald-400/10 pt-5 font-mono text-xs text-zinc-500 sm:grid-cols-3">
              <div>
                status: <span className="text-emerald-300">booting</span>
              </div>
              <div>
                signal: <span className="text-emerald-300">unstable</span>
              </div>
              <div>
                destination: <span className="text-emerald-300">portfolio</span>
              </div>
            </div>

            {/* subtle code rain in panel */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]">
              <div className="loading-code-column left-[8%]">
                01010100 01010010 01010101 01010100 01001000
              </div>
              <div className="loading-code-column left-[28%] [animation-delay:1.4s]">
                while(alive)&#123;searchForMeaning();&#125;
              </div>
              <div className="loading-code-column left-[51%] [animation-delay:0.8s]">
                root@matrix:~$ wake
              </div>
              <div className="loading-code-column left-[74%] [animation-delay:2.2s]">
                echo &quot;there is code beneath the skin&quot;
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
