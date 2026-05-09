import { socialLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 light:border-violet-500/15">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm text-slate-400 light:text-slate-600 sm:flex-row">
        <p>© {new Date().getFullYear()} Sanjay Solanki. Built with Next.js, MobX, and care.</p>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200 light:border-violet-500/15 light:bg-white/75 light:text-slate-700"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
