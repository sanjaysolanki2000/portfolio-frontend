"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SkillPill({ label, className }: { label: string; className?: string }) {
  return (
    <motion.span
      whileHover={{ y: -3, scale: 1.02 }}
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 backdrop-blur-md",
        "light:border-violet-500/15 light:bg-white/75 light:text-slate-700",
        className,
      )}
    >
      {label}
    </motion.span>
  );
}
