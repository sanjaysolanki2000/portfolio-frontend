"use client";

import { FolderKanban, Inbox, MailOpen, Download } from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { StatCard } from "@/components/admin/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { projects } from "@/lib/data";

const messages = [
  { name: "Remote Client", email: "hello@example.com", subject: "React Native project", date: "2026-05-09", status: "Unread" },
  { name: "Startup Team", email: "team@example.com", subject: "Dashboard build", date: "2026-05-08", status: "Read" },
];

export default function AdminDashboardPage() {
  return (
    <AdminGuard title="Dashboard">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Projects" value={projects.length} icon={FolderKanban} />
        <StatCard label="Unread Messages" value={1} icon={Inbox} />
        <StatCard label="Total Messages" value={messages.length} icon={MailOpen} />
        <StatCard label="Resume Downloads" value={0} icon={Download} />
      </div>
      <GlassCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 p-5 light:border-violet-500/15">
          <h2 className="font-heading text-xl font-bold text-slate-50 light:text-slate-950">Recent Messages</h2>
          <a href="/admin/projects" className="rounded-full bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-200 light:text-cyan-700">
            + Add Project
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Subject</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.email} className="border-t border-white/10 text-slate-300 light:border-violet-500/10 light:text-slate-700">
                  <td className="px-5 py-4">{message.name}</td>
                  <td className="px-5 py-4">{message.email}</td>
                  <td className="px-5 py-4">{message.subject}</td>
                  <td className="px-5 py-4">{message.date}</td>
                  <td className="px-5 py-4">{message.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </AdminGuard>
  );
}
