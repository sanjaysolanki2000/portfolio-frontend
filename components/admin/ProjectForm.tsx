import { InputField } from "@/components/ui/InputField";
import { slugify } from "@/lib/utils";
import type { Project } from "@/lib/data";
import type { FormEvent } from "react";

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
  const title = project?.title || "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("visible", formData.get("visible") === "on" ? "true" : "false");
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
      <InputField label="Screenshots" name="screenshots" type="file" multiple />
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
