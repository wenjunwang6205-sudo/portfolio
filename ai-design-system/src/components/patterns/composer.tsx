"use client";

import { ArrowUp, Paperclip } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ComposerProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Composer({
  value: controlledValue,
  placeholder = "Message AI…",
  onChange,
  onSubmit,
  disabled,
  className,
}: ComposerProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const value = controlledValue ?? internalValue;

  const handleChange = (next: string) => {
    setInternalValue(next);
    onChange?.(next);
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit?.(trimmed);
    handleChange("");
  };

  return (
    <div className={cn("border-t border-border bg-background px-4 py-4", className)}>
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-composer-border bg-composer-bg shadow-composer">
          <textarea
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            placeholder={placeholder}
            rows={1}
            disabled={disabled}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            className="max-h-40 min-h-[52px] w-full resize-none bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
          />
          <div className="flex items-center justify-between px-3 pb-3">
            <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              disabled={disabled || !value.trim()}
              onClick={handleSubmit}
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
