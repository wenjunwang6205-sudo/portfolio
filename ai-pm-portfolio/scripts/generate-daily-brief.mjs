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

function inferCompanyEventType(item) {
  const text = `${item.title} ${item.summary ?? ""} ${item.articleSnippet ?? ""}`.toLowerCase();

  if (/pricing|price|api key|rate limit|token limit|quota|billing/i.test(text)) {
    return { zh: "API/定价", en: "API / pricing" };
  }
  if (/model|gpt-|claude|gemini|llama|release|launch|introducing|memory|reasoning/i.test(text)) {
    return { zh: "新模型/新能力", en: "Model / capability" };
  }
  if (/security|safety|policy|regulation|compliance|privacy/i.test(text)) {
    return { zh: "政策/安全", en: "Policy / safety" };
  }
  if (/partner|case study|enterprise|customer|industry|collaborat/i.test(text)) {
    return { zh: "生态合作", en: "Partnership / case study" };
  }
  return { zh: "产品功能", en: "Product feature" };
}

function inferCompanyImpact(item, eventType) {
  const text = `${item.title} ${item.summary ?? ""}`.toLowerCase();
  if (eventType.zh === "新模型/新能力" || eventType.zh === "API/定价") return "High";
  if (/chatgpt|claude|gemini|openai|anthropic|google/i.test(text) && eventType.zh === "产品功能") {
    return "Medium";
  }
  if (eventType.zh === "政策/安全") return "High";
  return "Medium";
}

function buildCompanyUpdateIntro(item) {
  const snippet = item.articleSnippet || item.summary || "";
  const shortTitle = item.title.replace(/\s+/g, " ").trim();
  if (/memory|remember|personal/i.test(shortTitle)) {
    return `${item.company} 升级 ChatGPT/助手记忆能力，让模型能跨会话保留用户偏好与上下文，强化「个人助手」体验。`;
  }
  if (/agent|workflow|automation|delivery/i.test(shortTitle)) {
    return `${item.company} 发布 Agent/自动化相关更新，强调企业场景下的任务编排、工作流交付与 AI 原生组织实践。`;
  }
  if (snippet && /[\u4e00-\u9fff]/.test(snippet)) {
    return snippet.slice(0, 180);
  }
  return `${item.company} 发布「${shortTitle}」，面向 AI 产品从业者值得跟进其能力边界与商业化叙事。`;
}

function buildCompanyUpdateHighlight(item, eventType) {
  const published = item.publishedAt ? `发布于 ${item.publishedAt}` : "近期发布";
  return `${published}；属于「${eventType.zh}」类型更新，反映 ${item.company} 在当前 AI 竞争中的重点投入方向。`;
}

function buildCompanyUpdateSignal(item, overrides = {}) {
  const eventType = item.enhancedEventType || inferCompanyEventType(item);
  const introZh = normalizeChineseIntro(item.enhancedChineseIntro) || buildCompanyUpdateIntro(item);
  const highlightZh =
    normalizeTodayHighlight(item.enhancedTodayHighlight) ||
    buildCompanyUpdateHighlight(item, eventType);

  return {
    title: { zh: `${item.company}: ${item.title}`, en: `${item.company}: ${item.title}` },
    category: { zh: "公司动态", en: "Company update" },
    eventType,
    summary: { zh: introZh, en: item.summary || item.title },
    chineseIntro: { zh: introZh, en: item.summary || item.title },
    todayHighlight: { zh: highlightZh, en: highlightZh },
    pmInsight: {
      zh: item.enhancedPmInsight || inferCompanyPmInsight(eventType),
      en: "Track how platform companies shift capability boundaries, vertical scenarios, and monetization narratives.",
    },
    impact: item.enhancedImpact || inferCompanyImpact(item, eventType),
    sources: [{ label: item.company, url: item.url }],
    ...overrides,
  };
}

