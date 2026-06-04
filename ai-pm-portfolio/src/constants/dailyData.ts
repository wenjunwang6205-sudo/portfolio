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
    "date": "2026-06-04",
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
      "zh": "本次抓取覆盖 30 个 GitHub AI 项目和 18 条 AI 公司动态，优先关注近期仍在活跃更新的 Agent、LLM 与 AI 工具方向。",
      "en": "This run collected 30 AI GitHub projects and 18 company updates, prioritizing active Agent, LLM, and AI tooling signals."
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
          "zh": "OpenAI 的最新动态「How Endava is redesigning software delivery around AI agents」值得回看其背后的平台策略和产品能力边界。",
          "en": "OpenAI's update \"How Endava is redesigning software delivery around AI agents\" is worth reading for platform strategy and product capability boundaries."
        },
        "pmInsight": {
          "zh": "大公司动作通常会改变用户对 AI 产品的默认预期，独立产品更需要寻找垂直任务和行业 SOP 的切入点。",
          "en": "Major company moves often reset user expectations for AI products, so independent products need sharper vertical tasks and industry SOP entry points."
        },
        "impact": "Medium",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/endava-frontiers"
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
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 206,325 stars、31,683 forks，topics: ai-agents, anthropic, claude, claude-code, developer-tools，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 206,325 stars and 31,683 forks，topics: ai-agents, anthropic, claude, claude-code, developer-tools, making it a developer adoption and trend signal."
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
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 184,743 stars、46,185 forks，topics: agentic-ai, agents, ai, artificial-intelligence, autonomous-agents，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 184,743 stars and 46,185 forks，topics: agentic-ai, agents, ai, artificial-intelligence, autonomous-agents, making it a developer adoption and trend signal."
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
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 179,866 stars、30,825 forks，topics: ai, ai-agent, ai-agents, anthropic, chatgpt，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 179,866 stars and 30,825 forks，topics: ai, ai-agent, ai-agents, anthropic, chatgpt, making it a developer adoption and trend signal."
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
          "zh": "Get up and running with Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and other models.",
          "en": "Get up and running with Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and other models."
        },
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 173,122 stars、16,425 forks，topics: deepseek, gemma, gemma3, glm, go，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 173,122 stars and 16,425 forks，topics: deepseek, gemma, gemma3, glm, go, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/ollama/ollama"
          }
        ]
      },
      {
        "title": {
          "zh": "f/prompts.chat",
          "en": "f/prompts.chat"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "f.k.a. Awesome ChatGPT Prompts. Share, discover, and collect prompts from the community. Free and open source — self-host for your organization with complete privacy.",
          "en": "f.k.a. Awesome ChatGPT Prompts. Share, discover, and collect prompts from the community. Free and open source — self-host for your organization with complete privacy."
        },
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 163,286 stars、21,221 forks，topics: ai, artificial-intelligence, awesome-list, chatgpt, chatgpt-prompts，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 163,286 stars and 21,221 forks，topics: ai, artificial-intelligence, awesome-list, chatgpt, chatgpt-prompts, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/f/prompts.chat"
          }
        ]
      },
      {
        "title": {
          "zh": "huggingface/transformers",
          "en": "huggingface/transformers"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "🤗 Transformers: the model-definition framework for state-of-the-art machine learning models in text, vision, audio, and multimodal models, for both inference and training. ",
          "en": "🤗 Transformers: the model-definition framework for state-of-the-art machine learning models in text, vision, audio, and multimodal models, for both inference and training. "
        },
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 161,266 stars、33,405 forks，topics: audio, deep-learning, deepseek, gemma, glm，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 161,266 stars and 33,405 forks，topics: audio, deep-learning, deepseek, gemma, glm, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/huggingface/transformers"
          }
        ]
      },
      {
        "title": {
          "zh": "langflow-ai/langflow",
          "en": "langflow-ai/langflow"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "Langflow is a powerful tool for building and deploying AI-powered agents and workflows.",
          "en": "Langflow is a powerful tool for building and deploying AI-powered agents and workflows."
        },
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 149,210 stars、9,185 forks，topics: agents, chatgpt, generative-ai, large-language-models, multiagent，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 149,210 stars and 9,185 forks，topics: agents, chatgpt, generative-ai, large-language-models, multiagent, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/langflow-ai/langflow"
          }
        ]
      },
      {
        "title": {
          "zh": "langgenius/dify",
          "en": "langgenius/dify"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "Production-ready platform for agentic workflow development.",
          "en": "Production-ready platform for agentic workflow development."
        },
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 143,800 stars、22,628 forks，topics: agent, agentic-ai, agentic-framework, agentic-workflow, ai，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 143,800 stars and 22,628 forks，topics: agent, agentic-ai, agentic-framework, agentic-workflow, ai, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/langgenius/dify"
          }
        ]
      },
      {
        "title": {
          "zh": "open-webui/open-webui",
          "en": "open-webui/open-webui"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "User-friendly AI Interface (Supports Ollama, OpenAI API, ...)",
          "en": "User-friendly AI Interface (Supports Ollama, OpenAI API, ...)"
        },
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 139,950 stars、20,098 forks，topics: ai, llm, llm-ui, llm-webui, llms，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 139,950 stars and 20,098 forks，topics: ai, llm, llm-ui, llm-webui, llms, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/open-webui/open-webui"
          }
        ]
      },
      {
        "title": {
          "zh": "langchain-ai/langchain",
          "en": "langchain-ai/langchain"
        },
        "category": {
          "zh": "GitHub 项目",
          "en": "GitHub project"
        },
        "summary": {
          "zh": "The agent engineering platform.",
          "en": "The agent engineering platform."
        },
        "inclusionReason": {
          "zh": "入选原因：昨日以来仍有更新，且属于 AI/LLM/Agent/RAG 相关方向；当前约 138,474 stars、22,942 forks，topics: agents, ai, ai-agents, anthropic, chatgpt，可作为开发者采用和技术趋势信号观察。",
          "en": "Why included: updated since yesterday and relevant to AI/LLM/Agent/RAG; currently around 138,474 stars and 22,942 forks，topics: agents, ai, ai-agents, anthropic, chatgpt, making it a developer adoption and trend signal."
        },
        "pmInsight": {
          "zh": "可作为判断 AI 应用形态和开发者采用方向的早期信号，建议打开原项目看 README、示例场景和近期提交。",
          "en": "Use it as an early signal for AI application patterns and developer adoption. Review the README, examples, and recent commits."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "GitHub Repository",
            "url": "https://github.com/langchain-ai/langchain"
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
        "summary": {
          "zh": "Learn how Endava is using AI agents, ChatGPT Enterprise, and Codex to accelerate software delivery, automate workflows, and build an AI-native culture across the enterprise.",
          "en": "Learn how Endava is using AI agents, ChatGPT Enterprise, and Codex to accelerate software delivery, automate workflows, and build an AI-native culture across the enterprise."
        },
        "pmInsight": {
          "zh": "可从中观察平台公司正在强化的能力边界、行业场景和商业化叙事。",
          "en": "Use this to observe the capability boundaries, vertical scenarios, and commercialization narrative platform companies are emphasizing."
        },
        "impact": "Watch",
        "sources": [
          {
            "label": "OpenAI",
            "url": "https://openai.com/index/endava-frontiers"
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
