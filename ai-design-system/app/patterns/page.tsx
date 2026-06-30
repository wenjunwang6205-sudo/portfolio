import { Sparkles } from "lucide-react";
import { ChatMessage } from "@/components/patterns/chat-message";
import { Composer } from "@/components/patterns/composer";
import { EmptyState } from "@/components/patterns/empty-state";
import { MetricCard } from "@/components/patterns/metric-card";
import { PageHeader } from "@/components/patterns/page-header";
import {
  StreamingText,
  ThinkingIndicator,
} from "@/components/patterns/thinking-indicator";
import { ToolResultCard } from "@/components/patterns/tool-result-card";
import { DocsShell } from "@/components/showcase/docs-shell";
import { ShowcasePreview, ShowcaseSection } from "@/components/showcase/showcase-blocks";
import { Button } from "@/components/ui/button";

export default function PatternsPage() {
  return (
    <DocsShell>
      <PageHeader
        title="AI Patterns"
        description="面向 AI 产品的业务模式组件 — 对话、工具结果、Dashboard 指标。"
      />

      <div className="space-y-10 p-6">
        <ShowcaseSection title="Chat Message">
          <ShowcasePreview className="overflow-hidden p-0">
            <ChatMessage
              role="user"
              content="帮我生成一份 SaaS 产品的 onboarding 流程 PRD 大纲。"
              meta="10:24"
            />
            <ChatMessage
              role="assistant"
              content={
                <div className="space-y-3">
                  <p>好的，我先给你一版结构化大纲：</p>
                  <ol className="list-decimal space-y-1 pl-5">
                    <li>用户激活目标与成功指标</li>
                    <li>注册 → 首次价值体验 → 习惯养成</li>
                    <li>关键埋点与 A/B 实验位</li>
                  </ol>
                  <ThinkingIndicator />
                </div>
              }
              meta="Streaming"
            />
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Tool Result Card">
          <ShowcasePreview>
            <ToolResultCard
              toolName="web_search"
              title="竞品调研结果"
              description="已检索 5 篇相关文档"
              status="success"
              primaryAction={{ label: "插入对话" }}
              secondaryAction={{ label: "查看来源" }}
            >
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• OpenAI Apps SDK UI Guidelines</li>
                <li>• Radix Themes Documentation</li>
                <li>• Tremor Dashboard Components</li>
              </ul>
            </ToolResultCard>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Composer">
          <ShowcasePreview className="p-0">
            <Composer placeholder="试试输入消息，Enter 发送…" />
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Dashboard Metrics">
          <ShowcasePreview className="grid gap-4 sm:grid-cols-3">
            <MetricCard label="Daily Active Users" value="12,480" change="+8.2%" trend="up" />
            <MetricCard label="Avg. Tokens / Session" value="3,942" change="-2.1%" trend="down" />
            <MetricCard label="Tool Success Rate" value="97.3%" change="Stable" trend="neutral" />
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Empty State & Streaming">
          <ShowcasePreview className="grid gap-4 lg:grid-cols-2">
            <EmptyState
              icon={<Sparkles className="h-5 w-5" />}
              title="No conversations yet"
              description="Start a new chat to test your agent workflow."
              action={<Button>New Chat</Button>}
            />
            <div className="flex items-center justify-center rounded-xl border border-border bg-surface-muted/30 p-8">
              <StreamingText>Generating response…</StreamingText>
            </div>
          </ShowcasePreview>
        </ShowcaseSection>
      </div>
    </DocsShell>
  );
}
