"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit3, Eye, EyeOff, Plus, Trash2, X } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Toast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { projects as seededProjects, type Project } from "@/lib/data";
import { slugify } from "@/lib/utils";

type AdminProject = Project & {
  _id?: string;
};

const storageKey = "portfolio-admin-projects";

export default function AdminProjectsPage() {
  const [items, setItems] = useState<AdminProject[]>([]);
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  const sortedProjects = useMemo(() => [...items].sort((a, b) => a.order - b.order), [items]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const response = await api.get<AdminProject[]>("/api/admin/projects");
      setItems(response.data);
      saveLocal(response.data);
    } catch {
      setItems(readLocal());
    }
  }

  async function saveProject(formData: FormData) {
    setLoading(true);
    const payload = formDataToProject(formData, editingProject);

    try {
      let saved: AdminProject;
      if (editingProject?._id) {
        const response = await api.put<AdminProject>(`/api/admin/projects/${editingProject._id}`, formData);
        saved = response.data;
      } else {
        const response = await api.post<AdminProject>("/api/admin/projects", formData);
        saved = response.data;
      }

      updateLocalState(saved, Boolean(editingProject));
      setToast({ message: editingProject ? "Project updated." : "Project added.", variant: "success" });
    } catch {
      const fallbackProject = editingProject ? { ...editingProject, ...payload } : { ...payload, _id: crypto.randomUUID() };
      updateLocalState(fallbackProject, Boolean(editingProject));
      setToast({ message: "Saved locally. Start the backend to persist in MongoDB.", variant: "success" });
    } finally {
      setIsFormOpen(false);
      setEditingProject(null);
      setLoading(false);
      window.setTimeout(() => setToast(null), 3500);
    }
  }

  async function deleteProject(project: AdminProject) {
    const confirmed = window.confirm(`Delete "${project.title}"?`);
    if (!confirmed) return;

    try {
      if (project._id) {
        await api.delete(`/api/admin/projects/${project._id}`);
      }
      const next = items.filter((item) => getProjectKey(item) !== getProjectKey(project));
      setItems(next);
      saveLocal(next);
      setToast({ message: "Project deleted.", variant: "success" });
    } catch {
      const next = items.filter((item) => getProjectKey(item) !== getProjectKey(project));
      setItems(next);
      saveLocal(next);
      setToast({ message: "Project deleted locally. Start the backend to persist in MongoDB.", variant: "success" });
    } finally {
      window.setTimeout(() => setToast(null), 3500);
    }
  }

  async function toggleVisibility(project: AdminProject) {
    const nextProject = { ...project, visible: !project.visible };
    const formData = projectToFormData(nextProject);

    try {
      if (project._id) {
        const response = await api.put<AdminProject>(`/api/admin/projects/${project._id}`, formData);
        updateSpecificProject(project, response.data);
      } else {
        updateSpecificProject(project, nextProject);
      }
      setToast({ message: "Visibility updated.", variant: "success" });
    } catch {
      updateSpecificProject(project, nextProject);
      setToast({ message: "Visibility saved locally.", variant: "success" });
    } finally {
      window.setTimeout(() => setToast(null), 3500);
    }
  }

  function updateLocalState(project: AdminProject, editing: boolean) {
    const next = editing
      ? items.map((item) => (getProjectKey(item) === getProjectKey(editingProject || project) ? project : item))
      : [...items, project];
    setItems(next);
    saveLocal(next);
  }

  function updateSpecificProject(previous: AdminProject, nextProject: AdminProject) {
    const next = items.map((item) => (getProjectKey(item) === getProjectKey(previous) ? nextProject : item));
    setItems(next);
    saveLocal(next);
  }

  return (
    <AdminGuard title="Projects">
      <div className="w-full space-y-6">
        <GlassCard className="overflow-hidden w-full">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 light:border-violet-500/15 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-heading text-xl font-bold text-slate-50 light:text-slate-950">Project Table</h2>
              <p className="mt-1 text-sm text-slate-400 light:text-slate-600">{items.length} projects loaded</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingProject(null);
                setIsFormOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-200 light:text-cyan-700 cursor-pointer hover:bg-cyan-300/25 transition"
            >
              <Plus className="h-4 w-4" />
              Add New
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="px-5 py-3">Thumbnail</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Stack</th>
                  <th className="px-5 py-3">Visible</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((project) => (
                  <tr key={getProjectKey(project)} className="border-t border-white/10 text-slate-300 light:border-violet-500/10 light:text-slate-700">
                    <td className="px-5 py-4">
                      <span className="block h-10 w-14 rounded-md" style={{ background: project.accent }} />
                    </td>
                    <td className="px-5 py-4 font-semibold">{project.title}</td>
                    <td className="px-5 py-4">
                      {Array.isArray(project.category) ? project.category.join(", ") : project.category}
                    </td>
                    <td className="max-w-xs px-5 py-4">{project.stack.join(", ")}</td>
                    <td className="px-5 py-4">{project.visible ? "On" : "Off"}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(project);
                            setIsFormOpen(true);
                          }}
                          className="rounded-full border border-white/10 p-2 text-cyan-200 light:border-violet-500/15 light:text-cyan-700 cursor-pointer hover:bg-white/[0.05]"
                          aria-label={`Edit ${project.title}`}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => toggleVisibility(project)} className="rounded-full border border-white/10 p-2 text-slate-200 light:border-violet-500/15 light:text-slate-700 cursor-pointer hover:bg-white/[0.05]" aria-label={`Toggle ${project.title}`}>
                          {project.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        <button type="button" onClick={() => deleteProject(project)} className="rounded-full border border-red-300/20 p-2 text-red-200 light:text-red-600 cursor-pointer hover:bg-red-500/10" aria-label={`Delete ${project.title}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Floating Modal for ProjectForm */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => {
              setIsFormOpen(false);
              setEditingProject(null);
            }}
          />
          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0c14] p-6 shadow-2xl light:border-violet-500/15 light:bg-[#f4f4fb]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 light:border-violet-500/15">
              <h2 className="font-heading text-xl font-bold text-slate-50 light:text-slate-950">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingProject(null);
                }}
                className="rounded-lg border border-white/10 p-1.5 text-slate-400 hover:text-slate-100 light:border-violet-500/15 light:text-slate-600 cursor-pointer"
                aria-label="Close form modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProjectForm
              key={editingProject ? getProjectKey(editingProject) : "new-project"}
              project={editingProject}
              loading={loading}
              onSubmit={saveProject}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingProject(null);
              }}
            />
          </div>
        </div>
      )}

      {toast ? <Toast message={toast.message} variant={toast.variant} /> : null}
    </AdminGuard>
  );
}

function readLocal(): AdminProject[] {
  if (typeof window === "undefined") return seededProjects;
  const stored = localStorage.getItem(storageKey);
  if (!stored) return seededProjects;
  try {
    return JSON.parse(stored) as AdminProject[];
  } catch {
    return seededProjects;
  }
}

function saveLocal(projects: AdminProject[]) {
  localStorage.setItem(storageKey, JSON.stringify(projects));
}

function parseList(value: FormDataEntryValue | null) {
  return `${value || ""}`
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formDataToProject(formData: FormData, current?: AdminProject | null): AdminProject {
  const title = `${formData.get("title") || ""}`.trim();
  const categoryVals = formData.getAll("category");
  const filterVals = formData.getAll("filter");
  
  return {
    _id: current?._id,
    title,
    slug: `${formData.get("slug") || slugify(title)}`.trim(),
    category: (categoryVals.length > 0 ? categoryVals : parseList(formData.get("category"))) as AdminProject["category"],
    filter: (filterVals.length > 0 ? filterVals : parseList(formData.get("filter"))) as AdminProject["filter"],
    shortDescription: `${formData.get("shortDescription") || ""}`.trim(),
    longDescription: `${formData.get("longDescription") || ""}`.trim(),
    stack: parseList(formData.get("stack")),
    features: parseList(formData.get("features")),
    githubUrl: `${formData.get("githubUrl") || ""}`,
    demoUrl: `${formData.get("demoUrl") || ""}`,
    androidUrl: `${formData.get("androidUrl") || ""}`,
    iosUrl: `${formData.get("iosUrl") || ""}`,
    year: `${formData.get("year") || new Date().getFullYear()}`,
    order: Number(formData.get("order") || 1),
    visible: formData.get("visible") === "true" || formData.get("visible") === "on",
    accent: `${formData.get("accent") || "#6C63FF"}`,
  };
}

function projectToFormData(project: AdminProject) {
  const formData = new FormData();
  formData.set("title", project.title);
  formData.set("slug", project.slug);
  
  if (Array.isArray(project.category)) {
    project.category.forEach((c) => formData.append("category", c));
  } else {
    formData.set("category", project.category || "Mobile");
  }

  if (Array.isArray(project.filter)) {
    project.filter.forEach((f) => formData.append("filter", f));
  } else {
    formData.set("filter", project.filter || "React Native");
  }

  formData.set("shortDescription", project.shortDescription);
  formData.set("longDescription", project.longDescription);
  formData.set("stack", project.stack.join(", "));
  formData.set("features", project.features.join("\n"));
  formData.set("githubUrl", project.githubUrl || "");
  formData.set("demoUrl", project.demoUrl || "");
  formData.set("androidUrl", project.androidUrl || "");
  formData.set("iosUrl", project.iosUrl || "");
  formData.set("year", project.year);
  formData.set("order", `${project.order}`);
  formData.set("accent", project.accent);
  formData.set("visible", project.visible ? "true" : "false");
  return formData;
}

function getProjectKey(project: AdminProject) {
  return project._id || project.slug;
}
