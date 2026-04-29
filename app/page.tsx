"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { useState } from "react";

type CrateItem = {
  id: string;
  title: string;
  type: string;
  tag: string;
  image?: string;
  content: string;
  details?: DetailSection[];
};

type DetailSection = {
  heading: string;
  body?: string;
  points?: Array<{
    label: string;
    text: string;
  }>;
};

const ITEMS: CrateItem[] = [
  {
    id: "easypromo",
    title: "EASYPROMO",
    type: "Marketing Plan & Brief Generation Agent",
    tag: "SYS.AGENT_ORCHESTRATOR",
    image: "./assets/01.png",
    content:
      "专注于复杂营销方案自动生成的全链路协作引擎。系统将传统高度依赖人工的策略 SOP 解构为可被计算的标准流，采用 Orchestrator 中央调度架构动态分配子任务。底层集成多模型动态路由（Claude/GPT-4o/Qwen）以平衡输出质量与算力成本，并内置包含多源 RAG 检索、策略 Critic 选优与自动化校验的质量闭环体系。最终实现将数十小时的非标准文案交付压缩至 30 分钟以内的高可用输出。",
    details: [
      {
        heading: "[ SYSTEM OVERVIEW ] 系统概述",
        body: "多体协作 (Multi-Agent) 驱动的自动化营销策划生成引擎。系统旨在将传统非标准化的策略 SOP 降维，转化为可被大模型精确执行的标准化计算流，从而实现长文本方案的规模化输出。",
      },
      {
        heading: "[ ARCHITECTURE ] 核心架构",
        points: [
          {
            label: "编排模式",
            text: "采用 Orchestrator 中央调度架构，规避了线性 Pipeline 导致的置信度指数级衰减问题。",
          },
          {
            label: "动态路由",
            text: "底层集成多模型调度策略，Claude/GPT-4o 负责创意叙事层的生成，Qwen 负责信息降维与结构化解析，实现算力成本与输出质量的动态平衡。",
          },
          {
            label: "质量闭环",
            text: "内置多源 RAG 检索阵列、策略 Critic 自动选优与循环修复机制，确保长文内容的一致性与逻辑闭环。",
          },
        ],
      },
      {
        heading: "[ PERFORMANCE ] 交付表现",
        body: "支持对话式意图输入与两级智能分发（Tool Call + 正则兜底）。将原本耗时数天的投标级全案交付周期压缩至 30 分钟以内，全自动完成率突破 90%。",
      },
    ],
  },
  {
    id: "deepinsight",
    title: "DEEPINSIGHT",
    type: "Game Industry Sentiment & PR Analysis Agent",
    tag: "DATA.SENTIMENT_PIPELINE",
    image: "./assets/02.png",
    content:
      "面向复杂游戏舆情环境的结构化智能分析平台。系统直连海内外 10+ 社交与内容生态，通过自动化 Pipeline 完成异构数据的采集、清洗与合规去重。核心分析引擎摒弃低置信度的黑盒预测，聚焦于事实级的数据驱动：支持全维度的情感拆解、高热话题追踪与异常信号识别。终端提供对话式交互与多场景报告自动生成能力，实现从海量噪音到高信噪比商业情报的即时转化。",
    details: [
      {
        heading: "[ SYSTEM OVERVIEW ] 系统概述",
        body: "专为游戏行业定制的结构化智能舆情分析平台。针对头部游戏极其复杂的跨平台玩家交互生态，提供从海量社群噪音到结构化商业情报的自动化提纯与洞察生成。",
      },
      {
        heading: "[ ARCHITECTURE ] 核心架构",
        points: [
          {
            label: "数据管线",
            text: "直连 10+ 海内外垂直社区与内容生态，执行异构数据标准化、脱敏与实体去重，摒弃低置信度的黑盒情绪预测，坚持事实与数据驱动。",
          },
          {
            label: "分析引擎",
            text: "支持深层话题下钻、跨游戏竞品声量对比、高热异常信号识别与恶意内容分级池化，将非结构化反馈映射为结构化标签体系。",
          },
        ],
      },
      {
        heading: "[ PERFORMANCE ] 交付表现",
        body: "终端配备对话式交互中枢，支持针对特定游戏版本或运营活动的动态检索。自动化输出涵盖运营日报、专题深挖报告等 6+ 种核心业务版式，实现分钟级的情报流转。",
      },
    ],
  },
  {
    id: "zhongyou-hub",
    title: "ZHONGYOU HUB",
    type: "Creator Multi-platform Management & Settlement SaaS",
    tag: "SAAS.MULTI_TENANT",
    image: "./assets/03.png",
    content:
      "四端联动的创作者生态中枢与清算系统。作为连接游戏厂商、MCN 机构与达人的业务基础设施，底层构建了严密的“项目-周期-任务”三级拓扑架构以支撑跨周期追踪与预算防重。核心能力包含高扩展性的动态激励规则引擎（支持多维度组合计价），以及集成防刷风控的三端级联分佣与自动化结算工作流，保障海量内容与资金的闭环流转。",
    details: [
      {
        heading: "[ SYSTEM OVERVIEW ] 系统概述",
        body: "支撑海量游戏达人内容生态与资金流转的四端 SaaS 基础设施。面向厂商、MCN 与创作者群体，提供贯穿全生命周期的商业化分发与合规清算中枢。",
      },
      {
        heading: "[ ARCHITECTURE ] 核心架构",
        points: [
          {
            label: "拓扑结构",
            text: "底层构建“项目-周期-任务组”三级架构，确保跨周期数据的唯一性与连续性，并预留了支持多语言与跨区业务扩展的国际化底层框架。",
          },
          {
            label: "计价与清算",
            text: "核心集成动态激励规则引擎，支持 SABC 分级矩阵与多维组合计价；串联三端级联分佣模块，实现精准的资金切分与拨付。",
          },
        ],
      },
      {
        heading: "[ PERFORMANCE ] 交付表现",
        body: "构建了全链路防刷风控与分级智能审核机制（自动化小额审批与大额人工流转介入）。稳定承载超 3.2 亿次内容曝光与百万级预算流转，数据大盘提供双视角的 ROI 实时监控指标。",
      },
    ],
  },
  {
    id: "eventfull",
    title: "EVENTFULL",
    type: "Social Event Management Hub",
    tag: "SOCIAL.PRIVACY_MATCHING",
    image: "./assets/04.png",
    content:
      "全能的社交活动管理中枢，帮助用户精准切换私密社交与公域社交模式。系统在保护隐私的同时，让兴趣活动被真正匹配的人发现、报名和持续互动。",
    details: [
      {
        heading: "[ SYSTEM OVERVIEW ] 项目概览",
        body: "这是一个全能的社交活动管理中枢。它的核心任务只有一件事：帮用户精准切换“私密社交”与“公域社交”模式。无论是几个人的秘密聚会，还是几百人的兴趣小组，系统都能在保证隐私的同时，让好玩的活动被对的人发现。",
      },
      {
        heading: "[ ARCHITECTURE ] 核心逻辑",
        points: [
          {
            label: "双向社交控制",
            text: "系统将活动分为“私人”和“公开”两套逻辑。私人模式下，活动只在小圈子内可见；公开模式下，活动会推送到大厅，让全城有相同标签的人都能搜索并报名。",
          },
          {
            label: "自动兴趣匹配",
            text: "系统根据用户年龄、喜好等标签进行精准画像，不再依赖死板列表。喜欢健身或音乐的用户会优先在首页看到相关兴趣小组和本地活动。",
          },
          {
            label: "分层聊天系统",
            text: "聊天功能被拆解为私聊与群聊两个层级。私聊用于一对一细节确认，群聊用于社区消息同步和文件共享，并通过实时技术保障低延迟沟通。",
          },
        ],
      },
    ],
  },
  {
    id: "zhongyou-portal",
    title: "ZHONGYOU PORTAL",
    type: "Official Showcase & Lead Generation Portal",
    tag: "WEB.I18N_PORTAL",
    image: "./assets/05.png",
    content:
      "面向中游网业务的官方展示与获客门户。通过清晰的信息区块、轻量游戏化交互与低成本双语内容管线，提升 B 端客户的信息理解和留资转化效率。",
    details: [
      {
        heading: "[ SYSTEM OVERVIEW ] 系统概述",
        body: "面向中游网（Zhongyou Hub）业务的官方展示与获客门户。网站以清晰的区块结构（功能特性、业务流程、行动呼吁）为核心，结合轻量级的游戏化交互，提供兼具专业度与品牌个性的内容浏览体验。",
      },
      {
        heading: "[ CORE FEATURES ] 核心逻辑",
        points: [
          {
            label: "自动化翻译管线",
            text: "构建了基于大模型的异步翻译工作流。配置端单次调用大模型 API 翻译后，结果直接存入英文版数据库。前端直接读取静态数据，避免实时翻译延迟与 API 调用成本。",
          },
          {
            label: "数据动态同步",
            text: "打通官网展示层与后台业务系统的 API，实现 QA 问答库等动态内容的前后台双向同步，降低人工维护成本。",
          },
          {
            label: "互动转化设计",
            text: "在关键的信息流转节点加入类似游戏界面的微动效反馈，在不破坏 B 端专业感的前提下，引导用户向核心 CTA 区域转化。",
          },
        ],
      },
      {
        heading: "[ PERFORMANCE ] 业务价值",
        body: "以极低的开发和维护成本实现了高可用的中英双语官网，通过清晰的信息层级与流畅的交互动线，有效提升了产品对潜在 B 端客户的展示效率与留资转化率。",
      },
    ],
  },
  {
    id: "studio-gallery",
    title: "STUDIO GALLERY",
    type: "Digital Gallery for Independent Design Studio",
    tag: "WEB.GALLERY_SYSTEM",
    image: "./assets/06.jpg",
    content:
      "为独立设计工作室定制的线上数字画廊。以极简排版和自适应媒介框架承载多类型作品，同时保留清晰、低阻力的商业合作入口。",
    details: [
      {
        heading: "[ SYSTEM OVERVIEW ] 系统概述",
        body: "为独立设计工作室定制的线上数字画廊。网站以“UI 退让于内容”为核心设计原则，通过极致克制的留白和极简排版，将视觉焦点完全交还给艺术作品本身。",
      },
      {
        heading: "[ CORE FEATURES ] 核心逻辑",
        points: [
          {
            label: "多媒介展示框架",
            text: "针对平面设计、字体排印、摄影等不同比例和质感的视觉资产，设计统一且自适应的网格容器，确保跨设备浏览时的比例完美与视觉对齐。",
          },
          {
            label: "极简视觉语言",
            text: "摒弃所有多余的装饰性组件，仅通过网格系统、无衬线字体的字重对比以及精确的负空间来搭建界面的信息层级。",
          },
          {
            label: "商业连接路径",
            text: "在沉浸式作品展示的底层逻辑中，自然嵌入低阻力的合作联络模块，确保用户在产生意向时能以最短路径触达主理人。",
          },
        ],
      },
      {
        heading: "[ PERFORMANCE ] 业务价值",
        body: "成功将跨领域的零散创作整合为具有高度统一品牌基调的线上阵地。在维持工作室极简、高冷审美设定的同时，提供了清晰、友好的商业合作入口。",
      },
    ],
  },
];

const SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 25,
} as const;

const COVER_WIDTH = 176;
const COVER_HEIGHT = 218;
const STACK_STEP = 88;
const PARTING_DISTANCE = 40;
const HOVER_LIFT = -32;

export default function Page() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem = selectedIndex === null ? null : ITEMS[selectedIndex];

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 font-sans text-zinc-50">
      <LayoutGroup>
        <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col overflow-hidden border-x border-zinc-800 bg-zinc-950">
          <TypographicBaseCanvas
            isActive={hoveredIndex !== null}
            isMuted={selectedIndex !== null}
          />

          <header className="relative z-10 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/70 px-4 sm:px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              WENJUN / Product Portfolio
            </p>
            <a
              href="./resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 items-center gap-2 border border-zinc-800 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            >
              <FileText aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>Resume PDF</span>
            </a>
          </header>

          <div className="relative z-10 grid flex-1 grid-rows-[1fr_auto]">
            <section
              className="relative grid place-items-center px-4 pb-6 pt-6 sm:px-6"
              onClick={() => {
                if (selectedIndex !== null) {
                  setSelectedIndex(null);
                  setHoveredIndex(null);
                }
              }}
            >
              <AnimatePresence mode="popLayout">
                {selectedItem && selectedIndex !== null ? (
                  <DetailView
                    key={selectedItem.id}
                    item={selectedItem}
                    selectedIndex={selectedIndex}
                    onClose={() => {
                      setSelectedIndex(null);
                      setHoveredIndex(null);
                    }}
                  />
                ) : (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="sr-only"
                  />
                )}
              </AnimatePresence>
            </section>

            <Crate
              hoveredIndex={hoveredIndex}
              selectedIndex={selectedIndex}
              onHover={setHoveredIndex}
              onSelect={setSelectedIndex}
            />
          </div>
        </section>
      </LayoutGroup>
    </main>
  );
}

