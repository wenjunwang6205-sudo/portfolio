import { cn } from "@/lib/utils";

export function ShowcaseSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function ShowcasePreview({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TokenSwatch({
  name,
  variable,
  className,
}: {
  name: string;
  variable: string;
  className?: string;
}) {
  return (
    <div className="space-y-2">
      <div
        className={cn("h-16 rounded-lg border border-border shadow-sm", className)}
        style={{ background: `hsl(var(${variable}))` }}
      />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{variable}</p>
      </div>
    </div>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-surface-muted p-4 text-xs leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}
