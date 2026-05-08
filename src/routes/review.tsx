import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, Card, Tag, PrimaryButton, GhostButton } from "@/components/MobileShell";
import { Mic, Type, Camera, Send, Pin, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "课后复盘 · 三层结构化" }, { name: "description", content: "5 项固定问题 + 备课包追问 + 知识贡献区。" }] }),
  component: ReviewPage,
});

const motivations = ["倒计时类(婚礼/活动)", "健康焦虑类", "家人推动类", "其他"];

function ReviewPage() {
  const [mode, setMode] = useState<"trial" | "formal">("trial");
  const [step, setStep] = useState<"input" | "draft">("input");
  const [motivation, setMotivation] = useState(0);
  const [smallWin, setSmallWin] = useState("臀桥她当场感觉到发力了");
  const [intent, setIntent] = useState(0);
  const [contribution, setContribution] = useState(
    "她体测时手机响了 3 次都没接,说不重要。"
  );
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setStep("draft");
    setGenerated(false);
    setTimeout(() => setGenerated(true), 1200);
  };

  if (step === "draft") return <DraftView onBack={() => setStep("input")} contribution={contribution} ready={generated} mode={mode} />;

  return (
    <MobileShell title="课后复盘" subtitle="李雨彤的体验课 · 1-2 分钟完成">
      {/* mode switch */}
      <div className="grid grid-cols-2 gap-2 bg-[var(--color-gray-100)] p-1 rounded-[10px]">
        {[
          { v: "trial", l: "体验课复盘" },
          { v: "formal", l: "正式课复盘" },
        ].map((m) => (
          <button
            key={m.v}
            onClick={() => setMode(m.v as "trial" | "formal")}
            className={`py-2 rounded-[8px] text-[12.5px] font-medium transition ${
              mode === m.v ? "bg-white shadow-sm text-[var(--color-gray-900)]" : "text-[var(--color-gray-500)]"
            }`}
          >
            {m.l}
          </button>
        ))}
      </div>

      {/* 第一层 */}
      <Layer index={1} title="几个固定问题">
        <Card className="space-y-5">
          <Field label="1. 她的核心动机你最终摸到的是?">
            <Radio options={motivations} value={motivation} onChange={setMotivation} />
          </Field>

          <Field label="2. 体测做了哪几项?">
            <div className="flex flex-wrap gap-2">
              {["体态评估", "单腿站立", "深蹲", "其他"].map((x, i) => (
                <ChipCheck key={x} label={x} defaultChecked={i < 2} />
              ))}
            </div>
            <input
              defaultValue="她体能比预期好"
              className="mt-3 w-full px-3 py-2 rounded-[8px] border border-[var(--color-gray-200)] text-[13px]"
              placeholder="一句话观察"
            />
          </Field>

          <Field label="3. 「小成就时刻」给到了吗?">
            <div className="flex gap-2 mb-2">
              <RadioPill label="给到了" active />
              <RadioPill label="没给到" />
            </div>
            <input
              value={smallWin}
              onChange={(e) => setSmallWin(e.target.value)}
              className="w-full px-3 py-2 rounded-[8px] border border-[var(--color-gray-200)] text-[13px]"
            />
          </Field>

          <Field label="4. 承单环节她的反应?">
            <div className="flex flex-wrap gap-2">
              {["明确意向", "犹豫", "已成单", "拒绝"].map((x, i) => (
                <RadioPill key={x} label={x} active={i === 0} />
              ))}
            </div>
          </Field>

          <Field label="5. 你对她的最终意向判断?">
            <Radio options={["高意向", "中意向", "低意向", "已成单"]} value={intent} onChange={setIntent} />
          </Field>
        </Card>
      </Layer>

      {/* 第二层 */}
      <Layer index={2} title="备课包提醒过的 1 个问题">
        <Card variant="muted">
          <div className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.65] book-quote">
            「你今天有问到她家庭支持的态度吗?」
          </div>
          <div className="flex gap-2 mt-3">
            <RadioPill label="是" active />
            <RadioPill label="否" />
            <RadioPill label="没机会问" />
          </div>
          <input
            defaultValue="老公支持,母亲犹豫"
            className="mt-3 w-full px-3 py-2 rounded-[8px] border border-[var(--color-gray-200)] text-[13px] bg-white"
            placeholder="一句话情况"
          />
        </Card>
      </Layer>

      {/* 第三层 */}
      <Layer
        index={3}
        title="今天观察到的、值得记住的细节"
        sub="你写的好观察,有机会成为其他教练的学习案例 ✨"
      >
        <div className="coach-contribution p-4 space-y-3">
          <textarea
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
            className="w-full h-24 bg-transparent text-[13px] resize-none focus:outline-none placeholder:text-[var(--color-gray-400)] leading-[1.7]"
            placeholder="比如:她说话/反应/状态里那些有点不一样的地方……"
          />
          <div className="flex gap-2">
            <IconBtn icon={Mic} label="语音" />
            <IconBtn icon={Type} label="打字" active />
            <IconBtn icon={Camera} label="图片" />
          </div>
          <div className="text-[11px] text-[var(--color-brand-700)]">💡 看看其他教练写过什么(展开)</div>
        </div>
      </Layer>

      <PrimaryButton onClick={handleGenerate}>
        <span className="inline-flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" /> 生成 AI 复盘
        </span>
      </PrimaryButton>
      <Link to="/briefing" className="block">
        <GhostButton className="w-full">返回备课包</GhostButton>
      </Link>
    </MobileShell>
  );
}

