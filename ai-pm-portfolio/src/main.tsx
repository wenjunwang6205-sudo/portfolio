import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Building2,
  CalendarDays,
  Camera,
  Download,
  Eye,
  FileText,
  Github,
  Image as ImageIcon,
  LayoutDashboard,
  Link2,
  Mail,
  Megaphone,
  Newspaper,
  PenLine,
  Plus,
  Search,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { DAILY_BRIEFS, type DailyBrief, type DailySignal } from "./constants/dailyData";
import "./styles.css";

type Locale = "zh" | "en";
type AgentMessage =
  | {
      role: "user";
      text: string;
    }
  | {
      role: "assistant";
      route: string;
      taskTitle: string;
      subagent: string;
      thinking: readonly string[];
      suggestions: readonly string[];
      output:
        | {
            title: string;
            body: string;
            table: {
              headers: readonly string[];
              rows: readonly (readonly string[])[];
            };
          }
        | {
            title: string;
            body: string;
            paragraphs: readonly string[];
          };
    };
type AgentDemoContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  back: string;
  inputPlaceholder: string;
  completeTitle: string;
  reviewButton: string;
  continueButton: string;
  messages: readonly AgentMessage[];
};

const localeLabels: Record<Locale, string> = {
  zh: "中 / EN",
  en: "EN / 中",
};

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const toPath = (path: string) => `${basePath}${path}`;
const currentPath = () => {
  const pathname = window.location.pathname;
  return basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;
};

const githubFavoritesStorageKey = "ai-daily-github-favorites";
const ownerModeStorageKey = "ai-daily-owner-mode";

type GithubFavorite = {
  repoName: string;
  url: string;
  language?: string;
  totalStars?: number;
  dailyStars?: number | null;
  chineseIntro?: string;
  todayHighlight?: string;
  savedAt: string;
  lastSeenDate: string;
};

function safeReadJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function getGithubSignalKey(signal: DailySignal) {
  return signal.sources.find((source) => source.url.includes("github.com"))?.url ?? signal.title.en;
}

function favoriteToSignal(favorite: GithubFavorite): DailySignal {
  return {
    title: { zh: favorite.repoName, en: favorite.repoName },
    category: { zh: "GitHub 收藏", en: "GitHub favorite" },
    summary: {
      zh: favorite.chineseIntro ?? "已收藏的 GitHub 项目。",
      en: favorite.chineseIntro ?? "Saved GitHub project.",
    },
    totalStars: favorite.totalStars,
    language: favorite.language,
    dailyStars: favorite.dailyStars,
    chineseIntro: {
      zh: favorite.chineseIntro ?? "已收藏的 GitHub 项目。",
      en: favorite.chineseIntro ?? "Saved GitHub project.",
    },
    todayHighlight: favorite.todayHighlight
      ? { zh: favorite.todayHighlight, en: favorite.todayHighlight }
      : undefined,
    pmInsight: {
      zh: `收藏于 ${favorite.savedAt}，最近出现于 ${favorite.lastSeenDate} 日报。`,
      en: `Saved on ${favorite.savedAt}; last seen in the ${favorite.lastSeenDate} brief.`,
    },
    impact: "Watch",
    sources: [{ label: "GitHub Repository", url: favorite.url }],
  };
}

const projects = [
  {
    id: "campaign",
    title: {
      zh: "AI 营销创作工作流",
      en: "AI Marketing Workflow",
    },
    label: {
      zh: "AI Marketing Workflow",
      en: "AI Marketing Workflow",
    },
    description: {
      zh: "从营销 brief 到 campaign 策略、内容草案与可审核的 AIGC 短视频素材 brief。",
      en: "Turns a marketing brief into campaign strategy, content drafts, and reviewable AIGC video asset briefs.",
    },
    meta: "Campaign Strategy / AIGC Workflow",
    href: "/projects/campaign-assistant",
    icon: Megaphone,
    accent: "coral",
  },
  {
    id: "insight",
    title: {
      zh: "舆情数据报告助手",
      en: "Public Opinion Report Agent",
    },
    label: {
      zh: "Insight Report Agent",
      en: "Insight Report Agent",
    },
    description: {
      zh: "模拟从热点识别、情绪归因到报告摘要的分析流程。",
      en: "Simulates the flow from trend detection to sentiment reasoning and report summary.",
    },
    meta: "Agent / Evaluation / Data Product",
    href: "/projects/insight-report-agent",
    icon: Newspaper,
    accent: "blue",
  },
  {
    id: "cms",
    title: {
      zh: "客户作品管理 CMS",
      en: "Client Work CMS",
    },
    label: {
      zh: "Photo + Article CMS",
      en: "Photo + Article CMS",
    },
    description: {
      zh: "展示摄影与文章资产的归档、标签、发布状态和内容预览。",
      en: "Shows content assets, tags, publishing states, and previews for photos and articles.",
    },
    meta: "SaaS / Content Ops",
    href: "/projects/content-cms",
    icon: Camera,
    accent: "green",
  },
] as const;

const cmsWorks = [
  {
    title: { zh: "季候风画集", en: "Monsoon Sketchbook" },
    slug: "work-2647-2647",
    category: "Book",
    images: "17",
    date: "2025/12/31",
    color: "cyan",
  },
  {
    title: { zh: "扭曲仙境", en: "Twisted Wonderland" },
    slug: "work-2632-2632",
    category: "Graphic",
    images: "3",
    date: "2025/11/27",
    color: "red",
  },
  {
    title: { zh: "时代代理人", en: "Time Proxy" },
    slug: "work-2613-2613",
    category: "Book",
    images: "3",
    date: "2025/11/17",
    color: "blue",
  },
  {
    title: { zh: "惊封", en: "The Door" },
    slug: "work-2607-2607",
    category: "Book",
    images: "3",
    date: "2025/11/17",
    color: "cream",
  },
  {
    title: { zh: "Barbapapa Card", en: "Barbapapa Card" },
    slug: "barbapapa-card-2583",
    category: "Graphic",
    images: "11",
    date: "2025/10/23",
    color: "yellow",
  },
] as const;

const cmsPhotos = [
  { title: "2025.11", date: "202511-1", images: "9", color: "pink" },
  { title: "2025.09", date: "202509-2", images: "9", color: "mono" },
  { title: "2025.08", date: "202508-3", images: "6", color: "green" },
  { title: "Lookstore 2024", date: "202410-4", images: "12", color: "paper" },
  { title: "2024.10", date: "202410-2", images: "8", color: "orange" },
  { title: "2024.03", date: "202403-1", images: "14", color: "water" },
] as const;

