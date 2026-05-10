import { useState, type FormEvent } from "react";
import { InputField } from "@/components/ui/InputField";
import { slugify } from "@/lib/utils";
import type { Project } from "@/lib/data";

type EditableProject = Partial<Project> & {
  _id?: string;
};

type ProjectFormProps = {
  project?: EditableProject | null;
  loading?: boolean;
  onSubmit: (formData: FormData) => void | Promise<void>;
  onCancel?: () => void;
};

export function ProjectForm({ project, loading, onSubmit, onCancel }: ProjectFormProps) {
  const [existingScreenshots, setExistingScreenshots] = useState<string[]>(project?.screenshots || []);
  const [deleteThumbnail, setDeleteThumbnail] = useState(false);
  const title = project?.title || "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("visible", formData.get("visible") === "on" ? "true" : "false");

    if (existingScreenshots.length > 0) {
      existingScreenshots.forEach((shot) => formData.append("existingScreenshots", shot));
    } else {
      formData.set("existingScreenshots", "");
    }

    if (deleteThumbnail) {
      formData.set("deleteThumbnail", "true");
    }

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <InputField label="Title" name="title" defaultValue={title} required />
      <InputField label="Slug" name="slug" defaultValue={project?.slug || slugify(title)} />
      <label className="grid gap-2 text-xs font-medium text-slate-400 light:text-slate-600">
        Category
        <select
          name="category"
          defaultValue={project?.category || "Mobile"}
          className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-50 outline-none light:border-violet-500/15 light:bg-white/75 light:text-slate-950"
        >
          <option>Mobile</option>
          <option>Web</option>
          <option>Admin Panel</option>
        </select>
      </label>
      <label className="grid gap-2 text-xs font-medium text-slate-400 light:text-slate-600">
        Filter
        <select
          name="filter"
          defaultValue={project?.filter || "React Native"}
          className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-50 outline-none light:border-violet-500/15 light:bg-white/75 light:text-slate-950"
        >
          <option>React Native</option>
          <option>Flutter</option>
          <option>React.js</option>
          <option>PHP</option>
        </select>
      </label>
      <InputField label="Short Description" name="shortDescription" defaultValue={project?.shortDescription || ""} required />
      <InputField label="Long Description" name="longDescription" textarea defaultValue={project?.longDescription || ""} required />
      <InputField label="Tech Stack" name="stack" defaultValue={project?.stack?.join(", ") || ""} required />
      <InputField label="Features" name="features" textarea defaultValue={project?.features?.join("\n") || ""} required />
      
      <div>
        <InputField label="Thumbnail" name="thumbnail" type="file" accept="image/*" />
        {project?.thumbnailUrl && !deleteThumbnail && (
          <div className="mt-3 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.thumbnailUrl} alt="Thumbnail preview" className="h-16 rounded border border-white/10" />
            <button type="button" onClick={() => setDeleteThumbnail(true)} className="text-sm font-semibold text-red-400 hover:text-red-300">
              Delete Thumbnail
            </button>
          </div>
        )}
      </div>

      <div>
        <InputField label="Screenshots" name="screenshots" type="file" multiple accept="image/*" />
        {existingScreenshots.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {existingScreenshots.map((shot, idx) => {
              const url = project?.screenshotUrls?.[project?.screenshots?.indexOf(shot) ?? -1] || shot;
              return (
                <div key={shot} className="group relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Screenshot ${idx}`} className="h-16 rounded border border-white/10 object-cover" />
                  <button
                    type="button"
                    onClick={() => setExistingScreenshots((s) => s.filter((x) => x !== shot))}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white opacity-0 shadow transition group-hover:opacity-100"
                    title="Delete screenshot"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <InputField label="GitHub URL" name="githubUrl" defaultValue={project?.githubUrl || ""} />
      <InputField label="Live Demo URL" name="demoUrl" defaultValue={project?.demoUrl || ""} />
      <InputField label="Year" name="year" defaultValue={project?.year || new Date().getFullYear()} />
      <InputField label="Display Order" name="order" type="number" defaultValue={project?.order ?? 1} />
      <InputField label="Accent Color" name="accent" defaultValue={project?.accent || "#6C63FF"} />
      <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 light:border-violet-500/15 light:bg-white/75 light:text-slate-800">
        <input name="visible" type="checkbox" defaultChecked={project?.visible ?? true} className="h-4 w-4 accent-cyan-400" />
        Visible on public site
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : project?._id || project?.slug ? "Update Project" : "Add Project"}
        </button>
        {onCancel ? (
          <button type="button" onClick={onCancel} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 light:border-violet-500/15 light:text-slate-800">
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
