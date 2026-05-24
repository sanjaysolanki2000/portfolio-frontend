"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { GlassCard } from "@/components/ui/GlassCard";
import { api } from "@/lib/api";
import { Toast } from "@/components/ui/Toast";

type InboxMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    try {
      const response = await api.get<InboxMessage[]>("/api/admin/messages");
      setMessages(response.data);
    } catch (err) {
      console.error("Error loading messages:", err);
      setToast({ message: "Failed to load messages from backend.", variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: string) {
    try {
      await api.patch(`/api/admin/messages/${id}`);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: true } : msg))
      );
      setToast({ message: "Message marked as read.", variant: "success" });
    } catch (err) {
      console.error("Error marking message read:", err);
      setToast({ message: "Failed to update message.", variant: "error" });
    } finally {
      window.setTimeout(() => setToast(null), 3000);
    }
  }

  async function deleteMessage(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this message?");
    if (!confirmed) return;

    try {
      await api.delete(`/api/admin/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      setToast({ message: "Message deleted.", variant: "success" });
    } catch (err) {
      console.error("Error deleting message:", err);
      setToast({ message: "Failed to delete message.", variant: "error" });
    } finally {
      window.setTimeout(() => setToast(null), 3000);
    }
  }

  return (
    <AdminGuard title="Inbox">
      {loading ? (
        <div className="flex h-40 items-center justify-center text-slate-400">Loading inbox messages...</div>
      ) : messages.length === 0 ? (
        <GlassCard className="p-8 text-center text-slate-400">
          <p className="text-base font-semibold">Your inbox is completely empty!</p>
          <p className="mt-1 text-sm text-slate-500">New messages sent via contact forms will appear here.</p>
        </GlassCard>
      ) : (
        <GlassCard className="divide-y divide-white/10 overflow-hidden light:divide-violet-500/10">
          {messages.map((item) => {
            const formattedDate = new Date(item.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <details key={item._id} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 select-none">
                  <span>
                    <span className="block font-semibold text-slate-50 light:text-slate-950">
                      {item.name} <span className="text-sm font-normal text-slate-400">&lt;{item.email}&gt;</span>
                    </span>
                    <span className="text-sm text-slate-400 light:text-slate-600">
                      {item.subject} - {formattedDate}
                    </span>
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.read
                        ? "bg-slate-500/10 text-slate-400 light:bg-slate-200 light:text-slate-600"
                        : "bg-cyan-300/15 text-cyan-200 light:text-cyan-700 animate-pulse"
                    }`}
                  >
                    {item.read ? "Read" : "New"}
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-slate-300 light:text-slate-700 whitespace-pre-wrap">{item.message}</p>
                <div className="mt-4 flex gap-4 text-sm font-semibold">
                  {!item.read && (
                    <button
                      type="button"
                      onClick={() => markAsRead(item._id)}
                      className="text-cyan-300 light:text-cyan-700 hover:underline cursor-pointer"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteMessage(item._id)}
                    className="text-red-400 hover:underline cursor-pointer"
                  >
                    Delete Message
                  </button>
                </div>
              </details>
            );
          })}
        </GlassCard>
      )}
      {toast ? <Toast message={toast.message} variant={toast.variant} /> : null}
    </AdminGuard>
  );
}
