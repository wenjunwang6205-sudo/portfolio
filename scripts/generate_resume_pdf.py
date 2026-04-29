from __future__ import annotations

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
DOCS_DIR = ROOT / "docs"
PDF_PATH = PUBLIC_DIR / "resume.pdf"
MD_PATH = DOCS_DIR / "wang_wenjun_ai_pm_resume.md"

FONT_REGULAR = Path("/System/Library/Fonts/Supplemental/Songti.ttc")
FONT_MEDIUM = Path("/System/Library/Fonts/STHeiti Medium.ttc")
FONT_BOLD = Path("/System/Library/Fonts/STHeiti Medium.ttc")
FALLBACK_FONT = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")
FONT_REGULAR_INDEX = 6
FONT_MEDIUM_INDEX = 1
FONT_BOLD_INDEX = 1


def register_fonts() -> tuple[str, str, str]:
    regular = FONT_REGULAR if FONT_REGULAR.exists() else FALLBACK_FONT
    medium = FONT_MEDIUM if FONT_MEDIUM.exists() else regular
    bold = FONT_BOLD if FONT_BOLD.exists() else medium

    pdfmetrics.registerFont(TTFont("ResumeSans", str(regular), subfontIndex=FONT_REGULAR_INDEX if regular == FONT_REGULAR else 0))
    pdfmetrics.registerFont(TTFont("ResumeSansMedium", str(medium), subfontIndex=FONT_MEDIUM_INDEX if medium == FONT_MEDIUM else 0))
    pdfmetrics.registerFont(TTFont("ResumeSansBold", str(bold), subfontIndex=FONT_BOLD_INDEX if bold == FONT_BOLD else 0))
    return "ResumeSans", "ResumeSansMedium", "ResumeSansBold"


REGULAR, MEDIUM, BOLD = register_fonts()


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(escape(text), style)


