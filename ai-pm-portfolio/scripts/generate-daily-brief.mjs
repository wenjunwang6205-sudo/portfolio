import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataFile = path.join(repoRoot, "src/constants/dailyData.ts");
const dryRun = process.argv.includes("--dry-run");

const companyFeeds = [
  { company: "OpenAI", url: "https://openai.com/news/rss.xml" },
  { company: "Anthropic", url: "https://openrss.org/feed/www.anthropic.com/news" },
  { company: "Google AI", url: "https://blog.google/technology/ai/rss/" },
  { company: "Hugging Face", url: "https://huggingface.co/blog/feed.xml" },
];

const githubQueries = [
  "topic:artificial-intelligence",
  "topic:llm",
  "topic:ai-agent",
  "topic:rag",
  "topic:generative-ai",
];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getBriefDate() {
  if (process.env.TARGET_DATE) {
    return process.env.TARGET_DATE;
  }

  const shanghaiNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" }),
  );
  return formatDate(shanghaiNow);
}

function getSinceDate(briefDate) {
  if (process.env.SOURCE_SINCE_DATE) {
    return process.env.SOURCE_SINCE_DATE;
  }

  const shanghaiNow = new Date(`${briefDate}T00:00:00+08:00`);
  shanghaiNow.setDate(shanghaiNow.getDate() - 1);
  return formatDate(shanghaiNow);
}

function buildGithubReason(repo) {
  const topicText = repo.topics?.length ? `，topics: ${repo.topics.slice(0, 5).join(", ")}` : "";
  return {
    zh: `昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 ${repo.stars.toLocaleString("en-US")} stars、${repo.forks.toLocaleString("en-US")} forks${topicText}，可作为开发者采用和技术趋势信号观察。`,
    en: `Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around ${repo.stars.toLocaleString("en-US")} stars and ${repo.forks.toLocaleString("en-US")} forks${topicText}, making it a developer adoption and trend signal.`,
  };
}

function cleanGithubDescription(description) {
  return description
    .replace(/^Sponsor\s+Star\s+[\w.-]+\s*\/\s*[\w.-]+\s*/i, "")
    .replace(/^Sponsor\s+Star\s+/i, "")
    .trim();
}

function buildChineseIntro(repo) {
  const description = repo.description || "暂无项目描述。";
  return {
    zh: `中文简介：${description}`,
    en: `Chinese intro: ${description}`,
  };
}

function buildTodayHighlight(repo) {
  const starsTodayText =
    typeof repo.starsToday === "number"
      ? `今日新增 ${repo.starsToday.toLocaleString("en-US")} 星`
      : "今日新增待精确统计";
  return {
    zh: `今日亮点：${starsTodayText}；项目昨日以来保持活跃更新，方向与 AI/LLM/Agent/RAG 工具链相关，适合作为今天的开发者趋势候选观察。`,
    en: `Today's highlight: ${starsTodayText}; the project stayed active since yesterday and is relevant to AI/LLM/Agent/RAG tooling, making it a developer trend candidate today.`,
  };
}

