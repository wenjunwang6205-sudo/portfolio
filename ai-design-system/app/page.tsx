import { PageHeader } from "@/components/patterns/page-header";
import { DocsShell } from "@/components/showcase/docs-shell";
import {
  CodeBlock,
  ShowcasePreview,
  ShowcaseSection,
  TokenSwatch,
} from "@/components/showcase/showcase-blocks";
import { tokens } from "@/tokens";

const colorTokens = [
  { name: "Background", variable: "--background", className: "bg-background" },
  { name: "Surface", variable: "--surface", className: "bg-surface" },
  { name: "Surface Muted", variable: "--surface-muted", className: "bg-surface-muted" },
  { name: "Accent", variable: "--accent", className: "bg-accent" },
  { name: "Border", variable: "--border", className: "bg-border" },
  { name: "Destructive", variable: "--destructive", className: "bg-destructive" },
];

export default function OverviewPage() {
  return (
    <DocsShell>
      <PageHeader
        title="Design Tokens"
        description="AI 产品视觉地基。新项目只需改 CSS 变量，不用重搭组件。"
      />

      <div className="space-y-10 p-6">
        <ShowcaseSection
          title="色彩系统"
          description="语义化 token，Light / Dark 自动切换。"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colorTokens.map((token) => (
              <TokenSwatch
                key={token.variable}
                name={token.name}
                variable={token.variable}
                className={token.className}
              />
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="排版尺度" description="统一字号与字重，避免 AI 随手写 text-lg。">
          <ShowcasePreview className="space-y-4">
            <p className={tokens.typography.display}>Display — 产品主标题</p>
            <p className={tokens.typography.title}>Title — 页面标题</p>
            <p className={tokens.typography.heading}>Heading — 区块标题</p>
            <p className={tokens.typography.body}>
              Body — 正文内容，适合对话气泡与说明文字。
            </p>
            <p className={tokens.typography.caption}>Caption — 辅助说明</p>
            <p className={tokens.typography.label}>Label — 表单 / 指标标签</p>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection
          title="在新项目中复用"
          description="复制 ai-design-system 文件夹，或只复制 src/ 到你的项目。"
        >
          <CodeBlock
            code={`# 1. 进入 design system 可视化预览
cd ai-design-system && npm install && npm run dev

# 2. 新项目复用
cp -r ai-design-system/src ./your-app/src/ai-ui
# 引入 tokens + 组件即可

# 3. 定制品牌色（只改这一处）
/* src/tokens/theme.css */
--accent: 217 91% 60%;  /* 改成你的品牌色 */`}
          />
        </ShowcaseSection>
      </div>
    </DocsShell>
  );
}
