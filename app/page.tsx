"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";

type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  architecture: string[];
  logic: string[];
  outcome: string;
  tone: string;
};

const SPRING = {
  type: "spring",
  stiffness: 200,
  damping: 25,
} as const;

const PROJECTS: Project[] = [
  {
    id: "deepinsight",
    index: "01",
    title: "DeepInsight",
    subtitle: "Game Industry Sentiment & PR Analysis Agent",
    category: "Agent / Research Intelligence",
    year: "2026",
    description:
      "A signal extraction agent for game studios. It reads public discourse, separates noise from risk, and turns community sentiment into product and PR decisions.",
    architecture: [
      "Source ingestion across community, media, and creator channels",
      "Sentiment clustering with topic drift detection",
      "Risk scoring layer for PR, design, and live-ops teams",
    ],
    logic: [
      "Detect recurring pain points before they become public incidents",
      "Compare player language against release beats and patch notes",
      "Output executive briefs with evidence trails and confidence levels",
    ],
    outcome:
      "Designed for faster issue framing, cleaner escalation paths, and more defensible response timing.",
    tone: "from-zinc-900 via-zinc-800 to-zinc-950",
  },
  {
    id: "easypromo",
    index: "02",
    title: "EasyPromo",
    subtitle: "Marketing Plan & Brief Generation Agent",
    category: "Agent / Marketing Workflow",
    year: "2026",
    description:
      "A planning assistant that turns campaign inputs into structured positioning, channel plans, content briefs, and reusable launch documents.",
    architecture: [
      "Campaign intake schema for audience, offer, channel, and constraints",
      "Brief generation pipeline with brand and compliance checks",
      "Iteration workspace for marketer review and regeneration",
    ],
    logic: [
      "Convert unclear launch ideas into comparable plan options",
      "Keep messaging consistent while allowing channel-specific execution",
      "Reduce blank-page time for early campaign planning",
    ],
    outcome:
      "Focused on compressing planning cycles while preserving human taste and final judgment.",
    tone: "from-stone-900 via-zinc-800 to-neutral-950",
  },
  {
    id: "zhongyou-platform",
    index: "03",
    title: "Zhongyou Platform",
    subtitle: "Creator Multi-platform Management & Settlement SaaS",
    category: "SaaS / Creator Operations",
    year: "2025",
    description:
      "A creator operations platform for managing multi-channel accounts, campaign delivery, revenue attribution, and settlement workflows.",
    architecture: [
      "Creator profile and account binding across multiple platforms",
      "Campaign delivery tracking with role-based approval states",
      "Settlement ledger for revenue split, audit, and payout status",
    ],
    logic: [
      "Replace spreadsheet coordination with accountable workflow states",
      "Make finance, operation, and creator-facing data speak the same language",
      "Expose exceptions early before settlement cycles close",
    ],
    outcome:
      "Structured for lower manual reconciliation cost and clearer multi-party responsibility.",
    tone: "from-neutral-900 via-zinc-700 to-zinc-950",
  },
  {
    id: "data-orchestrator",
    index: "04",
    title: "Data Orchestrator",
    subtitle: "LLM Workflow & Multi-agent System",
    category: "Infrastructure / AI Workflow",
    year: "2026",
    description:
      "A workflow layer for coordinating LLM tasks, tool calls, evaluation states, and multi-agent collaboration across product scenarios.",
    architecture: [
      "Task graph with explicit state, dependency, and retry rules",
      "Agent role assignment for research, synthesis, validation, and execution",
      "Evaluation hooks for traceability, regression checks, and human review",
    ],
    logic: [
      "Turn open-ended AI work into inspectable production workflows",
      "Separate orchestration from model output to reduce hidden failure modes",
      "Make quality measurable before scaling automation",
    ],
    outcome:
      "Built around control, observability, and repeatability rather than one-off prompt demos.",
    tone: "from-zinc-950 via-neutral-800 to-stone-950",
  },
];