function inferCompanyPmInsight(eventType) {
  const map = {
    "新模型/新能力": "关注新能力是否改变用户默认预期，以及独立产品应差异化补位的体验环节。",
    "API/定价": "评估成本结构、配额策略是否会重塑你的产品定价与毛利模型。",
    产品功能: "观察该功能是否会成为品类标配，以及你的 MVP 是否需要补齐同类能力。",
    "生态合作": "从案例发布中提炼可复制行业 SOP，寻找垂直场景切入机会。",
    "政策/安全": "提前校准隐私、合规、内容安全设计，避免产品路线后期返工。",
  };
  return map[eventType.zh] || "跟踪平台公司的能力边界、行业场景和商业化叙事变化。";
}

function buildFallbackEditorial(targetDate, githubProjects, companyUpdates) {
  const topGithub = githubProjects[0];
  const topCompany = companyUpdates[0];
  const secondGithub = githubProjects[1];
  const githubTheme = topGithub ? inferTrendingNarrative(topGithub) : "AI 工具链";
  const companyName = topCompany?.company ?? "平台公司";

  const keyTakeaway = {
    zh: `今日主线：${githubTheme.replace(/[。；]/g, "")}；同时 ${companyName} 等平台继续推进产品与企业落地，Agent 基础设施与平台能力竞争同步升温。`,
    en: `Today's through-line: ${githubTheme}; platform players like ${companyName} keep pushing product and enterprise adoption as agent infrastructure competition heats up.`,
  };

  const signals = [
    {
      title: {
        zh: topGithub ? `${topGithub.name.split("/")[1] ?? topGithub.name} 引领开发者采用信号` : "开发者工具链持续活跃",
        en: topGithub ? `${topGithub.name} leads developer adoption signals` : "Developer tooling stays active",
      },
      category: { zh: "跨源信号", en: "Cross-source signal" },
      summary: {
        zh: topGithub
          ? `事实：${topGithub.name} 今日新增 ${topGithub.starsToday?.toLocaleString("en-US") ?? "—"} 星，总 star ${topGithub.stars?.toLocaleString("en-US") ?? "—"}。判断：${inferTrendingNarrative(topGithub)}`
          : "GitHub 抓取显示 Agent、LLM 与 AI 工具链仍是高频迭代方向。",
        en: topGithub
          ? `Fact: ${topGithub.name} gained ${topGithub.starsToday ?? "—"} stars today. Read: ${inferTrendingNarrative(topGithub)}`
          : "GitHub collection shows continued iteration in agents, LLMs, and AI tooling.",
      },
      pmInsight: {
        zh: "优先观察任务状态、权限、失败恢复、可追溯输出——这些直接决定 Agent 产品体验上限。",
        en: "Watch task state, permissions, recovery, and traceability because they define agent UX ceilings.",
      },
      impact: topGithub?.starsToday >= 1000 ? "High" : "Medium",
      sources: topGithub
        ? [{ label: topGithub.name, url: topGithub.url }]
        : [{ label: "GitHub Trending", url: "https://github.com/trending" }],
    },
    {
      title: {
        zh: topCompany ? `${topCompany.company} 释放平台能力信号` : "大公司平台能力持续扩展",
        en: topCompany ? `${topCompany.company} signals platform expansion` : "Major platforms keep expanding capabilities",
      },
      category: { zh: "跨源信号", en: "Cross-source signal" },
      summary: {
        zh: topCompany
          ? `事实：${topCompany.company} 发布「${topCompany.title}」。判断：${inferCompanyEventType(topCompany).zh}方向更新，可能重塑用户对 AI 产品的默认预期。`
          : "AI 公司动态集中在模型、工具、开发者平台与行业解决方案。",
        en: topCompany
          ? `Fact: ${topCompany.company} published "${topCompany.title}". Read: a ${inferCompanyEventType(topCompany).en} move that may reset user expectations.`
          : "Company updates cluster around models, tools, platforms, and vertical solutions.",
      },
      pmInsight: {
        zh: inferCompanyPmInsight(inferCompanyEventType(topCompany)),
        en: "Decide which platform defaults you must match versus where vertical SOP creates differentiation.",
      },
      impact: topCompany ? inferCompanyImpact(topCompany, inferCompanyEventType(topCompany)) : "Medium",
      sources: topCompany
        ? [{ label: topCompany.company, url: topCompany.url }]
        : [{ label: "OpenAI News", url: "https://openai.com/news/" }],
    },
  ];

  if (topGithub && secondGithub) {
    signals.push({
      title: { zh: "开源热度向 Agent 基础设施集中", en: "Open-source heat clusters around agent infrastructure" },
      category: { zh: "跨源信号", en: "Cross-source signal" },
      summary: {
        zh: `事实：${topGithub.name} 与 ${secondGithub.name} 同日进入抓取前列。判断：开发者正在优先解决 Agent 运行成本、工具链效率与集成复杂度。`,
        en: `Fact: ${topGithub.name} and ${secondGithub.name} ranked high today. Read: developers prioritize agent runtime cost, tooling efficiency, and integration complexity.`,
      },
      pmInsight: {
        zh: "若你在做 Agent 产品，建议本周内验证：上下文预算、工具接入标准（如 MCP）、失败回退策略。",
        en: "If you ship agent products, validate context budgets, tool integration standards like MCP, and failure fallback this week.",
      },
      impact: "Medium",
      sources: [
        { label: topGithub.name, url: topGithub.url },
        { label: secondGithub.name, url: secondGithub.url },
      ],
    });
  }

  const opportunities = [
    {
      title: {
        zh: topGithub?.name?.includes("headroom") || /compress|token/i.test(topGithub?.description ?? "")
          ? "机会：Agent 上下文预算管理控制台"
          : "机会：从今日信号推导一个可验证产品假设",
        en: "Opportunity: derive one testable product hypothesis from today's signals",
      },
      category: { zh: "产品机会", en: "Product opportunity" },
      summary: {
        zh: topGithub
          ? `基于 ${topGithub.name} 等项目的升温，企业客户可能需要可视化 token 消耗、压缩策略与回答质量 trade-off 的管理层，而不只是开发者自用工具。`
          : "把今日 GitHub 与公司动态中的重复痛点，转化为一个可讨论、可验证的 MVP 方向。",
        en: topGithub
          ? `Heat around ${topGithub.name} suggests enterprise buyers may need visible token budgets and quality trade-offs, not only developer-side utilities.`
          : "Turn repeated pain points from GitHub and company signals into one discussable MVP direction.",
      },
      pmInsight: {
        zh: "用 1 周时间验证：目标用户是否愿意为「成本可视化 + 质量可控」付费，而不是仅关注模型能力本身。",
        en: "Spend one week validating whether users pay for cost visibility and quality control, not just raw model capability.",
      },
      impact: "Medium",
      sources: topGithub
        ? [{ label: topGithub.name, url: topGithub.url }]
        : [{ label: "GitHub Trending", url: "https://github.com/trending" }],
    },
  ];

  return {
    title: { zh: `${targetDate} AI 产品雷达`, en: `${targetDate} AI product radar` },
    editorNote: {
      zh: "基于 GitHub 趋势与大公司 RSS/原文抓取生成，强调跨源判断与 PM 可执行启发。",
      en: "Built from GitHub trends and company feeds with cross-source judgment and PM-ready implications.",
    },
    keyTakeaway,
    signals: signals.slice(0, 3),
    opportunities,
  };
}

