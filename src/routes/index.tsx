import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, Card, Tag, PrimaryButton } from "@/components/MobileShell";
import { ArrowRight, User, Sparkles, NotebookPen, BarChart3, Mic } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DP × 美团 教练助理 · 体验课转化 Agent" },
      { name: "description", content: "用 AI 拉高新教练能力下限,从体验课转化扩展到完整教练日常。" },
    ],
  }),
  component: Index,
});

const steps: {
  to: "/profile" | "/briefing" | "/review" | "/dashboard" | "/badge";
  icon: typeof User;
  label: string;
  note: string;
  color: string;
  star?: boolean;
}[] = [
  { to: "/profile", icon: User, label: "学员画像", note: "聚合 + 教练补充", color: "bg-green-50 text-green-700" },
  { to: "/briefing", icon: Sparkles, label: "AI 备课包", note: "★ 弹性档位演示", color: "bg-brand-50 text-brand-700", star: true },
  { to: "/review", icon: NotebookPen, label: "课后复盘", note: "三层结构化", color: "bg-orange-50 text-orange-700" },
  { to: "/dashboard", icon: BarChart3, label: "店长看板", note: "★ 知识贡献趋势", color: "bg-green-50 text-green-700", star: true },
  { to: "/badge", icon: Mic, label: "智能工牌", note: "长期方向预览", color: "bg-[var(--color-gray-100)] text-[var(--color-gray-700)]" },
];

function Index() {
  return (
    <MobileShell title="DP × 美团 教练助理" subtitle="用 AI 拉高新教练能力下限 · v0.2.6">
      <Card className="!p-5 bg-gradient-to-br from-brand-50 via-white to-orange-50 border-brand-100">
        <div className="text-[11px] text-brand-700 font-medium tracking-wide">体验课转化 · Agent Demo</div>
        <h2 className="mt-2 text-[22px] leading-snug font-bold text-[var(--color-green-700)]">
          让每位新教练
          <br />
          第一天就拿到 <span className="text-orange-500">60 分</span> 的交付
        </h2>
        <p className="mt-3 text-[13px] text-[var(--color-gray-700)] leading-[1.7]">
          把头部教练的隐性经验装进 AI,在课前 / 课后两个关键节点主动给到新教练。
          <br />
          <span className="text-[var(--color-gray-500)]">不是新 SaaS · 不是工具书 · 不是监控</span>
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/80 rounded-[10px] py-2.5">
            <div className="text-[18px] font-bold text-orange-500">60+</div>
            <div className="text-[10px] text-[var(--color-gray-500)]">能力下限分</div>
          </div>
          <div className="bg-white/80 rounded-[10px] py-2.5">
            <div className="text-[18px] font-bold text-brand-600">9 本</div>
            <div className="text-[10px] text-[var(--color-gray-500)]">DP 沉淀手册</div>
          </div>
          <div className="bg-white/80 rounded-[10px] py-2.5">
            <div className="text-[18px] font-bold text-green-700">≥80%</div>
            <div className="text-[10px] text-[var(--color-gray-500)]">头部承单率比</div>
          </div>
        </div>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[14px] font-semibold text-[var(--color-gray-700)]">完整体验课闭环</h3>
          <span className="text-[11px] text-[var(--color-gray-400)]">5 个 Agent 节点</span>
        </div>
        <div className="space-y-2">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="flex items-center gap-3 bg-white border border-[var(--color-gray-200)] rounded-[12px] p-3.5 active:scale-[0.99] transition"
              >
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-semibold text-[var(--color-gray-900)]">{s.label}</span>
                    {s.star && <Tag color="orange">重点</Tag>}
                  </div>
                  <div className="text-[11px] text-[var(--color-gray-500)] mt-0.5">{s.note}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--color-gray-300)]" />
              </Link>
            );
          })}
        </div>
      </div>

      <Card className="!p-4 bg-[var(--color-gray-50)] border-dashed">
        <div className="text-[12px] font-semibold text-[var(--color-gray-700)] mb-2">📌 核心边界</div>
        <ul className="text-[12px] text-[var(--color-gray-700)] space-y-1.5 leading-[1.65]">
          <li>· 不替换 DP 现有约课 / CRM</li>
          <li>· 教练用与不用,自主决定</li>
          <li>· 课中不介入,尊重交付现场</li>
          <li>· 只做能力下限托底,不做评分排名</li>
        </ul>
      </Card>

      <Link to="/profile" className="block">
        <PrimaryButton>开始演示 → 进入第 1 步</PrimaryButton>
      </Link>
    </MobileShell>
  );
}
