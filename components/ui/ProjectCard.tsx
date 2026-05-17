/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
      <GlassCard className="group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 light:border-violet-500/10">
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={`${project.title} thumbnail`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${project.accent}88, transparent 34%), linear-gradient(135deg, ${project.accent}40, rgba(0,212,255,.24), rgba(10,10,15,.92))`,
                }}
              />
              <div className="absolute inset-5 rounded-lg border border-white/15 bg-black/20 p-4 shadow-2xl backdrop-blur-sm">
                <div className="mb-4 flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-2/3 rounded-full bg-white/40" />
                  <div className="h-3 w-full rounded-full bg-white/20" />
                  <div className="grid grid-cols-3 gap-2 pt-4">
                    <span className="h-12 rounded-md bg-white/15" />
                    <span className="h-12 rounded-md bg-white/10" />
                    <span className="h-12 rounded-md bg-white/15" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-50 light:text-slate-950">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-400 light:text-slate-600">{project.shortDescription}</p>
          <Link
            href={`/projects/${project.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100 light:text-cyan-700 light:hover:text-cyan-900"
          >
            <Eye className="h-4 w-4" />
            View Details
          </Link>
        </div>
      </GlassCard>
    </motion.article>
  );
}