function DraftView({ onBack, contribution, ready, mode }: { onBack: () => void; contribution: string; ready: boolean; mode: "trial" | "formal" }) {
  return (
    <MobileShell title="AI 复盘草稿" subtitle={`${mode === "trial" ? "体验课" : "正式课"} · 李雨彤`}>
      {!ready ? (
        <Card className="!py-10 text-center">
          <div className="inline-flex items-center gap-2 text-[13px] text-[var(--color-gray-500)]">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            正在综合三层输入与备课包,生成复盘草稿……
          </div>
        </Card>
      ) : (
        <>
          {/* 状态判断 */}
          <Card className="!p-4 fade-up">
            <div className="text-[12px] font-semibold text-[var(--color-gray-500)] mb-2">学员意向状态判断</div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-info-bg)] text-[var(--color-info)] text-[13px] font-semibold">
              🔵 高意向待跟进
            </div>
            <p className="mt-3 text-[12.5px] text-[var(--color-gray-700)] leading-[1.7]">
              依据:动机强(婚礼倒计时)+ 阻力可控(家庭支持已确认)+ 价格未明确反对。
            </p>
          </Card>

          {/* AI 引用气泡 */}
          <div className="ai-citation p-4 fade-up pop">
            <div className="flex items-center gap-1 text-[11px] text-brand-700 font-semibold mb-2">
              <Pin className="w-3.5 h-3.5" /> 你提到的细节也起了关键作用
            </div>
            <div className="book-quote text-[13px] text-[var(--color-gray-900)] italic leading-[1.7]">
              「{contribution || "她体测时手机响了 3 次都没接,说不重要。"}」
            </div>
            <div className="mt-2.5 text-[12px] text-[var(--color-gray-700)] leading-[1.7]">
              → 这说明她当下是真把训练当成正经事在对待,不是来打发时间的。这个信号支持高意向判断。
            </div>
          </div>

          {/* 关键观察 */}
          <Card className="fade-up">
            <div className="text-[12.5px] font-semibold text-[var(--color-green-700)] mb-2">📊 课程关键观察</div>
            <ul className="text-[12.5px] text-[var(--color-gray-700)] space-y-1.5 leading-[1.7]">
              <li>+ 老公支持她来健身,但母亲犹豫</li>
              <li>+ 体能基础比预期好</li>
              <li>+ 对价格有疑虑,但没有明确拒绝</li>
            </ul>
          </Card>

          {/* 下一步 */}
          <Card className="fade-up">
            <div className="text-[12.5px] font-semibold text-[var(--color-green-700)] mb-3">📞 下一步建议</div>
            <ol className="space-y-3">
              <li className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.7]">
                <div className="font-medium text-[var(--color-gray-900)]">① 24 小时内电话跟进</div>
                <div className="mt-1">推荐时段:明天 19:00-20:00</div>
                <div>关键打动点:婚礼倒计时(具体到天数)/ 今天臀桥的进步 / 邀请母亲来店看一次</div>
              </li>
              <li className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.7]">
                <div className="font-medium text-[var(--color-gray-900)]">② 微信送一条改变之星案例</div>
                <div className="mt-1">同样产后女性 6 个月恢复 + 婚礼场景</div>
              </li>
            </ol>
          </Card>

          <Card variant="muted" className="fade-up">
            <div className="text-[12.5px] font-semibold mb-2">🤝 群内分享版(可选)</div>
            <div className="bg-white rounded-[8px] p-3 text-[12.5px] book-quote text-[var(--color-gray-700)] leading-[1.7]">
              「李雨彤,35,产后 8 月,弟弟婚礼倒计时 21 周。今天臀桥反馈很好。」
            </div>
            <button className="mt-2 text-[11.5px] text-brand-700 font-medium">一键转发到群 →</button>
          </Card>

          <PrimaryButton>
            <span className="inline-flex items-center justify-center gap-1">
              完成 · 提交复盘 <Send className="w-4 h-4" />
            </span>
          </PrimaryButton>
          <GhostButton className="w-full" onClick={onBack}>返回修改</GhostButton>
          <Link to="/dashboard" className="block">
            <GhostButton className="w-full">
              <span className="inline-flex items-center justify-center gap-1">
                查看店长看板 <ArrowRight className="w-4 h-4" />
              </span>
            </GhostButton>
          </Link>
        </>
      )}
    </MobileShell>
  );
}

