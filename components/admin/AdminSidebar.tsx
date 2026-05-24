"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, FolderKanban, Inbox, LogOut, UserRound, X } from "lucide-react";
import { adminStore } from "@/stores/adminStore";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/profile", label: "Profile", icon: UserRound },
];

export function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    adminStore.logout();
    router.push("/admin/login");
  }

  const sidebarContent = (isMobile = false) => (
    <>
      <div className="flex items-center justify-between rounded-lg py-2">
        <Link
          href="/admin/dashboard"
          onClick={() => isMobile && setMobileOpen?.(false)}
          className="font-heading text-xl font-bold text-slate-50 light:text-slate-950"
        >
          Portfolio Admin
        </Link>
        {isMobile && (
          <button
            onClick={() => setMobileOpen?.(false)}
            className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-slate-100 light:border-violet-500/15 light:text-slate-600"
            aria-label="Close sidebar menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="mt-8 space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => isMobile && setMobileOpen?.(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition",
              pathname === href
                ? "bg-cyan-300/15 text-cyan-200 light:text-cyan-700 light:bg-violet-500/10"
                : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100 light:text-slate-600 light:hover:bg-white/75 light:hover:text-slate-950",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => {
          if (isMobile) setMobileOpen?.(false);
          logout();
        }}
        className="absolute bottom-5 left-4 right-4 flex items-center gap-3 rounded-lg border border-white/10 px-3 py-3 text-sm font-semibold text-slate-300 transition hover:border-red-300/40 hover:text-red-200 light:border-violet-500/15 light:text-slate-700 light:hover:border-red-500/30"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-[#0a0a0f]/95 p-4 backdrop-blur-md light:border-violet-500/15 light:bg-[#f4f4fb]/95 lg:block">
        {sidebarContent(false)}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen?.(false)}
          />
          {/* Slide-out Sidebar */}
          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#0a0a0f] p-4 light:border-violet-500/15 light:bg-[#f4f4fb] shadow-2xl">
            {sidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
