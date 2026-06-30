import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ToolResultCardProps {
  toolName: string;
  title: string;
  description?: string;
  status?: "success" | "running" | "error";
  children?: React.ReactNode;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  className?: string;
}

const statusVariant = {
  success: "success" as const,
  running: "secondary" as const,
  error: "destructive" as const,
};

export function ToolResultCard({
  toolName,
  title,
  description,
  status = "success",
  children,
  primaryAction,
  secondaryAction,
  className,
}: ToolResultCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b border-border-subtle bg-surface-muted/50">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {toolName}
            </p>
            <CardTitle>{title}</CardTitle>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <Badge variant={statusVariant[status]}>{status}</Badge>
        </div>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
      {(primaryAction || secondaryAction) && (
        <CardFooter className="gap-2 border-t border-border-subtle bg-surface-muted/30">
          {secondaryAction ? (
            <Button variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          ) : null}
          {primaryAction ? (
            <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
          ) : null}
        </CardFooter>
      )}
    </Card>
  );
}
