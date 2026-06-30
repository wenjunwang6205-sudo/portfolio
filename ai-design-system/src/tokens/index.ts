export const tokens = {
  radius: {
    sm: "calc(var(--radius) - 4px)",
    md: "calc(var(--radius) - 2px)",
    lg: "var(--radius)",
    xl: "calc(var(--radius) + 4px)",
    full: "9999px",
  },
  spacing: {
    page: "1.5rem",
    section: "2rem",
    stack: "0.75rem",
    inline: "0.5rem",
  },
  typography: {
    display: "text-3xl font-semibold tracking-tight",
    title: "text-xl font-semibold tracking-tight",
    heading: "text-base font-medium",
    body: "text-sm leading-relaxed",
    caption: "text-xs text-muted-foreground",
    label: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
  },
  motion: {
    fast: "duration-150",
    normal: "duration-200",
    slow: "duration-300",
  },
} as const;

export type TokenGroup = keyof typeof tokens;