function Layer({ index, title, sub, children }: { index: number; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-[var(--color-gray-900)] text-white text-[11px] font-bold flex items-center justify-center">{index}</span>
        <span className="text-[13px] font-semibold text-[var(--color-gray-900)]">{title}</span>
      </div>
      {sub && <div className="text-[11.5px] text-[var(--color-gray-500)] pl-7 -mt-1">{sub}</div>}
      <div>{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[12.5px] font-medium text-[var(--color-gray-700)] mb-2">{label}</div>
      {children}
    </div>
  );
}

function Radio({ options, value, onChange }: { options: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o, i) => (
        <button
          key={o}
          onClick={() => onChange(i)}
          className={`px-3 py-1.5 rounded-full text-[12px] border transition ${
            i === value
              ? "bg-brand-50 border-brand-500 text-brand-700"
              : "bg-white border-[var(--color-gray-200)] text-[var(--color-gray-500)]"
          }`}
        >
          {i === value ? "● " : "○ "}
          {o}
        </button>
      ))}
    </div>
  );
}

function RadioPill({ label, active }: { label: string; active?: boolean }) {
  const [on, setOn] = useState(!!active);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`px-3 py-1.5 rounded-full text-[12px] border transition ${
        on ? "bg-brand-50 border-brand-500 text-brand-700" : "bg-white border-[var(--color-gray-200)] text-[var(--color-gray-500)]"
      }`}
    >
      {on ? "● " : "○ "}{label}
    </button>
  );
}

function ChipCheck({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`px-3 py-1.5 rounded-full text-[12px] border transition ${
        on ? "bg-green-50 border-green-500 text-green-700" : "bg-white border-[var(--color-gray-200)] text-[var(--color-gray-500)]"
      }`}
    >
      {on ? "✓ " : ""}{label}
    </button>
  );
}

function IconBtn({ icon: Icon, label, active }: { icon: typeof Mic; label: string; active?: boolean }) {
  return (
    <button className={`flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] text-[11.5px] border transition ${active ? "bg-white border-brand-500 text-brand-700" : "bg-white/60 border-[var(--color-gray-200)] text-[var(--color-gray-500)]"}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}
