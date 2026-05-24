import { useState, type FormEvent } from "react";
import { InputField } from "@/components/ui/InputField";
import { slugify } from "@/lib/utils";
import type { Project } from "@/lib/data";
import { api } from "@/lib/api";

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
  const [thumbnailUrl, setThumbnailUrl] = useState(project?.thumbnailUrl || "");
  const [mediaLoading, setMediaLoading] = useState(false);
  const [accentColor, setAccentColor] = useState(project?.accent || "#6c63ff");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (!project?.category) return ["Mobile"];
    return Array.isArray(project.category) ? project.category : [project.category];
  });
  const [selectedFilters, setSelectedFilters] = useState<string[]>(() => {
    if (!project?.filter) return ["React Native"];
    return Array.isArray(project.filter) ? project.filter : [project.filter];
  });

  const categoriesOpts = ["Mobile", "Web", "Admin Panel",];
  const filtersOpts = ["React Native", "Flutter", "React.js", "Node Js", "PHP"];

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((x) => x !== cat)
        : [...prev, cat]
    );
  };

  const toggleFilter = (filt: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filt)
        ? prev.filter((x) => x !== filt)
        : [...prev, filt]
    );
  };

  async function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (project?._id) {
      setMediaLoading(true);
      const fd = new FormData();
      fd.append("thumbnail", file);
      try {
        const res = await api.patch(`/api/admin/projects/${project._id}/thumbnail`, fd);
        setThumbnailUrl(res.data.thumbnailUrl);
        setDeleteThumbnail(false);
      } catch (err) {
        console.error("Error uploading thumbnail:", err);
      } finally {
        setMediaLoading(false);
      }
    }
  }

  async function handleThumbnailDelete() {
    if (project?._id) {
      setMediaLoading(true);
      try {
        await api.delete(`/api/admin/projects/${project._id}/thumbnail`);
        setThumbnailUrl("");
        setDeleteThumbnail(true);
      } catch (err) {
        console.error("Error deleting thumbnail:", err);
      } finally {
        setMediaLoading(false);
      }
    } else {
      setDeleteThumbnail(true);
    }
  }

  async function handleScreenshotsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (project?._id) {
      setMediaLoading(true);
      const fd = new FormData();
      Array.from(files).forEach((file) => fd.append("screenshots", file));
      try {
        const res = await api.post(`/api/admin/projects/${project._id}/screenshots`, fd);
        setExistingScreenshots(res.data.screenshots || []);
        if (project) {
          project.screenshotUrls = res.data.screenshotUrls;
          project.screenshots = res.data.screenshots;
        }
      } catch (err) {
        console.error("Error uploading screenshots:", err);
      } finally {
        setMediaLoading(false);
      }
    }
  }

  async function handleScreenshotDelete(shot: string) {
    if (project?._id) {
      setMediaLoading(true);
      try {
        const res = await api.delete(`/api/admin/projects/${project._id}/screenshots`, { data: { path: shot } });
        setExistingScreenshots(res.data.screenshots || []);
        if (project) {
          project.screenshotUrls = res.data.screenshotUrls;
          project.screenshots = res.data.screenshots;
        }
      } catch (err) {
        console.error("Error deleting screenshot:", err);
      } finally {
        setMediaLoading(false);
      }
    } else {
      setExistingScreenshots((s) => s.filter((x) => x !== shot));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("visible", formData.get("visible") === "on" ? "true" : "false");

    // Clear automatic defaults for lists so multi-select values are clean
    formData.delete("category");
    formData.delete("filter");

    selectedCategories.forEach((cat) => formData.append("category", cat));
    selectedFilters.forEach((filt) => formData.append("filter", filt));

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

  const titleVal = project?.title || "";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: Title and Slug */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Title" name="title" defaultValue={titleVal} required />
        <InputField label="Slug" name="slug" defaultValue={project?.slug || slugify(titleVal)} />
      </div>

      {/* Row 2: Categories and Filters */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Multi-select Category Pills */}
        <div className="grid gap-2">
          <span className="text-xs font-semibold text-slate-400 light:text-slate-600">Categories</span>
          <div className="flex flex-wrap gap-2">
            {categoriesOpts.map((cat) => {
              const active = selectedCategories.includes(cat);
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition cursor-pointer ${active
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-select Filter Pills */}
        <div className="grid gap-2">
          <span className="text-xs font-semibold text-slate-400 light:text-slate-600">Filters</span>
          <div className="flex flex-wrap gap-2">
            {filtersOpts.map((filt) => {
              const active = selectedFilters.includes(filt);
              return (
                <button
                  type="button"
                  key={filt}
                  onClick={() => toggleFilter(filt)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition cursor-pointer ${active
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20"
                    }`}
                >
                  {filt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Short Description and Tech Stack */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Short Description" name="shortDescription" defaultValue={project?.shortDescription || ""} required />
        <InputField label="Tech Stack (comma separated)" name="stack" defaultValue={project?.stack?.join(", ") || ""} required />
      </div>

      {/* Row 4: Long Description */}
      <InputField label="Long Description" name="longDescription" textarea defaultValue={project?.longDescription || ""} required />

      {/* Row 5: Features */}
      <InputField label="Features (one per line)" name="features" textarea defaultValue={project?.features?.join("\n") || ""} required />

      {/* Row 6: Thumbnail and Screenshots uploads */}
      <div className="grid gap-4 sm:grid-cols-2 items-start border-t border-white/5 pt-4">
        <div>
          <InputField
            label="Thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            disabled={mediaLoading}
          />
          {thumbnailUrl && !deleteThumbnail && (
            <div className="mt-3 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnailUrl} alt="Thumbnail preview" className="h-16 rounded border border-white/10 object-cover" />
              <button
                type="button"
                onClick={handleThumbnailDelete}
                disabled={mediaLoading}
                className="text-sm font-semibold text-red-400 hover:text-red-300 disabled:opacity-50 cursor-pointer"
              >
                Delete Thumbnail
              </button>
            </div>
          )}
        </div>

        <div>
          <InputField
            label="Screenshots"
            name="screenshots"
            type="file"
            multiple
            accept="image/*"
            onChange={handleScreenshotsChange}
            disabled={mediaLoading}
          />
          {existingScreenshots.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3 max-h-40 overflow-y-auto p-1 border border-white/5 rounded-lg">
              {existingScreenshots.map((shot, idx) => {
                const url = project?.screenshotUrls?.[project?.screenshots?.indexOf(shot) ?? -1] || shot;
                return (
                  <div key={shot} className="group relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Screenshot ${idx}`} className="h-16 w-24 rounded border border-white/10 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleScreenshotDelete(shot)}
                      disabled={mediaLoading}
                      className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white opacity-0 shadow transition group-hover:opacity-100 disabled:opacity-50 cursor-pointer"
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
      </div>

      {/* Row 7: GitHub and Live Demo Links */}
      <div className="grid gap-4 sm:grid-cols-2 border-t border-white/5 pt-4">
        <InputField label="GitHub URL" name="githubUrl" defaultValue={project?.githubUrl || ""} />
        <InputField label="Live Demo URL" name="demoUrl" defaultValue={project?.demoUrl || ""} />
      </div>

      {/* Row 8: Mobile Application Links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Android App URL" name="androidUrl" defaultValue={project?.androidUrl || ""} />
        <InputField label="iOS App URL" name="iosUrl" defaultValue={project?.iosUrl || ""} />
      </div>

      {/* Row 9: Metadata (Year, Order, Accent) */}
      <div className="grid gap-4 sm:grid-cols-3">
        <InputField label="Year" name="year" defaultValue={project?.year || new Date().getFullYear()} />
        <InputField label="Display Order" name="order" type="number" defaultValue={project?.order ?? 1} />

        {/* Accent Color Picker */}
        <div className="relative">
          <span className="text-xs font-semibold text-slate-400 light:text-slate-600 block mb-1">Accent Color</span>
          <div className="flex gap-2 items-center rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 h-[52px] light:border-violet-500/15 light:bg-white/75">
            <input
              type="color"
              name="accent"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="cursor-pointer bg-transparent p-0 border-0 outline-none block shrink-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border [&::-webkit-color-swatch]:border-white/15 [&::-webkit-color-swatch]:rounded-sm"
              style={{ width: "22px", height: "22px" }}
            />
            <input
              type="text"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#6C63FF"
              className="flex-1 bg-transparent text-sm text-slate-50 light:text-slate-950 outline-none uppercase font-mono"
            />
          </div>
        </div>
      </div>

      {/* Row 10: Visibility */}
      <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 light:border-violet-500/15 light:bg-white/75 light:text-slate-800">
        <input name="visible" type="checkbox" defaultChecked={project?.visible ?? true} className="h-4 w-4 accent-cyan-400" />
        Visible on public site
      </label>

      {mediaLoading && (
        <div className="text-xs font-bold text-cyan-300 animate-pulse">Uploading/deleting media in background...</div>
      )}

      {/* Row 11: Actions */}
      <div className="flex flex-col gap-3 sm:flex-row mt-6 pt-4 border-t border-white/10">
        <button
          type="submit"
          disabled={loading || mediaLoading}
          className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-98 transition duration-200"
        >
          {loading ? "Saving..." : project?._id || project?.slug ? "Update Project" : "Add Project"}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-200 light:border-violet-500/15 light:text-slate-800 cursor-pointer hover:bg-white/[0.05] transition"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
