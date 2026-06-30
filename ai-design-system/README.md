# AI Design System

可复用的 **AI 产品 Design System**，自带可视化 Showcase。

## 快速开始

```bash
cd ai-design-system
npm install
npm run dev
```

浏览器打开 **http://localhost:3001**

## 目录结构

```
ai-design-system/
├── app/                    # 可视化文档站（Showcase）
│   ├── page.tsx            # Design Tokens
│   ├── components/         # UI 组件预览
│   ├── patterns/           # AI 业务模式预览
│   └── playground/         # 可交互对话 Demo
├── src/
│   ├── tokens/             # CSS 变量 + TS token 定义
│   ├── components/
│   │   ├── ui/             # 基础组件（Button, Card, Input…）
│   │   └── patterns/       # AI 模式（Chat, Composer, AppShell…）
│   └── lib/utils.ts
├── DESIGN.md               # 给 Cursor 读的设计规范
└── README.md
```

## 在新项目中复用

**方式 1 — 整包复制（推荐）**

```bash
cp -r ai-design-system ../your-new-project/packages/ai-ui
```

**方式 2 — 只复制源码**

```bash
cp -r ai-design-system/src ../your-app/src/ai-ui
```

然后在新项目中：

1. 复制 `src/tokens/theme.css` 并在 `globals.css` 中 `@import`
2. 复制 `tailwind.config.ts` 里的 `extend.colors` 等配置
3. 从 `@/components` 或 `@/ai-ui/components` 引入组件

## 定制品牌

只改 `src/tokens/theme.css` 中的 CSS 变量：

```css
:root {
  --accent: 217 91% 60%; /* 你的品牌色 */
}
```

## Showcase 页面

| 路由 | 内容 |
|------|------|
| `/` | 色彩、排版 token |
| `/components` | 全部 UI 组件 |
| `/patterns` | Chat、Tool Card、Composer、Metrics |
| `/playground` | 可交互 AI 对话 Demo |

## 技术栈

- Next.js 15 + TypeScript
- Tailwind CSS 3 + CSS Variables
- Radix Slot / Tabs
- Lucide Icons
- CVA（组件 variants）

## Cursor 使用

项目内已包含 `.cursor/rules/design.mdc`，在新项目中复制该 rule + `DESIGN.md`，让 AI 始终从你的 system 组装 UI，而不是从零设计。
