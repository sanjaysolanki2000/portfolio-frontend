import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type Props = {
  label: string;
  textarea?: boolean;
  error?: string;
} & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

export function InputField({ label, textarea, error, className, ...props }: Props) {
  const fieldClass = cn(
    "peer w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 pb-3 pt-6 text-sm text-slate-50 outline-none transition",
    "placeholder:text-transparent focus:border-cyan-300/60 focus:bg-white/[0.07]",
    "light:border-violet-500/15 light:bg-white/75 light:text-slate-950",
    error && "border-red-400/60",
    className,
  );

  return (
    <label className="relative block">
      {textarea ? (
        <textarea className={cn(fieldClass, "min-h-36 resize-y")} placeholder={label} {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input className={fieldClass} placeholder={label} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-slate-400 transition peer-focus:text-cyan-300 light:text-slate-500 light:peer-focus:text-cyan-700">
        {label}
      </span>
      {error ? <span className="mt-2 block text-xs text-red-300 light:text-red-600">{error}</span> : null}
    </label>
  );
}
