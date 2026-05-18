import { PageHeader, Card, Badge } from "@/components/ui";
import { Send } from "lucide-react";

const MSGS = [
  { from: "you", channel: "telegram", text: "What's blocked across the team this morning?", time: "07:31" },
  { from: "Main", channel: "telegram", text: "Two blockers: Research is waiting on EU partner data; Ops needs the housing invoice CSV. Everything else is moving.", time: "07:31" },
  { from: "you", channel: "slack", text: "Push the newsletter draft to me when Content finishes.", time: "09:04" },
  { from: "Content", channel: "slack", text: "Draft ready — neon-pink branded, 640 words. Sent to your review queue.", time: "09:48" },
];

export default function ChatPage() {
  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-4xl flex-col">
      <PageHeader
        title="Chat"
        subtitle="Telegram, Slack, Discord, web — every channel funnels into one history."
        action={<Badge tone="running">unified history</Badge>}
      />

      <Card className="flex flex-1 flex-col overflow-hidden p-0">
        <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin p-5">
          {MSGS.map((m, i) => {
            const mine = m.from === "you";
            return (
              <div key={i} className={mine ? "flex justify-end" : "flex justify-start"}>
                <div className="max-w-[75%]">
                  <div className="mb-1 flex items-center gap-2 text-[10px] font-mono text-cream-faint">
                    <span className={mine ? "text-cream-dim" : "text-pink"}>
                      {mine ? "you" : m.from}
                    </span>
                    <span className="rounded bg-surface-2 px-1.5">{m.channel}</span>
                    <span>{m.time}</span>
                  </div>
                  <div
                    className={
                      mine
                        ? "rounded-2xl rounded-tr-sm bg-pink/15 border border-pink/30 px-4 py-2.5 text-sm text-cream"
                        : "rounded-2xl rounded-tl-sm surface-card px-4 py-2.5 text-sm text-cream"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 border-t border-border p-4">
          <input
            placeholder="Message the hive mind…"
            className="flex-1 rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm text-cream outline-none placeholder:text-cream-faint focus:ring-pink"
          />
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink text-bg transition-transform hover:scale-105 active:scale-95">
            <Send size={16} />
          </button>
        </div>
      </Card>
    </div>
  );
}
