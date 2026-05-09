import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/10 backdrop-blur-md",
        "light:border-violet-500/15 light:bg-white/70",
        className,
      )}
      {...props}
    />
  );
}
