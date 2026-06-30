import { PageHeader } from "@/components/patterns/page-header";
import { DocsShell } from "@/components/showcase/docs-shell";
import { ShowcasePreview, ShowcaseSection } from "@/components/showcase/showcase-blocks";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function ComponentsPage() {
  return (
    <DocsShell>
      <PageHeader
        title="UI Components"
        description="基础组件层 — 所有 AI 产品页面的原子零件。"
      />

      <div className="space-y-10 p-6">
        <ShowcaseSection title="Button">
          <ShowcasePreview className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Form Controls">
          <ShowcasePreview className="grid max-w-xl gap-4">
            <Input placeholder="Search conversations…" />
            <Textarea placeholder="System prompt…" />
            <Select defaultValue="gpt-4o">
              <option value="gpt-4o">GPT-4o</option>
              <option value="claude">Claude</option>
              <option value="qwen">Qwen</option>
            </Select>
            <div className="flex items-center gap-3">
              <Switch defaultChecked />
              <span className="text-sm">Enable streaming</span>
            </div>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Card & Badge">
          <ShowcasePreview className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Agent Workspace</CardTitle>
                <CardDescription>Manage tools and model routing.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
              </CardContent>
              <CardFooter>
                <Button size="sm">Configure</Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar fallback="AI" />
                <Avatar fallback="U" size="sm" />
                <Avatar fallback="PM" size="lg" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Tabs">
          <ShowcasePreview>
            <Tabs defaultValue="chat">
              <TabsList>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="chat">
                <p className="text-sm text-muted-foreground">
                  对话主界面内容区域。
                </p>
              </TabsContent>
              <TabsContent value="tools">
                <p className="text-sm text-muted-foreground">工具调用与 MCP 配置。</p>
              </TabsContent>
              <TabsContent value="settings">
                <p className="text-sm text-muted-foreground">模型与 API 设置。</p>
              </TabsContent>
            </Tabs>
          </ShowcasePreview>
        </ShowcaseSection>
      </div>
    </DocsShell>
  );
}
