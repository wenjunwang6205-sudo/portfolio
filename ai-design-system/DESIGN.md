# AI Design System 规范

> 给 Cursor / Codex 读的设计系统文档。生成 UI 时必须遵循本规范。

## 原则

1. **只使用本 system 的组件** — 从 `@/components` 引入，禁止手写裸 `<button>` / `<input>`
2. **只使用语义 token** — 禁止 `text-gray-500`、`bg-zinc-900` 等硬编码 Tailwind 色
3. **AI 产品布局优先用 Patterns** — AppShell、ChatMessage、Composer、ToolResultCard
4. **Light / Dark 必须同时可用** — 所有样式通过 CSS 变量，不写死颜色

## 色彩 Token

| Token | 用途 |
|-------|------|
| `bg-background` | 页面背景 |
| `bg-surface` / `bg-surface-muted` | 卡片、区块 |
| `text-foreground` / `text-muted-foreground` | 主/次文字 |
| `bg-accent` / `text-accent` | 品牌强调 |
| `border-border` | 默认边框 |
| `bg-chat-user` / `bg-chat-assistant` | 对话气泡背景 |

## 排版

```tsx
import { tokens } from "@/tokens";

// Display: tokens.typography.display
// Title:   tokens.typography.title
// Body:    tokens.typography.body
// Caption: tokens.typography.caption
```

## 组件导入

```tsx
// UI Primitives
import { Button, Card, Input, Badge, Avatar } from "@/components";

// AI Patterns
import {
  AppShell,
  ChatMessage,
  Composer,
  ToolResultCard,
  PageHeader,
  MetricCard,
  EmptyState,
} from "@/components";
```

## 标准页面结构

```tsx
<AppShell sidebarItems={...}>
  <PageHeader title="..." description="..." actions={...} />
  <div className="p-6">{/* content */}</div>
</AppShell>
```

## 标准对话页结构

```tsx
<div className="flex flex-1 flex-col">
  <div className="mx-auto w-full max-w-3xl flex-1">
    {messages.map(m => (
      <ChatMessage key={m.id} role={m.role} content={m.content} />
    ))}
  </div>
  <Composer onSubmit={handleSubmit} />
</div>
```

## 禁止项

- ❌ 内联 `style={{ ... }}`
- ❌ 随意 `rounded-2xl` / `text-lg` 而不走 token
- ❌ 每次新建 Button/Card 组件
- ❌ 使用 shadcn CLI 覆盖 `src/components/ui/`

## 品牌定制

修改 `src/tokens/theme.css` 中 `:root` 和 `.dark` 的 `--accent` 等变量即可，组件无需改动。