const content = {
  zh: {
    nav: {
      project: "Project",
      about: "About me",
      home: "Home",
      daily: "AI Daily",
      contact: "联系我",
    },
    contact: {
      title: "联系我",
      subtitle: "欢迎通过以下方式联系我。",
      wechat: "微信",
      email: "邮箱",
      phone: "手机号",
      copy: "复制",
      copied: "已复制",
      wechatValue: "JuennGoz",
      emailValue: "wenjun.wang6205@gmail.com",
      phoneValue: "187 2137 8389",
      close: "关闭",
    },
    hero: {
      title: ["产品经理", "作品集。"],
      intro: "关注 AI 工作流、业务流程自动化与内容系统。",
      more: "了解更多",
      bubbleLabel: "了解更多 about me",
      profileTags: ["Product sense", "AI literacy", "UI taste"],
    },
    campaignDemo: {
      eyebrow: "AI Marketing Workflow",
      title: "AI 营销创作工作流",
      subtitle: "模拟从营销 brief 到策略方案、内容草案与 AIGC 素材 brief 的端到端流程。",
      back: "返回项目",
      inputPlaceholder: "继续输入：比如 调整预算 / 生成 PPT 大纲 / 输出排期表",
      completeTitle: "营销方案生成任务已完成",
      reviewButton: "查看回放",
      continueButton: "联系作者",
      messages: [
        {
          role: "user",
          text: "我们准备上线一款二次元开放世界手游，预算 80 万，希望做一个 4 周的新游预约营销方案，目标是提升 TapTap 预约量和核心玩家讨论度。",
        },
        {
          role: "assistant",
          route: "已识别为「新游预约营销策划」场景，正在路由至 Campaign Strategy Agent，并调用 Brief Parser 子任务。",
          taskTitle: "解析 Campaign Brief",
          subagent: "SubAgent 执行完成 · 3 项",
          thinking: ["抽取业务目标、预算、周期和品类", "识别缺失字段：卖点、素材、渠道优先级", "判断当前信息足以生成初版 brief，但仍需补充素材与渠道偏好"],
          suggestions: ["补充核心卖点", "查看 brief 表格", "生成追问清单"],
          output: {
            title: "Brief 解析结果",
            body: "已将用户自由文本转为结构化 brief，并标记需要继续确认的信息。",
            table: {
              headers: ["字段", "解析结果", "状态"],
              rows: [
                ["业务目标", "TapTap 预约量 + 核心玩家讨论度", "已确认"],
                ["预算 / 周期", "80 万 / 4 周", "已确认"],
                ["核心卖点", "待补充", "需追问"],
                ["素材资产", "待补充", "需追问"],
              ],
            },
          },
        },
        {
          role: "user",
          text: "主打高自由度探索和角色剧情。已有首曝 PV、3 个角色设定图。渠道优先 B 站、TapTap、小红书，抖音辅助。",
        },
        {
          role: "assistant",
          route: "补充信息已接收，正在路由至 Market Research Agent，模拟检索品类打法、渠道内容形态和玩家兴趣点。",
          taskTitle: "市场调研与机会点提炼",
          subagent: "SubAgent 执行完成 · 4 项",
          thinking: ["将卖点映射到内容主题：探索感、角色厨、世界观", "按渠道拆解内容任务：B 站种草、TapTap 承接、小红书扩散", "从预算和周期约束中筛选高 ROI 动作"],
          suggestions: ["展开竞品打法", "查看渠道建议", "继续生成大纲"],
          output: {
            title: "市场调研摘要",
            body: "建议用 PV 建立世界观认知，用角色设定图制造角色讨论，再用达人内容与预约福利完成转化闭环。",
            paragraphs: [
              "B 站适合作为首曝内容的深度解释场：用 PV 解析、世界观考据和长视频种草承接核心玩家的探索兴趣，让“开放世界”的卖点先被讲清楚。",
              "TapTap 更适合作为预约承接和玩家反馈阵地：预约页需要强化核心卖点、开发者日志和评论区运营，降低用户从兴趣到预约之间的流失。",
              "小红书和抖音负责扩散层：小红书以角色人设卡和氛围图文制造轻讨论，抖音则用高燃 PV 切片和角色台词做短视频补量。",
            ],
          },
        },
        {
          role: "user",
          text: "先给我一个方案大纲，重点突出 4 周节奏和渠道分工。",
        },
        {
          role: "assistant",
          route: "已切换至 Planning Agent，正在把调研结论转为可执行的 campaign structure。",
          taskTitle: "生成方案大纲",
          subagent: "SubAgent 执行完成 · 4 项",
          thinking: ["按照先认知、再讨论、后转化组织节奏", "将已有素材拆到每周内容任务", "设置人工审核点，避免 AI 文案过度承诺玩法"],
          suggestions: ["调整渠道权重", "生成预算拆分", "继续写全文"],
          output: {
            title: "4 周 campaign 大纲",
            body: "将预约期拆为四个阶段：首曝认知、角色扩散、达人解读、预约收口。",
            paragraphs: [
              "第 1 周以首曝 PV 为核心，集中完成世界观悬念释放、B 站解析种草和 TapTap 预约页承接，让玩家先理解“为什么值得预约”。",
              "第 2 周围绕 3 个角色设定图展开角色内容运营，通过小红书角色话题、氛围图文和 TapTap 开发者日志，把讨论从世界观拉到角色偏好。",
              "第 3-4 周进入转化阶段：用达人试玩解读补充可信体验，再用预约福利倒计时、UGC 二创征集和抖音短视频补量完成收口。",
            ],
          },
        },
        {
          role: "user",
          text: "继续生成方案全文，但保持可编辑，不要写得像最终广告稿。",
        },
        {
          role: "assistant",
          route: "正在调用 Proposal Writer Agent，把大纲扩写为可编辑的方案正文，并保留后续调整入口。",
          taskTitle: "生成方案全文草案",
          subagent: "SubAgent 执行完成 · 5 项",
          thinking: ["按汇报结构生成：目标、策略、渠道、排期、风险", "保持工作稿语气，方便继续编辑", "将下一步动作拆成可继续追问的选项"],
          suggestions: ["生成 PPT 大纲", "输出发布排期", "调整预算比例"],
          output: {
            title: "方案全文草案",
            body: "本次新游预约营销以“探索自由 + 角色剧情”为双主线。前期通过首曝 PV 建立世界观认知，中期通过角色内容引发玩家讨论，后期通过达人解读和预约福利完成转化。整体策略不是一次性铺量，而是围绕核心玩家兴趣逐步放大声量。",
            paragraphs: [
              "第一阶段以首曝 PV 作为认知入口，在 B 站通过 PV 解析、世界观考据和长视频种草建立游戏的探索想象；同时在 TapTap 完成预约页包装，让首批关注用户有明确的预约承接路径。",
              "第二阶段围绕 3 个角色设定图展开角色内容运营，通过小红书角色人设卡、氛围感图文和轻讨论话题制造角色党讨论，并将讨论内容回流至 TapTap 评论区。",
              "第三阶段引入达人解读与试玩向内容，把自由探索和角色剧情转化为更具体的体验卖点；第四阶段则用预约福利倒计时、UGC 二创征集和抖音短视频补量完成转化收口。",
            ],
          },
        },
        {
          role: "user",
          text: "再基于这个 campaign，生成一组 AIGC 短视频素材 brief。重点是 B 站、小红书和抖音，可以给到分镜和视频生成提示词，但要保留人工审核。",
        },
        {
          role: "assistant",
          route: "已识别为「策略到 AIGC 素材生产」任务，正在调用 Creative Pack Agent，并将视频生成提示词纳入人工审核流程。",
          taskTitle: "生成 AIGC Creative Pack",
          subagent: "SubAgent 执行完成 · 3 条素材 brief",
          thinking: ["提取 campaign 主线：探索自由、角色剧情、预约转化", "按平台拆分素材形态：B 站氛围 PV、小红书角色人设、抖音高燃切片", "生成镜头、字幕、画面风格和视频提示词", "加入 IP 相似度、夸张承诺、版权与品牌安全审核点"],
          suggestions: ["导出 Prompt Pack", "生成分镜表", "检查品牌风险"],
          output: {
            title: "AIGC 素材 brief",
            body: "这一步不是直接批量生成视频，而是把营销策略转译为可审核、可复用的 AIGC 素材生产 brief，供设计、运营和模型工具继续执行。",
            paragraphs: [
              "B 站 15s 世界观探索向：开场用远景展示遗迹、天空裂隙与角色背影，镜头从低机位推进到广角世界。Prompt 重点描述开放世界、神秘遗迹、电影感光影、缓慢推镜；审核点是避免出现未授权 IP 风格和过度承诺真实玩法。",
              "小红书角色剧情向：以 3 张角色设定图为参考，生成情绪化角色人设短片。Prompt 重点描述角色气质、服饰细节、日记式字幕和柔和光线；审核点是角色相似度、人物设定一致性和社区表达语气。",
              "抖音 10s 预约转化向：用 PV 高燃片段节奏组织倒计时、预约福利和核心卖点字幕。Prompt 重点描述快速剪辑、冲刺镜头、能量粒子、强节奏字幕；审核点是福利表述准确性、平台合规和最终落地页一致性。",
            ],
          },
        },
      ],
    },
    insightDemo: {
      eyebrow: "Insight Report Agent",
      title: "舆情数据报告助手",
      subtitle: "模拟从社媒采集到风险预警与维护方案的分析型 Agent 工作流。",
      back: "返回项目",
      inputPlaceholder: "继续输入：比如 查看原帖 / 导出日报 / 生成公告草稿",
      completeTitle: "舆情报告生成任务已完成",
      reviewButton: "查看回放",
      continueButton: "联系作者",
      messages: [
        {
          role: "user",
          text: "帮我分析《星穹铁道》最近 7 天关于“新角色强度争议”的社交媒体舆情，重点看 B 站、小红书、微博和 TapTap。",
        },
        {
          role: "assistant",
          route: "已识别为「游戏舆情分析」场景，正在路由至 Social Listening Agent，并调用关键词采集任务。",
          taskTitle: "采集关键词与社媒帖子",
          subagent: "SubAgent 执行完成 · 4 个平台",
          thinking: ["拆解监测关键词：新角色、强度、抽卡、命座、退坑", "模拟采集 B 站、小红书、微博、TapTap 近 7 天帖子", "去重后保留高互动与高情绪浓度样本"],
          suggestions: ["查看原帖样本", "扩大关键词", "继续情感标注"],
          output: {
            title: "社媒采集摘要",
            body: "已模拟收集四个平台的相关帖子，并按互动量与关键词密度筛选代表性内容。",
            table: {
              headers: ["平台", "帖子数", "高频词", "代表内容"],
              rows: [
                ["B 站", "248", "强度 / 测评 / 配队", "角色机制不错但数值偏保守"],
                ["微博", "512", "节奏 / 逼氪 / 退坑", "这次是不是又在逼命座"],
                ["小红书", "136", "人设 / 剧情 / 好看", "角色剧情挺戳我，立绘也稳"],
                ["TapTap", "89", "平衡 / 反馈 / 策划", "希望后续给一点机制补强"],
              ],
            },
          },
        },
        {
          role: "user",
          text: "再帮我区分正面、中性、负面，并找出负面主要集中在哪里。",
        },
        {
          role: "assistant",
          route: "正在路由至 Sentiment Tagging Agent，对帖子进行情感标签、话题聚类与典型观点抽取。",
          taskTitle: "AI 情感标注与话题聚类",
          subagent: "SubAgent 执行完成 · 1,024 条样本",
          thinking: ["对每条帖子打正面 / 中性 / 负面标签", "将负面内容聚类到强度、抽卡成本、版本平衡三个话题", "抽取可引用的玩家原声并做脱敏处理"],
          suggestions: ["查看负面样本", "按平台过滤", "继续分析趋势"],
          output: {
            title: "情感标签结果",
            body: "负面声量主要集中在“强度不达预期”和“抽卡成本压力”，其中微博传播速度最快，TapTap 反馈更集中于机制与平衡。",
            table: {
              headers: ["话题簇", "情感", "占比", "典型观点"],
              rows: [
                ["强度不达预期", "负面", "38%", "抽了但上场收益不高"],
                ["角色剧情好评", "正面", "24%", "剧情塑造很完整"],
                ["抽卡成本争议", "负面", "21%", "命座压力太大"],
                ["美术与人设", "正面", "17%", "立绘质量稳定"],
              ],
            },
          },
        },
        {
          role: "user",
          text: "现在看风险高吗？有没有可能扩散成更大的节奏？",
        },
        {
          role: "assistant",
          route: "正在调用 Trend Analysis Agent，结合平台扩散速度、负面占比和 KOL 参与度判断风险等级。",
          taskTitle: "舆情走向与高危预警",
          subagent: "SubAgent 执行完成 · 风险等级：高",
          thinking: ["负面讨论集中在微博并向 B 站测评区扩散", "TapTap 评论区已出现集中反馈，可能影响预约与评分预期", "若 24 小时内无回应，KOL 二次放大概率上升"],
          suggestions: ["查看扩散路径", "生成预警简报", "继续维护方案"],
          output: {
            title: "高危预警卡",
            body: "当前风险等级为高。争议点具备跨平台扩散迹象，且负面叙事较容易被简化为“角色弱 / 逼氪”。",
            table: {
              headers: ["风险项", "判断", "处置优先级"],
              rows: [
                ["微博扩散", "负面增速快，情绪化表达多", "P0"],
                ["B 站测评", "存在二次解读与长视频放大风险", "P1"],
                ["TapTap 评分", "玩家反馈集中，影响预约信心", "P1"],
                ["官方回应", "超过 24 小时无回应会放大不信任", "P0"],
              ],
            },
          },
        },
        {
          role: "user",
          text: "给运营团队一份维护方案，最好能分 24 小时、48 小时和 7 天。",
        },
        {
          role: "assistant",
          route: "正在调用 Risk Response Agent，把风险预警转化为运营可执行的舆情维护方案。",
          taskTitle: "生成舆情维护方案",
          subagent: "SubAgent 执行完成 · 3 个时间窗口",
          thinking: ["短期先承接情绪，避免直接承诺数值加强", "中期用玩法示例与阵容推荐降低“弱”的单一叙事", "持续跟踪负面占比与高赞评论变化"],
          suggestions: ["生成公告草稿", "输出 FAQ", "导出日报摘要"],
          output: {
            title: "舆情维护方案",
            body: "建议采用“先回应、再解释、后观察”的三段式维护策略。重点不是立即承诺加强，而是承认反馈、解释设计意图，并用内容运营降低单一负面叙事。",
            paragraphs: [
              "24 小时内：发布开发者说明或社区回应，承认已关注角色强度与抽卡成本反馈，说明正在收集实战数据。措辞上避免直接承诺加强，以免形成新的预期落差。",
              "48 小时内：补充角色玩法示例、阵容推荐和机制解释内容，通过 B 站与 TapTap 分发，帮助玩家理解角色定位，并同步置顶 FAQ 管理重复争议。",
              "7 天内：持续监测负面占比、KOL 二次传播和 TapTap 评分变化。如负面维持高位，再考虑版本沟通、补偿活动或后续平衡调整说明。",
            ],
          },
        },
      ],
    },
    placeholder: {
      aboutTitle: "About me",
      aboutEyebrow: "Profile",
      aboutCopy: "这里后续会放你的 AI 产品经理定位、经历摘要、技能地图和简历入口。",
      projectCopy: "这里后续会接入对话式 mock demo，并补充产品问题、工作流、AI 设计决策和指标复盘。",
      back: "返回首页",
    },
    about: {
      eyebrow: "About me",
      title: "王文君",
      role: "AI 产品经理 | Agent 工作流与业务流程自动化",
      summary:
        "设计学科背景转型 AI 产品经理，专注于 AI 驱动的业务流程自动化、Agent 工作流编排与 AI 辅助原型交付。当前主导游戏行业 AI 产品线，覆盖营销方案生成、舆情报告分析与达人营销 SaaS 等场景。",
      download: "下载 CV",
      sections: {
        profile: "个人简介",
        experience: "工作经历",
        education: "教育经历",
        skills: "技能",
      },
      profile: [
        "关注任务复杂度、模型置信度、成本与业务风险之间的平衡，能判断自动化、人机协同与人工审核的合理边界。",
        "深度使用 Cursor、Dify、Google AI Studio、Codex 等 AI 工具，能够快速搭建可交互原型并对齐复杂流程。",
      ],
      experience: [
        {
          company: "上海启竞广告有限公司",
          role: "AI 产品经理",
          period: "2025.04 - 至今",
          detail:
            "负责游戏行业 AI 产品线规划与落地，主导 EasyPromo、DeepInsight 与中游网等产品从 0 到 1 的设计与交付。",
        },
        {
          company: "上海安棣建筑事务所",
          role: "景观设计师",
          period: "2022.08 - 2024.08",
          detail:
            "负责城市景观与空间设计项目，同时自学编程与产品设计，完成 UX 与 AI Product Manager 认证。",
        },
        {
          company: "上海熙济城市规划设计咨询有限公司",
          role: "景观设计师",
          period: "2017.06 - 2019.06",
          detail: "参与城市更新与社区空间改造项目，积累复杂需求理解、方案表达与项目协作经验。",
        },
      ],
      education: [
        "Coursera | IBM AI 产品经理证书 | 2025.11 - 2026.04",
        "Coursera | Google 交互设计证书 | 2024.10 - 2024.12",
        "米兰理工大学 | 景观设计 硕士 | 2019 - 2022 | QS 2026 全球 #98 / 意大利 #1",
        "华东理工大学 | 景观设计 学士 | 2013 - 2017",
      ],
      skills: [
        "Agent 工作流设计",
        "Pipeline / Orchestrator 编排",
        "RAG / Prompt Engineering",
        "多模型路由与成本优化",
        "PRD / 原型 / 数据模型",
        "React / TypeScript / Tailwind CSS 基础",
      ],
    },
  },
  en: {
    nav: {
      project: "Project",
      about: "About me",
      home: "Home",
      daily: "AI Daily",
      contact: "Contact",
    },
    contact: {
      title: "Contact",
      subtitle: "Feel free to reach me here.",
      wechat: "WeChat",
      email: "Email",
      phone: "Phone",
      copy: "Copy",
      copied: "Copied",
      wechatValue: "JuennGoz",
      emailValue: "wenjun.wang6205@gmail.com",
      phoneValue: "+86 187 2137 8389",
      close: "Close",
    },
    hero: {
      title: ["Product", "Portfolio."],
      intro: "Focused on AI workflows, business automation, and content systems.",
      more: "Learn more",
      bubbleLabel: "Learn more about me",
      profileTags: ["Product sense", "AI literacy", "UI taste"],
    },
    campaignDemo: {
      eyebrow: "AI Marketing Workflow",
      title: "AI Marketing Workflow",
      subtitle: "A mock end-to-end flow from marketing brief to campaign strategy, content drafts, and AIGC asset briefs.",
      back: "Back to projects",
      inputPlaceholder: "Continue: adjust budget / generate PPT outline / create posting calendar",
      completeTitle: "Marketing plan generation completed",
      reviewButton: "View replay",
      continueButton: "Contact author",
      messages: [
        {
          role: "user",
          text: "We are launching an anime-style open-world mobile game. Budget is 800k RMB. We need a 4-week pre-registration campaign to increase TapTap reservations and core player discussion.",
        },
        {
          role: "assistant",
          route: "Recognized as a new-game pre-registration campaign. Routing to Campaign Strategy Agent and calling the Brief Parser subtask.",
          taskTitle: "Parse Campaign Brief",
          subagent: "SubAgent completed · 3 items",
          thinking: ["Extract business goal, budget, timeline, and category", "Identify missing fields: selling points, assets, channel priority", "Generate initial brief but ask for asset and channel details"],
          suggestions: ["Add selling points", "View brief table", "Generate follow-up questions"],
          output: {
            title: "Brief Parsing Result",
            body: "The free-form request has been converted into a structured brief with missing information marked for follow-up.",
            table: {
              headers: ["Field", "Result", "Status"],
              rows: [
                ["Business goal", "TapTap reservations + core player buzz", "Confirmed"],
                ["Budget / Timeline", "800k RMB / 4 weeks", "Confirmed"],
                ["Selling points", "Missing", "Follow up"],
                ["Creative assets", "Missing", "Follow up"],
              ],
            },
          },
        },
        {
          role: "user",
          text: "Main selling points are exploration freedom and character stories. We have a reveal PV and 3 character key visuals. Prioritize Bilibili, TapTap, and Xiaohongshu, with Douyin as support.",
        },
        {
          role: "assistant",
          route: "Additional info received. Routing to Market Research Agent to simulate category tactics, channel formats, and player interest signals.",
          taskTitle: "Market Research & Opportunity Mapping",
          subagent: "SubAgent completed · 4 items",
          thinking: ["Map selling points into themes: exploration, character fandom, worldbuilding", "Split channel tasks: Bilibili seeding, TapTap conversion, Xiaohongshu expansion", "Prioritize high-ROI actions under budget and timeline constraints"],
          suggestions: ["Expand competitor tactics", "View channel advice", "Continue to outline"],
          output: {
            title: "Market Research Summary",
            body: "Use the PV to build world awareness, character visuals to trigger discussion, and creator content plus reservation rewards to close conversion.",
            paragraphs: [
              "Bilibili should carry the deeper explanation layer: PV analysis, lore breakdowns, and long-form seeding can make the open-world promise more concrete for core players.",
              "TapTap should work as the conversion and feedback hub. The reservation page, dev notes, and comment operations need to reduce the drop-off between interest and reservation.",
              "Xiaohongshu and Douyin handle expansion. Xiaohongshu can build character-led interest through cards and mood-board posts, while Douyin supports reach with PV cuts and character lines.",
            ],
          },
        },
        {
          role: "user",
          text: "Give me an outline first. Focus on the 4-week rhythm and channel roles.",
        },
        {
          role: "assistant",
          route: "Switching to Planning Agent and converting research insights into an executable campaign structure.",
          taskTitle: "Generate Campaign Outline",
          subagent: "SubAgent completed · 4 items",
          thinking: ["Organize by awareness, discussion, and conversion", "Map existing assets into weekly tasks", "Set human review points to avoid overpromising gameplay"],
          suggestions: ["Adjust channel weight", "Generate budget split", "Continue full draft"],
          output: {
            title: "4-Week Campaign Outline",
            body: "Split the pre-registration campaign into four stages: reveal awareness, character expansion, creator interpretation, and reservation closing.",
            paragraphs: [
              "Week 1 focuses on the reveal PV, worldbuilding hook, Bilibili explanation content, and TapTap reservation-page readiness, answering why players should care now.",
              "Week 2 shifts from worldbuilding to character affinity. Character key visuals, Xiaohongshu topics, and dev-note content help turn attention into discussion.",
              "Weeks 3-4 move toward conversion: creator interpretation builds trust, while reservation reward countdowns, UGC prompts, and Douyin short-video reach close the campaign loop.",
            ],
          },
        },
        {
          role: "user",
          text: "Continue with the full proposal, but keep it editable rather than final ad copy.",
        },
        {
          role: "assistant",
          route: "Calling Proposal Writer Agent to expand the outline into an editable proposal draft with next-step actions.",
          taskTitle: "Generate Full Proposal Draft",
          subagent: "SubAgent completed · 5 items",
          thinking: ["Structure by goal, strategy, channel plan, timeline, and risk", "Keep the tone as a working draft for PM editing", "Expose follow-up actions the user can request next"],
          suggestions: ["Generate PPT outline", "Create posting calendar", "Adjust budget split"],
          output: {
            title: "Full Proposal Draft",
            body: "This pre-registration campaign uses exploration freedom and character stories as dual themes. The early stage builds world awareness through the reveal PV, the middle stage triggers discussion through character content, and the final stage closes conversion through creator interpretation and reservation rewards.",
            paragraphs: [
              "Stage one uses the reveal PV as the awareness entry point. On Bilibili, PV analysis, lore breakdowns, and long-form seeding build imagination around exploration; on TapTap, the reservation page gives early interested users a clear conversion path.",
              "Stage two centers on the 3 character key visuals. Xiaohongshu character cards, mood-board posts, and lightweight discussion topics create character-fan engagement, then guide that discussion back to TapTap comments.",
              "Stage three introduces creator interpretation and trial-style content to make exploration freedom and character stories more concrete. Stage four closes conversion through reservation reward countdowns, UGC prompts, and Douyin short-video reach.",
            ],
          },
        },
        {
          role: "user",
          text: "Based on this campaign, generate an AIGC short-video creative pack for Bilibili, Xiaohongshu, and Douyin. Include storyboards and video-generation prompts, but keep human review in the loop.",
        },
        {
          role: "assistant",
          route: "Recognized as a strategy-to-AIGC production task. Calling Creative Pack Agent and adding human review checkpoints for generated video prompts.",
          taskTitle: "Generate AIGC Creative Pack",
          subagent: "SubAgent completed · 3 asset briefs",
          thinking: ["Extract campaign themes: exploration freedom, character stories, reservation conversion", "Map platform formats: Bilibili atmospheric PV, Xiaohongshu character storytelling, Douyin high-energy cuts", "Generate shots, captions, visual style, and video prompts", "Add review checks for IP similarity, overclaiming, copyright, and brand safety"],
          suggestions: ["Export prompt pack", "Create storyboard", "Check brand risks"],
          output: {
            title: "AIGC Asset Brief",
            body: "This step does not mass-generate final videos. It translates campaign strategy into reviewable and reusable AIGC production briefs for designers, operators, and model tools.",
            paragraphs: [
              "Bilibili 15s world-exploration asset: open with ruins, sky fissures, and a character silhouette, moving from low-angle push-in to wide world reveal. Prompt emphasis: open world, mysterious ruins, cinematic lighting, slow camera push. Review checks: unauthorized IP resemblance and overpromising gameplay.",
              "Xiaohongshu character-story asset: use the 3 character key visuals as reference and create a mood-driven character short. Prompt emphasis: character temperament, outfit details, diary-style captions, soft lighting. Review checks: character consistency, similarity threshold, and platform tone.",
              "Douyin 10s reservation-conversion asset: organize PV-style cuts around countdown, reservation reward, and core selling-point captions. Prompt emphasis: fast cuts, sprint shots, energy particles, rhythmic subtitles. Review checks: reward accuracy, platform compliance, and landing-page consistency.",
            ],
          },
        },
      ],
    },
    insightDemo: {
      eyebrow: "Insight Report Agent",
      title: "Public Opinion Report Agent",
      subtitle: "A mock analytical agent workflow from social listening to risk response.",
      back: "Back to projects",
      inputPlaceholder: "Continue: view posts / export daily brief / draft announcement",
      completeTitle: "Public opinion report completed",
      reviewButton: "View replay",
      continueButton: "Contact author",
      messages: [
        {
          role: "user",
          text: "Analyze the last 7 days of social media sentiment around 'new character strength controversy' for Honkai: Star Rail. Focus on Bilibili, Xiaohongshu, Weibo, and TapTap.",
        },
        {
          role: "assistant",
          route: "Recognized as a game public-opinion analysis task. Routing to Social Listening Agent and calling keyword collection.",
          taskTitle: "Collect Keywords & Social Posts",
          subagent: "SubAgent completed · 4 platforms",
          thinking: ["Break down monitoring keywords: new character, strength, gacha, eidolon, churn", "Simulate collecting posts from Bilibili, Xiaohongshu, Weibo, and TapTap", "Deduplicate and keep high-engagement, high-sentiment samples"],
          suggestions: ["View sample posts", "Expand keywords", "Continue sentiment tagging"],
          output: {
            title: "Social Listening Summary",
            body: "Collected mock posts across four platforms and filtered representative content by engagement and keyword density.",
            table: {
              headers: ["Platform", "Posts", "Frequent keywords", "Representative content"],
              rows: [
                ["Bilibili", "248", "strength / review / team", "The kit is interesting, but numbers feel conservative"],
                ["Weibo", "512", "drama / monetization / churn", "Is this another eidolon pressure case"],
                ["Xiaohongshu", "136", "character / story / visuals", "The character story and art are both strong"],
                ["TapTap", "89", "balance / feedback / dev", "Hope they add some mechanical support later"],
              ],
            },
          },
        },
        {
          role: "user",
          text: "Tag positive, neutral, and negative sentiment, then tell me where the negative discussion is concentrated.",
        },
        {
          role: "assistant",
          route: "Routing to Sentiment Tagging Agent for sentiment labeling, topic clustering, and representative opinion extraction.",
          taskTitle: "Sentiment Tagging & Topic Clustering",
          subagent: "SubAgent completed · 1,024 samples",
          thinking: ["Apply positive / neutral / negative labels to each post", "Cluster negative posts into strength, gacha cost, and balance topics", "Extract anonymized player quotes for report use"],
          suggestions: ["View negative samples", "Filter by platform", "Continue trend analysis"],
          output: {
            title: "Sentiment Tagging Result",
            body: "Negative sentiment is concentrated around 'strength below expectation' and 'gacha cost pressure'. Weibo spreads fastest, while TapTap feedback is more focused on mechanics and balance.",
            table: {
              headers: ["Topic cluster", "Sentiment", "Share", "Typical opinion"],
              rows: [
                ["Strength below expectation", "Negative", "38%", "Pulled the character, but field value feels low"],
                ["Character story praised", "Positive", "24%", "The story arc feels complete"],
                ["Gacha cost controversy", "Negative", "21%", "Eidolon pressure feels too high"],
                ["Art and design", "Positive", "17%", "Visual quality remains stable"],
              ],
            },
          },
        },
        {
          role: "user",
          text: "How risky is this now? Could it spread into a bigger issue?",
        },
        {
          role: "assistant",
          route: "Calling Trend Analysis Agent to evaluate risk level using spread speed, negative share, and KOL participation.",
          taskTitle: "Trend Analysis & High-Risk Alert",
          subagent: "SubAgent completed · Risk level: High",
          thinking: ["Negative discussion is concentrated on Weibo and spreading to Bilibili review areas", "TapTap comments show clustered feedback that may affect reservation confidence", "If there is no response within 24 hours, KOL amplification risk increases"],
          suggestions: ["View spread path", "Generate alert brief", "Continue response plan"],
          output: {
            title: "High-Risk Alert Card",
            body: "Current risk level is high. The controversy shows cross-platform spread, and the negative narrative can easily collapse into 'weak character / monetization pressure'.",
            table: {
              headers: ["Risk", "Assessment", "Priority"],
              rows: [
                ["Weibo spread", "Fast negative growth, emotional language", "P0"],
                ["Bilibili reviews", "Long-form amplification risk", "P1"],
                ["TapTap rating", "Clustered feedback may affect reservation confidence", "P1"],
                ["Official response", "No response after 24h may amplify distrust", "P0"],
              ],
            },
          },
        },
        {
          role: "user",
          text: "Give the operations team a response plan split by 24 hours, 48 hours, and 7 days.",
        },
        {
          role: "assistant",
          route: "Calling Risk Response Agent to convert risk alerts into an executable operations response plan.",
          taskTitle: "Generate Public-Opinion Response Plan",
          subagent: "SubAgent completed · 3 time windows",
          thinking: ["Short-term: acknowledge sentiment without promising immediate balance changes", "Mid-term: use gameplay examples and team recommendations to reduce the 'weak' narrative", "Continue tracking negative share and high-like comments"],
          suggestions: ["Draft announcement", "Generate FAQ", "Export daily brief"],
          output: {
            title: "Public-Opinion Response Plan",
            body: "Use a three-stage strategy: respond first, explain next, then monitor. The goal is not to promise immediate buffs, but to acknowledge feedback, explain design intent, and use content operations to reduce a single negative narrative.",
            paragraphs: [
              "Within 24 hours: publish a developer note or community response acknowledging feedback around character strength and gacha cost. State that battle data is being collected, but avoid promising immediate buffs.",
              "Within 48 hours: release gameplay examples, team recommendations, and mechanic explainers through Bilibili and TapTap. Pin an FAQ to reduce repeated disputes and guide discussion toward concrete usage scenarios.",
              "Within 7 days: keep monitoring negative share, KOL amplification, and TapTap rating movement. If negativity remains high, prepare version communication, compensation activity, or a balance follow-up note.",
            ],
          },
        },
      ],
    },
    placeholder: {
      aboutTitle: "About me",
      aboutEyebrow: "Profile",
      aboutCopy: "This page will include my AI PM positioning, experience snapshot, skill map, and resume entry.",
      projectCopy: "This page will include an interactive mock demo, product problem, workflow, AI design decisions, and metrics reflection.",
      back: "Back home",
    },
    about: {
      eyebrow: "About me",
      title: "Wenjun Wang",
      role: "AI Product Manager | Agent Workflows & Business Process Automation",
      summary:
        "An AI product manager with a design background, focused on AI-driven workflow automation, agent orchestration, and AI-assisted prototyping. Currently building AI products for marketing planning, public opinion reporting, and creator marketing SaaS.",
      download: "Download CV",
      sections: {
        profile: "Profile",
        experience: "Experience",
        education: "Education",
        skills: "Skills",
      },
      profile: [
        "I start by framing ambiguous problems into goals, workflows, roles, states, and decision points, then decide where AI should take over and where human judgment must stay in the loop.",
        "Understanding the boundaries of LLMs, RAG, tool use, and AI workflows helps me let AI handle retrieval, synthesis, drafting, and first-pass screening while freeing people for judgment, trade-offs, and business decisions.",
      ],
      experience: [
        {
          company: "Shanghai Qijing Advertising Co., Ltd.",
          role: "AI Product Manager",
          period: "2025.04 - Present",
          detail:
            "Lead planning and delivery for AI products in the gaming industry, including EasyPromo, DeepInsight, and Zhongyou creator marketing SaaS.",
        },
        {
          company: "Atelier Alter Architects",
          role: "Landscape Designer",
          period: "2022.08 - 2024.08",
          detail:
            "Worked on urban landscape and spatial design projects while transitioning into product through UX, AI PM, and coding practice.",
        },
        {
          company: "Shanghai Xiji Urban Planning Consulting",
          role: "Landscape Designer",
          period: "2017.06 - 2019.06",
          detail:
            "Contributed to urban renewal and community space projects, building early experience in complex requirements and cross-functional collaboration.",
        },
      ],
      education: [
        "Coursera | IBM AI Product Manager Certificate | 2025.11 - 2026.04",
        "Coursera | Google UX Design Certificate | 2024.10 - 2024.12",
        "Politecnico di Milano | M.Sc. Landscape Design | 2019 - 2022 | QS 2026 #98 globally / #1 in Italy",
        "East China University of Science and Technology | B.A. Landscape Design | 2013 - 2017",
      ],
      skills: [
        "AI Product Management",
        "LLM Application Design",
        "AI Agent Workflows",
        "RAG Knowledge Apps",
        "Prompt Strategy",
        "AI Evaluation & Governance",
        "Cost & Quality Optimization",
        "Human-AI Collaboration",
        "Business Process Automation",
        "Data Products",
        "B2B SaaS",
      ],
    },
  },
} as const;

