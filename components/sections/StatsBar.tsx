"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/lib/data";

export function StatsBar() {
  return (
    <section className="mx-auto -mt-8 w-full max-w-7xl px-5 sm:px-6 lg:px-8">
      <GlassCard className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        {profile.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-center light:border-violet-500/10 light:bg-white/60"
          >
            <p className="font-heading text-4xl font-bold text-slate-50 light:text-slate-950">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{stat.label}</p>
          </motion.div>
        ))}
      </GlassCard>
    </section>
  );
}
