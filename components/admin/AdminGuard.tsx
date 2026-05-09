"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AdminGuard({ title, children }: { title: string; children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("portfolio-admin") === "true";
    setAuthenticated(isAuthenticated);
    setMounted(true);

    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [router]);

  if (!mounted || !authenticated) {
    return <div className="flex min-h-screen items-center justify-center text-slate-300">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[#0a0a0f]/75 px-5 backdrop-blur-md light:border-violet-500/15 light:bg-[#f4f4fb]/80">
          <h1 className="font-heading text-xl font-bold text-slate-50 light:text-slate-950">{title}</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-sm font-bold text-white">SS</span>
          </div>
        </header>
        <div className="p-5 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
