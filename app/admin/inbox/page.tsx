"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { GlassCard } from "@/components/ui/GlassCard";

const inbox = [
  { name: "Remote Client", subject: "React Native project", date: "2026-05-09", read: false, message: "Need help building a production mobile app with maps and payments." },
  { name: "Startup Team", subject: "Dashboard build", date: "2026-05-08", read: true, message: "We are exploring a MobX dashboard for operations." },
];

export default function AdminInboxPage() {
  return (
    <AdminGuard title="Inbox">
      <GlassCard className="divide-y divide-white/10 overflow-hidden light:divide-violet-500/10">
        {inbox.map((item) => (
          <details key={item.subject} className="group p-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4">
              <span>
                <span className="block font-semibold text-slate-50 light:text-slate-950">{item.name}</span>
                <span className="text-sm text-slate-400 light:text-slate-600">{item.subject} - {item.date}</span>
              </span>
              <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-200 light:text-cyan-700">{item.read ? "Read" : "Unread"}</span>
            </summary>
            <p className="mt-4 leading-7 text-slate-300 light:text-slate-700">{item.message}</p>
            <div className="mt-4 flex gap-3 text-sm font-semibold text-cyan-300 light:text-cyan-700">
              <button type="button">Mark as Read</button>
              <button type="button">Delete</button>
            </div>
          </details>
        ))}
      </GlassCard>
    </AdminGuard>
  );
}
