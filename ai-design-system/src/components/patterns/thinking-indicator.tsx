import { cn } from "@/lib/utils";

export function ThinkingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-label="Thinking">
      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-muted-foreground" />
      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-muted-foreground [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-muted-foreground [animation-delay:300ms]" />
    </div>
  );
}

export function StreamingText({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer",
        className,
      )}
    >
      {children}
    </span>
  );
}
