import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
};

export function Avatar({
  className,
  src,
  alt,
  fallback = "AI",
  size = "md",
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-muted font-medium text-foreground",
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? fallback} className="h-full w-full object-cover" />
      ) : (
        <span>{fallback.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}
