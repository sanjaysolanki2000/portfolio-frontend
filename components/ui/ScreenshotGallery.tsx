/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type ScreenshotGalleryProps = {
  screenshotUrls: string[];
  accentColor: string;
  projectTitle: string;
};

export function ScreenshotGallery({ screenshotUrls, accentColor, projectTitle }: ScreenshotGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeModal = useCallback(() => setIsOpen(false), []);

  const prevImage = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? screenshotUrls.length - 1 : prev - 1));
  }, [screenshotUrls.length]);

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev === screenshotUrls.length - 1 ? 0 : prev + 1));
  }, [screenshotUrls.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, prevImage, nextImage, closeModal]);

  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {screenshotUrls.map((url, idx) => (
          <div
            key={idx}
            onClick={() => openModal(idx)}
            className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-cyan-300/40 hover:shadow-lg hover:shadow-cyan-400/5 light:border-violet-500/15 light:bg-white/75"
          >
            <img
              src={url}
              alt={`${projectTitle} screenshot ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            {/* Hover overlay with click instructions */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white border border-white/20 shadow-md">
                Click to Zoom
              </span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md"
            onClick={closeModal}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 rounded-full border border-white/15 bg-black/30 p-3 text-white transition hover:bg-white/10 hover:scale-105"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/15 bg-black/30 p-3 text-white transition hover:bg-white/10 hover:scale-105"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/15 bg-black/30 p-3 text-white transition hover:bg-white/10 hover:scale-105"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[80vh] max-w-[90vw] overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-zinc-950/85"
            >
              <img
                src={screenshotUrls[activeIndex]}
                alt={`${projectTitle} screenshot`}
                className="max-h-[80vh] max-w-full object-contain mx-auto"
              />

              {/* Bottom pagination */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 text-center">
                <span className="text-sm font-semibold text-slate-300">
                  {activeIndex + 1} / {screenshotUrls.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