async function fetchArticleSnippet(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "wenjun-ai-daily-brief",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return "";
    const html = await response.text();
    return stripHtml(
      html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
        .replace(/<footer[\s\S]*?<\/footer>/gi, " "),
    ).slice(0, 1500);
  } catch {
    return "";
  }
}

async function enrichCompanyUpdates(updates) {
  const enriched = [];
  for (const item of updates.slice(0, 6)) {
    const articleSnippet = await fetchArticleSnippet(item.url);
    enriched.push({ ...item, articleSnippet });
  }
  return enriched;
}

function buildCompanyEnhancementPrompt(updates) {
  return `你是 AI 产品经理日报的中文编辑。请为下列大公司动态写出中文总结。

要求：
1. 严格 JSON，不要 Markdown。
2. 保留 name 字段（格式：公司名: 文章标题）。
3. eventTypeZh 从以下选一：新模型/新能力、API/定价、产品功能、生态合作、政策/安全。
4. chineseIntroZh：1-2 句中文，说明发生了什么、对产品意味着什么。不要复制英文 RSS。
5. todayHighlightZh：1 句，说明为什么今天值得关注（战略/竞争/行业意义），不要重复 chineseIntroZh。
6. pmInsightZh：1 句 PM 可执行观察，按 eventType 差异化，不要万能模板。
7. impact：High（可能改变格局/定价/模型能力）| Medium（值得本周跟进）| Watch（长期趋势）。
8. 不要写「中文简介:」「今日亮点:」前缀。

输出：
{
  "updates": [
    {
      "name": string,
      "eventTypeZh": string,
      "chineseIntroZh": string,
      "todayHighlightZh": string,
      "pmInsightZh": string,
      "impact": "High" | "Medium" | "Watch"
    }
  ]
}

输入：
${JSON.stringify(
  updates.map((item) => ({
    name: `${item.company}: ${item.title}`,
    company: item.company,
    title: item.title,
    publishedAt: item.publishedAt,
    rssSummary: item.summary,
    articleSnippet: item.articleSnippet,
    url: item.url,
  })),
  null,
  2,
)}`;
}

