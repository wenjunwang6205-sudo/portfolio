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

function stripLabelPrefix(text, labels) {
  if (!text) return "";
  let result = text.trim();
  for (const label of labels) {
    result = result.replace(new RegExp(`^${label}[：:]\\s*`), "");
  }
  return result.trim();
}

function normalizeChineseIntro(text) {
  return stripLabelPrefix(text, ["中文简介", "Chinese intro"]);
}

function normalizeTodayHighlight(text) {
  return stripLabelPrefix(text, ["今日亮点", "Today's highlight"]);
}

function inferPublisher(name) {
  if (/microsoft/i.test(name)) return "微软出品的";
  if (/google/i.test(name)) return "Google 出品的";
  if (/openai/i.test(name)) return "OpenAI 出品的";
  if (/anthropic/i.test(name)) return "Anthropic 相关的";
  if (/huggingface/i.test(name)) return "Hugging Face 社区的";
  return "";
}

function buildGithubProjectIntro(repo) {
  const text = `${repo.name} ${repo.description ?? ""} ${repo.readmeSnippet ?? ""} ${(repo.topics ?? []).join(" ")}`;
  const publisher = inferPublisher(repo.name);

  if (/markitdown|pdf.*markdown|word.*markdown|office.*markdown/i.test(text)) {
    return `${publisher}${repo.language === "Python" ? "Python " : ""}工具，可将 PDF、Word、Excel、PowerPoint、图片、音频等各类文件与 Office 文档转换为 Markdown 格式，是 AI 应用文档预处理的首选工具链之一。`;
  }
  if (/moneyprinter|short.?video|video.*generat|一键.*视频/i.test(text)) {
    return "利用 AI 大模型，输入主题/关键词即可全自动生成脚本、匹配高清无版权素材、添加字幕配音，最终输出完整短视频。支持 DeepSeek、OpenAI 等多种大模型，适合短视频创作者和营销团队快速出片。";
  }
  if (/(claude|codex|cursor).*(skill|ui|ux|design)|frontend.*design|design.*skill/i.test(text)) {
    return "给 AI 编程助手注入「审美力」的 Claude Skill。安装后有助于避免 AI 生成千篇一律的界面，让前端代码更具设计品位——层级、留白、排版更到位。";
  }
  if (/compress|headroom|token.*reduc|context.*window/i.test(text)) {
    return "面向 LLM 应用的上下文压缩工具，在工具输出、日志、文件和 RAG 检索片段进入大模型前进行压缩，通常可减少 60–95% token 消耗并尽量保持回答质量，支持库、代理和 MCP Server 多种接入方式。";
  }
  if (/hermes|agent.*grow|autonomous agent|multi.?agent/i.test(text)) {
    return "面向开发者的 Agent 框架/运行时，帮助构建能自主规划、调用工具并持续执行任务的大模型工作流，适合做多步骤自动化、Coding Agent 和 AI 助手类产品。";
  }
  if (/rag|retriev|vector|embedding|knowledge base/i.test(text)) {
    return "面向 RAG 场景的开源工具，帮助把外部文档、数据库或知识库接入大模型问答链路，提升 AI 应用在垂直领域的检索准确性和可解释性。";
  }
  if (/\bmcp\b|model context protocol/i.test(text)) {
    return "基于 MCP 协议的工具/server 项目，帮助 AI Agent 以标准方式连接外部数据源与工具，降低 Agent 产品集成第三方能力的工程成本。";
  }
  if (/ollama|local.*llm|llama|inference/i.test(text)) {
    return "面向本地或私有化部署的大模型运行/推理工具，帮助团队在本地环境快速拉起模型服务，适合关注数据安全、离线能力和推理成本的 AI 产品场景。";
  }
  if (/fine.?tun|lora|training/i.test(text)) {
    return "面向模型微调与训练的开源工具，帮助团队用更小成本定制垂直领域模型，适合 AI 产品从通用能力走向行业化落地的阶段。";
  }

  const description = repo.description?.trim();
  if (description) {
    return `${publisher}${repo.language && repo.language !== "Unknown" ? `${repo.language} ` : ""}开源项目，${description.replace(/\.$/, "")}，适合产品经理观察该方向的开发者采用与产品化路径。`;
  }

  return "AI 相关开源项目，建议结合 README 和近期提交进一步确认其具体能力边界与典型使用场景。";
}

