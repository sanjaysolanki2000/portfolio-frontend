import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getProjectBySlug, getProjects } from "@/lib/fetchData";
import { projects as dummyProjects } from "@/lib/data";

export async function generateStaticParams() {
  // Can fetch slugs from API or return empty array to rely on dynamic rendering
  return [];
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const [projectData, allProjectsData] = await Promise.all([
    getProjectBySlug(slug),
    getProjects()
  ]);

  const project = projectData || dummyProjects.find((item) => item.slug === slug);
  
  if (!project) {
    notFound();
  }

  const allProjects = allProjectsData.length > 0 ? allProjectsData : dummyProjects;
  const related = allProjects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 light:border-violet-500/15">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 25% 20%, ${project.accent}80, transparent 30%), linear-gradient(135deg, rgba(10,10,15,.94), rgba(17,17,24,.84))`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-100 light:text-cyan-700">
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Link>
          <h1 className="font-heading text-4xl font-bold text-slate-50 sm:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{project.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </section>

      <SectionWrapper className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <GlassCard className="p-6">
            <h2 className="font-heading text-2xl font-bold text-slate-50 light:text-slate-950">Overview</h2>
            <p className="mt-4 leading-8 text-slate-300 light:text-slate-700">{project.longDescription}</p>
          </GlassCard>
          <GlassCard className="mt-6 p-6">
            <h2 className="font-heading text-2xl font-bold text-slate-50 light:text-slate-950">Features</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-slate-300 light:text-slate-700">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300 light:text-cyan-700" />
                  {feature}
                </li>
              ))}
            </ul>
          </GlassCard>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.screenshotUrls && project.screenshotUrls.length > 0 ? (
              project.screenshotUrls.slice(0, 4).map((url, idx) => (
                <div key={idx} className="aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] light:border-violet-500/15 light:bg-white/75">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`${project.title} screenshot ${idx + 1}`} className="h-full w-full object-cover" />
                </div>
              ))
            ) : (
              [1, 2].map((item) => (
                <div key={item} className="aspect-[16/10] rounded-lg border border-white/10 bg-white/[0.04] p-4 light:border-violet-500/15 light:bg-white/75">
                  <div className="h-full rounded-md" style={{ background: `linear-gradient(135deg, ${project.accent}55, rgba(0,212,255,.18))` }} />
                </div>
              ))
            )}
          </div>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <GlassCard className="p-6">
            <h2 className="font-heading text-xl font-bold text-slate-50 light:text-slate-950">Project Info</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-slate-500">Category</dt>
                <dd className="mt-1 text-slate-200 light:text-slate-800">{project.category}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Year</dt>
                <dd className="mt-1 text-slate-200 light:text-slate-800">{project.year}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="mt-6 grid gap-3">
              <a href={project.demoUrl || "#"} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
              <a href={project.githubUrl || "#"} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 light:border-violet-500/15 light:text-slate-800">
                <Code2 className="h-4 w-4" />
                GitHub Repo
              </a>
            </div>
          </GlassCard>
        </aside>
      </SectionWrapper>

      <SectionWrapper>
        <h2 className="mb-6 font-heading text-3xl font-bold text-slate-50 light:text-slate-950">More Work</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <ProjectCard key={item.slug} project={item} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
