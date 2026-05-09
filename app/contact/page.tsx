"use client";

import { FormEvent, useState } from "react";
import { BriefcaseBusiness, Code2, Send } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Toast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { contactMethods, profile } from "@/lib/data";

export default function ContactPage() {
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (`${payload.message || ""}`.trim().length < 20) {
      setToast({ message: "Message should be at least 20 characters.", variant: "error" });
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/contact", payload);
      form.reset();
      setToast({ message: "Message sent! I'll reply soon.", variant: "success" });
    } catch {
      setToast({ message: "Could not send message right now. Please email me directly.", variant: "error" });
    } finally {
      setLoading(false);
      window.setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <SectionWrapper className="grid gap-8 pt-24 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <SectionHeading label="Contact" title="Let&apos;s build something useful" subtext="Send a project note, collaboration idea, or remote role opportunity." />
        <GlassCard className="p-6">
          <form onSubmit={onSubmit} className="grid gap-5">
            <InputField label="Name" name="name" required />
            <InputField label="Email" name="email" type="email" required />
            <InputField label="Subject" name="subject" />
            <InputField label="Message" name="message" textarea required minLength={20} />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </GlassCard>
      </div>
      <div className="lg:pt-36">
        <GlassCard className="p-6">
          <h2 className="font-heading text-2xl font-bold text-slate-50 light:text-slate-950">Contact Info</h2>
          <div className="mt-6 space-y-4">
            {contactMethods.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300 transition hover:border-cyan-300/40 light:border-violet-500/15 light:bg-white/70 light:text-slate-700"
              >
                <Icon className="h-5 w-5 shrink-0 text-cyan-300 light:text-cyan-700" />
                <span>{label}</span>
              </a>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-200 light:border-violet-500/15 light:text-slate-700">
              <BriefcaseBusiness className="h-5 w-5" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-200 light:border-violet-500/15 light:text-slate-700">
              <Code2 className="h-5 w-5" />
            </a>
          </div>
        </GlassCard>
      </div>
      {toast ? <Toast message={toast.message} variant={toast.variant} /> : null}
    </SectionWrapper>
  );
}
