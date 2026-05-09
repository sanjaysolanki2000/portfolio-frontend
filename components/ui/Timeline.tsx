"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { experience } from "@/lib/data";

export function Timeline() {
  return (
    <div className="relative pl-7">
      <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-violet-400 via-cyan-300 to-transparent" />
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <span className="absolute -left-7 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-white">
          <BriefcaseBusiness className="h-4 w-4" />
        </span>
        <GlassCard className="p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div>
              <h3 className="font-heading text-2xl font-bold text-slate-50 light:text-slate-950">{experience.role}</h3>
              <p className="mt-1 font-medium text-cyan-300 light:text-cyan-700">{experience.company}</p>
            </div>
            <p className="text-sm text-slate-400 light:text-slate-600">{experience.period}</p>
          </div>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-300 light:text-slate-700">
            {experience.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </motion.div>
    </div>
  );
}
