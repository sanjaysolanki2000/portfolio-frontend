"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Inbox, MailOpen, Download, Plus } from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { StatCard } from "@/components/admin/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { api } from "@/lib/api";

type InboxMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  read: boolean;
  createdAt: string;
};

type ProjectCountResponse = {
  _id?: string;
};

export default function AdminDashboardPage() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const [messagesRes, projectsRes] = await Promise.all([
        api.get<InboxMessage[]>("/api/admin/messages"),
        api.get<ProjectCountResponse[]>("/api/admin/projects"),
      ]);
      setMessages(messagesRes.data);
      setProjectCount(projectsRes.data.length);
    } catch (err) {
      console.error("Error loading dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <AdminGuard title="Dashboard">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Projects" value={loading ? "..." : projectCount} icon={FolderKanban} />
        <StatCard label="Unread Messages" value={loading ? "..." : unreadCount} icon={Inbox} />
        <StatCard label="Total Messages" value={loading ? "..." : messages.length} icon={MailOpen} />
        <StatCard label="Resume Downloads" value={0} icon={Download} />
      </div>

      <GlassCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 p-5 light:border-violet-500/15">
          <h2 className="font-heading text-xl font-bold text-slate-50 light:text-slate-950">Recent Messages</h2>
          <a
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 rounded-full bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-200 light:text-cyan-700 hover:bg-cyan-300/25 transition"
          >
            <Plus className="h-4 w-4" /> Add Project
          </a>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex h-32 items-center justify-center text-slate-400">Loading recent messages...</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No messages in your inbox.</div>
          ) : (
            <table className="w-full min-w-[640px] text-left text-sm text-slate-300 light:text-slate-700">
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
                {messages.slice(0, 5).map((message) => {
                  const formattedDate = new Date(message.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={message._id} className="border-t border-white/10 light:border-violet-500/10 hover:bg-white/[0.02]">
                      <td className="px-5 py-4 font-semibold">{message.name}</td>
                      <td className="px-5 py-4">{message.email}</td>
                      <td className="px-5 py-4 max-w-xs truncate">{message.subject}</td>
                      <td className="px-5 py-4">{formattedDate}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            message.read
                              ? "bg-slate-500/10 text-slate-400"
                              : "bg-cyan-300/15 text-cyan-200"
                          }`}
                        >
                          {message.read ? "Read" : "New"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </GlassCard>
    </AdminGuard>
  );
}
