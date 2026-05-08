import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, Card, Tag } from "@/components/MobileShell";
import { TrendingUp, Sparkles, Star, Building2 } from "lucide-react";
import { contributions } from "@/lib/mock";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "店长 / 总部看板 · DP 教练助理" }, { name: "description", content: "教练能力曲线、知识贡献趋势、商家生态洞察。" }] }),
  component: Dashboard,
});

const coaches = [
  { name: "李建华", level: "头部", score: 92, color: "bg-green-500" },
  { name: "王思敏", level: "中游", score: 78, color: "bg-brand-500" },
  { name: "陈悦", level: "新教练", score: 64, color: "bg-orange-500" },
  { name: "刘洋", level: "新教练", score: 58, color: "bg-orange-500" },
];

const radarAxis = ["动机识别", "课中回应", "小成就", "承单时机", "现场观察"];
const radarValues = [85, 72, 80, 65, 90]; // 0-100

function Dashboard() {
  return (
    <MobileShell title="店长 · 总部看板" subtitle="北苑店 · 4 位教练 · 本月">
      {/* 漏斗 */}
      <Card>
        <div className="text-[12.5px] font-semibold text-[var(--color-green-700)] mb-3">📊 全店转化漏斗 · 本月</div>
        <div className="space-y-2">
          {[
            { l: "体验课预约", v: 142, color: "bg-brand-500", w: 100 },
            { l: "到店", v: 118, color: "bg-brand-500/80", w: 83 },
            { l: "完成体验课", v: 112, color: "bg-orange-500/80", w: 79 },
            { l: "成单", v: 67, color: "bg-green-500", w: 47 },
          ].map((row) => (
            <div key={row.l}>
              <div className="flex items-center justify-between text-[11.5px] text-[var(--color-gray-500)] mb-1">
                <span>{row.l}</span>
                <span><span className="font-bold text-[var(--color-gray-900)]">{row.v}</span> 人</span>
              </div>
              <div className="h-5 rounded-md bg-[var(--color-gray-100)] overflow-hidden">
                <div className={`h-full ${row.color} transition-all`} style={{ width: `${row.w}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-dashed border-[var(--color-gray-200)] flex items-center justify-between text-[12px]">
          <span className="text-[var(--color-gray-500)]">综合承单率</span>
          <span className="text-orange-500 font-bold text-[15px]">47.2% <span className="text-[10px] text-[var(--color-success)]">↑ 6.4 pt</span></span>
        </div>
      </Card>

      {/* 教练雷达 */}
      <Card>
        <div className="text-[12.5px] font-semibold text-[var(--color-green-700)] mb-3">🎯 王思敏 · 5 项关键能力</div>
        <Radar axis={radarAxis} values={radarValues} />
      </Card>

      {/* 教练能力曲线列表 */}
      <Card>
        <div className="text-[12.5px] font-semibold text-[var(--color-green-700)] mb-3">📈 教练成长曲线</div>
        <div className="space-y-3">
          {coaches.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-gray-100)] text-[11px] font-semibold flex items-center justify-center">{c.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium">{c.name}</span>
                  <Tag color={c.level === "头部" ? "green" : c.level === "中游" ? "brand" : "orange"}>{c.level}</Tag>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-[var(--color-gray-100)] overflow-hidden">
                  <div className={`h-full ${c.color}`} style={{ width: `${c.score}%` }} />
                </div>
              </div>
              <span className="text-[13px] font-bold text-[var(--color-gray-700)] w-8 text-right">{c.score}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* AI 洞察标题 */}
      <div className="flex items-center justify-between px-1 pt-2">
        <h3 className="text-[13px] font-semibold text-[var(--color-gray-700)] inline-flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-orange-500" /> AI 洞察
        </h3>
        <span className="text-[11px] text-[var(--color-gray-400)]">4 张</span>
      </div>

      {/* 卡片 1 */}
      <Card>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--color-green-700)] mb-2">
          <span>① 短板诊断</span>
        </div>
        <p className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.7]">
          本月新教练在 <span className="font-semibold text-orange-700">「承单时机判断」</span> 项目上集中偏弱(平均 58 分),建议 1v1 带教重点放在体验课最后 10 分钟的反应识别。
        </p>
      </Card>

      {/* 卡片 2 */}
      <Card>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--color-green-700)] mb-2">
          <span>② 翻车点提醒</span>
        </div>
        <p className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.7]">
          近 7 天 <span className="font-semibold">3 例</span> 产后女性体验课出现「过早推大课包」翻车,已自动加入新教练备课包提醒。
        </p>
      </Card>

      {/* 卡片 3:知识贡献趋势 ★ */}
      <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] font-semibold text-brand-700 inline-flex items-center gap-1">
            <Star className="w-3.5 h-3.5" /> ③ 知识贡献趋势
          </div>
          <span className="inline-flex items-center text-[10.5px] text-[var(--color-success)] gap-0.5"><TrendingUp className="w-3 h-3" /> +45%</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[28px] font-bold text-[var(--color-green-700)]">42</span>
          <span className="text-[12px] text-[var(--color-gray-500)]">条优秀观察 · 8 条已入库</span>
        </div>
        <div className="mt-3 space-y-2">
          {contributions.slice(0, 3).map((c, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-[8px] bg-white">
              <span className="text-[10px] text-brand-700 font-bold mt-0.5">★</span>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-[var(--color-gray-900)] leading-snug truncate">{c.title}</div>
                <div className="text-[10.5px] text-[var(--color-gray-500)] mt-0.5">
                  {c.coach} · 已被 <span className="text-orange-500 font-semibold">{c.refs}</span> 位新教练参考
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-dashed border-brand-100 flex justify-between text-[11px] text-brand-700">
          <button>查看完整知识库</button>
          <button>审核待入库案例 →</button>
        </div>
      </Card>

      {/* 卡片 4:能力预览 */}
      <Card className="border-dashed">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--color-gray-700)] mb-2">
          <Building2 className="w-3.5 h-3.5 text-[var(--color-green-700)]" />
          ④ 来自美团商家生态
          <Tag color="neutral">能力预览</Tag>
        </div>
        <p className="text-[12.5px] text-[var(--color-gray-700)] leading-[1.75]">
          你所在商圈的私教馆数据呈现新趋势:产后女性体验课需求近 90 天有明显增长。
        </p>
        <p className="text-[12px] text-[var(--color-gray-500)] leading-[1.7] mt-2">
          这意味着:你们门店的产后女性人群备课包应用率,可能是接下来一个值得关注的指标。
        </p>
        <div className="mt-3 pt-3 border-t border-dashed border-[var(--color-gray-200)] text-[10.5px] text-[var(--color-gray-400)] leading-[1.6]">
          💡 来自美团商家生态的脱敏聚合数据。具体共享什么 / 什么节奏共享,需双方协议。本卡片为产品能力预览。
        </div>
        <button className="mt-2 text-[11px] text-[var(--color-gray-400)]">详细信息后续合作中确认</button>
      </Card>
    </MobileShell>
  );
}

/* Simple SVG radar chart */
function Radar({ axis, values }: { axis: string[]; values: number[] }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 80;
  const n = axis.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, r: number) => [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];

  const grids = [0.25, 0.5, 0.75, 1].map((s) =>
    axis.map((_, i) => point(i, radius * s).join(",")).join(" ")
  );
  const dataPath = values.map((v, i) => point(i, (radius * v) / 100).join(",")).join(" ");

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {grids.map((g, i) => (
          <polygon key={i} points={g} fill="none" stroke="#E5E5DD" strokeWidth={1} />
        ))}
        {axis.map((_, i) => {
          const [x, y] = point(i, radius);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E5E5DD" strokeWidth={1} />;
        })}
        <polygon points={dataPath} fill="rgba(255,195,0,0.25)" stroke="#FFC300" strokeWidth={2} />
        {values.map((_, i) => {
          const [x, y] = point(i, (radius * values[i]) / 100);
          return <circle key={i} cx={x} cy={y} r={3} fill="#FF6634" />;
        })}
        {axis.map((label, i) => {
          const [x, y] = point(i, radius + 18);
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10.5" fill="#404040">
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
