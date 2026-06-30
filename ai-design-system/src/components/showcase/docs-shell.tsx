"use client";

import {
  Blocks,
  LayoutDashboard,
  MessageSquare,
  Palette,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/patterns/app-shell";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/showcase/theme-toggle";

const navItems = [
  { label: "Overview", href: "/", icon: <Palette className="h-4 w-4" /> },
  {
    label: "Components",
    href: "/components",
    icon: <Blocks className="h-4 w-4" />,
  },
  {
    label: "Patterns",
    href: "/patterns",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Playground",
    href: "/playground",
    icon: <MessageSquare className="h-4 w-4" />,
    badge: "Live",
  },
];

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      sidebarItems={navItems}
      sidebarHeader={
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">AI Design System</p>
            <p className="text-xs text-muted-foreground">v0.1 · Reusable</p>
          </div>
        </div>
      }
      sidebarFooter={
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Avatar fallback="WJ" size="sm" />
            <div>
              <p className="text-xs font-medium">Your Product</p>
              <p className="text-[11px] text-muted-foreground">Pro plan</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
