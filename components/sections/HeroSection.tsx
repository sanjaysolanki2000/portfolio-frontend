"use client";

import { motion } from "framer-motion";
import { Download, Code2, BriefcaseBusiness, Mail } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";

const typedRoles = ["React Native Developer", "Flutter Developer", "Node Js Developer", "Full Stack Developer"];
const orbitItems = ["React", "Flutter", "Node Js", "MongoDB", "MySql", "Next Js"];

export function HeroSection({ profile }: { profile: any }) {
  const socialLinks = [
    { label: "GitHub", href: profile.githubUrl || profile.github, icon: Code2 },
    { label: "LinkedIn", href: profile.linkedinUrl || profile.linkedin, icon: BriefcaseBusiness },
    { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  ].filter((link) => link.href);

  return (
    <section className="mesh-bg relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Badge className="mb-6 border-emerald-400/25 bg-emerald-400/10 text-emerald-200 light:text-emerald-700">
            {profile.availability}
          </Badge>
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-slate-50 light:text-slate-950 sm:text-6xl lg:text-7xl">
            Hi, I&apos;m {profile.fullName || profile.name}
          </h1>
          <div className="mt-5 h-10 overflow-hidden text-xl font-semibold text-cyan-300 sm:text-2xl">
            <motion.div animate={{ y: ["0%", "-33.333%", "-66.666%", "0%"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
              {typedRoles.map((role) => (
                <p key={role} className="h-10">
                  {role}
                </p>
              ))}
            </motion.div>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 light:text-slate-700 sm:text-lg">
            {profile.shortBio || "3+ years building production-grade mobile and web apps across e-commerce, real-time tracking, AI-powered services, and certificate management."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AnimatedButton href="/projects">View My Work</AnimatedButton>
            <AnimatedButton href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/resume`} variant="secondary" icon={<Download className="h-4 w-4" />}>
              Download Resume
            </AnimatedButton>
          </div>
          <div className="mt-8 flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200 light:border-violet-500/15 light:bg-white/75 light:text-slate-700"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative mx-auto flex w-full max-w-lg items-center justify-center py-12">
          <div className="absolute h-[25rem] w-[25rem] rounded-full border border-cyan-300/15" />
          <div className="absolute z-20 hidden h-[25rem] w-[25rem] items-center justify-center sm:flex">
            {orbitItems.map((item, index) => (
              <span
                key={item}
                className="orbit absolute inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#111118]/80 text-xs font-bold text-slate-100 shadow-xl backdrop-blur-md light:border-violet-500/15 light:bg-white/90 light:text-slate-800"
                style={{ animationDelay: `${index * -(16 / orbitItems.length)}s` }}
              >
                {item}
              </span>
            ))}
          </div>
          <GlassCard className="relative z-10 flex aspect-square w-72 items-center justify-center rounded-[28%] border-cyan-300/20 bg-gradient-to-br from-violet-500/20 via-white/[0.05] to-cyan-400/20 p-7 sm:w-80">
            <div className="absolute inset-4 rounded-[28%] border border-white/10" />
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[26%] bg-[#111118]/80 text-center light:bg-white/80">
              <p className="mt-4 max-w-44 text-sm leading-6 text-slate-300 light:text-slate-600">Building mobile apps, Web portals, and Backend systems.</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
