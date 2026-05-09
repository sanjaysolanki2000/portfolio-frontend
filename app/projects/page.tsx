"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { projectStore, type ProjectFilter } from "@/stores/projectStore";
import { cn } from "@/lib/utils";

const ProjectsPage = observer(function ProjectsPage() {
  useEffect(() => {
    projectStore.loadProjects();
  }, []);

  return (
    <SectionWrapper className="pt-24">
      <SectionHeading label="Projects" title="Things I&apos;ve Built" subtext="8+ production apps across mobile and web, seeded here from Sanjay&apos;s resume." />
      <div className="mb-8 flex flex-wrap gap-3">
        {projectStore.filters.map((filter: ProjectFilter) => (
          <button
            key={filter}
            type="button"
            onClick={() => projectStore.setFilter(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              projectStore.filter === filter
                ? "border-cyan-300 bg-cyan-300/15 text-cyan-100 light:text-cyan-700"
                : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-300/40 light:border-violet-500/15 light:bg-white/75 light:text-slate-700",
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projectStore.visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
});

export default ProjectsPage;
