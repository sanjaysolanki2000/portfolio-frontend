"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedIsLight = localStorage.getItem("portfolio-theme") === "light";
    setIsLight(storedIsLight);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("light", isLight);
  }, [isLight, mounted]);

  function toggleTheme() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("portfolio-theme", next ? "light" : "dark");
  }

  const Icon = isLight ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200 light:border-violet-500/15 light:bg-white/75 light:text-slate-700"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