function TypographicBaseCanvas({
  isActive,
  isMuted,
}: {
  isActive: boolean;
  isMuted: boolean;
}) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-0 w-full px-4 pt-14 sm:px-6 sm:pt-[4.5rem]">
      <div className="select-none font-sans text-[clamp(2.4rem,5.6vw,6.4rem)] font-black uppercase leading-[0.9] tracking-tighter">
        <motion.p
          animate={{
            color: isMuted ? "#18181b" : isActive ? "#52525b" : "#3f3f46",
          }}
          transition={{ duration: 0.22 }}
        >
          WENJUN.
        </motion.p>
        <motion.p
          animate={{
            color: isMuted ? "#18181b" : isActive ? "#27272a" : "#3f3f46",
          }}
          transition={{ duration: 0.22 }}
        >
          AI-NATIVE WORKFLOWS.
        </motion.p>
        <motion.p
          animate={{
            color: isMuted ? "#18181b" : isActive ? "#27272a" : "#3f3f46",
          }}
          transition={{ duration: 0.22 }}
        >
          SAAS SYSTEMS.
        </motion.p>
        <motion.p
          animate={{
            color: isMuted ? "#18181b" : isActive ? "#27272a" : "#3f3f46",
          }}
          transition={{ duration: 0.22 }}
        >
          BASED IN SHANGHAI.
        </motion.p>
      </div>
    </div>
  );
}

