"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("ai-ds-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return children;
}

export function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("ai-ds-theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle theme">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