function buildChineseIntro(repo) {
  return {
    zh: buildGithubProjectIntro(repo),
    en: repo.description || "No description.",
  };
}

function buildGithubProjectSignal(repo, overrides = {}) {
  const introZh =
    normalizeChineseIntro(repo.enhancedChineseIntro) ||
    buildGithubProjectIntro(repo);
  const highlightZh =
    normalizeTodayHighlight(repo.enhancedTodayHighlight) ||
    normalizeTodayHighlight(buildTodayHighlight(repo).zh);

  return {
    title: { zh: repo.name, en: repo.name },
    category: { zh: "GitHub 项目", en: "GitHub project" },
    summary: {
      zh: introZh,
      en: repo.description || "No description.",
    },
    totalStars: repo.stars,
    language: repo.language,
    dailyStars: repo.starsToday,
    chineseIntro: {
      zh: introZh,
      en: repo.description || "No description.",
    },
    todayHighlight: {
      zh: highlightZh,
      en: normalizeTodayHighlight(buildTodayHighlight(repo).en),
    },
    inclusionReason: buildGithubReason(repo),
    pmInsight: {
      zh: repo.enhancedPmInsight || "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
      en: "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits.",
    },
    impact: "Watch",
    sources: [{ label: "GitHub Repository", url: repo.url }],
    ...overrides,
  };
}

function formatStarCount(value) {
  if (value >= 10000) {
    return `${Math.floor(value / 1000)}k+`;
  }
  return value.toLocaleString("en-US");
}

function getRepoAgeMonths(createdAt) {
  if (!createdAt) return null;
  const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / 86400000);
  return Math.max(1, Math.round(days / 30));
}

function inferTrendingNarrative(repo) {
  const text = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")}`;

  if (/video|short.?video|moneyprinter|turbo/i.test(text)) {
    return "“一键出片”叙事在短视频创作者和 AI 内容生产圈持续传播";
  }
  if (/\bui\b|\bux\b|user interface|design system|frontend/i.test(text)) {
    return "多名开发者反馈可显著改善微 SaaS / 产品 UI/UX 的改造效果，设计圈讨论升温";
  }
  if (/agent|autogpt|crewai|langgraph/i.test(text)) {
    return "作为 Agent 生态的重要基础组件，随 Agent 应用爆发持续获得新增关注";
  }
  if (/rag|vector|embedding|retriev/i.test(text)) {
    return "RAG/向量检索仍是 AI 应用落地的高频需求，相关工具链持续被集成";
  }
  if (/\bmcp\b|model context protocol/i.test(text)) {
    return "MCP 工具接入成为 Agent 产品标配方向，相关 server/工具项目在开发者社区快速扩散";
  }
  if (/compress|token|context window|headroom/i.test(text)) {
    return "Agent/RAG 场景下 token 成本压力推动“上下文压缩”方案在工程圈快速传播";
  }
  if (/skill|workflow|automation|claude code|codex/i.test(text)) {
    return "面向具体工作流的 AI skill/自动化模板在独立开发者和小团队间快速复制";
  }
  return "项目切中 AI/LLM/Agent 工具链的高频痛点，开发者社区采用信号明显";
}