function Crate({
  hoveredIndex,
  selectedIndex,
  onHover,
  onSelect,
}: {
  hoveredIndex: number | null;
  selectedIndex: number | null;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}) {
  const totalWidth = COVER_WIDTH + STACK_STEP * (ITEMS.length - 1);

  return (
    <section className="relative h-[270px] overflow-hidden border-t border-zinc-800 bg-zinc-950 sm:h-[300px]">
      <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-zinc-800 px-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 sm:px-6">
        <span>Record crate</span>
        <span>{selectedIndex === null ? "Hover / click" : "Selected"}</span>
      </div>

      <div
        className="absolute bottom-6 left-1/2 h-[218px]"
        style={{ width: totalWidth, transform: "translateX(-50%)" }}
        onMouseLeave={() => onHover(null)}
      >
        {ITEMS.map((item, index) => {
          const selected = selectedIndex === index;
          const hiddenBySelection = selectedIndex !== null && !selected;
          const isHovered = hoveredIndex === index && selectedIndex === null;
          const isBeforeHovered =
            hoveredIndex !== null && index < hoveredIndex && selectedIndex === null;
          const isAfterHovered =
            hoveredIndex !== null && index > hoveredIndex && selectedIndex === null;

          const x =
            isBeforeHovered
              ? -PARTING_DISTANCE
              : isAfterHovered
                ? PARTING_DISTANCE
                : 0;

          return (
            <motion.button
              key={item.id}
              type="button"
              aria-label={`Select ${item.title}`}
              onMouseEnter={() => onHover(index)}
              onFocus={() => onHover(index)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(index)}
              className="absolute bottom-0 top-auto block outline-none"
              style={{
                left: index * STACK_STEP,
                width: COVER_WIDTH,
                zIndex: isHovered ? 30 : index + 1,
              }}
              animate={{
                x,
                y: isHovered ? HOVER_LIFT : 0,
                opacity: hiddenBySelection ? 0 : 1,
              }}
              transition={SPRING}
              disabled={selectedIndex !== null}
            >
              {!selected && (
                <motion.div
                  layoutId={`crate-cover-${item.id}`}
                  transition={SPRING}
                  className="h-[218px] w-[176px] border border-zinc-800 bg-zinc-950 text-left"
                >
                  <Cover item={item} index={index} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

function DetailView({
  item,
  selectedIndex,
  onClose,
}: {
  item: CrateItem;
  selectedIndex: number;
  onClose: () => void;
}) {
  return (
    <div
      className="grid w-full max-w-5xl items-start gap-6 md:grid-cols-[minmax(220px,34vh)_minmax(0,1fr)] md:gap-8"
      onClick={(event) => event.stopPropagation()}
      role="presentation"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-9 items-center gap-2 border border-zinc-700 bg-zinc-950 px-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        aria-label="Close selected item"
      >
        <span>[</span>
        <span>Close</span>
        <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span>]</span>
      </button>

      <div className="w-[min(52vw,280px)] md:w-full" onClick={(event) => event.stopPropagation()}>
        <motion.div
          layoutId={`crate-cover-${item.id}`}
          transition={SPRING}
          className="aspect-[4/5] w-full border border-zinc-800 bg-zinc-950"
        >
          <Cover item={item} index={selectedIndex} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
        className="grid min-h-full content-start gap-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            {item.tag} / {item.type}
          </p>
          <h2 className="text-3xl font-black uppercase leading-[0.88] tracking-tighter text-zinc-50 sm:text-5xl">
            {item.title}
          </h2>
        </div>

        <div className="aspect-[16/10] max-h-[280px] w-full border border-zinc-800 bg-zinc-900">
          <ProjectImage item={item} selectedIndex={selectedIndex} />
        </div>

        <ProjectNarrative item={item} />
      </motion.div>
    </div>
  );
}

function ProjectNarrative({ item }: { item: CrateItem }) {
  if (!item.details) {
    return (
      <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
        {item.content}
      </p>
    );
  }

  return (
    <div className="grid max-w-2xl gap-3">
      {item.details.map((section) => (
        <section
          key={section.heading}
          className="border-t border-zinc-800 pt-3 first:border-t-0 first:pt-0"
        >
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            {section.heading}
          </p>
          {section.body ? (
            <p className="text-[13px] leading-relaxed text-zinc-300">
              {section.body}
            </p>
          ) : null}
          {section.points ? (
            <div className="grid gap-2">
              {section.points.map((point) => (
                <p key={point.label} className="text-[13px] leading-relaxed text-zinc-300">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                    {point.label}:
                  </span>{" "}
                  {point.text}
                </p>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function ProjectImage({
  item,
  selectedIndex,
}: {
  item: CrateItem;
  selectedIndex: number;
}) {
  return (
    <div className="h-full w-full overflow-hidden bg-zinc-900 grayscale contrast-90 brightness-90">
      {item.image ? (
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <Blueprint index={selectedIndex} />
      )}
    </div>
  );
}

function Cover({
  item,
  index,
}: {
  item: CrateItem;
  index: number;
}) {
  const displayIndex = String(index + 1).padStart(2, "0");
  const maskImage =
    "radial-gradient(circle at center, transparent 24%, black 24.7%)";

  return (
    <div className="relative h-full w-full overflow-hidden border border-zinc-800 bg-zinc-950">
      <div className="absolute inset-0 bg-zinc-800 grayscale contrast-75 brightness-75">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <Blueprint index={index} />
        )}
      </div>

      <div
        className="absolute inset-0 z-10 bg-zinc-950"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 aspect-square w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-500/55">
        <div className="absolute inset-[13%] rounded-full border border-zinc-600/65" />
        <div className="absolute inset-[29%] rounded-full border border-zinc-500/45" />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500/70" />
      </div>

      <div className="absolute inset-0 z-20 border border-zinc-800" />

      <div className="absolute left-3 top-3 z-30 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        [ {displayIndex} ]
      </div>
      <div className="absolute right-3 top-3 z-30 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-700">
        WJ
      </div>

      <div className="absolute bottom-3 left-3 right-[4.6rem] z-30">
        <h3 className="text-xl font-black leading-[0.88] tracking-[-0.05em] text-zinc-100">
          {item.title}
        </h3>
      </div>

      <div className="absolute bottom-3 right-3 z-30 max-w-[4rem] text-right font-mono text-[9px] uppercase leading-none tracking-[0.18em] text-zinc-500">
        {item.tag}
      </div>
    </div>
  );
}

function Blueprint({ index }: { index: number }) {
  const offset = index % 4;

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-800 opacity-70">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,244,245,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,244,245,0.1)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div className="absolute left-[12%] top-[16%] h-[26%] w-[48%] border border-zinc-500/60" />
      <div className="absolute bottom-[18%] right-[12%] h-[32%] w-[42%] border border-zinc-500/50" />
      <div
        className="absolute h-px bg-zinc-500/60"
        style={{
          left: `${16 + offset * 4}%`,
          right: "18%",
          top: `${40 + offset * 6}%`,
        }}
      />
      <div
        className="absolute w-px bg-zinc-500/50"
        style={{
          top: "18%",
          bottom: `${20 + offset * 3}%`,
          left: `${46 + offset * 5}%`,
        }}
      />
      <div className="absolute left-[20%] top-[24%] h-2 w-2 bg-zinc-400/70" />
      <div className="absolute right-[24%] top-[54%] h-2 w-2 bg-zinc-400/60" />
      <div className="absolute bottom-[24%] left-[34%] h-2 w-2 bg-zinc-400/50" />
    </div>
  );
}
