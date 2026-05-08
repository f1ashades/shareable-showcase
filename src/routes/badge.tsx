import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, Card, Tag, PrimaryButton } from "@/components/MobileShell";
import { Mic, Play, Upload, Flame, AlertTriangle, Target, MessageCircle } from "lucide-react";
import { audioMock } from "@/lib/mock";

export const Route = createFileRoute("/badge")({
  head: () => ({ meta: [{ title: "智能工牌课中音频分析 · 产品能力预览" }, { name: "description", content: "学员侧信号 + 教练侧观察 · 前端 Demo,不调用真实后端。" }] }),
  component: BadgePage,
});

const stages = [
  "提取学员侧信号",
  "提取教练侧观察",
  "整合分析",
];

function BadgePage() {
  const [phase, setPhase] = useState<"idle" | "loading" | "result">("idle");
  const [progress, setProgress] = useState(0);

  const start = () => {
    setPhase("loading");
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += 1;
      setProgress(p);
      if (p >= 3) {
        clearInterval(id);
        setTimeout(() => setPhase("result"), 400);
      }
    }, 1200);
  };

  return (
    <MobileShell title="智能工牌 · 课中音频分析" subtitle="长期方向 · 产品能力预览">
      <Card className="bg-gradient-to-br from-[var(--color-gray-100)] to-white">
        <div className="flex items-center gap-2 mb-2">
          <Mic className="w-4 h-4 text-orange-500" />
          <span className="text-[13px] font-semibold">基于课中录音的学员/教练信号捕捉</span>
        </div>
        <p className="text-[11.5px] text-[var(--color-gray-500)] leading-[1.65]">
          ⓘ 本页面为前端 Demo,不调用真实后端、ASR、大模型。所有内容均为预设。
        </p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={start}
            disabled={phase === "loading"}
            className="rounded-[10px] py-2.5 text-[12.5px] font-medium border border-[var(--color-gray-200)] bg-white inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" /> 上传课中录音
          </button>
          <button
            onClick={start}
            disabled={phase === "loading"}
            className="rounded-[10px] py-2.5 text-[12.5px] font-semibold bg-brand-500 text-[var(--color-gray-900)] inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" /> 使用示例录音
          </button>
        </div>
      </Card>

      {phase !== "idle" && (
        <Card className="!p-4">
          <div className="text-[12.5px] font-semibold text-[var(--color-green-700)] mb-3">⚡ 正在分析录音…</div>
          <ul className="space-y-2">
            {stages.map((s, i) => {
              const done = phase === "result" || progress > i;
              const doing = phase === "loading" && progress === i;
              return (
                <li key={s} className="flex items-center justify-between text-[12.5px]">
                  <span className={done ? "text-[var(--color-gray-900)]" : "text-[var(--color-gray-500)]"}>▸ {s}</span>
                  <span className="text-[11px]">
                    {done ? <span className="text-[var(--color-success)]">✓</span> : doing ? <span className="text-brand-700 animate-pulse">⏳</span> : <span className="text-[var(--color-gray-300)]">…</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      {phase === "result" && (
        <>
          {/* 学员侧 */}
          <section className="space-y-2 fade-up">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[13px] font-semibold text-[var(--color-gray-900)]">👤 学员侧信号</h3>
              <Tag color="orange">{audioMock.user} · 正式课第 8 节</Tag>
            </div>

            <StudentBlock icon={<Flame className="w-3.5 h-3.5" />} title="学员对动作的反馈">
              {audioMock.fatigue.map((f, i) => (
                <Quote key={i} t={f.t} q={f.quote} ctx={f.ctx} />
              ))}
            </StudentBlock>

            <StudentBlock icon={<AlertTriangle className="w-3.5 h-3.5" />} title="疼痛/不适信号" warn>
              {audioMock.pain.map((f, i) => (
                <Quote key={i} t={f.t} q={f.quote} ctx={f.ctx} warn />
              ))}
            </StudentBlock>

            <StudentBlock icon={<Target className="w-3.5 h-3.5" />} title="兴奋/突破时刻">
              {audioMock.breakthrough.map((f, i) => (
                <Quote key={i} t={f.t} q={f.quote} ctx={f.ctx} />
              ))}
            </StudentBlock>

            <StudentBlock icon={<MessageCircle className="w-3.5 h-3.5" />} title="学员主动提问">
              {audioMock.active.map((f, i) => (
                <Quote key={i} t={f.t} q={f.quote} ctx={f.ctx} />
              ))}
            </StudentBlock>
          </section>

          {/* 教练侧 */}
          <section className="space-y-2 fade-up">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[13px] font-semibold text-[var(--color-gray-900)]">🎓 教练侧观察</h3>
              <Tag color="green">{audioMock.coach}</Tag>
            </div>
            <div className="text-[11px] text-[var(--color-gray-500)] px-1">ⓘ 不是评估,是辅助你看到自己的工作</div>

            <CoachBlock title="📡 对学员状态的响应及时性">
              <div className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.75]">
                学员发出 <b>4 次</b> 状态信号 · 平均响应 <b>{audioMock.responseAvg} 秒</b>
              </div>
              <div className="mt-2 p-2.5 rounded-[8px] bg-white text-[12px] text-[var(--color-gray-700)] leading-[1.65]">
                ⚠ 1 次「{audioMock.responseSlow.signal}」信号你 <b>{audioMock.responseSlow.time} 秒</b> 后做了退阶 <br />
                <span className="text-[var(--color-gray-500)]">建议:疼痛 / 不适信号优先快速响应</span>
              </div>
            </CoachBlock>

            <CoachBlock title="🗣 解释清晰度(基于学员后续反应)">
              <div className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.75]">
                「{audioMock.command.text}」口令出现 <b>{audioMock.command.count} 次</b>
                <br />
                学员 {audioMock.command.adjusted}/{audioMock.command.count} 次做出对应调整(良好)
              </div>
            </CoachBlock>
          </section>

          {/* 综合建议 */}
          <Card className="fade-up bg-brand-50 border-brand-100">
            <div className="text-[13px] font-semibold text-brand-700 mb-3">💡 给教练的复盘锚点</div>
            <ul className="space-y-2.5 text-[12.5px] text-[var(--color-gray-700)] leading-[1.7]">
              {audioMock.synthesis.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-orange-500 mt-0.5">·</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <PrimaryButton className="mt-4">一键写入下节课备课包 →</PrimaryButton>
          </Card>
        </>
      )}

      <Card className="!p-4 bg-[var(--color-gray-100)] border-0">
        <div className="text-[11.5px] font-semibold text-[var(--color-gray-700)] mb-2">ⓘ 关于这个能力</div>
        <div className="text-[11px] text-[var(--color-gray-500)] leading-[1.7]">
          这是基于课中音频(智能工牌等设备)的长期方向。实施依赖:
          <br />· 硬件(智能工牌或类似形态)
          <br />· 学员明确知情同意 + 数据合规边界
          <br />· 教练协议(工牌使用范围、数据用途)
          <br />
          <br />具体实施细节后续合作中确认。
        </div>
      </Card>
    </MobileShell>
  );
}

function StudentBlock({ icon, title, warn, children }: { icon: React.ReactNode; title: string; warn?: boolean; children: React.ReactNode }) {
  return (
    <div
      className="rounded-[12px] p-3.5"
      style={{
        background: "#FFF1EB",
        borderLeft: `4px solid ${warn ? "#DC2626" : "#FF6634"}`,
      }}
    >
      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-orange-700)] mb-2">
        {icon} {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CoachBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-[12px] p-3.5"
      style={{ background: "#E8F2EE", borderLeft: "4px solid #1F7A52" }}
    >
      <div className="text-[12px] font-semibold text-[var(--color-green-700)] mb-2">{title}</div>
      {children}
    </div>
  );
}

function Quote({ t, q, ctx, warn }: { t: string; q: string; ctx: string; warn?: boolean }) {
  return (
    <div className="bg-white/70 rounded-[8px] p-2.5">
      <div className="flex items-baseline gap-2">
        <span className="text-[10.5px] font-mono text-[var(--color-gray-400)]">{t}</span>
        <span className="text-[12.5px] book-quote text-[var(--color-gray-900)]">「{q}」</span>
      </div>
      <div className={`mt-1 text-[11px] ${warn ? "text-[var(--color-error)]" : "text-[var(--color-gray-500)]"}`}>→ {ctx}{warn && " · 教练记得退阶或调整"}</div>
    </div>
  );
}
