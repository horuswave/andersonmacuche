"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Folder,
  TerminalSquare,
  ChevronRight,
  FileCode2,
  Monitor,
  LayoutGrid,
  PanelsTopLeft,
  Github,
  ExternalLink,
  Radio,
  Zap,
  Lock,
} from "lucide-react";
import { IBM_Plex_Mono, Share_Tech_Mono } from "next/font/google";
import { caseStudies } from "@/data/caseStudies";
import DashboardGallery from "@/components/interface/DashboardGallery";
import DashboardFeatures from "@/components/interface/DashboardFeatures";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const techMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tech",
});

type CaseStudyKey = keyof typeof caseStudies;
type View =
  | "overview"
  | "challenge"
  | "approach"
  | "results"
  | "features"
  | "preview"
  | "gallery";

type HistoryEntry =
  | { id: string; type: "system"; text: string }
  | { id: string; type: "command"; command: string }
  | {
      id: string;
      type: "projects";
      items: Array<{ key: CaseStudyKey; title: string; index: number }>;
      activeProject: CaseStudyKey | null;
    }
  | {
      id: string;
      type: "project-opened";
      projectKey: CaseStudyKey;
      title: string;
      description: string;
      live?: string;
      github?: string;
    }
  | {
      id: string;
      type: "views";
      views: View[];
      activeView: View;
    }
  | {
      id: string;
      type: "overview";
      title: string;
      description: string;
      technologies: string[];
      github?: string;
      live?: string;
    }
  | {
      id: string;
      type: "text-block";
      label: string;
      text: string;
      live?: string;
      github?: string;
    }
  | {
      id: string;
      type: "list-block";
      label: string;
      items: string[];
      marker?: "+" | "•";
      live?: string;
      github?: string;
    }
  | {
      id: string;
      type: "features";
      features: string[];
      live?: string;
      github?: string;
    }
  | {
      id: string;
      type: "preview";
      image: string;
      title: string;
      live?: string;
      github?: string;
    }
  | {
      id: string;
      type: "gallery";
      images: string[];
      projectTitle: string;
      features?: string[];
      live?: string;
      github?: string;
    };

const VIEW_META: Record<
  View,
  {
    label: string;
    command: string;
    icon?: "code" | "preview" | "features" | "gallery";
  }
> = {
  overview: { label: "Overview", command: "show overview", icon: "code" },
  challenge: { label: "Challenge", command: "show challenge", icon: "code" },
  approach: { label: "Approach", command: "show approach", icon: "code" },
  results: { label: "Results", command: "show results", icon: "code" },
  features: { label: "Features", command: "show features", icon: "features" },
  preview: { label: "Preview", command: "show preview", icon: "preview" },
  gallery: { label: "Gallery", command: "show gallery", icon: "gallery" },
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

const palette = {
  bg: "#050805",
  panel: "rgba(6, 10, 6, 0.94)",
  panelSoft: "rgba(8, 12, 8, 0.76)",
  panelAlt: "rgba(0, 0, 0, 0.22)",
  border: "rgba(74, 222, 128, 0.12)",
  borderSoft: "rgba(74, 222, 128, 0.08)",
  borderStrong: "rgba(74, 222, 128, 0.22)",
  borderHover: "rgba(134, 239, 172, 0.28)",
  text: "rgba(244, 244, 245, 0.9)",
  textSoft: "rgba(161, 161, 170, 0.88)",
  textDim: "rgba(113, 113, 122, 0.85)",
  green: "#86efac",
  greenStrong: "#4ade80",
  greenSoft: "rgba(134, 239, 172, 0.7)",
  greenDim: "rgba(134, 239, 172, 0.42)",
  glow: "0 0 18px rgba(74,222,128,0.12)",
};

// Matrix rain canvas component
function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ01アイウエオカキ";
    const fontSize = 11;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.045)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const brightness = Math.random();

        if (brightness > 0.95) {
          ctx.fillStyle = "rgba(220, 252, 231, 0.72)";
        } else if (brightness > 0.7) {
          ctx.fillStyle = "rgba(134, 239, 172, 0.42)";
        } else {
          ctx.fillStyle = "rgba(74, 222, 128, 0.18)";
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`} data-text={text}>
      {text}
      <style jsx>{`
        span::before,
        span::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        span::before {
          color: rgba(187, 247, 208, 0.45);
          animation: glitch1 4s infinite linear;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          transform: translate(-2px, 0);
          opacity: 0;
        }
        span::after {
          color: rgba(74, 222, 128, 0.28);
          animation: glitch2 4s infinite linear;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          transform: translate(2px, 0);
          opacity: 0;
        }
        @keyframes glitch1 {
          0%,
          90%,
          100% {
            opacity: 0;
            transform: translate(0);
          }
          92% {
            opacity: 0.5;
            transform: translate(-3px, 1px);
          }
          94% {
            opacity: 0;
          }
          96% {
            opacity: 0.3;
            transform: translate(2px, -1px);
          }
          98% {
            opacity: 0;
          }
        }
        @keyframes glitch2 {
          0%,
          88%,
          100% {
            opacity: 0;
            transform: translate(0);
          }
          90% {
            opacity: 0.35;
            transform: translate(3px, -1px);
          }
          93% {
            opacity: 0;
          }
          95% {
            opacity: 0.22;
            transform: translate(-2px, 1px);
          }
          97% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}

function Cursor() {
  return (
    <span
      className="ml-0.5 inline-block h-3.5 w-2 align-middle"
      style={{
        background: palette.greenStrong,
        animation: "blink 1s step-end infinite",
        boxShadow: "0 0 8px rgba(74,222,128,0.22)",
      }}
    />
  );
}

function LinkBar({
  live,
  github,
  restricted,
}: {
  live?: string;
  github?: string;
  restricted?: boolean;
}) {
  if (!live && !github) return null;
  return (
    <div
      className="flex flex-wrap gap-3 border-t pt-3 mt-1"
      style={{ borderColor: palette.borderSoft }}
    >
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
          style={{
            border: `1px solid ${palette.borderStrong}`,
            background: "rgba(74,222,128,0.025)",
            color: palette.text,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              palette.borderHover;
            (e.currentTarget as HTMLElement).style.color = palette.green;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              palette.borderStrong;
            (e.currentTarget as HTMLElement).style.color = palette.text;
          }}
        >
          <Github size={13} />
          VIEW_SOURCE
        </a>
      )}
      {live &&
        (restricted ? (
          <span
            className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] cursor-not-allowed select-none"
            style={{
              border: `1px solid ${palette.borderSoft}`,
              background: "rgba(0,0,0,0.22)",
              color: palette.textDim,
            }}
            title="Access restricted — VPN required"
          >
            <Lock size={13} />
            ACCESS_RESTRICTED
          </span>
        ) : (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
            style={{
              border: `1px solid ${palette.borderHover}`,
              background: "rgba(74,222,128,0.05)",
              color: palette.green,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(187,247,208,0.34)";
              (e.currentTarget as HTMLElement).style.background =
                "rgba(74,222,128,0.08)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 14px rgba(74,222,128,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                palette.borderHover;
              (e.currentTarget as HTMLElement).style.background =
                "rgba(74,222,128,0.05)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <ExternalLink size={13} />
            LIVE_INSTANCE
          </a>
        ))}
    </div>
  );
}

