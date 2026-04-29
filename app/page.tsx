"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { useState } from "react";

type CrateItem = {
  id: string;
  title: string;
  type: string;
  content: string;
};

const ITEMS: CrateItem[] = [
  {
    id: "deepinsight",
    title: "DeepInsight",
    type: "Game Industry Sentiment & PR Analysis Agent",
    content:
      "A product intelligence agent that scans player discourse, classifies PR risk, and turns noisy community feedback into structured decision signals.",
  },
  {
    id: "easypromo",
    title: "EasyPromo",
    type: "Marketing Plan & Brief Generation Agent",
    content:
      "A planning workflow that transforms campaign inputs into positioning, channel strategy, creative briefs, and review-ready launch documents.",
  },
  {
    id: "zhongyou-hub",
    title: "Zhongyou Hub",
    type: "Creator Multi-platform Management & Settlement SaaS",
    content:
      "A creator operations platform for account binding, campaign delivery, revenue attribution, exception handling, and settlement tracking.",
  },
  {
    id: "data-orchestrator",
    title: "Data Orchestrator",
    type: "LLM Workflow & Multi-agent System",
    content:
      "An orchestration layer for task graphs, tool calls, agent roles, retries, evaluation states, and human review checkpoints.",
  },
  {
    id: "node-flow",
    title: "Node Flow",
    type: "Visual Workflow Builder",
    content:
      "A node-based interface for mapping product logic, dependencies, fallback paths, and operator-controlled automation sequences.",
  },
  {
    id: "genesis",
    title: "Genesis",
    type: "0-1 Product Discovery System",
    content:
      "A discovery system that turns ambiguous opportunities into problem frames, evidence maps, MVP scopes, and validation plans.",
  },
  {
    id: "vector-db",
    title: "Vector DB",
    type: "Knowledge Retrieval Infrastructure",
    content:
      "A retrieval layer for organizing product knowledge, source references, semantic search, and context assembly for AI workflows.",
  },
  {
    id: "metric-sync",
    title: "Metric Sync",
    type: "Business Metrics Alignment Dashboard",
    content:
      "A metrics workspace that aligns definitions, ownership, anomaly review, and recurring business decision rituals.",
  },
];

const SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 25,
} as const;

const COVER_WIDTH = 176;
const COVER_HEIGHT = 218;
const STACK_STEP = 70;
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
            <section className="relative grid place-items-center px-4 pb-6 pt-6 sm:px-6">
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
                    className="w-full max-w-4xl"
                  >
                    <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-500">
                      Index / 08 objects
                    </p>
                    <h1 className="max-w-4xl text-5xl font-semibold leading-[0.9] tracking-[-0.05em] text-zinc-50 sm:text-6xl lg:text-7xl">
                      Select work by extraction.
                    </h1>
                    <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500">
                      A single-view archive for product systems, agents, and
                      operating logic. Hover to part the crate. Click to extract.
                    </p>
                  </motion.div>
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
    <div className="pointer-events-none absolute left-0 top-0 z-0 w-full px-4 pt-16 sm:px-6 sm:pt-20">
      <div className="select-none font-sans text-[clamp(3.4rem,8vw,8.8rem)] font-black uppercase leading-[0.82] tracking-tighter">
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
          AI-NATIVE WORKFLOWS &amp; SAAS.
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
    <div className="grid w-full max-w-5xl gap-5">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-9 items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        aria-label="Close selected item"
      >
        <span>[</span>
        <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span>]</span>
      </button>

      <div className="mx-auto w-[min(54vw,320px)]">
        <motion.div
          layoutId={`crate-cover-${item.id}`}
          transition={SPRING}
          className="aspect-[4/5] w-full border border-zinc-800 bg-zinc-950"
        >
          <Cover item={item} index={selectedIndex} detail />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.24, delay: 0.2, ease: "easeOut" }}
        className="grid gap-px border border-zinc-800 bg-zinc-800 lg:grid-cols-[0.74fr_1fr]"
      >
        <section className="bg-zinc-950 p-4 sm:p-5">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            Selected record
          </p>
          <h2 className="text-4xl font-semibold leading-[0.9] tracking-[-0.05em] text-zinc-50 sm:text-5xl">
            {item.title}
          </h2>
        </section>
        <section className="bg-zinc-950 p-4 sm:p-5">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            {item.type}
          </p>
          <p className="max-w-2xl text-sm leading-6 text-zinc-400">
            {item.content}
          </p>
        </section>
      </motion.div>
    </div>
  );
}

function Cover({
  item,
  index,
  detail = false,
}: {
  item: CrateItem;
  index: number;
  detail?: boolean;
}) {
  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-950">
      <div className="absolute inset-x-0 top-0 border-t border-zinc-700" />
      <div className="absolute inset-x-0 bottom-0 border-t border-zinc-800" />
      <div className="absolute bottom-0 top-0 left-6 border-l border-zinc-800" />
      <div className="absolute bottom-0 top-0 right-6 border-l border-zinc-800" />

      <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
        {displayIndex}
      </div>
      <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-700">
        PM
      </div>

      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 border-y border-zinc-800 py-5">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-600">
          {item.type}
        </p>
        <h3
          className={
            detail
              ? "text-4xl font-semibold leading-[0.86] tracking-[-0.06em] text-zinc-50 sm:text-6xl"
              : "text-2xl font-semibold leading-[0.9] tracking-[-0.05em] text-zinc-50"
          }
        >
          {item.title}
        </h3>
      </div>

      <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-700">
        Archive / {item.id}
      </div>
    </div>
  );
}