async function enhanceCompanyUpdates(updates) {
  const config = getModelConfig();
  if (!config || updates.length === 0) return updates;

  const prompt = buildCompanyEnhancementPrompt(updates);
  let enhanced;
  try {
    enhanced = await requestJsonPrompt(config, prompt, true);
  } catch (error) {
    console.warn(`${config.name} company enhancement JSON mode failed: ${error.message}`);
  }
  if (!enhanced) {
    try {
      enhanced = await requestJsonPrompt(config, prompt, false);
    } catch (error) {
      console.warn(`${config.name} company enhancement failed: ${error.message}`);
      return updates;
    }
  }

  const byName = new Map((enhanced.updates ?? []).map((item) => [item.name, item]));
  return updates.map((item) => {
    const key = `${item.company}: ${item.title}`;
    const row = byName.get(key);
    if (!row) return item;
    return {
      ...item,
      enhancedEventType: { zh: row.eventTypeZh, en: row.eventTypeZh },
      enhancedChineseIntro: row.chineseIntroZh,
      enhancedTodayHighlight: row.todayHighlightZh,
      enhancedPmInsight: row.pmInsightZh,
      enhancedImpact: row.impact,
    };
  });
}

function buildEditorialPrompt({ targetDate, githubProjects, companyUpdates }) {
  return `你是 AI 产品经理日报的主编。根据今日 GitHub 项目与公司动态，写 keyTakeaway、跨源 signals、opportunities。

要求：
1. 严格 JSON。
2. keyTakeawayZh：1-2 句「今日判断/主线」，不是统计句（禁止写「本次抓取覆盖 X 个」）。
3. signals：2-3 条跨源综合信号，每条必须包含：事实（引用具体项目/公司）+ 判断（为什么重要）+ PM 行动方向。impact 按标准分级：High=可能改变产品路线/竞争格局；Medium=值得本周跟进；Watch=长期趋势。
4. opportunities：1-2 条，必须从今日 signals 推导，给出可验证的产品假设，不要 meta 讨论「日报本身」。
5. 中文为主，补齐 en 字段。
6. sources 只能来自输入 URL。

输出：
{
  "title": { "zh": string, "en": string },
  "editorNote": { "zh": string, "en": string },
  "keyTakeaway": { "zh": string, "en": string },
  "signals": DailySignal[],
  "opportunities": DailySignal[]
}

DailySignal = {
  "title": { "zh": string, "en": string },
  "category": { "zh": string, "en": string },
  "summary": { "zh": string, "en": string },
  "pmInsight": { "zh": string, "en": string },
  "impact": "High" | "Medium" | "Watch",
  "sources": [{ "label": string, "url": string }]
}

signals 和 opportunities 的每条都必须包含 category 和 pmInsight，不能省略。

目标日期：${targetDate}

GitHub：
${JSON.stringify(
  githubProjects.map((repo) => ({
    name: repo.name,
    intro: normalizeChineseIntro(repo.enhancedChineseIntro) || buildGithubProjectIntro(repo),
    highlight: normalizeTodayHighlight(repo.enhancedTodayHighlight) || buildTodayHighlight(repo).zh,
    stars: repo.stars,
    dailyStars: repo.starsToday,
    url: repo.url,
  })),
  null,
  2,
)}

公司动态：
${JSON.stringify(
  companyUpdates.map((item) => ({
    name: `${item.company}: ${item.title}`,
    intro: normalizeChineseIntro(item.enhancedChineseIntro) || buildCompanyUpdateIntro(item),
    highlight: normalizeTodayHighlight(item.enhancedTodayHighlight),
    eventType: item.enhancedEventType?.zh || inferCompanyEventType(item).zh,
    url: item.url,
  })),
  null,
  2,
)}`;
}