export default function CaseStudies() {
  const projectKeys = Object.keys(caseStudies) as CaseStudyKey[];

  const [activeProject, setActiveProject] = useState<CaseStudyKey>("golfview");
  const [activeView, setActiveView] = useState<View>("overview");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const project = caseStudies[activeProject] ?? caseStudies[projectKeys[0]];

  const availableViews = useMemo(() => {
    if (!project)
      return ["overview", "challenge", "approach", "results"] as View[];
    const views: View[] = ["overview", "challenge", "approach", "results"];
    if (project.dashboardFeatures?.length) views.push("features");
    if (project.image) views.push("preview");
    if (project.dashboardImages?.length) views.push("gallery");
    return views;
  }, [project]);

  useEffect(() => {
    setHistory([
      {
        id: makeId(),
        type: "system",
        text: "ZION_OS v3.1 :: ARCHIVE TERMINAL INITIALIZED",
      },
      {
        id: makeId(),
        type: "system",
        text: "encryption: RSA-4096 | uptime: 47d 13h 22m | nodes: 3 active",
      },
      {
        id: makeId(),
        type: "system",
        text: "type `help` to list available commands.",
      },
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  if (!project) return null;

  const focusInput = () => inputRef.current?.focus();

  const renderViewIcon = (view: View) => {
    const icon = VIEW_META[view].icon;
    if (icon === "preview") {
      return <Monitor size={12} style={{ color: palette.greenStrong }} />;
    }
    if (icon === "features") {
      return <PanelsTopLeft size={12} style={{ color: palette.greenStrong }} />;
    }
    if (icon === "gallery") {
      return <LayoutGrid size={12} style={{ color: palette.greenStrong }} />;
    }
    return <FileCode2 size={12} style={{ color: palette.greenStrong }} />;
  };

  const findProject = (query: string): CaseStudyKey | null => {
    const normalized = String(query).trim().toLowerCase();
    const byIndex = Number(normalized);

    if (
      !Number.isNaN(byIndex) &&
      byIndex >= 1 &&
      byIndex <= projectKeys.length
    ) {
      return projectKeys[byIndex - 1];
    }

    const exactKey = projectKeys.find(
      (key) => String(key).toLowerCase() === normalized,
    );
    if (exactKey) return exactKey;

    const partialKey = projectKeys.find((key) =>
      String(key).toLowerCase().includes(normalized),
    );
    if (partialKey) return partialKey;

    const byTitle = projectKeys.find((key) =>
      String(caseStudies[key].title).toLowerCase().includes(normalized),
    );
    if (byTitle) return byTitle;

    return null;
  };

  const pushEntries = (...entries: HistoryEntry[]) => {
    setHistory((prev) => [...prev, ...entries]);
  };

  const showProjects = () => {
    pushEntries({
      id: makeId(),
      type: "projects",
      items: projectKeys.map((key, index) => ({
        key,
        title: String(caseStudies[key].title),
        index: index + 1,
      })),
      activeProject,
    });
  };

  const showViews = (targetProject = activeProject) => {
    const target = caseStudies[targetProject];
    const views: View[] = ["overview", "challenge", "approach", "results"];
    if (target.dashboardFeatures?.length) views.push("features");
    if (target.image) views.push("preview");
    if (target.dashboardImages?.length) views.push("gallery");

    pushEntries({
      id: makeId(),
      type: "views",
      views,
      activeView: targetProject === activeProject ? activeView : "overview",
    });
  };

  const openProject = (projectKey: CaseStudyKey) => {
    const target = caseStudies[projectKey];
    setActiveProject(projectKey);
    setActiveView("overview");
    pushEntries({
      id: makeId(),
      type: "project-opened",
      projectKey,
      title: String(target.title),
      description: String(target.description),
      live: target.live ?? undefined,
      github: target.github ?? undefined,
    });
  };

  const showView = (view: View) => {
    const target = caseStudies[activeProject];
    const targetViews: View[] = [
      "overview",
      "challenge",
      "approach",
      "results",
    ];

    if (target.dashboardFeatures?.length) targetViews.push("features");
    if (target.image) targetViews.push("preview");
    if (target.dashboardImages?.length) targetViews.push("gallery");

    if (!targetViews.includes(view)) {
      pushEntries({
        id: makeId(),
        type: "system",
        text: `ERROR: view "${view}" unavailable for node::${String(activeProject)}`,
      });
      return;
    }

    setActiveView(view);

    if (view === "overview") {
      pushEntries({
        id: makeId(),
        type: "overview",
        title: String(target.title),
        description: String(target.description),
        technologies: target.technologies.map((tech) => String(tech)),
        github: target.github ?? undefined,
        live: target.live ?? undefined,
      });
      return;
    }

    if (view === "challenge") {
      pushEntries({
        id: makeId(),
        type: "text-block",
        label: "Challenge",
        text: String(target.challenge),
        live: target.live ?? undefined,
        github: target.github ?? undefined,
      });
      return;
    }

    if (view === "approach") {
      pushEntries({
        id: makeId(),
        type: "list-block",
        label: "Approach",
        items: target.approach.map((item) => String(item)),
        marker: "+",
        live: target.live ?? undefined,
        github: target.github ?? undefined,
      });
      return;
    }

    if (view === "results") {
      pushEntries({
        id: makeId(),
        type: "list-block",
        label: "Results",
        items: target.results.map((item) => String(item)),
        marker: "•",
        live: target.live ?? undefined,
        github: target.github ?? undefined,
      });
      return;
    }

    if (view === "features" && target.dashboardFeatures?.length) {
      pushEntries({
        id: makeId(),
        type: "features",
        features: target.dashboardFeatures.map((feature) => String(feature)),
        live: target.live ?? undefined,
        github: target.github ?? undefined,
      });
      return;
    }

    if (view === "preview" && target.image) {
      pushEntries({
        id: makeId(),
        type: "preview",
        image: String(target.image),
        title: String(target.title),
        live: target.live ?? undefined,
        github: target.github ?? undefined,
      });
      return;
    }

    if (view === "gallery" && target.dashboardImages?.length) {
      pushEntries({
        id: makeId(),
        type: "gallery",
        images: target.dashboardImages.map((img) => String(img)),
        projectTitle: String(target.title),
        features: target.dashboardFeatures?.map((feature) => String(feature)),
        live: target.live ?? undefined,
        github: target.github ?? undefined,
      });
    }
  };

  const runCommand = (raw: string) => {
    const command = raw.trim();
    if (!command) return;

    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(null);
    pushEntries({ id: makeId(), type: "command", command });

    const lower = command.toLowerCase();

    if (lower === "help") {
      pushEntries({
        id: makeId(),
        type: "system",
        text: "COMMANDS :: help | ls projects | open <name|index> | ls views | show <view> | next | prev | clear",
      });
      return;
    }

    if (lower === "clear") {
      setHistory([
        { id: makeId(), type: "system", text: "ZION_OS :: TERMINAL PURGED" },
        { id: makeId(), type: "system", text: "type `help` to continue." },
      ]);
      return;
    }

    if (
      lower === "ls" ||
      lower === "ls projects" ||
      lower === "list projects"
    ) {
      showProjects();
      return;
    }

    if (lower === "ls views" || lower === "list views") {
      showViews();
      return;
    }

    if (lower.startsWith("open ")) {
      const target = command.slice(5).trim();
      const found = findProject(target);
      if (!found) {
        pushEntries({
          id: makeId(),
          type: "system",
          text: `ERROR: node "${target}" not found. run \`ls projects\`.`,
        });
        return;
      }
      openProject(found);
      return;
    }

    if (lower.startsWith("show ")) {
      const targetView = command.slice(5).trim().toLowerCase() as View;
      if (
        [
          "overview",
          "challenge",
          "approach",
          "results",
          "features",
          "preview",
          "gallery",
        ].includes(targetView)
      ) {
        showView(targetView);
        return;
      }
      pushEntries({
        id: makeId(),
        type: "system",
        text: `ERROR: unknown view "${targetView}". run \`ls views\`.`,
      });
      return;
    }

    if (lower === "next") {
      const currentIndex = availableViews.indexOf(activeView);
      showView(availableViews[(currentIndex + 1) % availableViews.length]);
      return;
    }

    if (lower === "prev") {
      const currentIndex = availableViews.indexOf(activeView);
      showView(
        availableViews[
          (currentIndex - 1 + availableViews.length) % availableViews.length
        ],
      );
      return;
    }

    pushEntries({
      id: makeId(),
      type: "system",
      text: `UNKNOWN_CMD: "${command}" — type \`help\`.`,
    });
  };

  const submitCommand = (value?: string) => {
    const command = value ?? input;
    runCommand(command);
    setInput("");
    focusInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitCommand();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!commandHistory.length) return;
      const nextIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!commandHistory.length || historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
        return;
      }
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }
  };

  return (
    <section
      id="case-studies"
      className={`${mono.variable} ${techMono.variable} relative overflow-hidden py-16 md:py-20`}
      style={{ background: palette.bg }}
    >
      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes flicker {
          0%,
          19.9%,
          22%,
          62.9%,
          64%,
          64.9%,
          70%,
          100% {
            opacity: 1;
          }
          20%,
          21.9%,
          63%,
          63.9%,
          65%,
          69.9% {
            opacity: 0.985;
          }
        }
        .terminal-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: rgba(74, 222, 128, 0.18);
        }
        .terminal-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(74, 222, 128, 0.3);
        }
        .scanline-overlay::after {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          );
          pointer-events: none;
          z-index: 10;
        }
        .crt-flicker {
          animation: flicker 8s infinite;
        }
        .entry-fade-in {
          animation: entryIn 0.3s ease-out forwards;
        }
        @keyframes entryIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <MatrixRain className="h-full w-full" />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(74,222,128,0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.02) 0%, transparent 40%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(74,222,128,0.04) 4px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 lg:mb-12"
        >
          <div className="mb-3 flex items-center gap-3">
            <div
              className="h-px max-w-[3rem] flex-1"
              style={{
                background: `linear-gradient(to right, transparent, ${palette.borderStrong})`,
              }}
            />
            <p
              className="font-mono text-[10px] uppercase tracking-[0.4em]"
              style={{ color: palette.textDim }}
            >
              03 / Project Archive
            </p>
          </div>

          <h2
            className="font-mono text-3xl font-bold tracking-tight md:text-4xl"
            style={{
              color: palette.green,
              textShadow: "0 0 14px rgba(74,222,128,0.15)",
            }}
          >
            <GlitchText text="CASE_STUDIES.dir" />
          </h2>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="scanline-overlay relative crt-flicker"
          style={{
            border: `1px solid ${palette.borderStrong}`,
            background: palette.panel,
            boxShadow:
              "0 0 0 1px rgba(74,222,128,0.03), 0 0 34px rgba(74,222,128,0.05), inset 0 0 80px rgba(0,0,0,0.45)",
          }}
        >
          <div
            className="flex items-center justify-between border-b px-5 py-3"
            style={{
              borderColor: palette.border,
              background: "rgba(74,222,128,0.015)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: "rgba(239,68,68,0.24)",
                    boxShadow: "0 0 4px rgba(239,68,68,0.14)",
                  }}
                />
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: "rgba(245,158,11,0.24)",
                    boxShadow: "0 0 4px rgba(245,158,11,0.14)",
                  }}
                />
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: "rgba(74,222,128,0.34)",
                    boxShadow: "0 0 4px rgba(74,222,128,0.16)",
                  }}
                />
              </div>

              <div
                className="h-4 w-px"
                style={{ background: "rgba(74,222,128,0.08)" }}
              />

              <TerminalSquare size={13} style={{ color: palette.greenDim }} />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.32em]"
                style={{ color: palette.textDim }}
              >
                ARCHIVE_TERMINAL — ZION_OS v3.1
              </span>
            </div>

            <div
              className="font-mono text-[10px]"
              style={{ color: palette.textDim }}
            >
              <span style={{ color: palette.greenDim }}>NODE::</span>
              <span style={{ color: palette.green }}>
                {String(activeProject)}
              </span>
              <span style={{ color: "rgba(113,113,122,0.4)" }}> / </span>
              <span style={{ color: palette.greenDim }}>VIEW::</span>
              <span style={{ color: palette.green }}>{activeView}</span>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[17rem_minmax(0,1fr)]">
            <aside
              className="border-b lg:border-r lg:border-b-0"
              style={{ borderColor: palette.border }}
            >
              <div
                className="border-b px-4 py-3"
                style={{
                  borderColor: palette.borderSoft,
                  background: "rgba(74,222,128,0.012)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Folder size={12} style={{ color: palette.greenDim }} />
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.32em]"
                    style={{ color: palette.textDim }}
                  >
                    QUICK_ACCESS
                  </span>
                </div>
              </div>

              <div className="space-y-5 p-4">
                <div>
                  <p
                    className="mb-2.5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em]"
                    style={{ color: palette.textDim }}
                  >
                    <span
                      className="inline-block h-px w-3"
                      style={{ background: palette.borderStrong }}
                    />
                    NODES
                  </p>
                  <div className="space-y-1">
                    <SidebarBtn
                      onClick={() => submitCommand("ls projects")}
                      active={false}
                      dimmed
                    >
                      <Radio
                        size={10}
                        style={{ color: palette.greenDim, flexShrink: 0 }}
                      />
                      ls projects
                    </SidebarBtn>

                    {projectKeys.map((key) => (
                      <SidebarBtn
                        key={String(key)}
                        onClick={() => submitCommand(`open ${String(key)}`)}
                        active={activeProject === key}
                      >
                        <span
                          className="font-mono text-[9px] tabular-nums"
                          style={{
                            color:
                              activeProject === key
                                ? palette.greenDim
                                : palette.textDim,
                          }}
                        >
                          {projectKeys.indexOf(key) + 1 < 10
                            ? `0${projectKeys.indexOf(key) + 1}`
                            : projectKeys.indexOf(key) + 1}
                        </span>
                        <span>open {String(key)}</span>
                      </SidebarBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p
                    className="mb-2.5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em]"
                    style={{ color: palette.textDim }}
                  >
                    <span
                      className="inline-block h-px w-3"
                      style={{ background: palette.borderStrong }}
                    />
                    VIEWS
                  </p>
                  <div className="space-y-1">
                    <SidebarBtn
                      onClick={() => submitCommand("ls views")}
                      active={false}
                      dimmed
                    >
                      <Radio
                        size={10}
                        style={{ color: palette.greenDim, flexShrink: 0 }}
                      />
                      ls views
                    </SidebarBtn>

                    {availableViews.map((view) => (
                      <SidebarBtn
                        key={view}
                        onClick={() => submitCommand(`show ${view}`)}
                        active={activeView === view}
                      >
                        {renderViewIcon(view)}
                        {VIEW_META[view].label}
                      </SidebarBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p
                    className="mb-2.5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em]"
                    style={{ color: palette.textDim }}
                  >
                    <span
                      className="inline-block h-px w-3"
                      style={{ background: palette.borderStrong }}
                    />
                    CTRL
                  </p>
                  <div className="space-y-1">
                    {["help", "next", "prev", "clear"].map((cmd) => (
                      <SidebarBtn
                        key={cmd}
                        onClick={() => submitCommand(cmd)}
                        active={false}
                        dimmed
                      >
                        <Zap
                          size={10}
                          style={{ color: palette.greenDim, flexShrink: 0 }}
                        />
                        {cmd}
                      </SidebarBtn>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0 flex flex-col">
              <div
                className="flex items-center gap-2 border-b px-5 py-2.5 font-mono text-[11px]"
                style={{
                  borderColor: palette.borderSoft,
                  background: "rgba(74,222,128,0.008)",
                  color: palette.textDim,
                }}
              >
                <span style={{ color: palette.greenSoft }}>root@archive</span>
                <span style={{ color: "rgba(113,113,122,0.45)" }}>:</span>
                <span style={{ color: palette.textDim }}>~</span>
                <span style={{ color: "rgba(113,113,122,0.45)" }}>$</span>
                <span style={{ color: palette.greenDim }}>
                  open {String(activeProject)}
                </span>
                <ChevronRight
                  size={11}
                  style={{ color: "rgba(113,113,122,0.45)" }}
                />
                <span style={{ color: palette.text }}>
                  {String(project.title)}
                </span>
              </div>

              <div
                ref={scrollRef}
                className="terminal-scroll flex-1 max-h-[52rem] min-h-[34rem] space-y-4 overflow-y-auto p-5 md:p-6"
                onClick={focusInput}
                style={{ cursor: "text" }}
              >
                {history.map((entry) => {
                  if (entry.type === "system") {
                    return (
                      <div
                        key={entry.id}
                        className="entry-fade-in flex items-start gap-2 font-mono text-[11px] leading-6"
                        style={{ color: palette.textSoft }}
                      >
                        <span
                          style={{
                            color: palette.textDim,
                            userSelect: "none",
                          }}
                        >
                          {"// "}
                        </span>
                        {entry.text}
                      </div>
                    );
                  }

                  if (entry.type === "command") {
                    return (
                      <div
                        key={entry.id}
                        className="entry-fade-in font-mono text-[11px]"
                        style={{ color: palette.greenSoft }}
                      >
                        <span style={{ color: palette.textDim }}>
                          root@archive:~${" "}
                        </span>
                        <span style={{ color: palette.green }}>
                          {entry.command}
                        </span>
                      </div>
                    );
                  }

                  if (entry.type === "projects") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 p-4"
                        style={{
                          border: `1px solid ${palette.border}`,
                          background: "rgba(74,222,128,0.015)",
                        }}
                      >
                        <p
                          className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: palette.greenDim }}
                        >
                          ▸ AVAILABLE NODES [{entry.items.length}]
                        </p>

                        <div className="grid gap-1.5">
                          {entry.items.map((item) => (
                            <button
                              key={String(item.key)}
                              onClick={() =>
                                submitCommand(`open ${String(item.key)}`)
                              }
                              className="group flex items-center justify-between px-4 py-3 text-left transition-all duration-200"
                              style={{
                                border: `1px solid ${
                                  entry.activeProject === item.key
                                    ? palette.borderStrong
                                    : palette.borderSoft
                                }`,
                                background:
                                  entry.activeProject === item.key
                                    ? "rgba(74,222,128,0.04)"
                                    : palette.panelAlt,
                              }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = palette.borderHover;
                                (
                                  e.currentTarget as HTMLElement
                                ).style.background = "rgba(74,222,128,0.02)";
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor =
                                  entry.activeProject === item.key
                                    ? palette.borderStrong
                                    : palette.borderSoft;
                                (
                                  e.currentTarget as HTMLElement
                                ).style.background =
                                  entry.activeProject === item.key
                                    ? "rgba(74,222,128,0.04)"
                                    : palette.panelAlt;
                              }}
                            >
                              <div>
                                <div
                                  className="font-mono text-sm font-medium"
                                  style={{
                                    color:
                                      entry.activeProject === item.key
                                        ? palette.green
                                        : palette.text,
                                  }}
                                >
                                  {item.title}
                                </div>
                                <div
                                  className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em]"
                                  style={{ color: palette.textDim }}
                                >
                                  open {String(item.key)}
                                </div>
                              </div>

                              <span
                                className="font-mono text-[11px] tabular-nums"
                                style={{ color: palette.textDim }}
                              >
                                [{String(item.index).padStart(2, "0")}]
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  }

                  if (entry.type === "project-opened") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 p-4"
                        style={{
                          border: `1px solid ${palette.borderStrong}`,
                          background: "rgba(74,222,128,0.02)",
                          boxShadow: palette.glow,
                        }}
                      >
                        <p
                          className="font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: palette.greenDim }}
                        >
                          ▸ SESSION ESTABLISHED ::{" "}
                          {String(entry.projectKey).toUpperCase()}
                        </p>
                        <h3
                          className="font-mono text-xl font-bold"
                          style={{
                            color: palette.green,
                            textShadow: "0 0 10px rgba(74,222,128,0.14)",
                          }}
                        >
                          {entry.title}
                        </h3>
                        <p
                          className="max-w-2xl font-mono text-[12px] leading-7"
                          style={{ color: palette.textSoft }}
                        >
                          {entry.description}
                        </p>
                        <LinkBar
                          live={entry.live}
                          github={entry.github}
                          restricted={activeProject === "golfview_dashboard"}
                        />
                      </motion.div>
                    );
                  }

                  if (entry.type === "views") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 p-4"
                        style={{
                          border: `1px solid ${palette.border}`,
                          background: "rgba(74,222,128,0.015)",
                        }}
                      >
                        <p
                          className="font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: palette.greenDim }}
                        >
                          ▸ AVAILABLE VIEWS [{entry.views.length}]
                        </p>
                        <div className="grid gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
                          {entry.views.map((view) => (
                            <button
                              key={view}
                              onClick={() => submitCommand(`show ${view}`)}
                              className="flex items-center gap-3 px-3 py-3 text-left transition-all duration-200"
                              style={{
                                border: `1px solid ${
                                  entry.activeView === view
                                    ? palette.borderStrong
                                    : palette.borderSoft
                                }`,
                                background:
                                  entry.activeView === view
                                    ? "rgba(74,222,128,0.05)"
                                    : "rgba(0,0,0,0.18)",
                              }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = palette.borderHover;
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor =
                                  entry.activeView === view
                                    ? palette.borderStrong
                                    : palette.borderSoft;
                              }}
                            >
                              {renderViewIcon(view)}
                              <div>
                                <div
                                  className="font-mono text-[11px] uppercase tracking-[0.16em]"
                                  style={{
                                    color:
                                      entry.activeView === view
                                        ? palette.green
                                        : palette.text,
                                  }}
                                >
                                  {VIEW_META[view].label}
                                </div>
                                <div
                                  className="mt-0.5 font-mono text-[9px]"
                                  style={{ color: palette.textDim }}
                                >
                                  {VIEW_META[view].command}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  }

                  if (entry.type === "overview") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5 p-5"
                        style={{
                          border: `1px solid ${palette.borderStrong}`,
                          background: "rgba(74,222,128,0.012)",
                        }}
                      >
                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)]">
                          <div>
                            <p
                              className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em]"
                              style={{ color: palette.greenDim }}
                            >
                              ▸ PROJECT_OVERVIEW
                            </p>
                            <h3
                              className="font-mono text-xl font-bold"
                              style={{
                                color: palette.green,
                                textShadow: "0 0 10px rgba(74,222,128,0.12)",
                              }}
                            >
                              {entry.title}
                            </h3>
                            <p
                              className="mt-3 font-mono text-[12px] leading-7"
                              style={{ color: palette.textSoft }}
                            >
                              {entry.description}
                            </p>
                          </div>

                          <div
                            className="p-4"
                            style={{
                              border: `1px solid ${palette.borderSoft}`,
                              background: "rgba(0,0,0,0.26)",
                            }}
                          >
                            <p
                              className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em]"
                              style={{ color: palette.textDim }}
                            >
                              STACK_TRACE
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {entry.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                                  style={{
                                    border: `1px solid ${palette.border}`,
                                    background: "rgba(74,222,128,0.03)",
                                    color: palette.greenSoft,
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div
                          className="flex flex-wrap gap-3 border-t pt-4"
                          style={{ borderColor: palette.borderSoft }}
                        >
                          {entry.github ? (
                            <a
                              href={entry.github}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
                              style={{
                                border: `1px solid ${palette.borderStrong}`,
                                background: "rgba(74,222,128,0.025)",
                                color: palette.text,
                              }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = palette.borderHover;
                                (e.currentTarget as HTMLElement).style.color =
                                  palette.green;
                                (
                                  e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                  "0 0 12px rgba(74,222,128,0.08)";
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = palette.borderStrong;
                                (e.currentTarget as HTMLElement).style.color =
                                  palette.text;
                                (
                                  e.currentTarget as HTMLElement
                                ).style.boxShadow = "none";
                              }}
                            >
                              <Github size={13} />
                              VIEW_SOURCE
                            </a>
                          ) : null}

                          {entry.live ? (
                            <a
                              href={entry.live}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
                              style={{
                                border: `1px solid ${palette.borderHover}`,
                                background: "rgba(74,222,128,0.05)",
                                color: palette.green,
                              }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = "rgba(187,247,208,0.34)";
                                (
                                  e.currentTarget as HTMLElement
                                ).style.background = "rgba(74,222,128,0.08)";
                                (
                                  e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                  "0 0 14px rgba(74,222,128,0.1)";
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = palette.borderHover;
                                (
                                  e.currentTarget as HTMLElement
                                ).style.background = "rgba(74,222,128,0.05)";
                                (
                                  e.currentTarget as HTMLElement
                                ).style.boxShadow = "none";
                              }}
                            >
                              <ExternalLink size={13} />
                              LIVE_INSTANCE
                            </a>
                          ) : null}
                        </div>
                      </motion.div>
                    );
                  }

                  if (entry.type === "text-block") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-3xl space-y-3 p-5"
                        style={{
                          border: `1px solid ${palette.border}`,
                          background: "rgba(74,222,128,0.012)",
                        }}
                      >
                        <p
                          className="font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: palette.greenDim }}
                        >
                          ▸ {entry.label.toUpperCase()}
                        </p>
                        <p
                          className="font-mono text-[12px] leading-7"
                          style={{ color: palette.textSoft }}
                        >
                          {entry.text}
                        </p>
                        <LinkBar
                          live={entry.live}
                          github={entry.github}
                          restricted={activeProject === "golfview_dashboard"}
                        />
                      </motion.div>
                    );
                  }

                  if (entry.type === "list-block") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 p-5"
                        style={{
                          border: `1px solid ${palette.border}`,
                          background: "rgba(74,222,128,0.012)",
                        }}
                      >
                        <p
                          className="font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: palette.greenDim }}
                        >
                          ▸ {entry.label.toUpperCase()}
                        </p>

                        <div className="grid gap-2">
                          {entry.items.map((item, index) => (
                            <motion.div
                              key={`${entry.id}-${index}`}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.05,
                              }}
                              className="flex items-start gap-3 px-4 py-3"
                              style={{
                                border: `1px solid ${palette.borderSoft}`,
                                background: "rgba(0,0,0,0.22)",
                              }}
                            >
                              <span
                                className="mt-0.5 font-mono text-[11px]"
                                style={{
                                  color: palette.greenStrong,
                                  flexShrink: 0,
                                }}
                              >
                                {entry.marker ?? "•"}
                              </span>
                              <span
                                className="font-mono text-[12px] leading-6"
                                style={{ color: palette.textSoft }}
                              >
                                {item}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                        <LinkBar
                          live={entry.live}
                          github={entry.github}
                          restricted={activeProject === "golfview_dashboard"}
                        />
                      </motion.div>
                    );
                  }

                  if (entry.type === "features") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 p-5"
                        style={{
                          border: `1px solid ${palette.border}`,
                          background: "rgba(74,222,128,0.012)",
                        }}
                      >
                        <p
                          className="font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: palette.greenDim }}
                        >
                          ▸ FEATURE_MAP
                        </p>
                        <DashboardFeatures features={entry.features} />
                        <LinkBar
                          live={entry.live}
                          github={entry.github}
                          restricted={activeProject === "golfview_dashboard"}
                        />
                      </motion.div>
                    );
                  }

                  if (entry.type === "preview") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 p-5"
                        style={{
                          border: `1px solid ${palette.border}`,
                          background: "rgba(74,222,128,0.012)",
                        }}
                      >
                        <p
                          className="font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: palette.greenDim }}
                        >
                          ▸ VISUAL_FEED :: {entry.title}
                        </p>
                        <div
                          className="overflow-hidden"
                          style={{ border: `1px solid ${palette.borderSoft}` }}
                        >
                          <img
                            src={entry.image}
                            alt={entry.title}
                            className="w-full object-cover"
                            style={{
                              filter: "brightness(0.92) contrast(1.03)",
                            }}
                          />
                        </div>
                        <LinkBar
                          live={entry.live}
                          github={entry.github}
                          restricted={activeProject === "golfview_dashboard"}
                        />
                      </motion.div>
                    );
                  }

                  if (entry.type === "gallery") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 p-5"
                        style={{
                          border: `1px solid ${palette.border}`,
                          background: "rgba(74,222,128,0.012)",
                        }}
                      >
                        <p
                          className="font-mono text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: palette.greenDim }}
                        >
                          ▸ GALLERY_DUMP :: {entry.projectTitle} [
                          {entry.images.length} FILES]
                        </p>
                        <DashboardGallery
                          images={entry.images}
                          projectTitle={entry.projectTitle}
                        />
                        <LinkBar
                          live={entry.live}
                          github={entry.github}
                          restricted={activeProject === "golfview_dashboard"}
                        />
                      </motion.div>
                    );
                  }

                  return null;
                })}
              </div>

              <div
                className="flex items-center gap-3 border-t px-5 py-3"
                style={{
                  borderColor: palette.border,
                  background: "rgba(74,222,128,0.008)",
                }}
              >
                <span
                  className="shrink-0 font-mono text-[11px]"
                  style={{ color: palette.greenDim }}
                >
                  root@archive:~$
                </span>

                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent font-mono text-[11px] outline-none"
                  style={{
                    color: palette.green,
                    caretColor: palette.greenStrong,
                  }}
                  placeholder="type a command..."
                />

                <Cursor />
              </div>
            </div>
          </div>
        </motion.div>

        <div
          className="mt-3 flex items-center justify-between px-4 py-2 font-mono text-[9px] uppercase tracking-[0.24em]"
          style={{
            border: `1px solid ${palette.borderSoft}`,
            background: "rgba(74,222,128,0.008)",
            color: palette.textDim,
          }}
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  background: palette.greenStrong,
                  boxShadow: "0 0 4px rgba(74,222,128,0.22)",
                  animation: "blink 2s step-end infinite",
                }}
              />
              ONLINE
            </span>
            <span>ENC: RSA-4096</span>
            <span>NODES: {projectKeys.length}</span>
          </div>

          <span>ZION_OS v3.1 :: ARCHIVE TERMINAL</span>
        </div>
      </div>
    </section>
  );
}

function SidebarBtn({
  children,
  onClick,
  active,
  dimmed,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  dimmed?: boolean;
}) {
  const baseColor = active
    ? palette.green
    : dimmed
      ? palette.textDim
      : palette.textSoft;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-150"
      style={{
        border: `1px solid ${active ? palette.borderStrong : palette.borderSoft}`,
        background: active ? "rgba(74,222,128,0.045)" : "rgba(0,0,0,0.18)",
        color: baseColor,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor =
            palette.borderHover;
          (e.currentTarget as HTMLElement).style.color = palette.greenSoft;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor =
            palette.borderSoft;
          (e.currentTarget as HTMLElement).style.color = baseColor;
        }
      }}
    >
      {children}
    </button>
  );
}
