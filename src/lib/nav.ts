import {
  LayoutGrid,
  Bot,
  MessageSquare,
  Brain,
  CalendarClock,
  Network,
  ScrollText,
  Swords,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  desc: string;
};

export const NAV: NavItem[] = [
  { href: "/", label: "Mission Control", icon: LayoutGrid, desc: "Kanban + auto-assign" },
  { href: "/agents", label: "Agents", icon: Bot, desc: "Manage the team" },
  { href: "/chat", label: "Chat", icon: MessageSquare, desc: "All channels, one view" },
  { href: "/memories", label: "Memories", icon: Brain, desc: "Three-layer recall" },
  { href: "/scheduler", label: "Scheduler", icon: CalendarClock, desc: "Cron in plain English" },
  { href: "/studex-mind", label: "StudEx Mind", icon: Network, desc: "Graph of the swarm" },
  { href: "/war-room", label: "War Room", icon: Swords, desc: "Standup + discuss" },
  { href: "/audit", label: "Audit", icon: ScrollText, desc: "Append-only trail" },
];
