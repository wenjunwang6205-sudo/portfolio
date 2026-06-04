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

export const DAILY_BRIEFS: DailyBrief[] = [
  {
    "date": "2026-06-03",
    "label": {
      "zh": "最新",
      "en": "Latest"
    },
    "title": {
      "zh": "AI 信息源抓取日报",
      "en": "AI source collection brief"
    },
    "editorNote": {
      "zh": "这一版由自动化脚本基于真实来源抓取生成。配置模型 API key 后，会进一步生成更完整的产品经理视角总结。",
      "en": "This version is generated from real collected sources. With a model API key configured, it will produce fuller PM-focused analysis."
    },
    "keyTakeaway": {
      "zh": "本次抓取覆盖 12 个 GitHub AI 项目和 18 条 AI 公司动态，优先关注近期仍在活跃更新的 Agent、LLM 与 AI 工具方向。",
      "en": "This run collected 12 AI GitHub projects and 18 company updates, prioritizing active Agent, LLM, and AI tooling signals."
    },
    "signals": [
      {
        "title": {
          "zh": "Agent 与 AI 工具链仍是高频更新方向",
          "en": "Agents and AI tooling remain active update areas"
        },
        "category": {
          "zh": "趋势信号",
          "en": "Trend signal"
        },
        "summary": {
          "zh": "GitHub 抓取中排名靠前的项目包括 affaan-m/ECC，说明开发者仍在围绕 Agent 运行时、工作流和 AI 工具效率做密集迭代。",
          "en": "The collected GitHub signals include affaan-m/ECC, showing continued developer iteration around agent runtimes, workflows, and AI tooling efficiency."
        },
        "pmInsight": {
          "zh": "产品经理可以重点观察这些项目如何处理任务状态、权限、失败恢复和可追溯输出，这些会直接影响 Agent 产品体验。",
          "en": "Product managers can watch how these projects handle task state, permissions, recovery, and traceable output because these directly shape agent UX."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "affaan-m/ECC",
            "url": "https://github.com/affaan-m/ECC"
          }
        ]
      },
      {
        "title": {
          "zh": "大公司更新继续围绕平台能力扩展",
          "en": "Major AI companies keep expanding platform capabilities"
        },
        "category": {
          "zh": "公司动态",
          "en": "Company signal"
        },
        "summary": {
          "zh": "OpenAI 的最新动态「Introducing new capabilities to GPT-Rosalind」值得回看其背后的平台策略和产品能力边界。",
          "en": "OpenAI's update \"Introducing new capabilities to GPT-Rosalind\" is worth reading for platform strategy and product capability boundaries."
        },
        "pmInsight": {
          "zh": "大公司动作通常会改变用户对 AI 产品的默认预期，独立产品更需要寻找垂直任务和行业 SOP 的切入点。",
          "en": "Major company moves often reset user expectations for AI products, so independent products need sharper vertical tasks and industry SOP entry points."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind"
          }
        ]
      }
    ],
    "githubProjects": [
      {
        "title": {
          "zh": "affaan-m/ECC",
          "en": "affaan-m/ECC"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.",
          "en": "The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond."
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/affaan-m/ECC"
          }
        ]
      },
      {
        "title": {
          "zh": "Significant-Gravitas/AutoGPT",
          "en": "Significant-Gravitas/AutoGPT"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission is to provide the tools, so that you can focus on what matters.",
          "en": "AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission is to provide the tools, so that you can focus on what matters."
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/Significant-Gravitas/AutoGPT"
          }
        ]
      },
      {
        "title": {
          "zh": "NousResearch/hermes-agent",
          "en": "NousResearch/hermes-agent"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "The agent that grows with you",
          "en": "The agent that grows with you"
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/NousResearch/hermes-agent"
          }
        ]
      }
    ],
    "companyUpdates": [
      {
        "title": {
          "zh": "OpenAI: Introducing new capabilities to GPT-Rosalind",
          "en": "OpenAI: Introducing new capabilities to GPT-Rosalind"
        },
        "category": {
          "zh": "公司动态",
          "en": "Company update"
        },
        "summary": {
          "zh": "GPT-Rosalind advances life sciences research with enhanced biological reasoning, medicinal chemistry expertise, genomics analysis, and experimental workflow capabilities.",
          "en": "GPT-Rosalind advances life sciences research with enhanced biological reasoning, medicinal chemistry expertise, genomics analysis, and experimental workflow capabilities."
        },
        "pmInsight": {
          "zh": "可从中观察平台公司正在强化的能力边界、行业场景和商业化叙事。",
          "en": "Use this to observe the capability boundaries, vertical scenarios, and commercialization narrative platform companies are emphasizing."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind"
          }
        ]
      },
      {
        "title": {
          "zh": "OpenAI: How Wasmer used Codex to build a Node.js runtime for the edge",
          "en": "OpenAI: How Wasmer used Codex to build a Node.js runtime for the edge"
        },
        "category": {
          "zh": "公司动态",
          "en": "Company update"
        },
        "summary": {
          "zh": "See how Wasmer used Codex with GPT-5.5 to build a Node.js runtime for the edge, accelerating development 10x to 20x and shipping in weeks instead of months.",
          "en": "See how Wasmer used Codex with GPT-5.5 to build a Node.js runtime for the edge, accelerating development 10x to 20x and shipping in weeks instead of months."
        },
        "pmInsight": {
          "zh": "可从中观察平台公司正在强化的能力边界、行业场景和商业化叙事。",
          "en": "Use this to observe the capability boundaries, vertical scenarios, and commercialization narrative platform companies are emphasizing."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/wasmer"
          }
        ]
      },
      {
        "title": {
          "zh": "OpenAI: A blueprint for democratic governance of frontier AI",
          "en": "OpenAI: A blueprint for democratic governance of frontier AI"
        },
        "category": {
          "zh": "公司动态",
          "en": "Company update"
        },
        "summary": {
          "zh": "OpenAI outlines a blueprint for U.S. governance of frontier AI, proposing a federal framework for safety, resilience, and national security.",
          "en": "OpenAI outlines a blueprint for U.S. governance of frontier AI, proposing a federal framework for safety, resilience, and national security."
        },
        "pmInsight": {
          "zh": "可从中观察平台公司正在强化的能力边界、行业场景和商业化叙事。",
          "en": "Use this to observe the capability boundaries, vertical scenarios, and commercialization narrative platform companies are emphasizing."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/frontier-safety-blueprint"
          }
        ]
      }
    ],
    "opportunities": [
      {
        "title": {
          "zh": "机会：把 AI 日报做成可溯源产品雷达",
          "en": "Opportunity: make the AI brief a traceable product radar"
        },
        "category": {
          "zh": "产品机会",
          "en": "Product opportunity"
        },
        "summary": {
          "zh": "真实价值不在于列链接，而在于每天把来源、判断、产品启发和历史快照沉淀下来。",
          "en": "The value is not listing links, but preserving sources, judgment, PM implications, and daily snapshots."
        },
        "pmInsight": {
          "zh": "下一步可以验证两件事：每天是否 5 分钟读完，以及每周是否能沉淀 1-2 个可讨论的产品机会。",
          "en": "Next, validate whether it can be read in five minutes and whether it surfaces one or two discussable product opportunities each week."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "Hugging Face Blog",
            "url": "https://huggingface.co/blog"
          }
        ]
      }
    ]
  },
  {
    "date": "2026-06-04",
    "label": {
      "zh": "今日",
      "en": "Today"
    },
    "title": {
      "zh": "Agent 产品正在从演示走向可交付工作流",
      "en": "Agent products are moving from demos to deliverable workflows"
    },
    "editorNote": {
      "zh": "这是一个面向 AI 产品经理的日报样例页。当前数据为可替换 mock，后续可由 GitHub Actions 每天自动生成。",
      "en": "This is a sample daily brief for AI product managers. The current data is replaceable mock content and can be generated daily by GitHub Actions later."
    },
    "keyTakeaway": {
      "zh": "今天更值得关注的不是单点模型能力，而是 AI 如何进入真实任务链路：浏览器操作、代码代理、企业知识检索都在补齐权限、可追溯和人工确认环节。",
      "en": "The important shift is not a single model capability, but how AI enters real task flows: browser operation, coding agents, and enterprise search are adding permission, traceability, and human review layers."
    },
    "signals": [
      {
        "title": {
          "zh": "浏览器操作型 Agent 持续升温",
          "en": "Browser-operating agents keep gaining attention"
        },
        "category": {
          "zh": "交互范式",
          "en": "Interaction pattern"
        },
        "summary": {
          "zh": "一批开源项目开始把 AI 从“回答问题”推进到“操作网页完成任务”，例如登录后检索、表单填写和跨站执行。",
          "en": "A group of open-source projects are moving AI from answering questions to operating web pages, including authenticated search, form filling, and cross-site execution."
        },
        "pmInsight": {
          "zh": "产品设计重点会从聊天框转向任务状态、权限确认、失败恢复和可解释回放。适合关注企业效率工具、运营工具和销售自动化场景。",
          "en": "Product design focus shifts from chat UI to task state, permission checks, recovery, and explainable replay. This is relevant for productivity, operations, and sales automation products."
        },
        "impact": "High",
        "sources": [
          {
            "label": "browser-use GitHub",
            "url": "https://github.com/browser-use/browser-use"
          },
          {
            "label": "OpenAI Agents",
            "url": "https://platform.openai.com/docs/agents"
          }
        ]
      },
      {
        "title": {
          "zh": "AI Coding 工具从补全走向任务代理",
          "en": "AI coding tools are shifting from completion to task agents"
        },
        "category": {
          "zh": "AI Coding",
          "en": "AI Coding"
        },
        "summary": {
          "zh": "代码助手越来越强调跨文件修改、测试验证、PR 处理和 CI 修复，而不是只做单次代码生成。",
          "en": "Coding assistants increasingly emphasize cross-file edits, test verification, PR handling, and CI fixes instead of one-off code generation."
        },
        "pmInsight": {
          "zh": "这说明 AI 产品的价值指标会从“生成速度”转向“闭环完成率”。如果做 B 端工具，需要把验证、回滚和审阅体验设计为核心能力。",
          "en": "This suggests AI product value metrics move from generation speed to completion rate. For B2B tools, verification, rollback, and review UX should become core capabilities."
        },
        "impact": "High",
        "sources": [
          {
            "label": "GitHub Copilot",
            "url": "https://github.blog/tag/github-copilot/"
          },
          {
            "label": "Cursor",
            "url": "https://www.cursor.com/changelog"
          }
        ]
      }
    ],
    "githubProjects": [
      {
        "title": {
          "zh": "microsoft/autogen",
          "en": "microsoft/autogen"
        },
        "category": {
          "zh": "多 Agent 框架",
          "en": "Multi-agent framework"
        },
        "summary": {
          "zh": "适合观察多智能体协作、工具调用和企业任务编排的工程化路径。",
          "en": "A useful signal for multi-agent collaboration, tool use, and enterprise task orchestration."
        },
        "pmInsight": {
          "zh": "PM 可重点看它如何定义角色、消息、工具和评估接口，这些会影响 Agent 产品的信息架构。",
          "en": "PMs can study how it defines roles, messages, tools, and evaluation interfaces because these shape agent product information architecture."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/microsoft/autogen"
          }
        ]
      },
      {
        "title": {
          "zh": "huggingface/smolagents",
          "en": "huggingface/smolagents"
        },
        "category": {
          "zh": "轻量 Agent",
          "en": "Lightweight agents"
        },
        "summary": {
          "zh": "轻量化 Agent 框架让开发者更容易用少量代码验证任务型 AI 产品原型。",
          "en": "A lightweight agent framework lowers the cost of prototyping task-oriented AI products."
        },
        "pmInsight": {
          "zh": "适合做早期原型验证：先证明任务链路有效，再决定是否需要复杂平台能力。",
          "en": "Useful for early prototyping: prove the task flow first, then decide whether complex platform capabilities are needed."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/huggingface/smolagents"
          }
        ]
      }
    ],
    "companyUpdates": [
      {
        "title": {
          "zh": "OpenAI 平台能力继续向 Agent 基础设施靠拢",
          "en": "OpenAI platform capabilities keep moving toward agent infrastructure"
        },
        "category": {
          "zh": "平台策略",
          "en": "Platform strategy"
        },
        "summary": {
          "zh": "官方文档和产品能力持续强调工具调用、文件检索、任务执行与可控输出。",
          "en": "Official docs and product capabilities continue to emphasize tool use, file search, task execution, and controllable output."
        },
        "pmInsight": {
          "zh": "对产品经理来说，机会在于把通用能力包装成行业 SOP，而不是只接一个聊天 API。",
          "en": "For product managers, the opportunity is packaging general capabilities into industry SOPs instead of only connecting a chat API."
        },
        "impact": "High",
        "sources": [
          {
            "label": "OpenAI Docs",
            "url": "https://platform.openai.com/docs"
          },
          {
            "label": "OpenAI News",
            "url": "https://openai.com/news/"
          }
        ]
      },
      {
        "title": {
          "zh": "Anthropic 持续强化企业安全与可控性叙事",
          "en": "Anthropic keeps emphasizing enterprise safety and controllability"
        },
        "category": {
          "zh": "企业 AI",
          "en": "Enterprise AI"
        },
        "summary": {
          "zh": "Claude 生态的官方内容长期围绕安全、可解释、企业部署和 Computer Use 等方向展开。",
          "en": "Claude ecosystem content has consistently focused on safety, explainability, enterprise deployment, and computer use."
        },
        "pmInsight": {
          "zh": "如果面向企业用户，AI 功能卖点需要从“聪明”转向“可控、可审计、可接入现有流程”。",
          "en": "For enterprise users, AI positioning needs to move from smartness to controllability, auditability, and integration with existing workflows."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "Anthropic News",
            "url": "https://www.anthropic.com/news"
          },
          {
            "label": "Claude Docs",
            "url": "https://docs.anthropic.com/"
          }
        ]
      }
    ],
    "opportunities": [
      {
        "title": {
          "zh": "机会：可溯源 AI 日报本身可以产品化",
          "en": "Opportunity: traceable AI daily briefs can become a product"
        },
        "category": {
          "zh": "产品机会",
          "en": "Product opportunity"
        },
        "summary": {
          "zh": "相比新闻聚合，产品经理更需要“事实、判断、来源、下一步动作”四件套。",
          "en": "Compared with news aggregation, PMs need four things: facts, interpretation, sources, and next actions."
        },
        "pmInsight": {
          "zh": "第一版可先验证：每天 5 分钟读完、每条都能回到原文、每周沉淀 1-2 个产品机会假设。",
          "en": "The first version can validate whether users can finish it in five minutes, trace every item back to the source, and capture one or two product hypotheses weekly."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "GitHub Trending",
            "url": "https://github.com/trending"
          },
          {
            "label": "Hugging Face Blog",
            "url": "https://huggingface.co/blog"
          }
        ]
      }
    ]
  },
  {
    "date": "2026-06-02",
    "label": {
      "zh": "本周",
      "en": "This week"
    },
    "title": {
      "zh": "AI 搜索和研究助手继续争夺信息入口",
      "en": "AI search and research assistants keep competing for the information entry point"
    },
    "editorNote": {
      "zh": "历史日报可以保留当时的判断，后续再回看哪些趋势成立、哪些只是噪音。",
      "en": "Historical briefs preserve the judgment at that time, making it possible to review which trends held up and which were noise."
    },
    "keyTakeaway": {
      "zh": "信息获取类 AI 产品正在从“答案生成”走向“研究流程”，来源质量和引用可信度成为核心体验。",
      "en": "Information AI products are shifting from answer generation to research workflows, making source quality and citation trust core UX factors."
    },
    "signals": [
      {
        "title": {
          "zh": "AI 搜索产品强化引用、任务和工作区",
          "en": "AI search products strengthen citations, tasks, and workspaces"
        },
        "category": {
          "zh": "信息产品",
          "en": "Information product"
        },
        "summary": {
          "zh": "Perplexity、Google、Microsoft 等产品持续把搜索结果组织成可追问、可保存、可分享的研究工作流。",
          "en": "Products from Perplexity, Google, and Microsoft continue organizing search into research workflows that can be followed up, saved, and shared."
        },
        "pmInsight": {
          "zh": "对日报产品来说，不能只总结，必须把原始链接、判断依据和内容更新时间放在显眼位置。",
          "en": "For a daily brief product, summaries are not enough. Original links, reasoning, and update time must be visible."
        },
        "impact": "High",
        "sources": [
          {
            "label": "Perplexity",
            "url": "https://www.perplexity.ai/"
          },
          {
            "label": "Google AI Blog",
            "url": "https://blog.google/technology/ai/"
          }
        ]
      }
    ],
    "githubProjects": [
      {
        "title": {
          "zh": "langchain-ai/open_deep_research",
          "en": "langchain-ai/open_deep_research"
        },
        "category": {
          "zh": "研究型 Agent",
          "en": "Research agent"
        },
        "summary": {
          "zh": "研究型 Agent 项目代表了“检索、规划、阅读、引用、报告”的完整任务链。",
          "en": "Research-agent projects represent the full chain of retrieval, planning, reading, citation, and reporting."
        },
        "pmInsight": {
          "zh": "可以借鉴其报告结构和引用方式，用到 AI 日报的信息可溯源设计中。",
          "en": "Its report structure and citation pattern can inspire traceable daily brief design."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/langchain-ai/open_deep_research"
          }
        ]
      }
    ],
    "companyUpdates": [
      {
        "title": {
          "zh": "Google AI 内容持续围绕搜索、Workspace 与多模态入口展开",
          "en": "Google AI updates keep centering on search, Workspace, and multimodal entry points"
        },
        "category": {
          "zh": "生态入口",
          "en": "Ecosystem entry point"
        },
        "summary": {
          "zh": "Google 的优势不是单一聊天产品，而是把 AI 嵌入搜索、办公和 Android 等入口。",
          "en": "Google's advantage is not a single chat product, but embedding AI into Search, Workspace, and Android."
        },
        "pmInsight": {
          "zh": "平台型公司会把 AI 变成默认能力，独立产品需要找到更垂直、更高价值的任务切口。",
          "en": "Platform companies will make AI a default capability. Independent products need more vertical, high-value task entry points."
        },
        "impact": "High",
        "sources": [
          {
            "label": "Google AI Blog",
            "url": "https://blog.google/technology/ai/"
          }
        ]
      }
    ],
    "opportunities": [
      {
        "title": {
          "zh": "机会：垂直领域研究助手",
          "en": "Opportunity: vertical research assistants"
        },
        "category": {
          "zh": "垂直 AI",
          "en": "Vertical AI"
        },
        "summary": {
          "zh": "通用搜索会覆盖大众问题，但垂直行业仍需要领域口径、可信来源和可复用报告模板。",
          "en": "General search covers broad questions, but vertical domains still need domain definitions, trusted sources, and reusable report templates."
        },
        "pmInsight": {
          "zh": "游戏舆情、投放竞品、B 端政策合规等场景都可以做成“可追溯研究助手”。",
          "en": "Game sentiment, ad competitor tracking, and B2B compliance can become traceable research assistants."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "Perplexity Pages",
            "url": "https://www.perplexity.ai/hub/blog"
          }
        ]
      }
    ]
  }
];
