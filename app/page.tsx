import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getProjects, getProfile } from "@/lib/fetchData";
import { projects as dummyProjects, profile as dummyProfile } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projectsData, profileData] = await Promise.all([getProjects(), getProfile()]);
  const projects = projectsData.length > 0 ? projectsData : dummyProjects;
  const profile = profileData ? { ...dummyProfile, ...profileData } : dummyProfile;

  return (
    <>
      <HeroSection profile={profile} />
      <StatsBar />
      <TechMarquee />
      <SectionWrapper id="projects">
        <SectionHeading label="Selected Work" title="Production apps with real users and real constraints" subtext="A quick pass through mobile, web, payment, map, socket, and admin workflows." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