function isAiRelevant(repo) {
  const haystack = [
    repo.name,
    repo.description,
    repo.language,
    ...(repo.topics ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return /\b(ai|agent|llm|rag|gpt|claude|ollama|model|prompt|diffusion|machine-learning|deep-learning|generative)\b/.test(
    haystack,
  );
}

async function collectTrendingProjects() {
  try {
    const html = await fetchText("https://github.com/trending?since=daily");
    const articles = html.match(/<article[\s\S]*?<\/article>/gi) ?? [];
    return articles
      .map((article) => {
        const href = article.match(/<h2[\s\S]*?<a[^>]+href="\/([^"]+\/[^"]+)"/i)?.[1]?.trim();
        if (!href) return null;

        const name = href.replace(/\s+/g, "");
        const description = stripHtml(
          article.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "",
        );
        const language = stripHtml(
          article.match(/<span[^>]*itemprop="programmingLanguage"[^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? "",
        );
        const starsText = stripHtml(
          article.match(/href="\/[^"]+\/stargazers"[^>]*>([\s\S]*?)<\/a>/i)?.[1] ?? "0",
        );
        const starsTodayText = stripHtml(
          article.match(/([0-9,]+)\s+stars?\s+today/i)?.[1] ?? "",
        );

        return {
          name,
          description: cleanGithubDescription(description),
          url: `https://github.com/${name}`,
          stars: Number(starsText.replace(/,/g, "")) || 0,
          forks: 0,
          language: language || "Unknown",
          updatedAt: "",
          topics: [],
          starsToday: starsTodayText ? Number(starsTodayText.replace(/,/g, "")) : null,
        };
      })
      .filter(Boolean)
      .filter(isAiRelevant);
  } catch (error) {
    console.warn(`GitHub trending failed: ${error.message}`);
    return [];
  }
}

function stripHtml(value) {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTag(item, tagName) {
  const match = item.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i"));
  return match ? decodeXml(stripHtml(match[1])) : "";
}

async function fetchJson(url, headers = {}) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json, application/json",
      "User-Agent": "wenjun-ai-daily-brief",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml, text/html",
      "User-Agent": "wenjun-ai-daily-brief",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function collectGithubProjects(targetDate) {
  const headers = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {};
  const byUrl = new Map();

  for (const repo of await collectTrendingProjects()) {
    byUrl.set(repo.url, repo);
  }

  for (const query of githubQueries) {
    const url = new URL("https://api.github.com/search/repositories");
    url.searchParams.set("q", `${query} pushed:>=${targetDate}`);
    url.searchParams.set("sort", "stars");
    url.searchParams.set("order", "desc");
    url.searchParams.set("per_page", "15");

    try {
      const data = await fetchJson(url, headers);
      for (const repo of data.items ?? []) {
        if (!byUrl.has(repo.html_url)) {
          byUrl.set(repo.html_url, {
            name: repo.full_name,
            description: cleanGithubDescription(repo.description ?? ""),
            url: repo.html_url,
            stars: repo.stargazers_count ?? 0,
            forks: repo.forks_count ?? 0,
            language: repo.language ?? "Unknown",
            updatedAt: repo.updated_at,
            topics: repo.topics ?? [],
            starsToday: byUrl.get(repo.html_url)?.starsToday ?? null,
          });
        }
      }
    } catch (error) {
      console.warn(`GitHub query failed: ${query}: ${error.message}`);
    }
  }

  return [...byUrl.values()]
    .sort((a, b) => (b.starsToday ?? -1) - (a.starsToday ?? -1) || b.stars - a.stars)
    .slice(0, 30);
}

async function collectCompanyUpdates() {
  const updates = [];

  for (const feed of companyFeeds) {
    try {
      const xml = await fetchText(feed.url);
      const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? [];

      for (const item of items.slice(0, 6)) {
        const title = extractTag(item, "title");
        const link = extractTag(item, "link") || item.match(/<link[^>]*href="([^"]+)"/i)?.[1] || feed.url;
        const publishedAt =
          extractTag(item, "pubDate") || extractTag(item, "published") || extractTag(item, "updated");
        const summary =
          extractTag(item, "description") || extractTag(item, "summary") || extractTag(item, "content");

        if (title) {
          updates.push({
            company: feed.company,
            title,
            url: link,
            publishedAt,
            summary: summary.slice(0, 420),
          });
        }
      }
    } catch (error) {
      console.warn(`Feed failed: ${feed.company}: ${error.message}`);
    }
  }

  return updates.slice(0, 18);
}

function buildFallbackBrief(targetDate, githubProjects, companyUpdates) {
  const topGithub = githubProjects.slice(0, 10);
  const topCompany = companyUpdates.slice(0, 3);
  const topProject = topGithub[0];
  const topUpdate = topCompany[0];

  return {
    date: targetDate,
    label: { zh: "最新", en: "Latest" },
    title: {
      zh: "AI 信息源抓取日报",
      en: "AI source collection brief",
    },
    editorNote: {
      zh: "这一版由自动化脚本基于真实来源抓取生成。配置模型 API key 后，会进一步生成更完整的产品经理视角总结。",
      en: "This version is generated from real collected sources. With a model API key configured, it will produce fuller PM-focused analysis.",
    },
    keyTakeaway: {
      zh: `本次抓取覆盖 ${githubProjects.length} 个 GitHub AI 项目和 ${companyUpdates.length} 条 AI 公司动态，优先关注近期仍在活跃更新的 Agent、LLM 与 AI 工具方向。`,
      en: `This run collected ${githubProjects.length} AI GitHub projects and ${companyUpdates.length} company updates, prioritizing active Agent, LLM, and AI tooling signals.`,
    },
    signals: [
      {
        title: { zh: "Agent 与 AI 工具链仍是高频更新方向", en: "Agents and AI tooling remain active update areas" },
        category: { zh: "趋势信号", en: "Trend signal" },
        summary: {
          zh: topProject
            ? `GitHub 抓取中排名靠前的项目包括 ${topProject.name}，说明开发者仍在围绕 Agent 运行时、工作流和 AI 工具效率做密集迭代。`
            : "GitHub 抓取显示 AI 项目仍集中在 Agent、LLM 应用和工具链方向。",
          en: topProject
            ? `The collected GitHub signals include ${topProject.name}, showing continued developer iteration around agent runtimes, workflows, and AI tooling efficiency.`
            : "Collected GitHub signals continue to cluster around agents, LLM apps, and tooling.",
        },
        pmInsight: {
          zh: "产品经理可以重点观察这些项目如何处理任务状态、权限、失败恢复和可追溯输出，这些会直接影响 Agent 产品体验。",
          en: "Product managers can watch how these projects handle task state, permissions, recovery, and traceable output because these directly shape agent UX.",
        },
        impact: "Medium",
        sources: topProject
          ? [{ label: topProject.name, url: topProject.url }]
          : [{ label: "GitHub Trending", url: "https://github.com/trending" }],
      },
      {
        title: { zh: "大公司更新继续围绕平台能力扩展", en: "Major AI companies keep expanding platform capabilities" },
        category: { zh: "公司动态", en: "Company signal" },
        summary: {
          zh: topUpdate
            ? `${topUpdate.company} 的最新动态「${topUpdate.title}」值得回看其背后的平台策略和产品能力边界。`
            : "AI 公司动态仍集中在模型、工具、开发者平台和行业解决方案上。",
          en: topUpdate
            ? `${topUpdate.company}'s update "${topUpdate.title}" is worth reading for platform strategy and product capability boundaries.`
            : "Company updates continue to focus on models, tools, developer platforms, and vertical solutions.",
        },
        pmInsight: {
          zh: "大公司动作通常会改变用户对 AI 产品的默认预期，独立产品更需要寻找垂直任务和行业 SOP 的切入点。",
          en: "Major company moves often reset user expectations for AI products, so independent products need sharper vertical tasks and industry SOP entry points.",
        },
        impact: "Medium",
        sources: topUpdate
          ? [{ label: topUpdate.company, url: topUpdate.url }]
          : [{ label: "OpenAI News", url: "https://openai.com/news/" }],
      },
    ],
    githubProjects: topGithub.map((repo) => ({
      title: { zh: repo.name, en: repo.name },
      category: { zh: "GitHub 项目", en: "GitHub project" },
      summary: { zh: repo.description || "暂无描述。", en: repo.description || "No description." },
      totalStars: repo.stars,
      language: repo.language,
      dailyStars: repo.starsToday,
      chineseIntro: buildChineseIntro(repo),
      todayHighlight: buildTodayHighlight(repo),
      inclusionReason: buildGithubReason(repo),
      pmInsight: {
        zh: "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
        en: "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits.",
      },
      impact: "Watch",
      sources: [{ label: "GitHub Repository", url: repo.url }],
    })),
    companyUpdates: topCompany.map((item) => ({
      title: { zh: `${item.company}: ${item.title}`, en: `${item.company}: ${item.title}` },
      category: { zh: "公司动态", en: "Company update" },
      summary: { zh: item.summary || "查看原文获取详情。", en: item.summary || "Read the source for details." },
      pmInsight: {
        zh: "可从中观察平台公司正在强化的能力边界、行业场景和商业化叙事。",
        en: "Use this to observe the capability boundaries, vertical scenarios, and commercialization narrative platform companies are emphasizing.",
      },
      impact: "Watch",
      sources: [{ label: item.company, url: item.url }],
    })),
    opportunities: [
      {
        title: { zh: "机会：把 AI 日报做成可溯源产品雷达", en: "Opportunity: make the AI brief a traceable product radar" },
        category: { zh: "产品机会", en: "Product opportunity" },
        summary: {
          zh: "真实价值不在于列链接，而在于每天把来源、判断、产品启发和历史快照沉淀下来。",
          en: "The value is not listing links, but preserving sources, judgment, PM implications, and daily snapshots.",
        },
        pmInsight: {
          zh: "下一步可以验证两件事：每天是否 5 分钟读完，以及每周是否能沉淀 1-2 个可讨论的产品机会。",
          en: "Next, validate whether it can be read in five minutes and whether it surfaces one or two discussable product opportunities each week.",
        },
        impact: "Medium",
        sources: [{ label: "Hugging Face Blog", url: "https://huggingface.co/blog" }],
      },
    ],
  };
}

function buildPrompt({ targetDate, githubProjects, companyUpdates }) {
  return `你是一个面向 AI 产品经理的前沿信息分析助手。请根据下面抓取到的前一天信息，生成一份适合产品经理阅读的中文 AI 日报，同时补齐英文文案字段。

目标日期：${targetDate}

要求：
1. 不要写成普通新闻聚合，要强调“发生了什么、为什么重要、对产品经理有什么启发、信息来源”。
2. GitHub 项目不要只按总 star 解读，要结合项目方向、活跃度、对产品形态的启发判断。
3. 大公司动态要解释背后的平台策略、产品趋势或竞争格局。
4. 所有 sources 必须来自输入数据里的 URL，不要编造链接。
5. 输出必须是严格 JSON，不要 Markdown，不要解释文字。
6. JSON 必须符合这个 TypeScript 结构：
{
  "date": string,
  "label": { "zh": string, "en": string },
  "title": { "zh": string, "en": string },
  "editorNote": { "zh": string, "en": string },
  "keyTakeaway": { "zh": string, "en": string },
  "signals": DailySignal[],
  "githubProjects": DailySignal[],
  "companyUpdates": DailySignal[],
  "opportunities": DailySignal[]
}
DailySignal = {
  "title": { "zh": string, "en": string },
  "category": { "zh": string, "en": string },
  "summary": { "zh": string, "en": string },
  "totalStars"?: number,
  "language"?: string,
  "dailyStars"?: number | null,
  "chineseIntro"?: { "zh": string, "en": string },
  "todayHighlight"?: { "zh": string, "en": string },
  "inclusionReason"?: { "zh": string, "en": string },
  "pmInsight": { "zh": string, "en": string },
  "impact": "High" | "Medium" | "Watch",
  "sources": [{ "label": string, "url": string }]
}

数量建议：
- signals: 2-3 条
- githubProjects: 必须 10 条；每条都必须写 totalStars、language、dailyStars、chineseIntro、todayHighlight、inclusionReason。todayHighlight 用“今日亮点:”开头，说明它为什么今天被放进来，例如 GitHub Trending 今日新增、近期更新、AI/LLM/Agent/RAG 方向相关、开发者采用信号、平台趋势信号、可借鉴的产品形态等
- companyUpdates: 2-4 条
- opportunities: 1-3 条

GitHub 输入：
${JSON.stringify(githubProjects, null, 2)}

公司动态输入：
${JSON.stringify(companyUpdates, null, 2)}`;
}

function getModelConfig() {
  if (process.env.DEEPSEEK_API_KEY) {
    return {
      name: "DeepSeek",
      url: "https://api.deepseek.com/chat/completions",
      apiKey: process.env.DEEPSEEK_API_KEY,
      model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
    };
  }

  if (process.env.OPENAI_API_KEY) {
    return {
      name: "OpenAI",
      url: "https://api.openai.com/v1/chat/completions",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    };
  }

  return null;
}

async function generateWithModel(payload) {
  const config = getModelConfig();
  if (!config) {
    console.warn("No model API key found. Falling back to source-based brief generation.");
    return buildFallbackBrief(payload.targetDate, payload.githubProjects, payload.companyUpdates);
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        {
          role: "user",
          content: buildPrompt(payload),
        },
      ],
      temperature: 0.4,
      response_format: {
        type: "json_object",
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`${config.name} request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error(`${config.name} response did not include output text.`);
  }

  return JSON.parse(text);
}

async function readExistingBriefs() {
  const source = await fs.readFile(dataFile, "utf8");

  const match = source.match(/export const DAILY_BRIEFS: DailyBrief\[] = (\[[\s\S]*\]);?\s*$/);
  if (!match) {
    throw new Error("Could not locate daily brief array.");
  }

  const briefs = Function(`"use strict"; return (${match[1]});`)();
  return Array.isArray(briefs) ? briefs : [];
}

function renderDataFile(briefs) {
  return `export type LocalizedText = {
  zh: string;
  en: string;
};

export type DailySource = {
  label: string;
  url: string;
};

export type DailySignal = {
  title: LocalizedText;
  category: LocalizedText;
  summary: LocalizedText;
  totalStars?: number;
  language?: string;
  dailyStars?: number | null;
  chineseIntro?: LocalizedText;
  todayHighlight?: LocalizedText;
  inclusionReason?: LocalizedText;
  pmInsight: LocalizedText;
  impact: "High" | "Medium" | "Watch";
  sources: DailySource[];
};

export type DailyBrief = {
  date: string;
  label: LocalizedText;
  title: LocalizedText;
  editorNote: LocalizedText;
  keyTakeaway: LocalizedText;
  signals: DailySignal[];
  githubProjects: DailySignal[];
  companyUpdates: DailySignal[];
  opportunities: DailySignal[];
};

export const DAILY_BRIEFS: DailyBrief[] = ${JSON.stringify(briefs, null, 2)};
`;
}

function assertBriefShape(brief) {
  const requiredGroups = ["signals", "githubProjects", "companyUpdates", "opportunities"];
  if (!brief?.date || !brief?.title?.zh || !brief?.keyTakeaway?.zh) {
    throw new Error("Generated brief is missing required top-level fields.");
  }

  for (const group of requiredGroups) {
    if (!Array.isArray(brief[group])) {
      throw new Error(`Generated brief is missing ${group}.`);
    }
  }
}

async function main() {
  const targetDate = getBriefDate();
  const sinceDate = getSinceDate(targetDate);
  const [githubProjects, companyUpdates] = await Promise.all([
    collectGithubProjects(sinceDate),
    collectCompanyUpdates(),
  ]);

  const brief = await generateWithModel({ targetDate, githubProjects, companyUpdates });

  assertBriefShape(brief);
  brief.date = targetDate;
  brief.label = brief.label ?? { zh: "最新", en: "Latest" };

  if (dryRun) {
    console.log(JSON.stringify(brief, null, 2));
    return;
  }

  const existingBriefs = await readExistingBriefs();
  const nextBriefs = [
    brief,
    ...existingBriefs.filter((item) => item.date !== targetDate),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30);

  await fs.writeFile(dataFile, renderDataFile(nextBriefs), "utf8");
  console.log(`Updated ${path.relative(repoRoot, dataFile)} with ${targetDate} daily brief.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
