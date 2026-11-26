"use client";

import { useEffect, useMemo, useState } from "react";
import { IBM_Plex_Mono } from "next/font/google";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const LINES = [
  "Wake up, Neo...",
  "Loading projects and case studies...",
  "Anderson Macuche — Software Engineer",
];

const TOTAL_DURATION = 3800;

function useTypewriter(lines: string[]) {
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [typedChars, setTypedChars] = useState<string[]>(lines.map(() => ""));

  const schedule = useMemo(() => {
    const totalChars = lines.reduce((sum, line) => sum + line.length, 0);
    const typingBudget = 2800;
    const pauseBetweenLines = 180;
    let accumulatedTime = 300;

    return lines.map((line) => {
      const lineDuration = Math.max(
        400,
        Math.round((line.length / totalChars) * typingBudget),
      );
      const charInterval = lineDuration / Math.max(line.length, 1);
      const startAt = accumulatedTime;
      accumulatedTime += lineDuration + pauseBetweenLines;
      return { startAt, charInterval };
    });
  }, [lines]);

  useEffect(() => {
    const timers: number[] = [];

    lines.forEach((line, lineIndex) => {
      const { startAt, charInterval } = schedule[lineIndex];

      timers.push(
        window.setTimeout(() => {
          setVisibleLineCount((prev) => Math.max(prev, lineIndex + 1));
        }, startAt),
      );

      for (let i = 1; i <= line.length; i++) {
        timers.push(
          window.setTimeout(
            () => {
              setTypedChars((prev) => {
                const next = [...prev];
                next[lineIndex] = line.slice(0, i);
                return next;
              });
            },
            startAt + i * charInterval,
          ),
        );
      }
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [lines, schedule]);

  return { typedChars, visibleLineCount };
}

export default function IntroTerminal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { typedChars, visibleLineCount } = useTypewriter(LINES);

  useEffect(() => {
    setMounted(true);
    setShowIntro(true);
    const timer = window.setTimeout(() => setShowIntro(false), TOTAL_DURATION);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`transition-opacity duration-700 ${showIntro ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </div>

      {showIntro && (
        <div
          className={`fixed inset-0 z-[9999] overflow-hidden bg-[#030503] ${mono.variable}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.06),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background:repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(255,255,255,0.08)_4px)]" />

          <div className="relative flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-lg">
              {/* Terminal window */}
              <div className="overflow-hidden border border-emerald-400/12 bg-black/60 backdrop-blur-xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-emerald-400/10 bg-emerald-400/[0.02] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60 shadow-[0_0_8px_rgba(74,222,128,0.35)]" />
                  <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600">
                    portfolio — loading
                  </span>
                </div>

                {/* Body */}
                <div className="px-6 py-7 font-mono text-sm">
                  <div className="space-y-2.5">
                    {LINES.map((_, index) => {
                      const isVisible = index < visibleLineCount;
                      const isLastVisible = index === visibleLineCount - 1;
                      const isLast = index === LINES.length - 1;

                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-3 transition-all duration-300 ${
                            isVisible ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <span className="shrink-0 text-emerald-500/50">
                            $
                          </span>
                          <span
                            className={
                              isLast ? "text-emerald-200" : "text-zinc-400"
                            }
                          >
                            {typedChars[index]}
                          </span>
                          {isLastVisible && (
                            <span className="inline-block h-[1em] w-[0.6ch] bg-emerald-300/80 shadow-[0_0_8px_rgba(74,222,128,0.3)] animate-[blink_1s_step-end_infinite]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-px w-full overflow-hidden bg-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500/60 to-emerald-300/40"
                  style={{
                    width: "100%",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    animation: `progressBar ${TOTAL_DURATION}ms linear forwards`,
                  }}
                />
              </div>
            </div>
          </div>

          <style>{`
            @keyframes progressBar {
              from { transform: scaleX(0); }
              to   { transform: scaleX(1); }
            }
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50%       { opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
