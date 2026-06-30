"use client";

import { cn } from "@/lib/utils";
import { Sidebar, type SidebarItem } from "./sidebar";

export interface AppShellProps {
  sidebarItems: SidebarItem[];
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AppShell({
  sidebarItems,
  sidebarHeader,
  sidebarFooter,
  children,
  className,
}: AppShellProps) {
  return (
    <div className={cn("flex min-h-screen bg-background", className)}>
      <Sidebar
        items={sidebarItems}
        header={sidebarHeader}
        footer={sidebarFooter}
      />
      <main className="flex min-h-screen flex-1 flex-col">{children}</main>
    </div>
  );
}