function App() {
  const [locale, setLocale] = React.useState<Locale>(() => {
    const savedLocale = window.localStorage.getItem("portfolio-locale");
    return savedLocale === "en" ? "en" : "zh";
  });

  React.useEffect(() => {
    window.localStorage.setItem("portfolio-locale", locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const copy = content[locale];
  const pathname = currentPath();
  const toggleLocale = () => setLocale((current) => (current === "zh" ? "en" : "zh"));

  if (pathname === "/about") {
    return (
      <AboutPage
        copy={copy}
        locale={locale}
        onToggleLocale={toggleLocale}
      />
    );
  }

  if (pathname === "/daily") {
    return <DailyBriefPage copy={copy} locale={locale} onToggleLocale={toggleLocale} />;
  }

  const project = projects.find((item) => item.href === pathname);
  if (pathname === "/projects/campaign-assistant") {
    return <AgentDemoPage copy={copy} demo={copy.campaignDemo} locale={locale} onToggleLocale={toggleLocale} tone="campaign" />;
  }

  if (pathname === "/projects/insight-report-agent") {
    return <AgentDemoPage copy={copy} demo={copy.insightDemo} locale={locale} onToggleLocale={toggleLocale} tone="insight" />;
  }

  if (pathname === "/projects/content-cms") {
    return <CmsCasePage copy={copy} locale={locale} onToggleLocale={toggleLocale} />;
  }

  if (project) {
    return (
      <PlaceholderPage
        copy={copy}
        eyebrow={project.label[locale]}
        locale={locale}
        onToggleLocale={toggleLocale}
        pageCopy={copy.placeholder.projectCopy}
        title={project.title[locale]}
      />
    );
  }

  return (
    <main className="site-shell">
      <Nav copy={copy} locale={locale} onToggleLocale={toggleLocale} />

      <section className="hero" aria-label="Portfolio homepage">
        <div className="hero-left">
          <h1>
            {copy.hero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="intro">{copy.hero.intro}</p>

          <div className="project-grid" id="projects">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                  <a className={`project-card ${project.accent}`} href={toPath(project.href)} key={project.id}>
                  <span className="card-topline">
                    <span className="icon-wrap">
                      <Icon size={16} />
                    </span>
                    <ArrowUpRight size={18} />
                  </span>
                  <span className="project-label">{project.label[locale]}</span>
                  <strong>{project.title[locale]}</strong>
                  <span className="project-description">{project.description[locale]}</span>
                  <span className="project-meta">{project.meta}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="hero-visual" id="about">
          <a className="bubble" href={toPath("/about")} aria-label={copy.hero.bubbleLabel}>
            <span>{copy.hero.more}</span>
            <ArrowUpRight size={17} />
          </a>
          <div className="portrait-stage">
            <img src={toPath("/assets/peep-22.svg")} alt="Short-haired person silhouette" />
          </div>
          <div className="profile-copy">
            {copy.hero.profileTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function AgentDemoPage({
  copy,
  demo,
  locale,
  onToggleLocale,
  tone,
}: {
  copy: (typeof content)[Locale];
  demo: AgentDemoContent;
  locale: Locale;
  onToggleLocale: () => void;
  tone: "campaign" | "insight";
}) {
  const [replayKey, setReplayKey] = React.useState(0);
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isContactOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsContactOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isContactOpen]);

  const replayConversation = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setReplayKey((current) => current + 1);
  };

  return (
    <main className={`demo-shell ${tone}-demo`}>
      <Nav copy={copy} locale={locale} onToggleLocale={onToggleLocale} />
      <section className="demo-page">
        <header className="demo-titlebar">
          <a href={toPath("/#projects")} aria-label={demo.back}>
            <ArrowLeft size={17} />
          </a>
          <div>
            <p>{demo.eyebrow}</p>
            <h1>{demo.title}</h1>
            <span>{demo.subtitle}</span>
          </div>
        </header>

        <div className="ai-chat-shell">
          <div className="ai-chat-topbar">
            <span>
              <Bot size={16} />
              {demo.title}
            </span>
            <small>Mock assistant</small>
          </div>

          <div className="ai-chat-stream" key={replayKey}>
            {demo.messages.map((message, index) => (
              <article className={`ai-chat-message ${message.role}`} key={`${message.role}-${index}`} style={{ "--message-index": index } as React.CSSProperties}>
                <div className="chat-avatar">{message.role === "user" ? "W" : <Bot size={17} />}</div>
                <div className="chat-bubble">
                  {message.role === "user" ? (
                    <p>{message.text}</p>
                  ) : (
                    <>
                      <p className="agent-route">{message.route}</p>
                      <div className="agent-task-title">
                        <Sparkles size={16} />
                        <span>{message.taskTitle}</span>
                      </div>
                      <div className="subagent-row">
                        <span>{message.subagent}</span>
                        <ArrowUpRight size={15} />
                      </div>
                      <section className="assistant-thinking">
                        <span>Thinking</span>
                        {message.thinking.map((item, thinkingIndex) => (
                          <p key={item} style={{ "--thinking-index": thinkingIndex } as React.CSSProperties}>
                            {item}
                          </p>
                        ))}
                      </section>
                      <section className="assistant-output">
                        <span>Output</span>
                        <h2>{message.output.title}</h2>
                        <p>{message.output.body}</p>
                        {"table" in message.output && (
                          <div className="agent-table" role="table" style={{ "--table-columns": message.output.table.headers.length } as React.CSSProperties}>
                            <div className="agent-table-row agent-table-head" role="row">
                              {message.output.table.headers.map((header) => (
                                <span role="columnheader" key={header}>
                                  {header}
                                </span>
                              ))}
                            </div>
                            {message.output.table.rows.map((row) => (
                              <div className="agent-table-row" role="row" key={row.join("-")}>
                                {row.map((cell) => (
                                  <span role="cell" key={cell}>
                                    {cell}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        {"paragraphs" in message.output && (
                          <div className="campaign-copy">
                            {message.output.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        )}
                        <div className="followup-chips" aria-label="Suggested follow-up questions">
                          {message.suggestions.map((suggestion) => (
                            <button type="button" key={suggestion}>
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </section>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="task-complete-bar">
            <Bot size={20} />
            <strong>{demo.completeTitle}</strong>
            <div>
              <button type="button" onClick={replayConversation}>{demo.reviewButton}</button>
              <button type="button" onClick={() => setIsContactOpen(true)}>{demo.continueButton}</button>
            </div>
          </div>
        </div>
      </section>
      {isContactOpen && <ContactModal copy={copy} onClose={() => setIsContactOpen(false)} />}
    </main>
  );
}

function AboutPage({
  copy,
  locale,
  onToggleLocale,
}: {
  copy: (typeof content)[Locale];
  locale: Locale;
  onToggleLocale: () => void;
}) {
  const isZh = locale === "zh";
  const aboutProjects = isZh
    ? [
        {
          period: "2026.03 - 至今",
          title: "EasyPromo",
          subtitle: "AI 营销策划方案自动生成平台",
          meta: "LLM / AI Agent / Workflow / 0-1",
          problem: "投标级营销策划依赖资深经验，生产周期长、质量不稳定，难以复用。",
          decision: "将策划 SOP 拆解为可编排 Agent Workflow，并从 Dify Pipeline 收敛到代码化 Orchestrator，引入分支、循环修复、Critic Agent 与人工检查点。",
          result: "方案产出从 3-5 天缩短至约 30 分钟，核心流程自动完成率超过 90%。",
        },
        {
          period: "2026.02 - 至今",
          title: "DeepInsight",
          subtitle: "游戏舆情 AI Agent 分析平台",
          meta: "LLM / RAG / 数据分析产品 / 多源数据治理",
          problem: "多平台舆情数据分散，人工报告慢；AI 报告又容易出现幻觉、错引和不可追溯。",
          decision: "将产品从“预测驱动”收敛为“数据驱动 + 可溯源洞察”，用 RAG、原声引用、数据口径约束和人工抽检建立可信边界。",
          result: "运营日报从数小时缩短至分钟级，分散反馈沉淀为可查询、可溯源、可复盘的分析系统。",
        },
        {
          period: "2025.04 - 至今",
          title: "中游网",
          subtitle: "游戏垂类达人营销平台",
          meta: "B+C 端 SaaS / 营销自动化 / 4 端联动",
          problem: "达人营销涉及品牌方、运营、达人、MCN 多角色协作，规则复杂，执行与结算链路长。",
          decision: "设计“项目 - 周期 - 任务组”三级架构，将 CPM、爆款奖励、排名奖励等激励规则抽象为可配置模块。",
          result: "上线两个月累计管理 169+ 个任务、707+ 位签约达人，内容播放量超过 3.2 亿次。",
        },
      ]
    : [
        {
          period: "2026.03 - Present",
          title: "EasyPromo",
          subtitle: "AI marketing proposal generation platform",
          meta: "LLM / AI Agent / Workflow / 0-1",
          problem: "Pitch-level marketing planning depended on senior expertise, with long cycles, unstable quality, and low reusability.",
          decision: "Converted planning SOPs into an orchestrated Agent Workflow, moving from Dify Pipeline to a code-based Orchestrator with branching, repair loops, Critic Agent, and human checkpoints.",
          result: "Reduced proposal production from 3-5 days to about 30 minutes with 90%+ core workflow automation.",
        },
        {
          period: "2026.02 - Present",
          title: "DeepInsight",
          subtitle: "Game public-opinion AI analysis platform",
          meta: "LLM / RAG / Data product / Multi-source governance",
          problem: "Public-opinion data was scattered across platforms, while AI-generated reports risked hallucination, misquotation, and weak traceability.",
          decision: "Shifted the product from prediction-led output to data-grounded, traceable insight using RAG, source quotes, data-scope constraints, and human sampling.",
          result: "Reduced daily-report production from hours to minutes and turned fragmented feedback into a traceable analysis system.",
        },
        {
          period: "2025.04 - Present",
          title: "Zhongyou",
          subtitle: "Vertical creator marketing SaaS for games",
          meta: "B+C SaaS / Marketing automation / 4-side workflow",
          problem: "Creator marketing involved brands, operations, creators, and MCNs, with complex rules and long task-settlement chains.",
          decision: "Designed a project-cycle-task-group architecture and abstracted CPM, hit-content, ranking, and incentive rewards into configurable modules.",
          result: "Managed 169+ tasks and 707+ signed creators within two months, with 320M+ accumulated views.",
        },
      ];
  const proofPoints = isZh
    ? [
        ["AI 场景识别", "从复杂 SOP 与专家经验中识别值得 AI 介入的高价值场景。"],
        ["工作流设计", "定义 Agent Workflow、人机协同边界、异常处理与质量检查点。"],
        ["质量评测", "用 rubric、LLM-as-Judge、人工抽检和 bad case 闭环提升确定性。"],
        ["快速交付", "用 Cursor、Dify 等工具将复杂逻辑验证周期压缩到天级。"],
      ]
    : [
        ["AI opportunity framing", "Identify where AI should enter complex SOPs and expert workflows."],
        ["Workflow design", "Define Agent Workflow, human-in-the-loop boundaries, exception handling, and quality checkpoints."],
        ["Quality evaluation", "Improve determinism through rubrics, LLM-as-Judge, human sampling, and bad-case loops."],
        ["Fast delivery", "Use Cursor, Dify, and prototypes to compress validation cycles from weeks to days."],
      ];
  const compactExperience = isZh
    ? [
        ["2025.04 - 至今", "上海启竞广告有限公司", "AI 产品经理"],
        ["2022.08 - 2024.08", "And Studio 建筑设计有限公司", "景观设计师"],
        ["2017.07 - 2019.07", "上海熙济设计咨询有限公司", "城市设计师"],
      ]
    : [
        ["2025.04 - Present", "Shanghai Qijing Advertising Co., Ltd.", "AI Product Manager"],
        ["2022.08 - 2024.08", "And Studio", "Landscape Designer"],
        ["2017.07 - 2019.07", "Shanghai Xiji Design Consulting", "Urban Designer"],
      ];

  return (
    <main className="about-shell">
      <Nav copy={copy} locale={locale} onToggleLocale={onToggleLocale} />
      <article className="about-page">
        <header className="about-hero">
          <p className="eyebrow">
            <Sparkles size={16} />
            {copy.about.eyebrow}
          </p>
          <h1>{copy.about.title}</h1>
          <p className="about-role">{isZh ? "AI 产品经理 | LLM / AI Agent / RAG / AI 工作流 / B 端 SaaS" : "AI Product Manager | LLM / AI Agent / RAG / AI Workflows / B2B SaaS"}</p>
          <p className="about-summary">
            {isZh
              ? "我把模糊的 AI 机会，转化为可评测、可交付的产品系统。"
              : "I turn ambiguous AI opportunities into evaluable, deliverable product systems."}
          </p>
          <div className="about-contact-line">
            <span>Shanghai</span>
            <span>{copy.contact.emailValue}</span>
            <span>{copy.contact.wechatValue}</span>
          </div>
          <a className="cv-button" href={toPath("/assets/王文君-产品经理-18721378389.pdf")} download>
            <Download size={17} />
            {copy.about.download}
          </a>
        </header>

        <section className="about-proof-grid" aria-label={isZh ? "能力证据" : "Proof points"}>
          {proofPoints.map(([title, body]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <section className="about-projects">
          <div className="about-section-head">
            <p>{isZh ? "Projects" : "Projects"}</p>
            <h2>{isZh ? "问题、判断与结果。" : "Problem, decision, outcome."}</h2>
          </div>
          <div className="about-project-timeline">
            {aboutProjects.map((project) => (
              <article key={project.title}>
                <time>{project.period}</time>
                <div>
                  <span>{project.meta}</span>
                  <h3>{project.title}</h3>
                  <strong>{project.subtitle}</strong>
                  <dl>
                    <div>
                      <dt>{isZh ? "问题" : "Problem"}</dt>
                      <dd>{project.problem}</dd>
                    </div>
                    <div>
                      <dt>{isZh ? "判断" : "Decision"}</dt>
                      <dd>{project.decision}</dd>
                    </div>
                    <div>
                      <dt>{isZh ? "结果" : "Outcome"}</dt>
                      <dd>{project.result}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-text-section">
          <div>
            <p>{isZh ? "Approach" : "Approach"}</p>
            {(isZh
              ? [
                  "习惯先搭建问题框架，将复杂需求拆成目标、流程、角色、状态和关键决策点，再判断哪些环节适合交给 AI，哪些必须保留人的判断。",
                  "理解 LLM、RAG、工具调用与 AI 工作流的能力边界，因此更关注让 AI 承担检索、整理、生成、初筛等高频重复任务，把人的精力释放到判断、取舍、决策和业务负责上。",
                ]
              : copy.about.profile).map((item) => (
                <span key={item}>{item}</span>
              ))}
          </div>
        </section>

        <section className="about-compact-grid">
          <section>
            <div className="about-section-head">
              <p>{copy.about.sections.experience}</p>
              <h2>{isZh ? "工作经历。" : "Experience."}</h2>
            </div>
            <div className="compact-timeline">
              {compactExperience.map(([period, company, role]) => (
                <article key={`${company}-${period}`}>
                  <time>{period}</time>
                  <div>
                    <h3>{role}</h3>
                    <p>{company}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="about-section-head">
              <p>{copy.about.sections.education}</p>
              <h2>{isZh ? "海外设计背景。" : "International design background."}</h2>
            </div>
            <ul className="simple-list">
              {copy.about.education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="about-skills-block">
            <div className="about-section-head">
              <p>{copy.about.sections.skills}</p>
              <h2>{isZh ? "关键词。" : "Keywords."}</h2>
            </div>
            <div className="skill-cloud">
              {(isZh
                ? [
                    "AI 产品经理",
                    "LLM 应用设计",
                    "AI Agent 工作流",
                    "RAG 知识应用",
                    "Prompt 策略",
                    "AI 评估与治理",
                    "成本与质量优化",
                    "人机协同",
                    "业务流程自动化",
                    "数据产品",
                    "B 端 SaaS",
                  ]
                : copy.about.skills).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>
        </section>
      </article>
    </main>
  );
}

function DailyBriefPage({
  copy,
  locale,
  onToggleLocale,
}: {
  copy: (typeof content)[Locale];
  locale: Locale;
  onToggleLocale: () => void;
}) {
  const [selectedDate, setSelectedDate] = React.useState(DAILY_BRIEFS[0].date);
  const [favorites, setFavorites] = React.useState<GithubFavorite[]>(() =>
    safeReadJson<GithubFavorite[]>(githubFavoritesStorageKey, []),
  );
  const [isOwnerMode, setIsOwnerMode] = React.useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("owner") === "1" || window.localStorage.getItem(ownerModeStorageKey) === "true";
  });
  const selectedBrief =
    DAILY_BRIEFS.find((brief) => brief.date === selectedDate) ?? DAILY_BRIEFS[0];
  const isZh = locale === "zh";
  const favoriteKeys = React.useMemo(
    () => new Set(favorites.map((favorite) => favorite.url)),
    [favorites],
  );
  const favoriteSignals = React.useMemo(
    () => favorites.map((favorite) => favoriteToSignal(favorite)),
    [favorites],
  );

  React.useEffect(() => {
    window.localStorage.setItem(githubFavoritesStorageKey, JSON.stringify(favorites));
  }, [favorites]);

  React.useEffect(() => {
    window.localStorage.setItem(ownerModeStorageKey, String(isOwnerMode));
  }, [isOwnerMode]);

  const toggleFavorite = React.useCallback(
    (signal: DailySignal) => {
      const url = getGithubSignalKey(signal);
      setFavorites((current) => {
        if (current.some((favorite) => favorite.url === url)) {
          return current.filter((favorite) => favorite.url !== url);
        }

        return [
          {
            repoName: signal.title.en,
            url,
            language: signal.language,
            totalStars: signal.totalStars,
            dailyStars: signal.dailyStars,
            chineseIntro: signal.chineseIntro?.zh ?? signal.summary.zh,
            todayHighlight: signal.todayHighlight?.zh,
            savedAt: selectedBrief.date,
            lastSeenDate: selectedBrief.date,
          },
          ...current,
        ];
      });
    },
    [selectedBrief.date],
  );

  return (
    <main className="daily-shell">
      <Nav copy={copy} locale={locale} onToggleLocale={onToggleLocale} />
      <article className="daily-page">
        <header className="daily-hero">
          <p className="eyebrow">
            <Sparkles size={16} />
            {isZh ? "AI Product Daily" : "AI Product Daily"}
          </p>
          <h1>{isZh ? "每日 AI 产品雷达。" : "Daily AI Product Radar."}</h1>
          <p className="daily-summary">
            {isZh
              ? "给关注前沿信息的产品经理看的 AI 日报：不只做新闻摘要，也保留来源、产品判断和可验证机会点。"
              : "An AI daily brief for product managers: not only summaries, but also sources, product judgment, and verifiable opportunity signals."}
          </p>
          <div className="daily-meta-row">
            <span>
              <CalendarDays size={15} />
              {isZh ? "每日自动更新预留" : "Daily automation ready"}
            </span>
            <span>
              <Link2 size={15} />
              {isZh ? "每条信息可溯源" : "Source links included"}
            </span>
            {isOwnerMode ? (
              <button type="button" className="owner-mode-chip" onClick={() => setIsOwnerMode(false)}>
                {isZh ? "收藏模式已开启" : "Favorites mode on"}
              </button>
            ) : null}
          </div>
        </header>

        <section className="daily-layout">
          <aside className="daily-history" aria-label={isZh ? "往期日报" : "Brief history"}>
            <div className="daily-section-head">
              <p>{isZh ? "History" : "History"}</p>
              <h2>{isZh ? "往期日报" : "Past briefs"}</h2>
            </div>
            <div className="history-list">
              {DAILY_BRIEFS.map((brief) => (
                <button
                  type="button"
                  className={brief.date === selectedBrief.date ? "active" : ""}
                  key={brief.date}
                  onClick={() => setSelectedDate(brief.date)}
                >
                  <span>{brief.label[locale]}</span>
                  <strong>{brief.date}</strong>
                  <small>{brief.title[locale]}</small>
                </button>
              ))}
            </div>
            <p className="history-note">
              {isZh
                ? "正式接入后，每天生成一个独立快照，历史判断不会被新数据覆盖。"
                : "After automation, each day can be stored as an independent snapshot so past judgment is not overwritten."}
            </p>
          </aside>

          <div className="daily-content">
            <DailyBriefOverview brief={selectedBrief} locale={locale} />
            <DailySignalSection
              icon="signal"
              title={isZh ? "今日最重要信号" : "Key signals"}
              signals={selectedBrief.signals}
              locale={locale}
            />
            {isOwnerMode && favoriteSignals.length > 0 ? (
              <DailySignalSection
                icon="github"
                title={isZh ? "我的 GitHub 收藏" : "My GitHub favorites"}
                signals={favoriteSignals}
                locale={locale}
                ownerMode={false}
              />
            ) : null}
            <DailySignalSection
              icon="github"
              title={isZh ? "GitHub 上升项目" : "GitHub rising projects"}
              signals={selectedBrief.githubProjects}
              locale={locale}
              ownerMode={isOwnerMode}
              favoriteKeys={favoriteKeys}
              onToggleFavorite={toggleFavorite}
            />
            <DailySignalSection
              icon="company"
              title={isZh ? "大公司动态" : "Company updates"}
              signals={selectedBrief.companyUpdates}
              locale={locale}
            />
            <DailySignalSection
              icon="opportunity"
              title={isZh ? "产品机会与验证假设" : "Product opportunities"}
              signals={selectedBrief.opportunities}
              locale={locale}
            />
          </div>
        </section>
      </article>
    </main>
  );
}

function DailyBriefOverview({ brief, locale }: { brief: DailyBrief; locale: Locale }) {
  const isZh = locale === "zh";

  return (
    <section className="daily-overview">
      <div>
        <p>{brief.date}</p>
        <h2>{brief.title[locale]}</h2>
        <span>{brief.editorNote[locale]}</span>
      </div>
      <aside>
        <strong>{isZh ? "今日判断" : "Takeaway"}</strong>
        <p>{brief.keyTakeaway[locale]}</p>
      </aside>
    </section>
  );
}

function DailySignalSection({
  icon,
  title,
  signals,
  locale,
  ownerMode = false,
  favoriteKeys,
  onToggleFavorite,
}: {
  icon: "signal" | "github" | "company" | "opportunity";
  title: string;
  signals: DailySignal[];
  locale: Locale;
  ownerMode?: boolean;
  favoriteKeys?: Set<string>;
  onToggleFavorite?: (signal: DailySignal) => void;
}) {
  const Icon =
    icon === "github"
      ? Github
      : icon === "company"
        ? Building2
        : icon === "opportunity"
          ? Sparkles
          : Newspaper;

  return (
    <section className="daily-signal-section">
      <div className="daily-section-head">
        <p>
          <Icon size={15} />
          {title}
        </p>
        <h2>{title}</h2>
      </div>
      <div className="daily-card-grid">
        {signals.map((signal) => (
          <DailySignalCard
            key={`${signal.title.en}-${signal.category.en}`}
            signal={signal}
            locale={locale}
            ownerMode={ownerMode}
            isFavorited={favoriteKeys?.has(getGithubSignalKey(signal)) ?? false}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

function DailyLabeledLine({
  label,
  text,
}: {
  label: string;
  text?: string | null;
}) {
  if (!text) return null;
  return (
    <p className="daily-line">
      <strong>{label}</strong>
      {text}
    </p>
  );
}

function DailySignalCard({
  signal,
  locale,
  ownerMode = false,
  isFavorited = false,
  onToggleFavorite,
}: {
  signal: DailySignal;
  locale: Locale;
  ownerMode?: boolean;
  isFavorited?: boolean;
  onToggleFavorite?: (signal: DailySignal) => void;
}) {
  const isZh = locale === "zh";
  const isGithub = typeof signal.totalStars === "number";
  const categoryLabel = signal.eventType?.[locale] ?? signal.category[locale];
  const introText = isZh
    ? signal.chineseIntro?.zh ?? (isGithub ? signal.summary.zh : null)
    : signal.chineseIntro?.en ?? signal.summary.en;
  const highlightText = signal.todayHighlight?.[locale];
  const showSummaryBody = !introText && !isGithub;

  return (
    <article className="daily-signal-card">
      <div className="signal-card-top">
        <span>{categoryLabel}</span>
        <div className="signal-card-actions">
          {ownerMode && isGithub && onToggleFavorite ? (
            <button
              type="button"
              className={`favorite-toggle ${isFavorited ? "active" : ""}`}
              onClick={() => onToggleFavorite(signal)}
              aria-pressed={isFavorited}
            >
              {isFavorited ? (isZh ? "已收藏" : "Saved") : (isZh ? "收藏" : "Save")}
            </button>
          ) : null}
          <strong className={`impact-badge ${signal.impact.toLowerCase()}`}>{signal.impact}</strong>
        </div>
      </div>
      <h3>{signal.title[locale]}</h3>
      {isGithub ? (
        <p className="daily-meta">
          ☆
          {typeof signal.totalStars === "number" ? signal.totalStars.toLocaleString("en-US") : "—"} ·{" "}
          {signal.language ?? "Unknown"}
          {typeof signal.dailyStars === "number"
            ? ` · /今日新增 +${signal.dailyStars.toLocaleString("en-US")}`
            : ""}
        </p>
      ) : null}
      {showSummaryBody ? <p>{signal.summary[locale]}</p> : null}
      <DailyLabeledLine label={isZh ? "中文简介" : "Summary"} text={introText} />
      <DailyLabeledLine label={isZh ? "今日亮点" : "Highlight"} text={highlightText} />
      <DailyLabeledLine label={isZh ? "PM 视角" : "PM lens"} text={signal.pmInsight[locale]} />
      <div className="source-list" aria-label={isZh ? "来源链接" : "Source links"}>
        {signal.sources.map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
            {source.label}
            <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
    </article>
  );
}

function CmsCasePage({
  copy,
  locale,
  onToggleLocale,
}: {
  copy: (typeof content)[Locale];
  locale: Locale;
  onToggleLocale: () => void;
}) {
  const [adminTab, setAdminTab] = React.useState<"works" | "photo" | "story">("works");
  const isZh = locale === "zh";

  return (
    <main className="cms-shell">
      <Nav copy={copy} locale={locale} onToggleLocale={onToggleLocale} />
      <article className="cms-article">
        <a href={toPath("/#projects")} className="cms-back">
          <ArrowLeft size={17} />
          {isZh ? "返回项目" : "Back to projects"}
        </a>

        <header className="cms-article-hero">
          <p className="cms-eyebrow">Content CMS / Client Website</p>
          <h1>Wangshuo Design CMS</h1>
          <p>
            {isZh
              ? "为设计师客户搭建的作品展示网站与轻量 CMS，用于管理作品、摄影相册和日记文章。"
              : "A client website and lightweight CMS for managing works, photography albums, and story posts."}
          </p>
          <div className="cms-inline-notes">
            <span>{isZh ? "角色：产品设计 / 原型" : "Role: Product design / Prototype"}</span>
            <span>{isZh ? "内容：Works / Photography / Story" : "Content: Works / Photography / Story"}</span>
            <span>{isZh ? "重点：前后台联动" : "Focus: Website-admin linkage"}</span>
          </div>
        </header>

        <section className="cms-prototype-block">
          <div className="cms-prototype-copy">
            <p className="cms-section-kicker">{isZh ? "前台网站 Mock" : "Website Mock"}</p>
            <h2>{isZh ? "极简作品展示。" : "Minimal public showcase."}</h2>
            <div className="prototype-actions">
              <p className="prototype-hint">{isZh ? "可点击：分类筛选、作品封面" : "Clickable: category filters and work covers"}</p>
              <a href="https://wangshuo.design/" target="_blank" rel="noreferrer">
                {isZh ? "查看真实网站" : "View live site"}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <CmsWebsitePreview isZh={isZh} />
        </section>

        <section className="cms-prototype-block">
          <div className="cms-prototype-copy">
            <p className="cms-section-kicker">{isZh ? "后台管理 Mock" : "Admin Mock"}</p>
            <h2>{isZh ? "内容维护后台。" : "Content operations admin."}</h2>
            <p className="prototype-hint">{isZh ? "可点击：左侧作品 / 摄影 / 日记导航" : "Clickable: Works / Photography / Story in the sidebar"}</p>
          </div>
          <CmsAdminPreview isZh={isZh} adminTab={adminTab} onTabChange={setAdminTab} />
        </section>
      </article>
    </main>
  );
}

function CmsWebsitePreview({ isZh }: { isZh: boolean }) {
  const categories = ["All", "Graphic", "Book", "Artwork"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedWork, setSelectedWork] = React.useState<(typeof cmsWorks)[number]>(cmsWorks[0]);
  const filteredWorks = selectedCategory === "All" ? cmsWorks : cmsWorks.filter((work) => work.category === selectedCategory);

  return (
    <section className="cms-website-frame">
      <nav className="client-site-nav">
        <strong>Wangshuo Design</strong>
        <div>
          <a>Works</a>
          <a>Photography</a>
          <a>Story</a>
          <a>About</a>
        </div>
        <button type="button">Contact</button>
      </nav>
      <div className="client-site-hero">
        <h2>{isZh ? "作品网站前台" : "Public Website"}</h2>
        <p>{isZh ? "用极简留白承托作品本身，分类筛选和图文详情由后台内容自动驱动。" : "A minimal public website where filters and detail pages are driven by CMS content."}</p>
      </div>
      <div className="site-filter-row" aria-label="Work categories">
        {categories.map((category) => (
          <button type="button" className={selectedCategory === category ? "active" : ""} key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="site-work-grid">
        {filteredWorks.map((work) => (
          <button type="button" className={`site-work-card ${selectedWork.slug === work.slug ? "active" : ""}`} key={work.slug} onClick={() => setSelectedWork(work)}>
            <MockArtwork tone={work.color} />
            <span>{work.category}</span>
            <h3>{work.title[isZh ? "zh" : "en"]}</h3>
          </button>
        ))}
      </div>
      <aside className="site-work-preview">
        <MockArtwork tone={selectedWork.color} />
        <div>
          <span>{selectedWork.category} / {selectedWork.images} {isZh ? "张图" : "images"}</span>
          <h3>{selectedWork.title[isZh ? "zh" : "en"]}</h3>
          <p>{isZh ? "点击作品后展示由 CMS 字段生成的详情摘要：封面、分类、图片数量、说明和更新时间。" : "Clicking a work shows a CMS-driven detail summary: cover, category, image count, description, and update date."}</p>
        </div>
      </aside>
      <section className="site-story-preview">
        <h2>Story</h2>
        {[
          ["2026.03", isZh ? "黄金般的暂停、空档、中场休息" : "A golden pause between scenes"],
          ["2025.12", isZh ? "在公园吹萨克斯的人" : "The person playing saxophone in the park"],
          ["2025.09", isZh ? "我有好多储物柜，存放不同规格的故事" : "Many lockers for stories in different sizes"],
        ].map(([date, title]) => (
          <article key={date}>
            <time>{date}</time>
            <div>
              <h3>{title}</h3>
              <p>{isZh ? "这里展示由后台日记模块发布的文章摘要，保持轻量、克制的阅读体验。" : "A quiet story excerpt published through the CMS story module."}</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}

function CmsAdminPreview({
  isZh,
  adminTab,
  onTabChange,
}: {
  isZh: boolean;
  adminTab: "works" | "photo" | "story";
  onTabChange: (tab: "works" | "photo" | "story") => void;
}) {
  const navItems = [
    { id: "overview", label: isZh ? "概览" : "Overview", icon: LayoutDashboard },
    { id: "works", label: isZh ? "作品" : "Works", icon: ImageIcon },
    { id: "photo", label: isZh ? "摄影" : "Photography", icon: Camera },
    { id: "story", label: isZh ? "日记" : "Story", icon: FileText },
    { id: "settings", label: isZh ? "系统设置" : "Settings", icon: Settings },
  ] as const;

  return (
    <section className="cms-admin-frame">
      <aside className="cms-admin-sidebar">
        <strong>wangshuo.design</strong>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === adminTab;
            return (
              <button
                type="button"
                key={item.id}
                className={isActive ? "active" : ""}
                onClick={() => {
                  if (item.id === "works" || item.id === "photo" || item.id === "story") onTabChange(item.id);
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <div className="cms-admin-main">
        <header className="admin-page-head">
          <div>
            <p>
              {adminTab === "works"
                ? isZh ? "首页展示的平面作品，可通过标签筛选。" : "Works shown on the homepage, filterable by tags."
                : adminTab === "photo"
                  ? isZh ? "成组摄影作品，前台按相册横向展示。" : "Photo albums displayed horizontally on the public site."
                  : isZh ? "日记文章，前台按时间线展示。" : "Story posts displayed as a public timeline."}
            </p>
            <h2>{adminTab === "works" ? (isZh ? "作品" : "Works") : adminTab === "photo" ? (isZh ? "摄影" : "Photography") : (isZh ? "日记" : "Story")}</h2>
          </div>
          <div>
            <button type="button" className="admin-ghost">
              {isZh ? "查看前台" : "View site"}
              <ArrowUpRight size={15} />
            </button>
            <button type="button" className="admin-primary">
              <Plus size={16} />
              {adminTab === "photo" ? (isZh ? "新增相册" : "New album") : isZh ? "新增作品" : "New item"}
            </button>
          </div>
        </header>

        {adminTab === "works" && <CmsWorksAdmin isZh={isZh} />}
        {adminTab === "photo" && <CmsPhotoAdmin isZh={isZh} />}
        {adminTab === "story" && <CmsStoryAdmin isZh={isZh} />}
      </div>
    </section>
  );
}

function CmsWorksAdmin({ isZh }: { isZh: boolean }) {
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);

  return (
    <>
      <div className="admin-stats">
        <article><span>{isZh ? "总数" : "Total"}</span><strong>176</strong></article>
        <article><span>{isZh ? "已发布" : "Published"}</span><strong>174</strong></article>
        <article><span>{isZh ? "草稿" : "Drafts"}</span><strong>2</strong></article>
      </div>
      <div className="admin-list-card">
        <div className="admin-search">
          <Search size={17} />
          <span>{isZh ? "点击作品进入编辑，可修改说明、标签、发布状态和排序。" : "Click an item to edit description, tags, status, and ordering."}</span>
        </div>
        {cmsWorks.map((work, index) => (
          <article className="admin-work-row" key={work.slug}>
            <MockArtwork tone={work.color} />
            <div>
              <h3>{work.title[isZh ? "zh" : "en"]}<span>{isZh ? "已发布" : "Published"}</span></h3>
              <p>{work.slug}</p>
              <small>{work.category}</small>
            </div>
            <span>{work.images} {isZh ? "张图" : "images"}</span>
            <time>{work.date}</time>
            {index === 0 && <button type="button" onClick={() => setIsEditorOpen(true)}>{isZh ? "编辑" : "Edit"}</button>}
          </article>
        ))}
      </div>
      {isEditorOpen && (
        <div className="admin-modal-backdrop" role="presentation" onMouseDown={() => setIsEditorOpen(false)}>
          <section className="admin-edit-modal" role="dialog" aria-modal="true" aria-label={isZh ? "编辑作品" : "Edit work"} onMouseDown={(event) => event.stopPropagation()}>
            <button className="admin-modal-close" type="button" aria-label={isZh ? "关闭" : "Close"} onClick={() => setIsEditorOpen(false)}>
              <X size={16} />
            </button>
            <div>
              <PenLine size={17} />
              <strong>{isZh ? "编辑作品" : "Edit work"}</strong>
            </div>
            <label>{isZh ? "标题" : "Title"}<input value={isZh ? "季候风画集" : "Monsoon Sketchbook"} readOnly /></label>
            <label>{isZh ? "分类" : "Category"}<input value="Book" readOnly /></label>
            <label>{isZh ? "展示标签" : "Display tags"}<input value="Book, Calligraphy, 2025" readOnly /></label>
            <label>{isZh ? "前台说明" : "Public description"}<textarea value={isZh ? "一组关于季风、文字和个人记忆的平面作品。" : "A graphic series about monsoon, typography, and personal memory."} readOnly /></label>
            <div className="drawer-actions">
              <button type="button" onClick={() => setIsEditorOpen(false)}>{isZh ? "预览" : "Preview"}</button>
              <button type="button" onClick={() => setIsEditorOpen(false)}>{isZh ? "保存" : "Save"}</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function CmsPhotoAdmin({ isZh }: { isZh: boolean }) {
  return (
    <div className="admin-photo-grid">
      {cmsPhotos.map((photo) => (
        <article className="admin-photo-card" key={photo.date}>
          <MockArtwork tone={photo.color} />
          <h3>{photo.title}<span>{isZh ? "已发布" : "Published"}</span></h3>
          <p>{photo.images} {isZh ? "张图" : "images"} · {photo.date}</p>
        </article>
      ))}
    </div>
  );
}

function CmsStoryAdmin({ isZh }: { isZh: boolean }) {
  const stories = [
    ["2026.03", isZh ? "黄金般的暂停、空档、中场休息" : "A golden pause between scenes"],
    ["2025.12", isZh ? "在公园吹萨克斯的人" : "The person playing saxophone in the park"],
    ["2025.09", isZh ? "我有好多储物柜，存放不同规格的故事" : "Many lockers for stories in different sizes"],
  ];

  return (
    <div className="admin-story-list">
      {stories.map(([date, title]) => (
        <article key={date}>
          <time>{date}</time>
          <div>
            <h3>{title}<span>{isZh ? "已发布" : "Published"}</span></h3>
            <p>{isZh ? "文章摘要会同步到前台 Story 时间线，正文保留长文阅读空间。" : "Excerpt appears in the public Story timeline while the full post keeps a quiet reading layout."}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function MockArtwork({ tone }: { tone: string }) {
  return (
    <div className={`mock-art ${tone}`} aria-hidden="true">
      <span />
      <i />
      <b />
    </div>
  );
}

function Nav({
  copy,
  locale,
  onToggleLocale,
}: {
  copy: (typeof content)[Locale];
  locale: Locale;
  onToggleLocale: () => void;
}) {
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isContactOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsContactOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isContactOpen]);

  return (
    <>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href={toPath("/")} aria-label="AI PM Portfolio home">
          <span className="brand-mark">W</span>
        </a>

      <div className="nav-links">
        <a href={toPath("/")}>{copy.nav.home}</a>
        <a href={toPath("/about")}>{copy.nav.about}</a>
        <a href={toPath("/daily")}>{copy.nav.daily}</a>
      </div>

        <div className="nav-actions">
          <button className="lang-button" type="button" aria-label="Switch language" onClick={onToggleLocale}>
            <span>{localeLabels[locale]}</span>
          </button>
          <button className="contact-button" type="button" onClick={() => setIsContactOpen(true)}>
            <Mail size={16} />
            <span>{copy.nav.contact}</span>
          </button>
        </div>
      </nav>

      {isContactOpen && <ContactModal copy={copy} onClose={() => setIsContactOpen(false)} />}
    </>
  );
}

function ContactModal({ copy, onClose }: { copy: (typeof content)[Locale]; onClose: () => void }) {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const copyToClipboard = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1600);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" aria-label={copy.contact.close} onClick={onClose}>
          <X size={18} />
        </button>
        <p className="modal-eyebrow">{copy.nav.contact}</p>
        <h2 id="contact-modal-title">{copy.contact.title}</h2>
        <p className="modal-subtitle">{copy.contact.subtitle}</p>
        <div className="contact-list">
          <div>
            <span>{copy.contact.wechat}</span>
            <strong>{copy.contact.wechatValue}</strong>
            <button type="button" onClick={() => copyToClipboard("wechat", copy.contact.wechatValue)}>
              {copiedKey === "wechat" ? copy.contact.copied : copy.contact.copy}
            </button>
          </div>
          <div>
            <span>{copy.contact.email}</span>
            <a href={`mailto:${copy.contact.emailValue}`}>{copy.contact.emailValue}</a>
            <button type="button" onClick={() => copyToClipboard("email", copy.contact.emailValue)}>
              {copiedKey === "email" ? copy.contact.copied : copy.contact.copy}
            </button>
          </div>
          <div>
            <span>{copy.contact.phone}</span>
            <a href={`tel:${copy.contact.phoneValue.replace(/\s+/g, "")}`}>{copy.contact.phoneValue}</a>
            <button type="button" onClick={() => copyToClipboard("phone", copy.contact.phoneValue)}>
              {copiedKey === "phone" ? copy.contact.copied : copy.contact.copy}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function PlaceholderPage({
  title,
  eyebrow,
  pageCopy,
  copy,
  locale,
  onToggleLocale,
}: {
  title: string;
  eyebrow: string;
  pageCopy: string;
  copy: (typeof content)[Locale];
  locale: Locale;
  onToggleLocale: () => void;
}) {
  return (
    <main className="placeholder-shell">
      <Nav copy={copy} locale={locale} onToggleLocale={onToggleLocale} />
      <section className="placeholder-panel">
        <p className="eyebrow">
          <Sparkles size={16} />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <p className="intro">{pageCopy}</p>
        <a className="back-link" href={toPath("/")}>
          {copy.placeholder.back}
          <ArrowUpRight size={17} />
        </a>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
