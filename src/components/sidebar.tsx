"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { InkSeal, BrushStroke } from "@/components/ink-seal";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-surface/60 backdrop-blur">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border">
        <Logo size={34} className="shrink-0 rounded-lg glow-gold" />
        <div className="leading-tight">
          <div className="font-mono text-sm text-ink-strong tracking-tight">
            StudEx<span className="text-pink">·</span>OS
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">
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
                  ? "bg-surface-2 text-ink-strong glow-pink"
                  : "text-ink-dim hover:text-ink hover:bg-surface-2/60"
              )}
            >
              <Icon
                size={17}
                className={cn(
                  "shrink-0 transition-colors",
                  active ? "text-pink" : "text-ink-faint group-hover:text-pink"
                )}
              />
              <div className="min-w-0">
                <div className="truncate font-medium">{item.label}</div>
                <div className="truncate text-[10px] text-ink-faint">
                  {item.desc}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* 水墨 calligraphy mark — seal + vertical characters */}
      <div className="px-4 pb-2">
        <BrushStroke width={160} color="#39ffaa" opacity={0.12} />
        <div className="mt-3 flex items-center gap-3">
          <InkSeal size={38} className="shrink-0 glow-vermilion rounded-sm" />
          <div
            className="writing-vertical text-[11px] font-mono tracking-[0.22em] text-ink-faint leading-none"
            style={{ letterSpacing: "0.3em" }}
            lang="zh-Hant"
          >
            學流系統
          </div>
          <div
            className="writing-vertical text-[10px] tracking-widest ml-auto"
            style={{ color: "var(--vermilion)", opacity: 0.55 }}
            lang="zh-Hant"
          >
            任務控制
          </div>
        </div>
        <BrushStroke width={160} color="#ff2ec4" opacity={0.09} className="mt-2" />
      </div>

      <div className="p-4 border-t border-border">
        <div className="rounded-lg grain p-3 text-[11px] text-ink-dim">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-done animate-pulse" />
            <span className="font-mono">brain: claude-code</span>
          </div>
          <div className="mt-1 text-ink-faint">
            wrapper online · bridge: telegram
          </div>
        </div>
      </div>
    </aside>
  );
}
