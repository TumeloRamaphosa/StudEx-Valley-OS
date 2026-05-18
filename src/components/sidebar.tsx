"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-surface/60 backdrop-blur">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border">
        <div className="h-8 w-8 rounded-lg grain glow-pink flex items-center justify-center font-mono text-pink font-bold">
          //
        </div>
        <div className="leading-tight">
          <div className="font-mono text-sm text-cream-bright tracking-tight">
            StudEx<span className="text-pink">·</span>OS
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-cream-faint">
            Mission Control
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 scrollbar-thin overflow-y-auto">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                active
                  ? "bg-surface-2 text-cream-bright glow-pink"
                  : "text-cream-dim hover:text-cream hover:bg-surface-2/60"
              )}
            >
              <Icon
                size={17}
                className={cn(
                  "shrink-0 transition-colors",
                  active ? "text-pink" : "text-cream-faint group-hover:text-pink"
                )}
              />
              <div className="min-w-0">
                <div className="truncate font-medium">{item.label}</div>
                <div className="truncate text-[10px] text-cream-faint">
                  {item.desc}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="rounded-lg grain p-3 text-[11px] text-cream-dim">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-done animate-pulse" />
            <span className="font-mono">brain: claude-code</span>
          </div>
          <div className="mt-1 text-cream-faint">
            wrapper online · bridge: telegram
          </div>
        </div>
      </div>
    </aside>
  );
}
