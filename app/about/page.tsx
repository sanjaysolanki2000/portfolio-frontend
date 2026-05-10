import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Timeline } from "@/components/ui/Timeline";
import { getProfile } from "@/lib/fetchData";
import { profile as dummyProfile } from "@/lib/data";

export default async function AboutPage() {
  const profileData = await getProfile();
  const profile = profileData ? { ...dummyProfile, ...profileData } : dummyProfile;

  return (
    <>
      <SectionWrapper className="grid gap-10 pt-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-violet-500/30 to-cyan-400/30 blur-2xl" />
          <GlassCard className="relative aspect-[4/5] overflow-hidden p-7">
            <div className="flex h-full flex-col items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-400/15 text-center">
              <p className="mt-5 max-w-52 text-sm leading-6 text-slate-300 light:text-slate-700">Building mobile apps, Web portals, and Backend systems.</p>
            </div>
          </GlassCard>
        </div>
        <div>
          <SectionHeading label="About Me" title="Who I Am" />
          <div className="space-y-5 text-base leading-8 text-slate-300 light:text-slate-700">
            <p className="whitespace-pre-wrap">{profile.longBio || profile.shortBio}</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading label="Skills" title="The stack I use to ship" />
        <SkillsGrid />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading label="Experience" title="Where I have been building" />
        <Timeline />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading label="Education" title="Academic foundation" />
        <GlassCard className="max-w-2xl p-6">
          <p className="font-heading text-2xl font-bold text-slate-50 light:text-slate-950">{profile.education.degree}</p>
          <p className="mt-3 text-slate-300 light:text-slate-700">{profile.education.university}</p>
          <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{profile.education.year}</p>
        </GlassCard>
      </SectionWrapper>
    </>
  );
}