export default function Page() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-4 py-4 font-sans text-zinc-50 sm:px-6 lg:px-8">
      <LayoutGroup>
        <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col border border-zinc-800 bg-zinc-950">
          <header className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 sm:px-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              Product Records
            </div>
            <div className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-600 sm:block">
              Portfolio / Selection Interface
            </div>
          </header>

          <AnimatePresence initial={false} mode="popLayout">
            {selectedProject ? (
              <ProjectDetail
                key="detail"
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            ) : (
              <Gallery key="gallery" onSelect={setSelectedProject} />
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </main>
  );
}

function Gallery({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <motion.section
      className="flex flex-1 flex-col justify-between gap-10 p-4 sm:p-5 lg:p-7"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-end">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
            Single-page portfolio
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.04em] text-zinc-50 sm:text-7xl lg:text-8xl">
            Select a project like evidence.
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
          A cold, deliberate record-selection interface for product work. Each
          sleeve expands into a precise case view: architecture, logic, and the
          product judgment behind the system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-2 xl:grid-cols-4">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project)}
            className="group bg-zinc-950 text-left outline-none"
            aria-label={`Open ${project.title}`}
          >
            <motion.div
              layoutId={`cover-${project.id}`}
              transition={SPRING}
              className={`relative aspect-[4/5] overflow-hidden border-b border-zinc-800 bg-gradient-to-br ${project.tone}`}
            >
              <CoverFace project={project} />
            </motion.div>

            <div className="grid gap-4 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  {project.index}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 text-zinc-700 transition-colors group-hover:text-zinc-50"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h2 className="text-xl font-medium tracking-[-0.03em] text-zinc-50">
                  {project.title}
                </h2>
                <p className="mt-2 min-h-10 text-sm leading-5 text-zinc-500">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.section>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.section
      className="relative flex flex-1 flex-col"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-9 items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        aria-label="Close project detail"
      >
        <span>[</span>
        <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span>]</span>
      </button>

      <motion.div
        layoutId={`cover-${project.id}`}
        transition={SPRING}
        className={`relative h-[44vh] min-h-[320px] overflow-hidden border-b border-zinc-800 bg-gradient-to-br ${project.tone}`}
      >
        <CoverFace project={project} isDetail />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.24, delay: 0.2, ease: "easeOut" }}
        className="grid gap-px border-b border-zinc-800 bg-zinc-800 lg:grid-cols-[0.72fr_1fr]"
      >
        <section className="bg-zinc-950 p-4 sm:p-6 lg:p-8">
          <div className="mb-10 flex items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.9] tracking-[-0.05em] text-zinc-50 sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            {project.description}
          </p>
        </section>

        <section className="grid gap-px bg-zinc-800 md:grid-cols-2">
          <DetailBlock title="Architecture" items={project.architecture} />
          <DetailBlock title="Logic" items={project.logic} />
          <div className="bg-zinc-950 p-4 md:col-span-2 sm:p-6 lg:p-8">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Outcome Signal
            </p>
            <p className="max-w-3xl text-xl leading-8 tracking-[-0.02em] text-zinc-50">
              {project.outcome}
            </p>
          </div>
        </section>
      </motion.div>
    </motion.section>
  );
}

function CoverFace({
  project,
  isDetail = false,
}: {
  project: Project;
  isDetail?: boolean;
}) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(250,250,250,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(250,250,250,0.045)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="absolute inset-x-0 top-0 border-t border-zinc-700/70" />
      <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-700/70" />

      <div className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
        {project.index}
      </div>
      <div className="absolute right-5 top-5 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
        {project.year}
      </div>

      <div className="absolute inset-x-5 bottom-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
          {project.category}
        </p>
        <h3
          className={
            isDetail
              ? "max-w-5xl text-6xl font-semibold leading-[0.86] tracking-[-0.06em] text-zinc-50 sm:text-8xl lg:text-9xl"
              : "text-4xl font-semibold leading-[0.9] tracking-[-0.05em] text-zinc-50"
          }
        >
          {project.title}
        </h3>
      </div>

      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-600/80 sm:h-36 sm:w-36">
        <div className="absolute inset-8 rounded-full border border-zinc-700/80" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500" />
      </div>
    </div>
  );
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-zinc-950 p-4 sm:p-6 lg:p-8">
      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
        {title}
      </p>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="border-t border-zinc-800 pt-4 text-sm leading-6 text-zinc-400"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
