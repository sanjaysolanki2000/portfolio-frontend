import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: LucideIcon }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 light:text-slate-600">{label}</p>
          <p className="mt-2 font-heading text-3xl font-bold text-slate-50 light:text-slate-950">{value}</p>
        </div>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-200 light:text-cyan-700">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </GlassCard>
  );
}
