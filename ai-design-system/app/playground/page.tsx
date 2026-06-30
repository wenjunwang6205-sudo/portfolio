"use client";

import * as React from "react";
import { ChatMessage } from "@/components/patterns/chat-message";
import { Composer } from "@/components/patterns/composer";
import { PageHeader } from "@/components/patterns/page-header";
import { ThinkingIndicator } from "@/components/patterns/thinking-indicator";
import { ToolResultCard } from "@/components/patterns/tool-result-card";
import { DocsShell } from "@/components/showcase/docs-shell";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: React.ReactNode;
  meta?: string;
};

const starterMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "帮我设计一个 AI 客服产品的首页信息架构。",
    meta: "刚刚",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "建议采用「对话优先 + 能力展示」结构：Hero 用 Composer 演示、下方用 Tool Cards 展示能力边界、Sidebar 放历史会话与设置。",
    meta: "刚刚",
  },
];

export default function PlaygroundPage() {
  const [messages, setMessages] = React.useState<Message[]>(starterMessages);
  const [thinking, setThinking] = React.useState(false);

  const handleSubmit = (value: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: value,
      meta: "now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setThinking(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: (
            <div className="space-y-3">
              <p>收到。基于你的 AI Design System，我建议：</p>
              <ToolResultCard
                toolName="design_system"
                title="推荐页面结构"
                status="success"
                primaryAction={{ label: "Apply Layout" }}
              >
                <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>AppShell + Sidebar</li>
                  <li>Chat thread + Composer</li>
                  <li>ToolResultCard for agent outputs</li>
                </ol>
              </ToolResultCard>
            </div>
          ),
          meta: "simulated",
        },
      ]);
      setThinking(false);
    }, 1200);
  };

  return (
    <DocsShell>
      <PageHeader
        title="Playground"
        description="可交互预览 — 模拟真实 AI 产品对话流。"
        actions={<Badge variant="secondary">Live Demo</Badge>}
      />

      <div className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
          <div className="overflow-hidden rounded-xl border border-border">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                meta={message.meta}
              />
            ))}
            {thinking ? (
              <div className="flex items-center gap-3 border-t border-border px-4 py-4">
                <Badge>assistant</Badge>
                <ThinkingIndicator />
              </div>
            ) : null}
          </div>
        </div>
        <Composer onSubmit={handleSubmit} disabled={thinking} />
      </div>
    </DocsShell>
  );
}