function buildTodayHighlight(repo) {
  const segments = [];
  const ageMonths = getRepoAgeMonths(repo.createdAt);
  const dailyStars = repo.starsToday;
  const totalStars = repo.stars ?? 0;
  const narrative = inferTrendingNarrative(repo);

  if (typeof repo.trendingRank === "number" && repo.trendingRank <= 20) {
    segments.push(`登上 GitHub Trending 日榜第 ${repo.trendingRank} 位`);
  }

  if (typeof dailyStars === "number" && dailyStars >= 200) {
    if (ageMonths && ageMonths <= 4 && totalStars >= 5000) {
      segments.push(`创建仅约 ${ageMonths} 个月便已积累 ${formatStarCount(totalStars)} stars`);
    } else if (totalStars >= 50000) {
      segments.push(`总 star 数已达 ${formatStarCount(totalStars)}，持续占据 AI 开源热门榜单`);
    }
    segments.push(narrative);
    segments.push(`今日新增 ${dailyStars.toLocaleString("en-US")} 星`);
  } else {
    if (ageMonths && ageMonths <= 4 && totalStars >= 5000) {
      segments.push(`创建仅约 ${ageMonths} 个月便已积累 ${formatStarCount(totalStars)} stars`);
    } else if (totalStars >= 50000) {
      segments.push(`总 star 数已达 ${formatStarCount(totalStars)}，属于持续在榜的头部 AI 开源项目`);
    }
    segments.push(narrative);
    if (typeof dailyStars === "number") {
      segments.push(`今日新增 ${dailyStars.toLocaleString("en-US")} 星`);
    }
  }

  return {
    zh: `${segments.filter(Boolean).join("，")}。`,
    en: `${segments.filter(Boolean).join(", ")}.`,
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
      .map((article, index) => {
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
          trendingRank: index + 1,
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

async function fetchRepoDetails(name, headers) {
  const data = await fetchJson(`https://api.github.com/repos/${name}`, headers);
  return {
    createdAt: data.created_at,
    forks: data.forks_count ?? 0,
    topics: data.topics ?? [],
    stars: data.stargazers_count ?? 0,
    pushedAt: data.pushed_at,
    openIssues: data.open_issues_count ?? 0,
  };
}

async function fetchReadmeSnippet(name, headers) {
  try {
    const data = await fetchJson(`https://api.github.com/repos/${name}/readme`, headers);
    const content = Buffer.from(data.content, "base64").toString("utf8");
    return content
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/[#>*_\[\]()!-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 500);
  } catch {
    return "";
  }
}

async function enrichGithubProjects(projects) {
  const headers = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {};
  const enriched = [];

  for (const repo of projects) {
    try {
      const [details, readmeSnippet] = await Promise.all([
        fetchRepoDetails(repo.name, headers),
        fetchReadmeSnippet(repo.name, headers),
      ]);

      enriched.push({
        ...repo,
        ...details,
        topics: details.topics.length ? details.topics : repo.topics ?? [],
        readmeSnippet,
      });
    } catch (error) {
      console.warn(`GitHub enrich failed: ${repo.name}: ${error.message}`);
      enriched.push(repo);
    }
  }

  return enriched;
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
    githubProjects: topGithub.map((repo) => buildGithubProjectSignal(repo)),
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
6. githubProjects 只写 chineseIntro.zh，不要再写重复的项目介绍。chineseIntro.zh 必须是 1-2 句中文产品级总结：说明项目做什么、解决什么问题、典型场景/支持能力，不要复制英文，不要写「中文简介:」前缀。
7. githubProjects 里的 todayHighlight.zh 必须是中文，不要写「今日亮点:」前缀。重点解释「为什么今天快速上升或持续在榜」，不要重复 chineseIntro 的功能描述。
8. JSON 必须符合这个 TypeScript 结构：
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
- githubProjects: 必须 10 条；每条都必须写 totalStars、language、dailyStars、chineseIntro、todayHighlight、inclusionReason。chineseIntro.zh 是唯一的项目中文总结，不要和 summary 重复；todayHighlight 解释为什么今天快速上升或在榜
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

function parseModelJson(text) {
  const trimmed = text.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  return JSON.parse(withoutFence);
}

async function requestModel(config, payload, useJsonMode) {
  const body = {
    model: config.model,
    messages: [
      {
        role: "user",
        content: buildPrompt(payload),
      },
    ],
    temperature: 0.4,
  };

  if (useJsonMode) {
    body.response_format = { type: "json_object" };
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`${config.name} request failed: ${response.status} ${responseText}`);
  }

  const data = JSON.parse(responseText);
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error(`${config.name} response did not include output text.`);
  }

  return parseModelJson(text);
}

async function requestJsonPrompt(config, prompt, useJsonMode) {
  const body = {
    model: config.model,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.25,
  };

  if (useJsonMode) {
    body.response_format = { type: "json_object" };
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`${config.name} request failed: ${response.status} ${responseText}`);
  }

  const data = JSON.parse(responseText);
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error(`${config.name} response did not include output text.`);
  }

  return parseModelJson(text);
}

function buildGithubEnhancementPrompt(projects) {
  return `你是给 AI 产品经理写 GitHub 趋势日报的中文编辑。请为每个项目写出「中文简介」和「今日亮点」，面向非技术读者，一眼能看懂。

要求：
1. 必须输出严格 JSON，不要 Markdown。
2. 每个项目都要保留 name。
3. chineseIntroZh 写 1-2 句中文产品级总结：项目做什么、解决什么问题、典型场景/支持能力。不要复制英文，不要写「中文简介:」前缀，不要和 todayHighlight 重复。
4. todayHighlightZh 写 1-2 句，解释「为什么今天快速上升或持续在榜」。不要重复 chineseIntro 的功能描述，不要写「今日亮点:」前缀。应结合传播叙事、生态位、项目年龄、star 增速，并带上今日新增 star、总 star 等可验证数据。
5. pmInsightZh 用一句中文说明产品经理应该从这个项目观察什么。
6. 不要编造输入里没有的社交提及数、榜单名次、用户反馈数量。
7. chineseIntroZh 可参考以下写法（不要照抄，需结合输入数据）：
   - 微软出品的 Python 工具，可将 PDF、Word、Excel、PowerPoint、图片、音频等各类文件与 Office 文档转换为 Markdown 格式，是 AI 应用文档预处理的首选工具链。
   - 利用 AI 大模型，输入主题/关键词即可全自动生成脚本、匹配高清无版权素材、添加字幕配音，最终输出完整短视频。支持 DeepSeek、OpenAI 等多种大模型。
   - 给 AI 编程助手注入「审美力」的 Claude Skill。安装后能有效阻止 AI 生成千篇一律的「垃圾」界面，让生成的前端代码具有真正的设计品位——层级感、留白、排版一步到位。
8. todayHighlightZh 可参考以下写法（不要照抄）：
   - 多语言社区同步传播，「一键出片」叙事在短视频创作者圈引爆，今日新增809星
   - 创建仅约两个月便已积累10k+ stars，今日新增265，多名开发者反馈微 SaaS 产品 UI/UX 改造后效果显著
   - 作为 AI Agent 数据管道的重要基础组件，随 Agent 生态爆发持续获得新增关注，今日新增377 stars，总 star 数已近10万

输出结构：
{
  "projects": [
    {
      "name": string,
      "chineseIntroZh": string,
      "todayHighlightZh": string,
      "pmInsightZh": string
    }
  ]
}

项目输入：
${JSON.stringify(
  projects.map((repo) => ({
    name: repo.name,
    description: repo.description,
    totalStars: repo.stars,
    dailyStars: repo.starsToday,
    forks: repo.forks,
    language: repo.language,
    topics: repo.topics,
    createdAt: repo.createdAt,
    repoAgeMonths: getRepoAgeMonths(repo.createdAt),
    trendingRank: repo.trendingRank,
    pushedAt: repo.pushedAt,
    readmeSnippet: repo.readmeSnippet,
  })),
  null,
  2,
)}`;
}

async function enhanceGithubProjects(projects) {
  const config = getModelConfig();
  if (!config || projects.length === 0) {
    return projects;
  }

  const prompt = buildGithubEnhancementPrompt(projects);
  let enhanced;

  try {
    enhanced = await requestJsonPrompt(config, prompt, true);
  } catch (error) {
    console.warn(`${config.name} GitHub enhancement JSON mode failed, retrying without response_format: ${error.message}`);
  }

  if (!enhanced) {
    try {
      enhanced = await requestJsonPrompt(config, prompt, false);
    } catch (error) {
      console.warn(`${config.name} GitHub enhancement failed. Using local Chinese fallback: ${error.message}`);
      return projects;
    }
  }

  const byName = new Map((enhanced.projects ?? []).map((project) => [project.name, project]));

  return projects.map((repo) => {
    const item = byName.get(repo.name);
    if (!item) return repo;

    return {
      ...repo,
      enhancedChineseIntro: item.chineseIntroZh,
      enhancedTodayHighlight: item.todayHighlightZh,
      enhancedPmInsight: item.pmInsightZh,
    };
  });
}

async function generateWithModel(payload) {
  const config = getModelConfig();
  if (!config) {
    console.warn("No model API key found. Falling back to source-based brief generation.");
    return buildFallbackBrief(payload.targetDate, payload.githubProjects, payload.companyUpdates);
  }

  try {
    return await requestModel(config, payload, true);
  } catch (error) {
    console.warn(`${config.name} JSON mode failed, retrying without response_format: ${error.message}`);
  }

  try {
    return await requestModel(config, payload, false);
  } catch (error) {
    console.warn(`${config.name} generation failed. Falling back to source-based brief: ${error.message}`);
    return buildFallbackBrief(payload.targetDate, payload.githubProjects, payload.companyUpdates);
  }
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

  for (const project of brief.githubProjects) {
    const intro = normalizeChineseIntro(project.chineseIntro?.zh);
    if (intro && !/[\u4e00-\u9fff]/.test(intro)) {
      throw new Error(`GitHub project chineseIntro.zh must be Chinese: ${project.title?.en ?? "unknown"}`);
    }
    if (intro && intro.length < 18) {
      throw new Error(`GitHub project chineseIntro.zh is too short: ${project.title?.en ?? "unknown"}`);
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

  const enhancedGithubProjects = await enhanceGithubProjects(
    await enrichGithubProjects(githubProjects.slice(0, 10)),
  );
  const brief = await generateWithModel({
    targetDate,
    githubProjects: enhancedGithubProjects,
    companyUpdates,
  });
  const enhancedByName = new Map(enhancedGithubProjects.map((repo) => [repo.name, repo]));
  brief.githubProjects = brief.githubProjects.map((project) => {
    const repo = enhancedByName.get(project.title?.en ?? project.title?.zh);
    if (!repo) {
      const introZh = normalizeChineseIntro(project.chineseIntro?.zh) || project.summary?.zh || "";
      const highlightZh = normalizeTodayHighlight(project.todayHighlight?.zh) || "";
      return {
        ...project,
        summary: { zh: introZh, en: project.summary?.en || "No description." },
        chineseIntro: { zh: introZh, en: project.chineseIntro?.en || project.summary?.en || "No description." },
        todayHighlight: { zh: highlightZh, en: project.todayHighlight?.en || "" },
      };
    }

    return buildGithubProjectSignal(repo, {
      title: project.title,
      impact: project.impact ?? "Watch",
      inclusionReason: project.inclusionReason ?? buildGithubReason(repo),
      pmInsight: project.pmInsight?.zh
        ? {
            zh: repo.enhancedPmInsight || normalizeChineseIntro(project.pmInsight.zh) || project.pmInsight.zh,
            en: project.pmInsight.en,
          }
        : undefined,
    });
  });

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
