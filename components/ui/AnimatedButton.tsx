import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type AnimatedButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
};

export function AnimatedButton({ href, children, variant = "primary", icon, className, ...props }: AnimatedButtonProps) {
  const classes = cn(
    "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-semibold transition duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
    variant === "primary" &&
      "bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5",
    variant === "secondary" &&
      "border border-white/15 bg-white/[0.04] text-slate-50 hover:border-cyan-300/45 hover:bg-white/[0.08] light:border-violet-500/20 light:bg-white/70 light:text-slate-950",
    variant === "ghost" && "text-slate-200 hover:text-white light:text-slate-700 light:hover:text-slate-950",
    className,
  );

  return (
    <Link href={href} className={classes} {...props}>
      <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
      <span className="relative inline-flex items-center gap-2">
        {children}
        {icon ?? <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
      </span>
    </Link>
  );
}
