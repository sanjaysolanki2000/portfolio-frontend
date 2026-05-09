import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Timeline } from "@/components/ui/Timeline";
import { profile } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      <SectionWrapper className="grid gap-10 pt-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-violet-500/30 to-cyan-400/30 blur-2xl" />
          <GlassCard className="relative aspect-[4/5] overflow-hidden p-7">
            <div className="flex h-full flex-col items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-400/15 text-center">
              <span className="font-heading text-8xl font-bold text-slate-50 light:text-slate-950">SS</span>
              <p className="mt-5 max-w-52 text-sm leading-6 text-slate-300 light:text-slate-700">Bikaner-based developer building mobile apps, web portals, and practical backend systems.</p>
            </div>
          </GlassCard>
        </div>
        <div>
          <SectionHeading label="About Me" title="Who I Am" />
          <div className="space-y-5 text-base leading-8 text-slate-300 light:text-slate-700">
            <p>
              I&apos;m Sanjay Solanki, a mobile and full stack developer from Bikaner with 3+ years of hands-on production experience at ITech Solutions. My work usually sits where product ideas become real user flows: mobile screens, API integrations, payment journeys, maps, dashboards, and admin tools.
            </p>
            <p>
              I enjoy building apps that are tidy under the hood and calm on the surface. React Native, Flutter, React.js, Node.js, and PHP are the tools I reach for most often, and I&apos;ve shipped work across e-commerce, delivery tracking, AI-powered services, and certificate management.
            </p>
            <p>
              Remote collaboration is already part of my rhythm. On Certinate, I worked with React.js, MobX, and Material UI in a distributed workflow, keeping communication clear and the UI predictable while the product evolved.
            </p>
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
