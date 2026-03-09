"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

interface DashboardGalleryProps {
  images: string[];
  projectTitle: string;
}

const palette = {
  border: "rgba(74, 222, 128, 0.12)",
  borderSoft: "rgba(74, 222, 128, 0.08)",
  borderStrong: "rgba(74, 222, 128, 0.22)",
  borderHover: "rgba(134, 239, 172, 0.28)",
  panel: "rgba(74, 222, 128, 0.012)",
  panelAlt: "rgba(0, 0, 0, 0.24)",
  panelModal: "rgba(5, 8, 5, 0.94)",
  green: "#86efac",
  greenStrong: "#4ade80",
  greenDim: "rgba(134, 239, 172, 0.45)",
  text: "rgba(244, 244, 245, 0.92)",
  textSoft: "rgba(161, 161, 170, 0.88)",
  textDim: "rgba(113, 113, 122, 0.88)",
};

export default function DashboardGallery({
  images,
  projectTitle,
}: DashboardGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex]);

  return (
    <>
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Maximize2 size={15} style={{ color: palette.greenStrong }} />
            <h3
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: palette.greenDim }}
            >
              Dashboard Views
            </h3>
          </div>

          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: palette.textDim }}
          >
            {images.length} screenshots
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {images.map((src, index) => (
            <motion.button
              key={index}
              type="button"
              className="group relative overflow-hidden text-left"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => openLightbox(index)}
              style={{
                border: `1px solid ${palette.border}`,
                background: palette.panel,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  palette.borderHover;
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 14px rgba(74,222,128,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  palette.border;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={src}
                  alt={`${projectTitle} Dashboard - View ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />

                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(74,222,128,0.08), transparent 45%)",
                  }}
                />
              </div>

              <div className="flex items-center justify-between px-3 py-2.5">
                <div>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.22em]"
                    style={{ color: palette.greenDim }}
                  >
                    View {index + 1}
                  </p>
                  <p
                    className="mt-1 font-mono text-[10px]"
                    style={{ color: palette.textSoft }}
                  >
                    archive frame
                  </p>
                </div>

                <div
                  className="flex h-8 w-8 items-center justify-center transition-colors duration-300"
                  style={{
                    border: `1px solid ${palette.borderSoft}`,
                    background: palette.panelAlt,
                    color: palette.textSoft,
                  }}
                >
                  <Maximize2 size={13} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "rgba(0, 0, 0, 0.84)",
              backdropFilter: "blur(10px)",
            }}
            onClick={closeLightbox}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
              <div
                className="h-full w-full"
                style={{
                  background:
                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(134,239,172,0.05) 4px)",
                }}
              />
            </div>

            <button
              type="button"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center transition"
              style={{
                border: `1px solid ${palette.borderStrong}`,
                background: "rgba(0,0,0,0.42)",
                color: palette.text,
              }}
              onClick={closeLightbox}
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center transition"
              style={{
                border: `1px solid ${palette.border}`,
                background: "rgba(0,0,0,0.42)",
                color: palette.text,
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center transition"
              style={{
                border: `1px solid ${palette.border}`,
                background: "rgba(0,0,0,0.42)",
                color: palette.text,
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              className="relative mx-4 w-full max-w-6xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="overflow-hidden"
                style={{
                  border: `1px solid ${palette.borderStrong}`,
                  background: palette.panelModal,
                  boxShadow:
                    "0 0 0 1px rgba(74,222,128,0.03), 0 0 40px rgba(74,222,128,0.08)",
                }}
              >
                <div
                  className="flex items-center justify-between border-b px-4 py-3"
                  style={{
                    borderColor: palette.border,
                    background: "rgba(74,222,128,0.012)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Maximize2
                      size={14}
                      style={{ color: palette.greenStrong }}
                    />
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: palette.greenDim }}
                    >
                      Visual Feed
                    </span>
                  </div>

                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: palette.textDim }}
                  >
                    {currentIndex + 1} / {images.length}
                  </span>
                </div>

                <div className="relative aspect-video bg-black/30">
                  <Image
                    src={images[currentIndex]}
                    alt={`${projectTitle} Dashboard - View ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>

                <div
                  className="flex flex-col gap-4 border-t px-4 py-4 md:flex-row md:items-center md:justify-between"
                  style={{
                    borderColor: palette.border,
                    background: "rgba(74,222,128,0.01)",
                  }}
                >
                  <div>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.24em]"
                      style={{ color: palette.greenDim }}
                    >
                      {projectTitle}
                    </p>
                    <p
                      className="mt-1 font-mono text-[10px]"
                      style={{ color: palette.textDim }}
                    >
                      interface capture / frame {currentIndex + 1}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Go to image ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                        className="transition-all duration-200"
                        style={{
                          width: index === currentIndex ? 26 : 8,
                          height: 8,
                          borderRadius: 999,
                          background:
                            index === currentIndex
                              ? palette.greenStrong
                              : "rgba(113,113,122,0.6)",
                          boxShadow:
                            index === currentIndex
                              ? "0 0 10px rgba(74,222,128,0.18)"
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: palette.textDim }}
              >
                ESC to close / ← → to navigate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
