import {
  LayoutGrid,
  Bot,
  MessageSquare,
  Brain,
  CalendarClock,
  Network,
  ScrollText,
  Swords,
  Users,
  Globe,
  Send,
  Rocket,
  Building2,
  Heart,
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
  { href: "/onboarding", label: "Onboarding", icon: Rocket, desc: "5-step workspace setup" },
  { href: "/command-center", label: "Command Center", icon: Globe, desc: "10yr anniversary + live systems" },
  { href: "/agents-registry", label: "Agent Registry", icon: Users, desc: "All VMs, Lark, Slack, Discord" },
  { href: "/research-hub", label: "Research Hub", icon: Globe, desc: "China AI + Africa pharma intel" },
  { href: "/africa-pharma-hub", label: "Africa Pharma", icon: Building2, desc: "19-country distribution + cold chain" },
  { href: "/studex-health", label: "Studex Health", icon: Heart, desc: "🎉 Friday launch — VM partner invites" },
  { href: "/partner-outreach", label: "Partner Outreach", icon: Send, desc: "Tencent, ByteDance, NVIDIA, Anthropic" },
  { href: "/agents", label: "Agents", icon: Bot, desc: "Manage the team" },
  { href: "/chat", label: "Chat", icon: MessageSquare, desc: "All channels, one view" },
  { href: "/memories", label: "Memories", icon: Brain, desc: "Three-layer recall" },
  { href: "/scheduler", label: "Scheduler", icon: CalendarClock, desc: "Cron in plain English" },
  { href: "/studex-mind", label: "StudEx Mind", icon: Network, desc: "Graph of the swarm" },
  { href: "/war-room", label: "War Room", icon: Swords, desc: "Standup + discuss" },
  { href: "/audit", label: "Audit", icon: ScrollText, desc: "Append-only trail" },
];
