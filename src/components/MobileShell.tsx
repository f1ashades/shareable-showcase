import { Link, useLocation } from "@tanstack/react-router";
import { Home, User, Sparkles, NotebookPen, BarChart3, Mic, HelpCircle, X } from "lucide-react";
import { useState, type ReactNode } from "react";

type PageExplain = {
  title: string;
  features: string[];
  logic: string;
  problem: string;
};

const pageExplainMap: Record<string, PageExplain> = {
  "/": {
    title: "总览 · Demo 导览",
    features: [
      "5 个核心节点入口:画像 / 备课 / 复盘 / 看板 / 工牌",
      "一句话价值主张 + 适用场景说明",
      "底部 6 Tab 导航贯穿全 Demo",
    ],
    logic:
      "教练硬线 Agent 的核心是「把 9 本手册沉淀的方法论 + 每个学员的散点信息,自动转成课前/课中/课后可执行动作」。总览页让体验者快速理解整个产品的拼图。",
    problem:
      "PRD 痛点:小白教练面对学员信息无从下手,老教练经验难以沉淀复用。Agent 用 AI 把「人 × 知识 × 场景」串起来。",
  },
  "/profile": {
    title: "学员画像 · 信息聚合",
    features: [
      "5 个 Case(A-E)模拟不同信息完整度的真实学员",
      "信息完整度指示器 → 直接对应备课档位",
      "Case E 是正式课老学员,与体验课逻辑区分",
    ],
    logic:
      "学员信息散落在销售微信、电话记录、到店登记表里。Agent 把这些碎片聚合成结构化画像,信息越全 → AI 输出越精准(对应备课页档位 1/2/3)。",
    problem:
      "PRD 痛点:学员信息断层,体验课教练拿不到销售前置沟通,正式课教练记不住每个老学员的细节。",
  },
  "/briefing": {
    title: "AI 备课包 · 弹性档位",
    features: [
      "体验课:档位 1/2/3 视觉差异化,可补充信息升档",
      "正式课(Case E):基于上节课记录,4 块结构 — 训练计划/观察点/上节课问题/关键提醒",
      "动机假设、必问问题、课中动作、反对意见、翻车点",
    ],
    logic:
      "「档位」是 Demo 演示语言,真实产品里教练感受不到档位 — 只是「贴信息 → 备课包变得更精准」。体验课追转化,正式课追留存,模板形态完全不同。",
    problem:
      "PRD 痛点:体验课 30 分钟决定转化,小白教练上来就教动作错失沟通窗口;正式课老学员越来越多,教练记不住上节课讲过什么。",
  },
  "/review": {
    title: "课后复盘 · 三层结构化输入",
    features: [
      "Layer 1:SOP 标准问题(每节课必填)",
      "Layer 2:基于备课包的针对性追问",
      "Layer 3:开放观察(教练自由输入)",
      "AI 生成复盘草稿,引用气泡显示信息来源",
    ],
    logic:
      "复盘不是写小作文,而是回答 AI 准备好的问题。结构化输入 → AI 生成可追溯的草稿,既减轻教练负担,又让信息能反哺到下一节课的备课包。",
    problem:
      "PRD 痛点:教练复盘写得糙、写不动,知识沉淀不下来;管理层看不到一线真实情况。",
  },
  "/dashboard": {
    title: "管理看板 · AI 诊断",
    features: [
      "转化漏斗:留资 → 到店 → 体验 → 转化各环节数据",
      "教练能力雷达图(SVG 自绘)",
      "AI 洞察卡片:门店管理 / 知识贡献趋势",
    ],
    logic:
      "店长不需要看大段报表,需要的是「现在哪里出了问题、下一步该做什么」。AI 把多维数据转成具体诊断和行动建议。",
    problem:
      "PRD 痛点:店长靠经验判断教练表现,缺少客观数据;转化率波动找不到归因。",
  },
  "/badge": {
    title: "智能工牌 · 未来形态",
    features: [
      "12 秒模拟流式音频分析",
      "实时识别学员疲劳信号、痛点暴露、教练响应时机",
      "课后自动生成结构化复盘,无需教练手动录入",
    ],
    logic:
      "复盘最大的成本是教练手输。智能工牌录课中音频 → AI 抽取关键信号 → 自动填充复盘结构。这是 Agent 的终极形态。",
    problem:
      "PRD 痛点:再轻的复盘表单,教练也嫌麻烦;课中真实情况只有教练知道,无法横向比对优化话术。",
  },
};

