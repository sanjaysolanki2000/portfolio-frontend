"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { LockKeyhole } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { adminStore } from "@/stores/adminStore";

const LoginPage = observer(function LoginPage() {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const ok = await adminStore.login(`${formData.get("email")}`, `${formData.get("password")}`);
    if (ok) {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="mesh-bg flex min-h-screen items-center justify-center px-5">
      <GlassCard className="w-full max-w-md p-7">
        <div className="mb-7 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-200 light:text-cyan-700">
            <LockKeyhole className="h-6 w-6" />
          </span>
          <h1 className="font-heading text-3xl font-bold text-slate-50 light:text-slate-950">Admin Login</h1>
        </div>
        <form onSubmit={onSubmit} className="grid gap-5">
          <InputField label="Email" name="email" type="email" required />
          <InputField label="Password" name="password" type="password" required />
          {adminStore.error ? <p className="text-sm text-red-300 light:text-red-600">{adminStore.error}</p> : null}
          <button
            type="submit"
            disabled={adminStore.loading}
            className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {adminStore.loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </GlassCard>
    </div>
  );
});

export default LoginPage;
