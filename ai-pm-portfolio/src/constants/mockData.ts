export type LocalizedText = {
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

export const MOCK_DAILY_BRIEFS: DailyBrief[] = [
  {
    date: "2026-06-04",
    label: {
      zh: "今日",
      en: "Today",
    },
    title: {
      zh: "Agent 产品正在从演示走向可交付工作流",
      en: "Agent products are moving from demos to deliverable workflows",
    },
    editorNote: {
      zh: "这是一个面向 AI 产品经理的日报样例页。当前数据为可替换 mock，后续可由 GitHub Actions 每天自动生成。",
      en: "This is a sample daily brief for AI product managers. The current data is replaceable mock content and can be generated daily by GitHub Actions later.",
    },
    keyTakeaway: {
      zh: "今天更值得关注的不是单点模型能力，而是 AI 如何进入真实任务链路：浏览器操作、代码代理、企业知识检索都在补齐权限、可追溯和人工确认环节。",
      en: "The important shift is not a single model capability, but how AI enters real task flows: browser operation, coding agents, and enterprise search are adding permission, traceability, and human review layers.",
    },
    signals: [
      {
        title: {
          zh: "浏览器操作型 Agent 持续升温",
          en: "Browser-operating agents keep gaining attention",
        },
        category: {
          zh: "交互范式",
          en: "Interaction pattern",
        },
        summary: {
          zh: "一批开源项目开始把 AI 从“回答问题”推进到“操作网页完成任务”，例如登录后检索、表单填写和跨站执行。",
          en: "A group of open-source projects are moving AI from answering questions to operating web pages, including authenticated search, form filling, and cross-site execution.",
        },
        pmInsight: {
          zh: "产品设计重点会从聊天框转向任务状态、权限确认、失败恢复和可解释回放。适合关注企业效率工具、运营工具和销售自动化场景。",
          en: "Product design focus shifts from chat UI to task state, permission checks, recovery, and explainable replay. This is relevant for productivity, operations, and sales automation products.",
        },
        impact: "High",
        sources: [
          {
            label: "browser-use GitHub",
            url: "https://github.com/browser-use/browser-use",
          },
          {
            label: "OpenAI Agents",
            url: "https://platform.openai.com/docs/agents",
          },
        ],
      },
      {
        title: {
          zh: "AI Coding 工具从补全走向任务代理",
          en: "AI coding tools are shifting from completion to task agents",
        },
        category: {
          zh: "AI Coding",
          en: "AI Coding",
        },
        summary: {
          zh: "代码助手越来越强调跨文件修改、测试验证、PR 处理和 CI 修复，而不是只做单次代码生成。",
          en: "Coding assistants increasingly emphasize cross-file edits, test verification, PR handling, and CI fixes instead of one-off code generation.",
        },
        pmInsight: {
          zh: "这说明 AI 产品的价值指标会从“生成速度”转向“闭环完成率”。如果做 B 端工具，需要把验证、回滚和审阅体验设计为核心能力。",
          en: "This suggests AI product value metrics move from generation speed to completion rate. For B2B tools, verification, rollback, and review UX should become core capabilities.",
        },
        impact: "High",
        sources: [
          {
            label: "GitHub Copilot",
            url: "https://github.blog/tag/github-copilot/",
          },
          {
            label: "Cursor",
            url: "https://www.cursor.com/changelog",
          },
        ],
      },
    ],
    githubProjects: [
      {
        title: {
          zh: "microsoft/autogen",
          en: "microsoft/autogen",
        },
        category: {
          zh: "多 Agent 框架",
          en: "Multi-agent framework",
        },
        summary: {
          zh: "适合观察多智能体协作、工具调用和企业任务编排的工程化路径。",
          en: "A useful signal for multi-agent collaboration, tool use, and enterprise task orchestration.",
        },
        pmInsight: {
          zh: "PM 可重点看它如何定义角色、消息、工具和评估接口，这些会影响 Agent 产品的信息架构。",
          en: "PMs can study how it defines roles, messages, tools, and evaluation interfaces because these shape agent product information architecture.",
        },
        impact: "Medium",
        sources: [
          {
            label: "GitHub Repository",
            url: "https://github.com/microsoft/autogen",
          },
        ],
      },
      {
        title: {
          zh: "huggingface/smolagents",
          en: "huggingface/smolagents",
        },
        category: {
          zh: "轻量 Agent",
          en: "Lightweight agents",
        },
        summary: {
          zh: "轻量化 Agent 框架让开发者更容易用少量代码验证任务型 AI 产品原型。",
          en: "A lightweight agent framework lowers the cost of prototyping task-oriented AI products.",
        },
        pmInsight: {
          zh: "适合做早期原型验证：先证明任务链路有效，再决定是否需要复杂平台能力。",
          en: "Useful for early prototyping: prove the task flow first, then decide whether complex platform capabilities are needed.",
        },
        impact: "Watch",
        sources: [
          {
            label: "GitHub Repository",
            url: "https://github.com/huggingface/smolagents",
          },
        ],
      },
    ],
    companyUpdates: [
      {
        title: {
          zh: "OpenAI 平台能力继续向 Agent 基础设施靠拢",
          en: "OpenAI platform capabilities keep moving toward agent infrastructure",
        },
        category: {
          zh: "平台策略",
          en: "Platform strategy",
        },
        summary: {
          zh: "官方文档和产品能力持续强调工具调用、文件检索、任务执行与可控输出。",
          en: "Official docs and product capabilities continue to emphasize tool use, file search, task execution, and controllable output.",
        },
        pmInsight: {
          zh: "对产品经理来说，机会在于把通用能力包装成行业 SOP，而不是只接一个聊天 API。",
          en: "For product managers, the opportunity is packaging general capabilities into industry SOPs instead of only connecting a chat API.",
        },
        impact: "High",
        sources: [
          {
            label: "OpenAI Docs",
            url: "https://platform.openai.com/docs",
          },
          {
            label: "OpenAI News",
            url: "https://openai.com/news/",
          },
        ],
      },
      {
        title: {
          zh: "Anthropic 持续强化企业安全与可控性叙事",
          en: "Anthropic keeps emphasizing enterprise safety and controllability",
        },
        category: {
          zh: "企业 AI",
          en: "Enterprise AI",
        },
        summary: {
          zh: "Claude 生态的官方内容长期围绕安全、可解释、企业部署和 Computer Use 等方向展开。",
          en: "Claude ecosystem content has consistently focused on safety, explainability, enterprise deployment, and computer use.",
        },
        pmInsight: {
          zh: "如果面向企业用户，AI 功能卖点需要从“聪明”转向“可控、可审计、可接入现有流程”。",
          en: "For enterprise users, AI positioning needs to move from smartness to controllability, auditability, and integration with existing workflows.",
        },
        impact: "Medium",
        sources: [
          {
            label: "Anthropic News",
            url: "https://www.anthropic.com/news",
          },
          {
            label: "Claude Docs",
            url: "https://docs.anthropic.com/",
          },
        ],
      },
    ],
    opportunities: [
      {
        title: {
          zh: "机会：可溯源 AI 日报本身可以产品化",
          en: "Opportunity: traceable AI daily briefs can become a product",
        },
        category: {
          zh: "产品机会",
          en: "Product opportunity",
        },
        summary: {
          zh: "相比新闻聚合，产品经理更需要“事实、判断、来源、下一步动作”四件套。",
          en: "Compared with news aggregation, PMs need four things: facts, interpretation, sources, and next actions.",
        },
        pmInsight: {
          zh: "第一版可先验证：每天 5 分钟读完、每条都能回到原文、每周沉淀 1-2 个产品机会假设。",
          en: "The first version can validate whether users can finish it in five minutes, trace every item back to the source, and capture one or two product hypotheses weekly.",
        },
        impact: "Medium",
        sources: [
          {
            label: "GitHub Trending",
            url: "https://github.com/trending",
          },
          {
            label: "Hugging Face Blog",
            url: "https://huggingface.co/blog",
          },
        ],
      },
    ],
  },
  {
    date: "2026-06-03",
    label: {
      zh: "昨天",
      en: "Yesterday",
    },
    title: {
      zh: "开源模型生态继续向低成本部署扩散",
      en: "Open model ecosystems continue spreading toward low-cost deployment",
    },
    editorNote: {
      zh: "往期日报用于展示历史查看方式。正式版本可保留每日快照，避免当天内容覆盖后无法追溯。",
      en: "Past briefs demonstrate history browsing. A production version can keep daily snapshots so new updates do not overwrite previous context.",
    },
    keyTakeaway: {
      zh: "模型能力的产品化门槛正在下降，PM 需要关注端侧、私有化、低成本推理带来的新场景。",
      en: "The productization barrier for model capability is falling. PMs should watch edge, private deployment, and low-cost inference scenarios.",
    },
    signals: [
      {
        title: {
          zh: "小模型与本地推理工具持续被开发者采用",
          en: "Small models and local inference tools continue developer adoption",
        },
        category: {
          zh: "模型部署",
          en: "Model deployment",
        },
        summary: {
          zh: "Ollama、llama.cpp 等工具让团队更容易在本地或私有环境验证 AI 功能。",
          en: "Tools like Ollama and llama.cpp make it easier to validate AI features locally or in private environments.",
        },
        pmInsight: {
          zh: "这会让“数据不出域”的 AI 功能更容易被企业接受，尤其适合知识库、客服辅助和内部运营工具。",
          en: "This makes data-residency AI features easier for enterprises to accept, especially for knowledge bases, support assistance, and internal operations.",
        },
        impact: "Medium",
        sources: [
          {
            label: "Ollama GitHub",
            url: "https://github.com/ollama/ollama",
          },
          {
            label: "llama.cpp GitHub",
            url: "https://github.com/ggml-org/llama.cpp",
          },
        ],
      },
    ],
    githubProjects: [
      {
        title: {
          zh: "ollama/ollama",
          en: "ollama/ollama",
        },
        category: {
          zh: "本地模型运行",
          en: "Local model runtime",
        },
        summary: {
          zh: "降低本地运行开源模型的门槛，是观察端侧 AI 与私有化部署的重要项目。",
          en: "It lowers the barrier for running open models locally and is an important signal for edge AI and private deployment.",
        },
        pmInsight: {
          zh: "适合验证离线可用、隐私优先、低成本内部工具等产品方向。",
          en: "Useful for validating offline availability, privacy-first experiences, and low-cost internal tooling.",
        },
        impact: "High",
        sources: [
          {
            label: "GitHub Repository",
            url: "https://github.com/ollama/ollama",
          },
        ],
      },
    ],
    companyUpdates: [
      {
        title: {
          zh: "Hugging Face 继续强化开源模型分发与评测生态",
          en: "Hugging Face continues strengthening open model distribution and evaluation",
        },
        category: {
          zh: "开源生态",
          en: "Open ecosystem",
        },
        summary: {
          zh: "Hub、Spaces、评测榜单和开源工具共同构成 AI 产品原型验证的基础设施。",
          en: "Hub, Spaces, leaderboards, and open-source tools form infrastructure for AI product prototyping.",
        },
        pmInsight: {
          zh: "PM 可以把 Hugging Face 当作快速判断技术可行性和竞品信号的入口。",
          en: "PMs can use Hugging Face as an entry point for technical feasibility checks and competitive signals.",
        },
        impact: "Medium",
        sources: [
          {
            label: "Hugging Face",
            url: "https://huggingface.co/",
          },
          {
            label: "Hugging Face Blog",
            url: "https://huggingface.co/blog",
          },
        ],
      },
    ],
    opportunities: [
      {
        title: {
          zh: "机会：面向企业的本地 AI 助手",
          en: "Opportunity: local AI assistants for enterprises",
        },
        category: {
          zh: "B 端产品",
          en: "B2B product",
        },
        summary: {
          zh: "中小企业可能不需要复杂 AI 平台，而需要能连接文档、表格和内部 SOP 的轻量助手。",
          en: "SMBs may not need complex AI platforms, but lightweight assistants connected to documents, sheets, and internal SOPs.",
        },
        pmInsight: {
          zh: "先从单部门高频任务切入，比如周报、客服知识库、销售资料检索，再逐步扩展权限和工作流。",
          en: "Start from high-frequency departmental tasks like weekly reports, support knowledge bases, and sales document search, then expand permissions and workflows.",
        },
        impact: "Watch",
        sources: [
          {
            label: "Ollama Library",
            url: "https://ollama.com/library",
          },
        ],
      },
    ],
  },
  {
    date: "2026-06-02",
    label: {
      zh: "本周",
      en: "This week",
    },
    title: {
      zh: "AI 搜索和研究助手继续争夺信息入口",
      en: "AI search and research assistants keep competing for the information entry point",
    },
    editorNote: {
      zh: "历史日报可以保留当时的判断，后续再回看哪些趋势成立、哪些只是噪音。",
      en: "Historical briefs preserve the judgment at that time, making it possible to review which trends held up and which were noise.",
    },
    keyTakeaway: {
      zh: "信息获取类 AI 产品正在从“答案生成”走向“研究流程”，来源质量和引用可信度成为核心体验。",
      en: "Information AI products are shifting from answer generation to research workflows, making source quality and citation trust core UX factors.",
    },
    signals: [
      {
        title: {
          zh: "AI 搜索产品强化引用、任务和工作区",
          en: "AI search products strengthen citations, tasks, and workspaces",
        },
        category: {
          zh: "信息产品",
          en: "Information product",
        },
        summary: {
          zh: "Perplexity、Google、Microsoft 等产品持续把搜索结果组织成可追问、可保存、可分享的研究工作流。",
          en: "Products from Perplexity, Google, and Microsoft continue organizing search into research workflows that can be followed up, saved, and shared.",
        },
        pmInsight: {
          zh: "对日报产品来说，不能只总结，必须把原始链接、判断依据和内容更新时间放在显眼位置。",
          en: "For a daily brief product, summaries are not enough. Original links, reasoning, and update time must be visible.",
        },
        impact: "High",
        sources: [
          {
            label: "Perplexity",
            url: "https://www.perplexity.ai/",
          },
          {
            label: "Google AI Blog",
            url: "https://blog.google/technology/ai/",
          },
        ],
      },
    ],
    githubProjects: [
      {
        title: {
          zh: "langchain-ai/open_deep_research",
          en: "langchain-ai/open_deep_research",
        },
        category: {
          zh: "研究型 Agent",
          en: "Research agent",
        },
        summary: {
          zh: "研究型 Agent 项目代表了“检索、规划、阅读、引用、报告”的完整任务链。",
          en: "Research-agent projects represent the full chain of retrieval, planning, reading, citation, and reporting.",
        },
        pmInsight: {
          zh: "可以借鉴其报告结构和引用方式，用到 AI 日报的信息可溯源设计中。",
          en: "Its report structure and citation pattern can inspire traceable daily brief design.",
        },
        impact: "Medium",
        sources: [
          {
            label: "GitHub Repository",
            url: "https://github.com/langchain-ai/open_deep_research",
          },
        ],
      },
    ],
    companyUpdates: [
      {
        title: {
          zh: "Google AI 内容持续围绕搜索、Workspace 与多模态入口展开",
          en: "Google AI updates keep centering on search, Workspace, and multimodal entry points",
        },
        category: {
          zh: "生态入口",
          en: "Ecosystem entry point",
        },
        summary: {
          zh: "Google 的优势不是单一聊天产品，而是把 AI 嵌入搜索、办公和 Android 等入口。",
          en: "Google's advantage is not a single chat product, but embedding AI into Search, Workspace, and Android.",
        },
        pmInsight: {
          zh: "平台型公司会把 AI 变成默认能力，独立产品需要找到更垂直、更高价值的任务切口。",
          en: "Platform companies will make AI a default capability. Independent products need more vertical, high-value task entry points.",
        },
        impact: "High",
        sources: [
          {
            label: "Google AI Blog",
            url: "https://blog.google/technology/ai/",
          },
        ],
      },
    ],
    opportunities: [
      {
        title: {
          zh: "机会：垂直领域研究助手",
          en: "Opportunity: vertical research assistants",
        },
        category: {
          zh: "垂直 AI",
          en: "Vertical AI",
        },
        summary: {
          zh: "通用搜索会覆盖大众问题，但垂直行业仍需要领域口径、可信来源和可复用报告模板。",
          en: "General search covers broad questions, but vertical domains still need domain definitions, trusted sources, and reusable report templates.",
        },
        pmInsight: {
          zh: "游戏舆情、投放竞品、B 端政策合规等场景都可以做成“可追溯研究助手”。",
          en: "Game sentiment, ad competitor tracking, and B2B compliance can become traceable research assistants.",
        },
        impact: "Medium",
        sources: [
          {
            label: "Perplexity Pages",
            url: "https://www.perplexity.ai/hub/blog",
          },
        ],
      },
    ],
  },
];