const tabs = [
  { to: "/", label: "总览", icon: Home },
  { to: "/profile", label: "画像", icon: User },
  { to: "/briefing", label: "备课", icon: Sparkles },
  { to: "/review", label: "复盘", icon: NotebookPen },
  { to: "/dashboard", label: "看板", icon: BarChart3 },
  { to: "/badge", label: "工牌", icon: Mic },
];

export function MobileShell({
  title,
  subtitle,
  children,
  back,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  back?: string;
}) {
  const loc = useLocation();
  const [showHelp, setShowHelp] = useState(false);
  const explain = pageExplainMap[loc.pathname];
  return (
    <div className="mobile-shell">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-[var(--background)]/85 backdrop-blur border-b border-[var(--color-gray-200)]">
        <div className="px-4 pt-3 pb-2.5 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-6 h-6 rounded-full bg-brand-500" />
            <span className="text-[12px] text-[var(--color-gray-500)]">教练硬线</span>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <div className="text-[11px] text-[var(--color-gray-400)]">教练 · 王思敏</div>
            {explain && (
              <button
                onClick={() => setShowHelp(true)}
                className="inline-flex items-center gap-0.5 text-[10px] text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded-md active:bg-brand-100 transition"
              >
                <HelpCircle className="w-3 h-3" />
                本页说明
              </button>
            )}
          </div>
        </div>
        <div className="px-4 pb-3">
          <h1 className="text-[18px] leading-tight font-semibold text-[var(--color-green-700)]">{title}</h1>
          {subtitle && <div className="text-[12px] text-[var(--color-gray-500)] mt-0.5">{subtitle}</div>}
        </div>
        {back && (
          <Link to={back} className="absolute top-3 right-3 text-[11px] text-[var(--color-gray-500)]">
            返回
          </Link>
        )}
      </header>

      <main className="px-4 py-4 space-y-4">{children}</main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur border-t border-[var(--color-gray-200)] z-30">
        <div className="grid grid-cols-6">
          {tabs.map((t) => {
            const active = loc.pathname === t.to;
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex flex-col items-center py-2 gap-0.5 transition ${
                  active ? "text-[var(--color-orange-500)]" : "text-[var(--color-gray-400)]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function Card({
  children,
  className = "",
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "tier-1" | "tier-2" | "tier-3" | "muted";
}) {
  const base = "rounded-[14px] p-4";
  const variantClass =
    variant === "default"
      ? "bg-white border border-[var(--color-gray-200)]"
      : variant === "muted"
      ? "bg-[var(--color-gray-100)]"
      : variant;
  return <div className={`${base} ${variantClass} ${className}`}>{children}</div>;
}

export function Tag({ children, color = "neutral" }: { children: ReactNode; color?: "brand" | "orange" | "green" | "neutral" | "info" | "warning" }) {
  const map = {
    brand: "bg-brand-50 text-brand-700",
    orange: "bg-orange-50 text-orange-700",
    green: "bg-green-50 text-green-700",
    neutral: "bg-[var(--color-gray-100)] text-[var(--color-gray-700)]",
    info: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
    warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  } as const;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${map[color]}`}>
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className = "",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-[10px] py-3 text-[14px] font-semibold bg-brand-500 text-[var(--color-gray-900)] active:bg-brand-600 disabled:opacity-50 transition ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[10px] py-2.5 px-3 text-[13px] font-medium border border-[var(--color-gray-200)] text-[var(--color-gray-700)] bg-white active:bg-[var(--color-gray-100)] transition ${className}`}
    >
      {children}
    </button>
  );
}
