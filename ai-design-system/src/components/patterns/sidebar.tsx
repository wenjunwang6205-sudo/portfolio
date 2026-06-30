"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Sidebar({ items, header, footer, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar-bg",
        className,
      )}
    >
      {header ? (
        <div className="border-b border-sidebar-border px-4 py-4">{header}</div>
      ) : null}

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-surface-muted text-foreground font-medium"
                  : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
              )}
            >
              {item.icon ? (
                <span className="flex h-5 w-5 items-center justify-center">
                  {item.icon}
                </span>
              ) : null}
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="rounded-md bg-accent-muted px-1.5 py-0.5 text-[10px] font-medium text-accent">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {footer ? (
        <div className="border-t border-sidebar-border p-4">{footer}</div>
      ) : null}
    </aside>
  );
}
