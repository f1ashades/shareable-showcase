import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, Card, Tag, PrimaryButton, GhostButton } from "@/components/MobileShell";
import { cases } from "@/lib/mock";
import { MessageSquareQuote, Phone, Eye, Plus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "学员画像 · DP 教练助理" }, { name: "description", content: "课前学员信息聚合 + 教练补充。" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [activeId, setActiveId] = useState<typeof cases[number]["id"]>("A");
  const c = cases.find((x) => x.id === activeId)!;

  return (
    <MobileShell title="学员画像" subtitle="课前 1 小时 · 信息聚合">
      {/* Tabs */}
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
                Case {cs.id} · {cs.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 基本信息 */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-300 to-orange-100 flex items-center justify-center text-[16px] font-bold text-[var(--color-green-700)]">
            {c.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-semibold">{c.name}</span>
              <Tag color={c.type === "formal" ? "green" : "brand"}>
                {c.type === "formal" ? "正式课 第 8 节" : "体验课"}
              </Tag>
            </div>
            <div className="text-[12px] text-[var(--color-gray-500)] mt-1">{c.meta}</div>
            <div className="mt-2">
              <Tag color="orange">学员类型识别 · {c.tag}</Tag>
            </div>
          </div>
        </div>
      </Card>

      {/* 教练补充信息 */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-semibold text-[var(--color-gray-700)]">教练补充信息</div>
          <span className="text-[11px] text-[var(--color-gray-400)]">有就贴 · 没有也能用</span>
        </div>
        <div className="space-y-2.5">
          {c.hasInfo.wechat > 0 && (
            <div className="flex gap-2.5 p-3 rounded-[10px] bg-brand-50">
              <MessageSquareQuote className="w-4 h-4 text-brand-700 mt-0.5 flex-shrink-0" />
              <div className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.65]">
                微信聊天 · {c.hasInfo.wechat} 段
                <div className="mt-1 book-quote text-[var(--color-gray-900)]">
                  {c.id === "A" && "「想为弟弟婚礼穿礼服好看一点」"}
                  {c.id === "C" && "「老公说她其实不想来,但答应了要来一次」"}
                  {c.id === "D" && "「我朋友想试试,挺没运动经验的 / 坐办公室,腰累」"}
                </div>
              </div>
            </div>
          )}
          {c.hasInfo.phone && (
            <div className="flex gap-2.5 p-3 rounded-[10px] bg-orange-50">
              <Phone className="w-4 h-4 text-orange-700 mt-0.5" />
              <div className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.65]">
                电话沟通要点:老公提到她对健身房有点抗拒
              </div>
            </div>
          )}
          {c.hasInfo.obs && (
            <div className="flex gap-2.5 p-3 rounded-[10px] bg-green-50">
              <Eye className="w-4 h-4 text-green-700 mt-0.5" />
              <div className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.65]">
                {c.id === "C" && "教练观察:朋友圈封面是孩子,半年前发过一句『健身房真不是我的菜』。"}
                {c.id === "E" && "上节课观察:悬垂提膝有小腿屈膝倾向、腰部偶尔顶腰;主观感受『第 4 周适应得不错』。"}
              </div>
            </div>
          )}
          <button className="w-full flex items-center justify-center gap-1 text-[12px] text-[var(--color-gray-500)] py-2 border border-dashed border-[var(--color-gray-300)] rounded-[10px]">
            <Plus className="w-3.5 h-3.5" /> 添加更多信息
          </button>
        </div>
      </Card>

      {/* 信息完整度 */}
      <Card variant="muted" className="!p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] font-semibold text-[var(--color-gray-700)]">📊 信息完整度</div>
          <Tag color={c.tier === 3 ? "orange" : c.tier === 2 ? "brand" : "neutral"}>
            {c.tier === 3 ? "高" : c.tier === 2 ? "中" : "低"} · 档位 {c.tier}
          </Tag>
        </div>
        <div className="flex gap-1 mb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full ${i <= c.tier ? "bg-brand-500" : "bg-[var(--color-gray-200)]"}`}
            />
          ))}
        </div>
        <div className="text-[11.5px] text-[var(--color-gray-500)] leading-[1.65]">
          {c.tier === 1 && "信息有限,AI 会输出基础 SOP 模板。补充信息可让备课包更精准。"}
          {c.tier === 2 && "已有部分针对性信息,AI 会做半个性化输出。"}
          {c.tier === 3 && "信息饱和,AI 可深度个性化,引用更多手册片段。"}
        </div>
      </Card>

      <Link to="/briefing" className="block">
        <PrimaryButton>
          <span className="inline-flex items-center justify-center gap-1">
            前往生成备课包 <ArrowRight className="w-4 h-4" />
          </span>
        </PrimaryButton>
      </Link>
      <Link to="/" className="block">
        <GhostButton className="w-full">返回总览</GhostButton>
      </Link>
    </MobileShell>
  );
}
