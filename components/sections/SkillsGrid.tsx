import { GlassCard } from "@/components/ui/GlassCard";
import { SkillPill } from "@/components/ui/SkillPill";
import { skillGroups } from "@/lib/data";

export function SkillsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {skillGroups.map(({ title, skills, icon: Icon }) => (
        <GlassCard key={title} className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-500/25 to-cyan-400/25 text-cyan-200 light:text-cyan-700">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-xl font-bold text-slate-50 light:text-slate-950">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillPill key={skill} label={skill} />
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
