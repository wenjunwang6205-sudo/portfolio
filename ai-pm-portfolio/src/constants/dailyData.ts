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

export const DAILY_BRIEFS: DailyBrief[] = [
  {
    "date": "2026-06-05",
    "label": {
      "zh": "最新",
      "en": "Latest"
    },
    "title": {
      "zh": "AI Agent 生态爆发：Token 优化与记忆系统成关键",
      "en": "AI Agent Ecosystem Boom: Token Optimization and Memory Systems Become Key"
    },
    "editorNote": {
      "zh": "今日 GitHub 项目与 OpenAI 动态共同指向 AI Agent 生态的快速成熟。Headroom 的病毒式增长印证了 token 成本优化的刚需，而 OpenAI 的 Dreaming 记忆系统则展示了提升用户体验的新方向。产品经理应重点关注 Agent 效率与个性化能力的结合。",
      "en": "Today's GitHub projects and OpenAI updates collectively point to the rapid maturation of the AI Agent ecosystem. Headroom's viral growth confirms the urgent need for token cost optimization, while OpenAI's Dreaming memory system demonstrates new directions for enhancing user experience. Product managers should focus on combining agent efficiency with personalization."
    },
    "keyTakeaway": {
      "zh": "AI Agent 生态进入效率与记忆双轮驱动阶段：Headroom 等 token 优化工具爆发式增长，OpenAI 推出 Dreaming 记忆系统，两者共同指向 Agent 从「能用」到「好用」的关键跃迁。",
      "en": "The AI Agent ecosystem enters a phase driven by both efficiency and memory: token optimization tools like Headroom are exploding, and OpenAI launches Dreaming memory system, together pointing to the critical leap from 'usable' to 'delightful' agents."
    },
    "signals": [
      {
        "title": {
          "zh": "Token 优化工具成为 Agent 基础设施新热点",
          "en": "Token Optimization Tools Become New Hotspot in Agent Infrastructure"
        },
        "category": {
          "zh": "跨源信号",
          "en": "Cross-source signal"
        },
        "summary": {
          "zh": "Headroom 单日新增 3142 星，总星数超 1.2 万，其「压缩至原体积 5%-40% 且保持质量」的能力精准击中 AI Agent 和 LLM 应用的 token 成本痛点。同时，ECC 项目（20.7 万星）也聚焦 Agent 性能优化，显示开发者对降低推理成本的强烈需求。",
          "en": "Headroom gained 3,142 stars in a single day, reaching over 12,000 total stars. Its ability to compress to 5%-40% of original size while maintaining quality precisely hits the token cost pain point of AI agents and LLM applications. Meanwhile, ECC (207k stars) also focuses on agent performance optimization, showing strong developer demand for reducing inference costs."
        },
        "pmInsight": {
          "zh": "产品经理应评估在 Agent 产品中集成 token 压缩或性能优化层，以降低用户使用成本、提升竞争力。可考虑与 Headroom 等开源项目合作或自研类似能力。",
          "en": "Product managers should evaluate integrating token compression or performance optimization layers into agent products to reduce user costs and enhance competitiveness. Consider partnering with open-source projects like Headroom or developing similar capabilities in-house."
        },
        "impact": "High",
        "sources": [
          {
            "label": "Headroom GitHub",
            "url": "https://github.com/chopratejas/headroom"
          },
          {
            "label": "ECC GitHub",
            "url": "https://github.com/affaan-m/ECC"
          }
        ]
      },
      {
        "title": {
          "zh": "记忆系统升级推动对话式 AI 个性化体验",
          "en": "Memory System Upgrade Drives Personalized Conversational AI Experience"
        },
        "category": {
          "zh": "跨源信号",
          "en": "Cross-source signal"
        },
        "summary": {
          "zh": "OpenAI 推出 ChatGPT 新记忆系统 Dreaming，能更好记住用户偏好，保持上下文连贯。同时，Hermes Agent（18.1 万星）作为「成长型 Agent」框架，也强调渐进式能力积累。两者均指向 Agent 长期记忆与个性化的重要性。",
          "en": "OpenAI launched Dreaming, a new memory system for ChatGPT that better remembers user preferences and maintains context coherence. Meanwhile, Hermes Agent (181k stars), a 'growing agent' framework, also emphasizes progressive capability accumulation. Both point to the importance of long-term memory and personalization for agents."
        },
        "pmInsight": {
          "zh": "产品经理应优先规划 Agent 的记忆功能，包括用户偏好存储、对话历史利用和个性化响应。可参考 Dreaming 的设计思路，或集成 Hermes Agent 等框架。",
          "en": "Product managers should prioritize planning memory features for agents, including user preference storage, conversation history utilization, and personalized responses. Reference Dreaming's design or integrate frameworks like Hermes Agent."
        },
        "impact": "High",
        "sources": [
          {
            "label": "OpenAI Dreaming",
            "url": "https://openai.com/index/chatgpt-memory-dreaming"
          },
          {
            "label": "Hermes Agent GitHub",
            "url": "https://github.com/NousResearch/hermes-agent"
          }
        ]
      },
      {
        "title": {
          "zh": "垂直领域 Agent 能力深化，生物安全与物理 AI 受关注",
          "en": "Vertical Domain Agent Capabilities Deepen, Biosafety and Physical AI Gain Attention"
        },
        "category": {
          "zh": "跨源信号",
          "en": "Cross-source signal"
        },
        "summary": {
          "zh": "OpenAI 发布 GPT-Rosalind 新能力，强化生物学推理、药物化学和基因组学分析，并发布生物防御行动计划。NVIDIA 推出 Cosmos 世界模型平台，聚焦机器人、自动驾驶等物理 AI。两者表明 AI Agent 正从通用向垂直领域深入。",
          "en": "OpenAI released new capabilities for GPT-Rosalind, enhancing biological reasoning, medicinal chemistry, and genomics analysis, and published a biodefense action plan. NVIDIA launched Cosmos, a world model platform focusing on robotics and autonomous driving. Both indicate AI agents are moving from general to vertical domains."
        },
        "pmInsight": {
          "zh": "产品经理可探索在生命科学、自动驾驶等垂直领域构建专用 Agent，利用 GPT-Rosalind 或 Cosmos 等平台加速开发。关注政策动向，提前布局合规能力。",
          "en": "Product managers can explore building specialized agents in vertical domains like life sciences and autonomous driving, leveraging platforms like GPT-Rosalind or Cosmos. Monitor policy trends and plan compliance capabilities early."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "OpenAI GPT-Rosalind",
            "url": "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind"
          },
          {
            "label": "OpenAI Biodefense",
            "url": "https://openai.com/index/biodefense-in-the-intelligence-age"
          },
          {
            "label": "NVIDIA Cosmos GitHub",
            "url": "https://github.com/NVIDIA/cosmos"
          }
        ]
      }
    ],
    "opportunities": [
      {
        "title": {
          "zh": "开发集成 token 压缩与记忆功能的 Agent 中间件",
          "en": "Develop Agent Middleware Integrating Token Compression and Memory"
        },
        "category": {
          "zh": "机会",
          "en": "Opportunity"
        },
        "summary": {
          "zh": "结合 Headroom 的 token 压缩能力和 Dreaming 的记忆设计，构建一个 Agent 中间件层，为开发者提供「低成本+个性化」的一站式解决方案。假设：该中间件能降低 Agent 推理成本 50% 以上，同时提升用户留存率 30%。",
          "en": "Combine Headroom's token compression and Dreaming's memory design to build an agent middleware layer that offers a one-stop 'low-cost + personalized' solution for developers. Hypothesis: This middleware can reduce agent inference costs by over 50% while increasing user retention by 30%."
        },
        "pmInsight": {
          "zh": "产品经理可验证该假设：与 3-5 个 Agent 应用开发者合作，集成中间件后测量 token 消耗和用户留存变化。若验证成功，可商业化或开源。",
          "en": "Product managers can validate this hypothesis by partnering with 3-5 agent app developers, measuring token consumption and user retention changes after integration. If validated, consider commercialization or open-sourcing."
        },
        "impact": "High",
        "sources": [
          {
            "label": "Headroom GitHub",
            "url": "https://github.com/chopratejas/headroom"
          },
          {
            "label": "OpenAI Dreaming",
            "url": "https://openai.com/index/chatgpt-memory-dreaming"
          }
        ]
      },
      {
        "title": {
          "zh": "打造面向生物安全的 AI Agent 产品",
          "en": "Build an AI Agent Product for Biosecurity"
        },
        "category": {
          "zh": "机会",
          "en": "Opportunity"
        },
        "summary": {
          "zh": "基于 OpenAI 的生物防御行动计划和 GPT-Rosalind 的生物学能力，开发一款面向生物安全领域的 AI Agent，用于威胁检测、疫苗研发辅助或政策合规。假设：该 Agent 能帮助生物安全团队将威胁响应时间缩短 40%。",
          "en": "Based on OpenAI's biodefense action plan and GPT-Rosalind's biological capabilities, develop an AI agent for biosecurity, used for threat detection, vaccine R&D assistance, or policy compliance. Hypothesis: This agent can help biosecurity teams reduce threat response time by 40%."
        },
        "pmInsight": {
          "zh": "产品经理可与生物安全机构或制药公司合作，进行概念验证。关注 OpenAI 的 API 更新和合规要求，确保产品符合监管。",
          "en": "Product managers can partner with biosecurity agencies or pharmaceutical companies for a proof of concept. Monitor OpenAI's API updates and compliance requirements to ensure regulatory alignment."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "OpenAI Biodefense",
            "url": "https://openai.com/index/biodefense-in-the-intelligence-age"
          },
          {
            "label": "OpenAI GPT-Rosalind",
            "url": "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind"
          }
        ]
      }
    ],
    "githubProjects": [
      {
        "title": {
          "zh": "chopratejas/headroom",
          "en": "chopratejas/headroom"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "一个智能上下文压缩工具，能在将日志、文件、RAG 块等数据送入大模型前，自动压缩至原体积的 5%-40%，同时保持回答质量不变。支持作为 Python 库、代理或 MCP 服务器使用，适用于 AI Agent 和 LLM 应用中的 token 优化。",
          "en": "Compress tool outputs, logs, files, and RAG chunks before they reach the LLM. 60-95% fewer tokens, same answers. Library, proxy, MCP server."
        },
        "totalStars": 12538,
        "language": "Python",
        "dailyStars": 3142,
        "chineseIntro": {
          "zh": "一个智能上下文压缩工具，能在将日志、文件、RAG 块等数据送入大模型前，自动压缩至原体积的 5%-40%，同时保持回答质量不变。支持作为 Python 库、代理或 MCP 服务器使用，适用于 AI Agent 和 LLM 应用中的 token 优化。",
          "en": "Compress tool outputs, logs, files, and RAG chunks before they reach the LLM. 60-95% fewer tokens, same answers. Library, proxy, MCP server."
        },
        "todayHighlight": {
          "zh": "今日新增 3142 星，总星数 12538，增速惊人。AI Agent 生态爆发下，token 成本优化成为刚需，该项目精准切入「压缩不减质」的痛点，在开发者社区引发病毒式传播。",
          "en": "登上 GitHub Trending 日榜第 1 位, 作为 Agent 生态的重要基础组件，随 Agent 应用爆发持续获得新增关注, 今日新增 3,142 星."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 12,538 stars、814 forks，topics: agent, ai, anthropic, claude-code, compression，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 12,538 stars and 814 forks，topics: agent, ai, anthropic, claude-code, compression, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "观察 AI 应用落地中「成本与性能平衡」的产品化思路——如何将底层技术封装为易用的 SDK/代理，降低开发者接入门槛。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/chopratejas/headroom"
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
          "zh": "一个可成长的 AI Agent 框架，支持 Claude、ChatGPT 等多种大模型，提供从简单对话到复杂任务编排的渐进式能力。适合开发者快速构建和迭代智能体应用。",
          "en": "Star NousResearch / hermes-agent The agent that grows with you"
        },
        "totalStars": 181012,
        "language": "Python",
        "dailyStars": 1913,
        "chineseIntro": {
          "zh": "一个可成长的 AI Agent 框架，支持 Claude、ChatGPT 等多种大模型，提供从简单对话到复杂任务编排的渐进式能力。适合开发者快速构建和迭代智能体应用。",
          "en": "Star NousResearch / hermes-agent The agent that grows with you"
        },
        "todayHighlight": {
          "zh": "今日新增 1913 星，总星数 18.1 万，持续霸榜。作为 Nous Research 的明星项目，凭借「成长型 Agent」的差异化叙事和活跃社区，在 Agent 赛道保持高热度。",
          "en": "登上 GitHub Trending 日榜第 2 位, 总 star 数已达 181k+，持续占据 AI 开源热门榜单, 作为 Agent 生态的重要基础组件，随 Agent 应用爆发持续获得新增关注, 今日新增 1,913 星."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 181,012 stars、31,056 forks，topics: ai, ai-agent, ai-agents, anthropic, chatgpt，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 181,012 stars and 31,056 forks，topics: ai, ai-agent, ai-agents, anthropic, chatgpt, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "关注「可成长」这一产品定位如何吸引开发者——通过渐进式复杂度设计，让用户从简单用例平滑过渡到高级功能。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/NousResearch/hermes-agent"
          }
        ]
      },
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
          "zh": "一个面向 AI Agent 的性能优化系统，为 Claude Code、Cursor 等开发工具提供技能、本能、记忆、安全等增强能力。旨在提升 Agent 在复杂任务中的效率和可靠性。",
          "en": "The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond."
        },
        "totalStars": 207250,
        "language": "JavaScript",
        "dailyStars": 1750,
        "chineseIntro": {
          "zh": "一个面向 AI Agent 的性能优化系统，为 Claude Code、Cursor 等开发工具提供技能、本能、记忆、安全等增强能力。旨在提升 Agent 在复杂任务中的效率和可靠性。",
          "en": "The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond."
        },
        "todayHighlight": {
          "zh": "今日新增 1750 星，总星数 20.7 万，排名第三。项目仅 5 个月即获得超 20 万星，凭借「Agent 性能优化」的精准定位和多语言文档，迅速成为开发者工具链中的热门组件。",
          "en": "登上 GitHub Trending 日榜第 3 位, 总 star 数已达 207k+，持续占据 AI 开源热门榜单, 作为 Agent 生态的重要基础组件，随 Agent 应用爆发持续获得新增关注, 今日新增 1,750 星."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 207,250 stars、31,821 forks，topics: ai-agents, anthropic, claude, claude-code, developer-tools，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 207,250 stars and 31,821 forks，topics: ai-agents, anthropic, claude, claude-code, developer-tools, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "思考如何将 Agent 开发中的通用痛点（性能、安全、记忆）产品化为可插拔模块，形成生态依赖。",
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
          "zh": "Open-LLM-VTuber/Open-LLM-VTuber",
          "en": "Open-LLM-VTuber/Open-LLM-VTuber"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "一个开源的 AI 虚拟主播（VTuber）项目，支持与任意大模型进行免提语音对话、语音打断，并驱动 Live2D 角色实时表情动作。可完全本地运行，兼容 Ollama 等模型。",
          "en": "Star Open-LLM-VTuber / Open-LLM-VTuber Talk to any LLM with hands-free voice interaction, voice interruption, and Live2D taking face running locally across platforms"
        },
        "totalStars": 9601,
        "language": "Python",
        "dailyStars": 581,
        "chineseIntro": {
          "zh": "一个开源的 AI 虚拟主播（VTuber）项目，支持与任意大模型进行免提语音对话、语音打断，并驱动 Live2D 角色实时表情动作。可完全本地运行，兼容 Ollama 等模型。",
          "en": "Star Open-LLM-VTuber / Open-LLM-VTuber Talk to any LLM with hands-free voice interaction, voice interruption, and Live2D taking face running locally across platforms"
        },
        "todayHighlight": {
          "zh": "今日新增 581 星，总星数 9601，排名第八。AI 虚拟主播赛道持续升温，该项目凭借「本地运行+Live2D+语音交互」的完整体验，在二次元和技术社区双圈传播。",
          "en": "登上 GitHub Trending 日榜第 8 位, 项目切中 AI/LLM/Agent 工具链的高频痛点，开发者社区采用信号明显, 今日新增 581 星."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 9,601 stars、1,154 forks，topics: ai, ai-companion, ai-vtuber, ai-waifu, chatbots，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 9,601 stars and 1,154 forks，topics: ai, ai-companion, ai-vtuber, ai-waifu, chatbots, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "观察 AI+虚拟形象结合的产品形态——如何通过开源降低创作门槛，吸引非技术用户参与定制。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/Open-LLM-VTuber/Open-LLM-VTuber"
          }
        ]
      },
      {
        "title": {
          "zh": "mvanhorn/last30days-skill",
          "en": "mvanhorn/last30days-skill"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "一个 AI Agent 技能，能自动搜索 Reddit、X、YouTube、Hacker News 等平台，针对任意主题汇总近 30 天的讨论趋势，并生成有据可查的摘要报告。",
          "en": "Star mvanhorn / last30days-skill AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymarket, and the web - then synthesizes a grounded summary"
        },
        "totalStars": 27590,
        "language": "Python",
        "dailyStars": 199,
        "chineseIntro": {
          "zh": "一个 AI Agent 技能，能自动搜索 Reddit、X、YouTube、Hacker News 等平台，针对任意主题汇总近 30 天的讨论趋势，并生成有据可查的摘要报告。",
          "en": "Star mvanhorn / last30days-skill AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymarket, and the web - then synthesizes a grounded summary"
        },
        "todayHighlight": {
          "zh": "今日新增 199 星，总星数 27590，排名第十四。作为「深度研究」类技能，在信息过载时代精准满足用户快速了解热点趋势的需求，被多个开发者社区推荐。",
          "en": "登上 GitHub Trending 日榜第 14 位, 创建仅约 4 个月便已积累 27k+ stars, 作为 Agent 生态的重要基础组件，随 Agent 应用爆发持续获得新增关注, 今日新增 199 星."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 27,590 stars、2,346 forks，topics: ai-prompts, ai-skill, bluesky, claude, claude-code，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 27,590 stars and 2,346 forks，topics: ai-prompts, ai-skill, bluesky, claude, claude-code, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "关注「信息聚合+AI 摘要」的产品价值——如何通过跨平台数据源和时效性设计，打造差异化研究工具。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/mvanhorn/last30days-skill"
          }
        ]
      },
      {
        "title": {
          "zh": "PaddlePaddle/PaddleOCR",
          "en": "PaddlePaddle/PaddleOCR"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "百度出品的 OCR 工具包，可将 PDF、图片等文档中的文字识别为结构化数据，支持 100+ 语言。广泛应用于文档解析、票据识别、RAG 数据预处理等场景。",
          "en": "Star PaddlePaddle / PaddleOCR Turn any PDF or image document into structured data for your AI. A powerful, lightweight OCR toolkit that bridges the gap between images/PDFs and LLMs. Supports 100+ languages."
        },
        "totalStars": 79882,
        "language": "Python",
        "dailyStars": 141,
        "chineseIntro": {
          "zh": "百度出品的 OCR 工具包，可将 PDF、图片等文档中的文字识别为结构化数据，支持 100+ 语言。广泛应用于文档解析、票据识别、RAG 数据预处理等场景。",
          "en": "Star PaddlePaddle / PaddleOCR Turn any PDF or image document into structured data for your AI. A powerful, lightweight OCR toolkit that bridges the gap between images/PDFs and LLMs. Supports 100+ languages."
        },
        "todayHighlight": {
          "zh": "今日新增 141 星，总星数 7.9 万，排名第四。作为老牌 OCR 项目，在 RAG 和 AI 文档处理需求激增的背景下，凭借多语言支持和持续更新，保持稳定增长。",
          "en": "登上 GitHub Trending 日榜第 4 位, 总 star 数已达 79k+，属于持续在榜的头部 AI 开源项目, RAG/向量检索仍是 AI 应用落地的高频需求，相关工具链持续被集成, 今日新增 141 星."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 79,882 stars、10,602 forks，topics: ai4science, chineseocr, document-parsing, document-translation, kie，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 79,882 stars and 10,602 forks，topics: ai4science, chineseocr, document-parsing, document-translation, kie, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "思考成熟开源项目如何在新 AI 浪潮中找到第二增长曲线——从 OCR 工具升级为「文档 AI 引擎」。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/PaddlePaddle/PaddleOCR"
          }
        ]
      },
      {
        "title": {
          "zh": "NVIDIA/cosmos",
          "en": "NVIDIA/cosmos"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "NVIDIA 推出的世界模型开放平台，提供预训练模型、数据集和工具，帮助开发者构建用于机器人、自动驾驶、智能基础设施等领域的物理 AI 系统。",
          "en": "Star NVIDIA / cosmos NVIDIA Cosmos is an open platform of world models, datasets, and tools that enables developers to build Physical AI for robots, autonomous vehicles, smart infrastructure, and more."
        },
        "totalStars": 9006,
        "language": "Jupyter Notebook",
        "dailyStars": 133,
        "chineseIntro": {
          "zh": "NVIDIA 推出的世界模型开放平台，提供预训练模型、数据集和工具，帮助开发者构建用于机器人、自动驾驶、智能基础设施等领域的物理 AI 系统。",
          "en": "Star NVIDIA / cosmos NVIDIA Cosmos is an open platform of world models, datasets, and tools that enables developers to build Physical AI for robots, autonomous vehicles, smart infrastructure, and more."
        },
        "todayHighlight": {
          "zh": "今日新增 133 星，总星数 9006，排名第六。NVIDIA 品牌背书和「世界模型」的前沿概念持续吸引关注，项目虽新但已积累近万星，在物理 AI 赛道具有标杆意义。",
          "en": "登上 GitHub Trending 日榜第 6 位, 项目切中 AI/LLM/Agent 工具链的高频痛点，开发者社区采用信号明显, 今日新增 133 星."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 9,006 stars、581 forks，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 9,006 stars and 581 forks, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "关注世界模型在物理 AI 中的产品化路径——如何将前沿研究转化为开发者可用的平台工具。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/NVIDIA/cosmos"
          }
        ]
      },
      {
        "title": {
          "zh": "github/copilot-sdk",
          "en": "github/copilot-sdk"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "GitHub 官方推出的多平台 SDK，帮助开发者将 GitHub Copilot Agent 集成到自己的应用和服务中。支持 Java、Python、Go 等多种语言。",
          "en": "Star github / copilot-sdk Multi-platform SDK for integrating GitHub Copilot Agent into apps and services"
        },
        "totalStars": 8979,
        "language": "Java",
        "dailyStars": 38,
        "chineseIntro": {
          "zh": "GitHub 官方推出的多平台 SDK，帮助开发者将 GitHub Copilot Agent 集成到自己的应用和服务中。支持 Java、Python、Go 等多种语言。",
          "en": "Star github / copilot-sdk Multi-platform SDK for integrating GitHub Copilot Agent into apps and services"
        },
        "todayHighlight": {
          "zh": "今日新增 38 星，总星数 8979，排名第十。作为官方 SDK，虽增速平稳，但凭借 GitHub 生态和 Copilot 的品牌效应，持续吸引企业级开发者关注。",
          "en": "登上 GitHub Trending 日榜第 10 位, 作为 Agent 生态的重要基础组件，随 Agent 应用爆发持续获得新增关注, 今日新增 38 星."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 8,979 stars、1,211 forks，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 8,979 stars and 1,211 forks, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "观察平台型公司如何通过 SDK 开放核心能力，构建开发者生态——从工具到平台的跃迁。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/github/copilot-sdk"
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
          "zh": "一个标志性的开源 AI Agent 项目，旨在让每个人都能构建、部署和运行自主 AI 代理。支持多种大模型，提供从简单任务到复杂工作流的自动化能力。",
          "en": "AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission is to provide the tools, so that you can focus on what matters."
        },
        "totalStars": 184766,
        "language": "Python",
        "dailyStars": null,
        "chineseIntro": {
          "zh": "一个标志性的开源 AI Agent 项目，旨在让每个人都能构建、部署和运行自主 AI 代理。支持多种大模型，提供从简单任务到复杂工作流的自动化能力。",
          "en": "AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission is to provide the tools, so that you can focus on what matters."
        },
        "todayHighlight": {
          "zh": "今日无新增星数数据，总星数 18.5 万，长期在榜。作为 AI Agent 领域的开创性项目，虽增速放缓，但凭借历史地位和社区基础，仍保持高曝光。",
          "en": "总 star 数已达 184k+，属于持续在榜的头部 AI 开源项目, 作为 Agent 生态的重要基础组件，随 Agent 应用爆发持续获得新增关注."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 184,766 stars、46,189 forks，topics: agentic-ai, agents, ai, artificial-intelligence, autonomous-agents，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 184,766 stars and 46,189 forks，topics: agentic-ai, agents, ai, artificial-intelligence, autonomous-agents, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "思考先驱项目的生命周期管理——如何在技术快速迭代中维持项目影响力和社区活力。",
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
          "zh": "ollama/ollama",
          "en": "ollama/ollama"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "一个让开发者轻松在本地运行大模型的工具，支持 DeepSeek、Qwen、Gemma 等主流开源模型。提供简洁的命令行和 API，是本地 AI 开发的首选基础设施。",
          "en": "Get up and running with Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and other models."
        },
        "totalStars": 173196,
        "language": "Go",
        "dailyStars": null,
        "chineseIntro": {
          "zh": "一个让开发者轻松在本地运行大模型的工具，支持 DeepSeek、Qwen、Gemma 等主流开源模型。提供简洁的命令行和 API，是本地 AI 开发的首选基础设施。",
          "en": "Get up and running with Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and other models."
        },
        "todayHighlight": {
          "zh": "今日无新增星数数据，总星数 17.3 万，长期霸榜。作为本地模型运行的事实标准，随着开源模型生态繁荣和隐私需求增长，持续吸引新用户。",
          "en": "总 star 数已达 173k+，属于持续在榜的头部 AI 开源项目, 项目切中 AI/LLM/Agent 工具链的高频痛点，开发者社区采用信号明显."
        },
        "inclusionReason": {
          "zh": "昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 173,196 stars、16,443 forks，topics: deepseek, gemma, gemma3, glm, go，可作为开发者采用和技术趋势信号观察。",
          "en": "Updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 173,196 stars and 16,443 forks，topics: deepseek, gemma, gemma3, glm, go, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "关注「本地化」趋势下的产品机会——如何降低模型部署门槛，成为 AI 时代的「Docker」。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/ollama/ollama"
          }
        ]
      }
    ],
    "companyUpdates": [
      {
        "title": {
          "zh": "OpenAI: How Endava is redesigning software delivery around AI agents",
          "en": "OpenAI: How Endava is redesigning software delivery around AI agents"
        },
        "category": {
          "zh": "公司动态",
          "en": "Company update"
        },
        "eventType": {
          "zh": "生态合作",
          "en": "生态合作"
        },
        "summary": {
          "zh": "OpenAI 与 IT 服务商 Endava 合作，利用 AI 代理、ChatGPT Enterprise 和 Codex 加速软件交付并自动化工作流。",
          "en": "Learn how Endava is using AI agents, ChatGPT Enterprise, and Codex to accelerate software delivery, automate workflows, and build an AI-native culture across the enterprise."
        },
        "chineseIntro": {
          "zh": "OpenAI 与 IT 服务商 Endava 合作，利用 AI 代理、ChatGPT Enterprise 和 Codex 加速软件交付并自动化工作流。",
          "en": "Learn how Endava is using AI agents, ChatGPT Enterprise, and Codex to accelerate software delivery, automate workflows, and build an AI-native culture across the enterprise."
        },
        "todayHighlight": {
          "zh": "展示 AI 代理在企业级软件交付中的实际落地，为行业提供可复用的 AI 原生文化转型案例。",
          "en": "展示 AI 代理在企业级软件交付中的实际落地，为行业提供可复用的 AI 原生文化转型案例。"
        },
        "pmInsight": {
          "zh": "PM 可关注 Endava 如何将 AI 代理嵌入现有开发流程，评估自身团队引入类似工具的 ROI。",
          "en": "Track how platform companies shift capability boundaries, vertical scenarios, and monetization narratives."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/endava-frontiers"
          }
        ]
      },
      {
        "title": {
          "zh": "OpenAI: Dreaming: Better memory for a more helpful ChatGPT",
          "en": "OpenAI: Dreaming: Better memory for a more helpful ChatGPT"
        },
        "category": {
          "zh": "公司动态",
          "en": "Company update"
        },
        "eventType": {
          "zh": "产品功能",
          "en": "产品功能"
        },
        "summary": {
          "zh": "ChatGPT 推出新记忆系统“Dreaming”，能更好记住用户偏好，保持对话上下文连贯。",
          "en": "ChatGPT introduces a new memory system to better remember preferences, keeping context fresh and relevant across conversations."
        },
        "chineseIntro": {
          "zh": "ChatGPT 推出新记忆系统“Dreaming”，能更好记住用户偏好，保持对话上下文连贯。",
          "en": "ChatGPT introduces a new memory system to better remember preferences, keeping context fresh and relevant across conversations."
        },
        "todayHighlight": {
          "zh": "记忆能力是对话式 AI 用户体验的关键瓶颈，此更新可能显著提升用户粘性和个性化体验。",
          "en": "记忆能力是对话式 AI 用户体验的关键瓶颈，此更新可能显著提升用户粘性和个性化体验。"
        },
        "pmInsight": {
          "zh": "PM 应测试记忆系统在长对话中的表现，并思考如何利用记忆功能设计更智能的个性化交互流程。",
          "en": "Track how platform companies shift capability boundaries, vertical scenarios, and monetization narratives."
        },
        "impact": "High",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/chatgpt-memory-dreaming"
          }
        ]
      },
      {
        "title": {
          "zh": "OpenAI: Biodefense in the Intelligence Age",
          "en": "OpenAI: Biodefense in the Intelligence Age"
        },
        "category": {
          "zh": "公司动态",
          "en": "Company update"
        },
        "eventType": {
          "zh": "政策/安全",
          "en": "政策/安全"
        },
        "summary": {
          "zh": "OpenAI 发布 AI 驱动的生物防御行动计划，旨在增强生物安全韧性。",
          "en": "An action plan for AI-powered biological resilience"
        },
        "chineseIntro": {
          "zh": "OpenAI 发布 AI 驱动的生物防御行动计划，旨在增强生物安全韧性。",
          "en": "An action plan for AI-powered biological resilience"
        },
        "todayHighlight": {
          "zh": "AI 在生物安全领域的应用正从理论走向政策层面，OpenAI 此举可能推动行业标准制定。",
          "en": "AI 在生物安全领域的应用正从理论走向政策层面，OpenAI 此举可能推动行业标准制定。"
        },
        "pmInsight": {
          "zh": "PM 需关注 AI 在生物安全领域的合规要求，提前规划产品在敏感场景下的安全边界。",
          "en": "Track how platform companies shift capability boundaries, vertical scenarios, and monetization narratives."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/biodefense-in-the-intelligence-age"
          }
        ]
      },
      {
        "title": {
          "zh": "OpenAI: Introducing new capabilities to GPT-Rosalind",
          "en": "OpenAI: Introducing new capabilities to GPT-Rosalind"
        },
        "category": {
          "zh": "公司动态",
          "en": "Company update"
        },
        "eventType": {
          "zh": "新模型/新能力",
          "en": "新模型/新能力"
        },
        "summary": {
          "zh": "GPT-Rosalind 新增生物学推理、药物化学、基因组学分析和实验工作流能力，强化生命科学研究支持。",
          "en": "GPT-Rosalind advances life sciences research with enhanced biological reasoning, medicinal chemistry expertise, genomics analysis, and experimental workflow capabilities."
        },
        "chineseIntro": {
          "zh": "GPT-Rosalind 新增生物学推理、药物化学、基因组学分析和实验工作流能力，强化生命科学研究支持。",
          "en": "GPT-Rosalind advances life sciences research with enhanced biological reasoning, medicinal chemistry expertise, genomics analysis, and experimental workflow capabilities."
        },
        "todayHighlight": {
          "zh": "垂直领域模型能力大幅提升，可能加速 AI 在药物发现和基因组学中的商业化应用。",
          "en": "垂直领域模型能力大幅提升，可能加速 AI 在药物发现和基因组学中的商业化应用。"
        },
        "pmInsight": {
          "zh": "PM 可评估 GPT-Rosalind 在自身生物医药产品中的集成潜力，特别是实验工作流自动化场景。",
          "en": "Track how platform companies shift capability boundaries, vertical scenarios, and monetization narratives."
        },
        "impact": "High",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind"
          }
        ]
      }
    ]
  }
];