async function enhanceEditorialBrief(payload) {
  const config = getModelConfig();
  const fallback = () =>
    buildFallbackEditorial(payload.targetDate, payload.githubProjects, payload.companyUpdates);

  if (!config) {
    console.warn("No model API key found. Using editorial fallback.");
    return fallback();
  }

  const prompt = buildEditorialPrompt(payload);
  try {
    return await requestJsonPrompt(config, prompt, true);
  } catch (error) {
    console.warn(`${config.name} editorial JSON mode failed: ${error.message}`);
  }
  try {
    return await requestJsonPrompt(config, prompt, false);
  } catch (error) {
    console.warn(`${config.name} editorial generation failed: ${error.message}`);
    return fallback();
  }
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

function hasSufficientScrapeData(githubProjects, companyUpdates) {
  return githubProjects.length > 0 || companyUpdates.length > 0;
}

function isLowQualityGithubIntro(intro) {
  if (!intro) return true;
  const text = normalizeChineseIntro(intro);
  if (text.length < 24) return true;
  return (
    text.includes("原始描述为") ||
    text.includes("该项目围绕") ||
    /^Compress tool outputs/i.test(text) ||
    !/[\u4e00-\u9fff]/.test(text)
  );
}

function isMockBriefEntry(brief) {
  const editor = brief.editorNote?.zh ?? "";
  const title = brief.title?.zh ?? "";
  const takeaway = brief.keyTakeaway?.zh ?? "";

  if (editor.includes("历史日报可以保留")) return true;
  if (title.includes("AI 搜索和研究助手")) return true;

  const githubProjects = brief.githubProjects ?? [];
  if (githubProjects.length === 0) return true;

  const hasScrapeFields = githubProjects.some(
    (project) => typeof project.totalStars === "number" || project.chineseIntro?.zh,
  );
  if (!hasScrapeFields) return true;

  const qualityIntroCount = githubProjects.filter(
    (project) => !isLowQualityGithubIntro(project.chineseIntro?.zh ?? project.summary?.zh),
  ).length;

  const hasTemplateSignals = (brief.signals ?? []).some(
    (signal) => signal.title?.zh === "Agent 与 AI 工具链仍是高频更新方向",
  );
  const hasStatsTakeaway = takeaway.includes("本次抓取覆盖");
  const hasPlaceholderEditor = editor.includes("配置模型 API key 后");

  if (hasTemplateSignals && hasStatsTakeaway && hasPlaceholderEditor && qualityIntroCount < 2) {
    return true;
  }

  if (title === "AI 信息源抓取日报" && qualityIntroCount === 0) return true;

  return false;
}

function buildFallbackBrief(targetDate, githubProjects, companyUpdates) {
  const editorial = buildFallbackEditorial(targetDate, githubProjects.slice(0, 10), companyUpdates);
  return {
    date: targetDate,
    label: { zh: "最新", en: "Latest" },
    ...editorial,
    githubProjects: githubProjects.slice(0, 10).map((repo) => buildGithubProjectSignal(repo)),
    companyUpdates: companyUpdates.slice(0, 4).map((item) => buildCompanyUpdateSignal(item)),
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
  eventType?: LocalizedText;
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

function ensureSignalCategory(signal, fallbackCategory) {
  if (!signal.category?.zh || !signal.category?.en) {
    signal.category = fallbackCategory;
  }
  return signal;
}

function normalizeBriefSignals(brief) {
  brief.signals = (brief.signals ?? []).map((signal) =>
    ensureSignalCategory(signal, { zh: "跨源信号", en: "Cross-source signal" }),
  );
  brief.opportunities = (brief.opportunities ?? []).map((signal) =>
    ensureSignalCategory(signal, { zh: "产品机会", en: "Product opportunity" }),
  );
  brief.githubProjects = (brief.githubProjects ?? []).map((signal) =>
    ensureSignalCategory(signal, { zh: "GitHub 项目", en: "GitHub project" }),
  );
  brief.companyUpdates = (brief.companyUpdates ?? []).map((signal) =>
    ensureSignalCategory(signal, { zh: "公司动态", en: "Company update" }),
  );
  return brief;
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

  for (const group of requiredGroups) {
    for (const signal of brief[group]) {
      if (!signal.category?.zh || !signal.category?.en) {
        throw new Error(`Generated brief is missing category in ${group}: ${signal.title?.en ?? "unknown"}`);
      }
      if (!signal.pmInsight?.zh || !signal.pmInsight?.en) {
        throw new Error(`Generated brief is missing pmInsight in ${group}: ${signal.title?.en ?? "unknown"}`);
      }
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

  if (!hasSufficientScrapeData(githubProjects, companyUpdates)) {
    console.warn("No GitHub or company updates collected. Skipping brief write.");
    return;
  }

  const enrichedCompany = await enrichCompanyUpdates(companyUpdates);
  const enhancedGithubProjects = await enhanceGithubProjects(
    await enrichGithubProjects(githubProjects.slice(0, 10)),
  );
  const enhancedCompanyUpdates = await enhanceCompanyUpdates(enrichedCompany.slice(0, 4));
  const editorial = await enhanceEditorialBrief({
    targetDate,
    githubProjects: enhancedGithubProjects,
    companyUpdates: enhancedCompanyUpdates,
  });

  const brief = {
    date: targetDate,
    label: { zh: "最新", en: "Latest" },
    title: editorial.title,
    editorNote: editorial.editorNote,
    keyTakeaway: editorial.keyTakeaway,
    signals: editorial.signals ?? [],
    opportunities: editorial.opportunities ?? [],
    githubProjects: enhancedGithubProjects.map((repo) => buildGithubProjectSignal(repo)),
    companyUpdates: enhancedCompanyUpdates.map((item) => buildCompanyUpdateSignal(item)),
  };

  normalizeBriefSignals(brief);
  assertBriefShape(brief);

  if (isMockBriefEntry(brief)) {
    console.warn("Generated brief looks like low-quality template output. Skipping brief write.");
    return;
  }

  if (dryRun) {
    console.log(JSON.stringify(brief, null, 2));
    return;
  }

  const existingBriefs = (await readExistingBriefs()).filter((item) => !isMockBriefEntry(item));
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
