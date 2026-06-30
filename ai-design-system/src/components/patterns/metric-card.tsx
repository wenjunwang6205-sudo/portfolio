import { cn } from "@/lib/utils";

export interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const trendColor = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
};

export function MetricCard({
  label,
  value,
  change,
  trend = "neutral",
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm",
        className,
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      {change ? (
        <p className={cn("mt-1 text-xs font-medium", trendColor[trend])}>
          {change}
        </p>
      ) : null}
    </div>
  );
}
