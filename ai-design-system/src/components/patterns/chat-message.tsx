import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

export interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: React.ReactNode;
  avatarFallback?: string;
  meta?: string;
  className?: string;
}

export function ChatMessage({
  role,
  content,
  avatarFallback,
  meta,
  className,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "group flex gap-4 px-4 py-5",
        isUser ? "bg-chat-user" : "bg-chat-assistant",
        className,
      )}
    >
      <Avatar
        fallback={
          avatarFallback ?? (isUser ? "You" : role === "system" ? "SYS" : "AI")
        }
        size="md"
        className={cn(!isUser && "border-accent/20 bg-accent-muted text-accent")}
      />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium capitalize">{role}</span>
          {meta ? (
            <span className="text-xs text-muted-foreground">{meta}</span>
          ) : null}
        </div>
        <div className="text-sm leading-relaxed text-foreground">{content}</div>
      </div>
    </div>
  );
}
