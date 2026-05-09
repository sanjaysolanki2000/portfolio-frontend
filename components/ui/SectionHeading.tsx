import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  subtext,
  className,
}: {
  label: string;
  title: string;
  subtext?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-300 light:text-cyan-700">{label}</p>
      <h2 className="font-heading text-3xl font-bold leading-tight text-slate-50 light:text-slate-950 sm:text-5xl">{title}</h2>
      <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
      {subtext ? <p className="mt-5 max-w-2xl leading-7 text-slate-400 light:text-slate-600">{subtext}</p> : null}
    </div>
  );
}
