import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell, Card, Tag, PrimaryButton, GhostButton } from "@/components/MobileShell";
import { cases, type Case } from "@/lib/mock";
import { Sparkles, BookOpen, Plus, X, ArrowRight, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/briefing")({
  head: () => ({ meta: [{ title: "AI 备课包 · 弹性档位演示" }, { name: "description", content: "档位 1/2/3 视觉差异化,信息越多输出越精准。" }] }),
  component: BriefingPage,
});

function BriefingPage() {
  const [activeId, setActiveId] = useState<Case["id"]>("A");
  const baseCase = cases.find((x) => x.id === activeId)!;
  const [tierOverride, setTierOverride] = useState<1 | 2 | 3 | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [animating, setAnimating] = useState(false);

  const tier = tierOverride ?? baseCase.tier;

  useEffect(() => {
    setTierOverride(null);
  }, [activeId]);

  const upgradeTier = (val: string) => {
    if (!val.trim()) return;
    setShowAdd(false);
    if (tier < 3) {
      setAnimating(true);
      setTimeout(() => {
        setTierOverride(((tier + 1) as 2 | 3));
        setAnimating(false);
      }, 400);
    }
  };

  const tierClass = `tier-${tier}` as const;

  return (
    <MobileShell title="AI 备课包" subtitle="基于 9 本手册 · 信息越多,输出越精准">
      {/* Case tabs */}
      <div className="-mx-4 px-4 overflow-x-auto">
        <div className="flex gap-2 pb-1">
          {cases.map((cs) => {
            const active = cs.id === activeId;
            return (
              <button
                key={cs.id}
                onClick={() => setActiveId(cs.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[12px] font-medium border transition ${
                  active
                    ? "bg-[var(--color-gray-900)] text-white border-[var(--color-gray-900)]"
                    : "bg-white text-[var(--color-gray-500)] border-[var(--color-gray-200)]"
                }`}
              >
                {cs.id} · {cs.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier indicator */}
      <Card className="!py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i <= tier ? "tier-dot-active" : "tier-dot-inactive"}`}
                />
              ))}
            </div>
            <span className="text-[12px] font-semibold text-[var(--color-gray-700)]">
              档位 {tier}
            </span>
          </div>
          <Tag color={tier === 3 ? "orange" : tier === 2 ? "brand" : "neutral"}>
            {tier === 1 ? "基础 SOP 模板" : tier === 2 ? "半个性化" : "深度个性化"}
          </Tag>
        </div>
        <div className="text-[11px] text-[var(--color-gray-400)] mt-2">
          ※ 档位是 Demo 语言。实际给一线教练的产品里,他们感受不到档位 — 只是「贴信息 → 备课包变得更精准」。
        </div>
      </Card>

      {/* Upgrade hint */}
      {tier < 3 && (
        <Card className="!p-3.5 bg-brand-50 border-brand-100">
          <div className="flex gap-2.5">
            <Sparkles className="w-4 h-4 text-brand-700 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.6]">
                再贴一段聊天截图、电话要点或现场观察,AI 能给你更针对性的备课建议。
              </div>
              <button
                onClick={() => setShowAdd(true)}
                className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-700"
              >
                <Plus className="w-3.5 h-3.5" /> 补充信息(看档位升级)
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Briefing card body */}
      <div
        key={`${activeId}-${tier}`}
        className={`fade-up rounded-[14px] p-4 space-y-4 ${tierClass} ${animating ? "opacity-30 transition-opacity" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-[14px] font-semibold">备课包 · {baseCase.name}</span>
          </div>
          <span className="text-[10px] text-[var(--color-gray-400)]">用时 6s</span>
        </div>

        {/* 核心动机 */}
        <Section
          icon="📌"
          title="核心动机假设"
          extra={<Tag color={tier === 3 ? "orange" : "brand"}>置信度 {tier === 3 ? "高" : tier === 2 ? "中" : "低"}</Tag>}
        >
          <p className="text-[13px] text-[var(--color-gray-900)] leading-[1.75]">
            {tier === 1 ? baseCase.motivationGuess + "。" : baseCase.motivationGuess + ","}
            {tier >= 2 && <span className="text-orange-700 font-medium"> {baseCase.motivationDetail}</span>}
          </p>
          {tier >= 2 && (
            <div className="mt-2.5 text-[11px] text-[var(--color-gray-500)] flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              来源:{baseCase.type === "formal" ? "第 4 本《动作选编》第 6 章" : "第 3 本《产后女性沟通》第 7 章"}
            </div>
          )}
        </Section>

        {/* 必问问题 */}
        <Section icon="💬" title={`必问的 ${baseCase.questions.length} 个问题`}>
          <ul className="space-y-3">
            {baseCase.questions.slice(0, tier === 1 ? 2 : baseCase.questions.length).map((q, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[12px] text-brand-700 font-bold mt-0.5">{i + 1}</span>
                <div className="flex-1">
                  <div className="text-[13px] text-[var(--color-gray-900)] leading-[1.6] book-quote">「{q.q}」</div>
                  <div className="text-[11px] text-[var(--color-gray-500)] mt-1">目的:{q.goal}</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* 课中动作 */}
        <Section icon="💪" title="课中重点动作">
          <ul className="space-y-2">
            {baseCase.actions.map((a, i) => (
              <li key={i} className="flex items-center gap-2.5 p-2.5 rounded-[8px] bg-white/60">
                <span className="w-5 h-5 rounded-md bg-green-50 text-green-700 text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1">
                  <div className="text-[13px] font-medium">{a.name}</div>
                  <div className="text-[11px] text-[var(--color-gray-500)]">{a.reason}</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* 反对意见 */}
        {baseCase.objections.length > 0 && (
          <Section icon="🛡" title="反对意见 · 应答框架">
            <ul className="space-y-2.5">
              {baseCase.objections.map((o, i) => (
                <li key={i} className="text-[12.5px]">
                  <div className="text-[var(--color-gray-700)]">❓ "{o.q}"</div>
                  <div className="text-orange-700 mt-1">→ {o.answer}</div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 翻车点 */}
        <div className="flex gap-2 p-3 rounded-[10px] bg-[var(--color-warning-bg)]">
          <AlertTriangle className="w-4 h-4 text-[var(--color-warning)] mt-0.5 flex-shrink-0" />
          <div className="text-[12px] text-[var(--color-gray-700)] leading-[1.65]">
            <div className="font-semibold mb-1">小白教练翻车点</div>
            {baseCase.pitfalls.map((p, i) => (
              <div key={i}>· {p}</div>
            ))}
          </div>
        </div>
      </div>

      <Link to="/review" className="block">
        <PrimaryButton>
          <span className="inline-flex items-center justify-center gap-1">
            前往课后复盘 <ArrowRight className="w-4 h-4" />
          </span>
        </PrimaryButton>
      </Link>
      <GhostButton className="w-full">导出 PDF</GhostButton>

      {/* 补充信息弹窗 */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end" onClick={() => setShowAdd(false)}>
          <div
            className="w-full max-w-[480px] mx-auto bg-white rounded-t-[20px] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold">补充信息</h3>
              <button onClick={() => setShowAdd(false)}>
                <X className="w-5 h-5 text-[var(--color-gray-400)]" />
              </button>
            </div>
            <p className="text-[12px] text-[var(--color-gray-500)] mb-3">粘贴聊天截图文字、电话要点或写下你的现场观察。</p>
            <textarea
              id="addinfo"
              className="w-full h-28 p-3 rounded-[10px] border border-[var(--color-gray-200)] text-[13px] resize-none focus:outline-none focus:border-brand-500"
              placeholder={
                "比如:\n· 微信里她说『晚上加班到 10 点很难坚持』\n· 朋友圈半年前发过『健身房真不是我的菜』"
              }
            />
            <div className="flex gap-2 mt-4">
              <GhostButton onClick={() => setShowAdd(false)} className="flex-1">取消</GhostButton>
              <button
                onClick={() => {
                  const v = (document.getElementById("addinfo") as HTMLTextAreaElement)?.value ?? "";
                  upgradeTier(v || "demo");
                }}
                className="flex-1 rounded-[10px] py-2.5 text-[13px] font-semibold bg-brand-500 text-[var(--color-gray-900)]"
              >
                添加 · 升档
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}

function Section({
  icon,
  title,
  extra,
  children,
}: {
  icon: string;
  title: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--color-green-700)]">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        {extra}
      </div>
      <div className="border-t border-[var(--color-gray-200)] pt-2.5">{children}</div>
    </div>
  );
}
