import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toast({ message, variant = "success" }: { message: string; variant?: "success" | "error" }) {
  const Icon = variant === "success" ? CheckCircle2 : XCircle;
  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-2xl backdrop-blur-md",
        variant === "success"
          ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-100 light:text-emerald-700"
          : "border-red-400/30 bg-red-500/15 text-red-100 light:text-red-700",
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
