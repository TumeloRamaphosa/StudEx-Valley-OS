"use client";

import { Search, Power, Plus } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-bg/80 px-6 backdrop-blur">
      <div className="flex items-center gap-2 text-xs font-mono text-ink-faint">
        <span className="text-pink">~</span>
        <span className="caret">studex-valley-os</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-ink-dim">
          <Search size={14} className="text-ink-faint" />
          <input
            placeholder="Search agents, tasks, memories…"
            className="bg-transparent outline-none placeholder:text-ink-faint w-56"
          />
          <kbd className="ml-2 rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-ink-faint">
            ⌘K
          </kbd>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-pink px-3 py-2 text-sm font-medium text-ink-strong transition-transform hover:scale-[1.03] active:scale-95">
          <Plus size={15} />
          New task
        </button>

        <button
          title="Kill switches"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-ink-dim transition-colors hover:text-warn hover:border-warn/50"
        >
          <Power size={15} />
        </button>
      </div>
    </header>
  );
}