def line_item(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(escape(text), style, bulletText="•")


styles = getSampleStyleSheet()

base = ParagraphStyle(
    "BaseCN",
    parent=styles["Normal"],
    fontName=REGULAR,
    fontSize=8.55,
    leading=13.1,
    textColor=colors.HexColor("#202124"),
    wordWrap="CJK",
    spaceAfter=2.8,
)

small = ParagraphStyle(
    "SmallCN",
    parent=base,
    fontSize=7.6,
    leading=11.0,
    textColor=colors.HexColor("#5f6368"),
)

name_style = ParagraphStyle(
    "Name",
    parent=base,
    fontName=BOLD,
    fontSize=24,
    leading=27,
    alignment=TA_LEFT,
    textColor=colors.HexColor("#111827"),
    spaceAfter=3,
)

role_style = ParagraphStyle(
    "Role",
    parent=base,
    fontName=MEDIUM,
    fontSize=10.8,
    leading=14,
    textColor=colors.HexColor("#374151"),
)

contact_style = ParagraphStyle(
    "Contact",
    parent=small,
    alignment=TA_RIGHT,
    leading=11.4,
)

section_style = ParagraphStyle(
    "Section",
    parent=base,
    fontName=BOLD,
    fontSize=10.7,
    leading=13.2,
    textColor=colors.HexColor("#111827"),
    spaceBefore=8.0,
    spaceAfter=3.2,
)

job_title_style = ParagraphStyle(
    "JobTitle",
    parent=base,
    fontName=BOLD,
    fontSize=9.5,
    leading=13.0,
    textColor=colors.HexColor("#111827"),
    spaceBefore=3.2,
    spaceAfter=1.8,
)

project_title_style = ParagraphStyle(
    "ProjectTitle",
    parent=job_title_style,
    fontSize=9.5,
    leading=13.0,
)

meta_style = ParagraphStyle(
    "Meta",
    parent=small,
    fontName=MEDIUM,
    textColor=colors.HexColor("#4b5563"),
)

bullet_style = ParagraphStyle(
    "Bullet",
    parent=base,
    firstLineIndent=0,
    leftIndent=11,
    bulletIndent=1.5,
    bulletFontName=MEDIUM,
    bulletFontSize=6.5,
    spaceAfter=3.2,
)

summary_style = ParagraphStyle(
    "Summary",
    parent=base,
    fontSize=8.65,
    leading=13.8,
    spaceAfter=5,
)

skill_style = ParagraphStyle(
    "Skill",
    parent=base,
    leftIndent=0,
    fontSize=8.4,
    leading=12.4,
)

box_title_style = ParagraphStyle(
    "BoxTitle",
    parent=section_style,
    fontSize=9.6,
    leading=12.0,
    spaceBefore=0,
    spaceAfter=3.0,
)

box_body_style = ParagraphStyle(
    "BoxBody",
    parent=base,
    fontSize=8.25,
    leading=12.6,
    spaceAfter=2.5,
)

box_skill_style = ParagraphStyle(
    "BoxSkill",
    parent=base,
    fontSize=8.0,
    leading=12.2,
    spaceAfter=4,
)


RESUME = {
    "name": "王文君",
    "role": "AI 产品经理 | AI Agent 工作流与业务流程自动化",
    "contact": [
        "上海",
        "187 2137 8389",
        "wenjun.wang6205@gmail.com",
        "作品集：https://wenjunwang6205-sudo.github.io/portfolio/",
    ],
    "summary": (
        "设计学科背景（米兰理工硕士）转型 AI 产品经理，专注于 AI 驱动的业务流程自动化、"
        "Agent 工作流编排与 AI 辅助原型交付。进入 AI 产品方向后，主导两个 AI Agent 产品（EasyPromo、DeepInsight）"
        "和一个 4 端游戏达人营销 SaaS 平台（中游网）从 0 到 1 的设计与落地，现为团队核心成员，"
        "带领实习生团队并参与产品岗位候选人面试。深度使用 Cursor、Dify、Google AI Studio、Codex 等 AI 工具，"
        "具备 AI 能力边界评估与产品化决策经验，能够结合任务复杂度、模型置信度、成本与业务风险，判断自动化、"
        "人机协同与人工审核的合理边界。另有社交 App、双端小程序、企业官网等多形态产品的独立设计与交付经验。"
    ),
    "experience": [
        {
            "org": "上海启竞广告有限公司",
            "title": "AI 产品经理",
            "date": "2025.04 - 至今",
            "desc": "负责游戏行业 AI 产品线的产品规划与落地，专注于 AI 驱动的业务流程自动化方向。现为团队核心成员，带领实习生团队并参与产品岗位面试，主导以下三个核心产品从 0 到 1 的设计与交付。",
            "bullets": [
                "EasyPromo：AI 营销策划方案自动生成平台，主导 Agent 编排架构设计与多模型路由策略，将投标级方案产出效率提升 99%（3-5 天 → 30 分钟）。",
                "DeepInsight：游戏舆情 AI 分析平台，负责产品定义与 AI 能力规划，与工程师协作落地，覆盖王者荣耀、明日方舟、第五人格、恋与深空等多款头部游戏。",
                "中游网：游戏达人营销 SaaS 平台，独立负责品牌方 SaaS、运营中台、达人端、MCN 端 4 端产品设计；平台累计管理 267 万元+预算与 3.2 亿次内容播放。",
            ],
        },
        {
            "org": "上海安棣建筑事务所",
            "title": "景观设计师",
            "date": "2022.08 - 2024.08",
            "desc": "负责城市景观与空间设计项目的方案设计与项目管理。期间自学编程与产品设计，完成 Google UX Design 及 IBM AI Product Manager 认证；利用业余时间独立完成多个 Web / 小程序产品，为向产品经理转型完成方法、工具与作品准备。",
            "bullets": [],
        },
        {
            "org": "上海熙济城市规划设计咨询有限公司",
            "title": "景观设计师",
            "date": "2017.06 - 2019.06",
            "desc": "参与城市更新与社区空间改造项目，负责空间方案设计与街区功能布局优化，积累早期项目协作与复杂需求理解经验。",
            "bullets": [],
        },
    ],
    "projects": [
        {
            "name": "EasyPromo",
            "meta": "AI 驱动的营销策划方案自动生成平台 | 0-1 | 独立完成产品设计与 AI 工作流实现",
            "desc": "面向品牌方 / 广告公司，将传统需要 3-5 天人工完成的投标级营销策划方案，通过多 Agent 协作压缩至 30 分钟自动生成，支持对话式迭代修改与一键导出。独立完成产品设计、Agent 编排架构定义，并借助 Cursor 等 AI 编程工具实现核心业务流程与可交互原型。",
            "bullets": [
                "将传统营销策划 SOP（竞品分析 → 策略制定 → 创意概念 → 分章撰写 → 质检修订）拆解为可被 Agent 执行的标准化工作流，实现从人工密集型向 AI 自动化的转变。",
                "主导编排架构两次迭代：初期基于 Dify 搭建线性 Pipeline；在发现调试效率低、Agent 串联导致置信度衰减与输出不可控后，迁移至代码方案并升级为 Orchestrator 编排模式。",
                "在 Orchestrator 模式中，由中央调度 Agent 动态分配子任务，并引入条件分支（调研质量门、策略 Critic 选优）、循环控制（质检自动修复）与用户检查点（方向 / 大纲确认），提升多 Agent 协作的可控性。",
                "设计多模型路由策略，覆盖 3+ 模型供应商：创意与长文生成任务路由至 Claude / OpenAI GPT 系列等高质量模型，结构化分析任务（Brief 解析、竞品调研）路由至 Qwen 等成本更优模型，在质量上限与 Token 成本之间取得平衡。",
                "设计对话式工作台与两级意图路由（LLM Tool Call + 正则兜底），将用户自由文本自动分发至 7 种处理路径。",
                "搭建质量闭环体系：多信源调研引擎（竞品 / 舆情 / 爆款 / 本地 RAG）+ 调研质量评估 Agent + 策略 Critic 多方向评分选优 + 叙事蓝图一致性控制，使核心流程自动完成率超过 90%。",
            ],
        },
        {
            "name": "DeepInsight",
            "meta": "游戏舆情 AI Agent 分析平台 | 已落地 | 服务头部游戏",
            "desc": "面向游戏运营团队，整合小红书、抖音、快手、B站、微博、贴吧、YouTube、TikTok 等 10+ 海内外平台的玩家舆情反馈，通过对话式交互驱动舆情分析与报告洞察生成。负责产品定义与 AI 能力规划，与全栈工程师协作完成技术落地，覆盖王者荣耀、明日方舟、第五人格、恋与深空等多款头部游戏。",
            "bullets": [
                "主导 AI 能力边界判断：评估情感预判、趋势预测等预测类能力的可行性，经数据验证判断模型置信度不足以支撑运营决策，果断从“预测驱动”收敛至“数据驱动”，聚焦高 ROI 场景并避免无效投入。",
                "定义多维舆情洞察体系：话题深挖（正负观点占比 + 玩家原声引用）、高热追踪、跨平台对比、异常信号识别、恶意内容台账与优先级排序，将碎片化反馈转化为结构化运营情报。",
                "设计数据采集与清洗流程，针对多平台异构数据做标准化处理与去重；报告中涉及玩家原声的引用统一脱敏，确保数据合规。",
                "规划 6+ 报告版式与场景映射（运营日报 / 管理层简报 / 专题深挖 / 负面预警），支持定时自动生成与 PDF 导出，将运营日报产出从人工数小时缩短至分钟级。",
            ],
        },
        {
            "name": "中游网",
            "meta": "游戏垂类达人营销平台 | B+C 端 | 0-1 | 4 端联动",
            "desc": "游戏达人营销 SaaS，连接游戏厂商与达人 / MCN。负责品牌方 SaaS、运营中台、达人端、MCN 端 4 端产品设计。上线两个月，平台累计管理 169+ 个任务、707+ 位签约达人，累计内容播放量 3.2 亿次，预算规模超 267 万元，整体 ROI 达 146.64%。全程采用 AI 驱动的产品工作流：Google AI Studio 生成可交互原型 → Cursor 迭代复杂交互 → AI 辅助撰写 PRD，将原型验证周期从周级压缩到天级。",
            "bullets": [
                "设计商单 + 生态双模式任务体系，搭建模块化激励规则模板（SABC 分级 + 合规 / CPM / 爆款 / 排名 / 激励奖多维组合），支持业务方按需配置不同任务类型的奖励策略，降低新业务接入成本。",
                "设计“项目 → 周期 → 任务组”三级架构，支持跨周期达人继承与预算去重校验；搭建任务级数据看板（达人侧 + 作品侧双视角），支撑数据驱动运营。",
                "设计三端联动佣金推广体系（达人拉新返佣 + MCN 渠道分佣 + 中台审核），包含小额自动审批、大额钉钉流程的分级智能审核与防刷风控。",
                "独立交付 10+ 份 PRD 与可交互原型，覆盖需求分析、数据模型、状态流转与异常边界。",
            ],
        },
    ],
    "education": [
        "米兰理工大学（Politecnico di Milano） | 景观设计 硕士 | 2019 - 2022 | QS 建筑与景观设计全球 Top 10。系统训练空间设计思维、多方利益协调与复杂项目管理能力，为产品设计中的信息架构、用户动线与体验设计提供方法论基础。",
        "华东理工大学 | 景观设计 学士 | 2013 - 2017",
    ],
    "certificates": [
        "Google UX Design Professional Certificate（Coursera）",
        "IBM AI Product Manager Professional Certificate（Coursera）",
    ],
    "skills": [
        "AI 产品与 Agent 编排：Agent 工作流设计 / Pipeline 与 Orchestrator 编排 / 多模型路由 / Token 成本优化 / RAG / Prompt Engineering / AI 能力边界评估",
        "产品设计与交付：需求分析 / PRD 撰写 / 可交互原型设计 / 数据模型与状态流转 / 数据看板与指标体系 / 跨端产品统筹",
        "AI 工具与原型协作：Cursor / Dify / Google AI Studio / Codex / React / TypeScript / Tailwind CSS / Git 基础，用于快速搭建交互原型并对齐复杂流程",
    ],
}


def section(title: str):
    return [
        Spacer(1, 7.0),
        p(title, section_style),
        HRFlowable(width="100%", thickness=0.35, color=colors.HexColor("#e5e7eb"), spaceBefore=0, spaceAfter=4.5),
    ]


def top_profile_block():
    block = [
        p("个人优势", section_style),
        Spacer(1, 2.5),
        p(RESUME["summary"], summary_style),
    ]
    return block


def build_pdf() -> None:
    PUBLIC_DIR.mkdir(exist_ok=True)
    DOCS_DIR.mkdir(exist_ok=True)
    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=A4,
        rightMargin=15 * mm,
        leftMargin=15 * mm,
        topMargin=20 * mm,
        bottomMargin=14 * mm,
        title="王文君_AI产品经理_简历",
        author="王文君",
    )

    story = []
    header = Table(
        [
            [
                [p(RESUME["name"], name_style), p(RESUME["role"], role_style)],
                p(" | ".join(RESUME["contact"]), contact_style),
            ]
        ],
        colWidths=[105 * mm, doc.width - 105 * mm],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.extend([header, Spacer(1, 10), HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#111827"), spaceAfter=10)])

    story.extend(top_profile_block())

    story.extend(section("工作经历"))
    for item in RESUME["experience"]:
        story.append(p(f"{item['org']} | {item['title']} | {item['date']}", job_title_style))
        story.append(p(item["desc"], base))
        for bullet in item["bullets"]:
            story.append(line_item(bullet, bullet_style))

    story.extend(section("项目经历"))
    for idx, item in enumerate(RESUME["projects"]):
        if idx == 1:
            intro = [p(f"{item['name']} — {item['meta']}", project_title_style), p(item["desc"], base)]
            story.append(KeepTogether(intro))
            story.append(PageBreak())
            story.append(p(f"{item['name']} — {item['meta']}（续）", project_title_style))
            story.extend(line_item(bullet, bullet_style) for bullet in item["bullets"])
            story.append(Spacer(1, 4.5))
            continue
        block = [p(f"{item['name']} — {item['meta']}", project_title_style), p(item["desc"], base)]
        block.extend(line_item(bullet, bullet_style) for bullet in item["bullets"])
        story.append(KeepTogether(block[:2]))
        story.extend(block[2:])
        if idx != len(RESUME["projects"]) - 1:
            story.append(Spacer(1, 4.5))

    story.extend(section("教育背景"))
    for item in RESUME["education"]:
        story.append(line_item(item, bullet_style))

    story.extend(section("专业认证"))
    for item in RESUME["certificates"]:
        story.append(line_item(item, bullet_style))

    story.extend(section("核心技能"))
    for item in RESUME["skills"]:
        story.append(p(item, skill_style))

    def footer(canvas, doc_obj):
        canvas.saveState()
        canvas.setFont(REGULAR, 7)
        canvas.setFillColor(colors.HexColor("#9ca3af"))
        canvas.drawRightString(A4[0] - 15 * mm, 8 * mm, f"{doc_obj.page}")
        canvas.restoreState()

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def build_markdown() -> None:
    DOCS_DIR.mkdir(exist_ok=True)
    lines = [
        f"# {RESUME['name']} | {RESUME['role']}",
        "",
        " | ".join(RESUME["contact"]),
        "",
        "## 个人优势",
        "",
        RESUME["summary"],
        "",
        "## 工作经历",
        "",
    ]

    for item in RESUME["experience"]:
        lines.extend([f"### {item['org']} | {item['title']} | {item['date']}", "", item["desc"], ""])
        lines.extend(f"- {bullet}" for bullet in item["bullets"])
        lines.append("")

    lines.extend(["## 项目经历", ""])
    for item in RESUME["projects"]:
        lines.extend([f"### {item['name']} — {item['meta']}", "", item["desc"], ""])
        lines.extend(f"- {bullet}" for bullet in item["bullets"])
        lines.append("")

    lines.extend(["## 教育背景", ""])
    lines.extend(f"- {item}" for item in RESUME["education"])
    lines.extend(["", "## 专业认证", ""])
    lines.extend(f"- {item}" for item in RESUME["certificates"])
    lines.extend(["", "## 技能", ""])
    lines.extend(f"- {item}" for item in RESUME["skills"])
    MD_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    build_markdown()
    build_pdf()
    print(f"Wrote {PDF_PATH}")
    print(f"Wrote {MD_PATH}")
