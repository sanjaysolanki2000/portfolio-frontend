"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { Toast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { profile, techStack } from "@/lib/data";

type EditableProfile = {
  fullName: string;
  role: string;
  shortBio: string;
  longBio: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  skills: string[];
  availability: "Available" | "Not Available";
  photoUrl?: string;
  resumeUrl?: string;
};

const storageKey = "portfolio-admin-profile";

const defaultProfile: EditableProfile = {
  fullName: profile.name,
  role: profile.role,
  shortBio: "3+ years building production-grade mobile and web apps.",
  longBio: "I build mobile apps, web dashboards, APIs, integrations, payment flows, maps, sockets, and useful admin systems.",
  email: profile.email,
  phone: profile.phone,
  githubUrl: profile.github,
  linkedinUrl: profile.linkedin,
  skills: techStack,
  availability: "Available",
};

export default function AdminProfilePage() {
  const [data, setData] = useState<EditableProfile>(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const response = await api.get<Partial<EditableProfile> | null>("/api/profile");
      if (response.data) {
        const next = normalizeProfile(response.data);
        setData(next);
        saveLocal(next);
      } else {
        setData(readLocal());
      }
    } catch {
      setData(readLocal());
    }
  }

  async function handleDeletePhoto() {
    if (!window.confirm("Delete profile photo?")) return;
    try {
      const response = await api.delete<Partial<EditableProfile>>("/api/admin/profile/photo");
      const next = normalizeProfile(response.data || data);
      setData(next);
      saveLocal(next);
      setToast({ message: "Photo deleted.", variant: "success" });
    } catch {
      setToast({ message: "Error deleting photo.", variant: "error" });
    } finally {
      window.setTimeout(() => setToast(null), 3500);
    }
  }

  async function handleDeleteResume() {
    if (!window.confirm("Delete resume?")) return;
    try {
      const response = await api.delete<Partial<EditableProfile>>("/api/admin/profile/resume");
      const next = normalizeProfile(response.data || data);
      setData(next);
      saveLocal(next);
      setToast({ message: "Resume deleted.", variant: "success" });
    } catch {
      setToast({ message: "Error deleting resume.", variant: "error" });
    } finally {
      window.setTimeout(() => setToast(null), 3500);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const photo = formData.get("photo");
    const resume = formData.get("resume");
    const nextProfile = formDataToProfile(formData);
    const profilePayload = new FormData();

    profilePayload.set("fullName", nextProfile.fullName);
    profilePayload.set("role", nextProfile.role);
    profilePayload.set("shortBio", nextProfile.shortBio);
    profilePayload.set("longBio", nextProfile.longBio);
    profilePayload.set("email", nextProfile.email);
    profilePayload.set("phone", nextProfile.phone);
    profilePayload.set("githubUrl", nextProfile.githubUrl);
    profilePayload.set("linkedinUrl", nextProfile.linkedinUrl);
    profilePayload.set("skills", nextProfile.skills.join(", "));
    profilePayload.set("availability", nextProfile.availability);

    if (isRealFile(photo)) {
      profilePayload.set("photo", photo);
    }

    try {
      const response = await api.patch<Partial<EditableProfile>>("/api/admin/profile", profilePayload);
      const saved = normalizeProfile(response.data || nextProfile);

      if (isRealFile(resume)) {
        const resumePayload = new FormData();
        resumePayload.set("resume", resume);
        await api.post("/api/admin/profile/resume", resumePayload);
      }

      setData(saved);
      saveLocal(saved);
      setToast({ message: "Profile updated.", variant: "success" });
    } catch {
      setData(nextProfile);
      saveLocal(nextProfile);
      setToast({ message: "Profile saved locally. Start the backend to persist in MongoDB.", variant: "success" });
    } finally {
      setLoading(false);
      window.setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <AdminGuard title="Profile">
      <form key={JSON.stringify(data)} onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: About & Professional Bio */}
          <GlassCard className="p-6 space-y-5">
            <h2 className="font-heading text-lg font-bold text-cyan-300 light:text-cyan-700 border-b border-white/10 pb-3 light:border-violet-500/10">
              Professional Biography
            </h2>
            <InputField label="Full Name" name="fullName" defaultValue={data.fullName} required />
            <InputField label="Role/Title" name="role" defaultValue={data.role} required />
            <InputField label="Short Bio" name="shortBio" defaultValue={data.shortBio} />
            <InputField label="Long Bio" name="longBio" textarea defaultValue={data.longBio} />
            
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div>
                <InputField label="Profile Photo" name="photo" type="file" accept="image/*" />
                {data.photoUrl && (
                  <div className="mt-3 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.photoUrl} alt="Profile preview" className="h-12 w-12 rounded-full border border-white/10 object-cover" />
                    <button type="button" onClick={handleDeletePhoto} className="text-xs font-semibold text-red-400 hover:text-red-300 cursor-pointer">
                      Delete Photo
                    </button>
                  </div>
                )}
              </div>

              <div>
                <InputField label="Resume PDF" name="resume" type="file" accept="application/pdf" />
                {data.resumeUrl && (
                  <div className="mt-3 flex flex-col gap-1">
                    <a href={data.resumeUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-cyan-400 hover:underline">
                      View Current Resume
                    </a>
                    <button type="button" onClick={handleDeleteResume} className="text-left text-xs font-semibold text-red-400 hover:text-red-300 cursor-pointer">
                      Delete Resume
                    </button>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>

          {/* Right Column: Contact & Links */}
          <GlassCard className="p-6 space-y-5">
            <h2 className="font-heading text-lg font-bold text-cyan-300 light:text-cyan-700 border-b border-white/10 pb-3 light:border-violet-500/10">
              Contact & Social Channels
            </h2>
            <InputField label="Email" name="email" type="email" defaultValue={data.email} required />
            <InputField label="Phone" name="phone" defaultValue={data.phone} />
            <InputField label="GitHub URL" name="githubUrl" defaultValue={data.githubUrl} />
            <InputField label="LinkedIn URL" name="linkedinUrl" defaultValue={data.linkedinUrl} />
            <InputField label="Skills (comma separated)" name="skills" defaultValue={data.skills.join(", ")} />
            
            <label className="grid gap-2 text-xs font-medium text-slate-400 light:text-slate-600">
              Availability Status
              <select
                name="availability"
                defaultValue={data.availability}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-50 outline-none light:border-violet-500/15 light:bg-white/75 light:text-slate-950"
              >
                <option>Available</option>
                <option>Not Available</option>
              </select>
            </label>
          </GlassCard>
        </div>

        {/* Form Action Bar */}
        <GlassCard className="p-4 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-98 transition duration-200"
          >
            {loading ? "Saving Changes..." : "Save Profile Details"}
          </button>
        </GlassCard>
      </form>
      {toast ? <Toast message={toast.message} variant={toast.variant} /> : null}
    </AdminGuard>
  );
}

function readLocal() {
  if (typeof window === "undefined") return defaultProfile;
  const stored = localStorage.getItem(storageKey);
  if (!stored) return defaultProfile;
  try {
    return normalizeProfile(JSON.parse(stored) as Partial<EditableProfile>);
  } catch {
    return defaultProfile;
  }
}

function saveLocal(nextProfile: EditableProfile) {
  localStorage.setItem(storageKey, JSON.stringify(nextProfile));
}

function normalizeProfile(value: Partial<EditableProfile>): EditableProfile {
  return {
    ...defaultProfile,
    ...value,
    skills: Array.isArray(value.skills) ? value.skills : defaultProfile.skills,
    availability: value.availability === "Not Available" ? "Not Available" : "Available",
  };
}

function formDataToProfile(formData: FormData): EditableProfile {
  return {
    fullName: `${formData.get("fullName") || ""}`.trim(),
    role: `${formData.get("role") || ""}`.trim(),
    shortBio: `${formData.get("shortBio") || ""}`.trim(),
    longBio: `${formData.get("longBio") || ""}`.trim(),
    email: `${formData.get("email") || ""}`.trim(),
    phone: `${formData.get("phone") || ""}`.trim(),
    githubUrl: `${formData.get("githubUrl") || ""}`.trim(),
    linkedinUrl: `${formData.get("linkedinUrl") || ""}`.trim(),
    skills: `${formData.get("skills") || ""}`
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    availability: formData.get("availability") === "Not Available" ? "Not Available" : "Available",
  };
}

function isRealFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}
