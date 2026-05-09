"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin ? <Navbar /> : null}
      <main className={isAdmin ? "min-h-screen" : "min-h-screen pt-16"}>{children}</main>
      {!isAdmin ? <Footer /> : null}
    </>
  );
}
