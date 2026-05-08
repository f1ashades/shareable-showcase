export type Case = {
  id: "A" | "B" | "C" | "D" | "E";
  name: string;
  meta: string;
  tag: string;
  tier: 1 | 2 | 3;
  tierLabel: string;
  type: "trial" | "formal";
  hasInfo: { wechat: number; phone: boolean; obs: boolean };
  motivationGuess: string;
  motivationDetail: string;
  questions: { q: string; goal: string }[];
  actions: { name: string; reason: string }[];
  objections: { q: string; answer: string }[];
  pitfalls: string[];
  trainingPlan?: { name: string; sets: number; isMain: boolean }[];
  observationPoints?: { name: string; cue: string }[];
  lastIssues?: { issue: string; followUp: string }[];
  keyReminder?: string;
};

export const cases: Case[] = [
  {
    id: "A",
    name: "李雨彤",
    meta: "35岁 · 女 · 162/62 · 产后 8 个月",
    tag: "产后女性",
    tier: 2,
    tierLabel: "半个性化",
    type: "trial",
    hasInfo: { wechat: 1, phone: false, obs: false },
    motivationGuess: "可能不只是想「产后恢复」",
    motivationDetail:
      "她可能是为了 [弟弟的婚礼场合],建议优先探查具体时间和具体诉求。",
    questions: [
      { q: "您弟弟婚礼是什么时候?距离现在大概还有几周?", goal: "锚定具体时间紧迫感" },
      { q: "您先生 / 家人对您来健身怎么看?", goal: "摸排家庭支持" },
      { q: "您每天大概几点能稳定有 1 小时给自己?", goal: "核实时间可控性" },
    ],
    actions: [
      { name: "死虫式", reason: "产后核心修复刚需" },
      { name: "臀桥", reason: "让她当场感受发力" },
      { name: "背阔肌激活", reason: "改善产后圆肩" },
    ],
    objections: [
      { q: "我没时间", answer: "共情 + 黄金窗口期 + 倒计时" },
      { q: "价格有点贵", answer: "价值锚点 + 对比 + 保障" },
    ],
    pitfalls: [
      "不要在第一节课就推大课包",
      "这类学员需要「先建立信任 + 看到效果」",
    ],
  },
  {
    id: "B",
    name: "王浩",
    meta: "28岁 · 男 · 178/82 · 久坐白领",
    tag: "都市白领-健康焦虑",
    tier: 1,
    tierLabel: "基础 SOP 模板",
    type: "trial",
    hasInfo: { wechat: 0, phone: false, obs: false },
    motivationGuess: "腰背不适,健康预警型",
    motivationDetail:
      "信息有限,建议按通用「健康焦虑型男性」SOP 推进,体验课中重点摸排具体不适场景。",
    questions: [
      { q: "您腰背不舒服多久了?是工作时更明显还是早上起床?", goal: "区分肌肉性 vs 结构性" },
      { q: "您每周大概几天能稳定来运动?", goal: "评估投入度" },
      { q: "之前尝试过什么方式缓解?", goal: "理解既有认知" },
    ],
    actions: [
      { name: "胸椎灵活性激活", reason: "久坐人群标配" },
      { name: "臀桥", reason: "唤醒沉睡臀肌" },
      { name: "鸟狗式", reason: "核心稳定性建立" },
    ],
    objections: [
      { q: "我工作太忙", answer: "工作角度切入 + 微习惯锚定" },
    ],
    pitfalls: ["信息不足时不强行个性化,先把基础体验打透"],
  },
  {
    id: "C",
    name: "张娟",
    meta: "42岁 · 女 · 158/68 · 老公转介绍",
    tag: "中年女性-被动到店",
    tier: 3,
    tierLabel: "深度个性化",
    type: "trial",
    hasInfo: { wechat: 2, phone: true, obs: true },
    motivationGuess: "她本人没动机,情面到店",
    motivationDetail:
      "老公帮约 + 朋友圈半年前发过「健身房真不是我的菜」+ 不爱运动。今天目标不是承单,是建立「健身没那么可怕」的体验。",
    questions: [
      { q: "您今天来,主要是为了让先生放心,还是您自己也有一点想试试?", goal: "把『被动』摆到台面" },
      { q: "如果一定要给身体一个『松一松』的礼物,您最想松哪个部位?", goal: "找一个她真在意的小切口" },
      { q: "您平时下班几点?孩子谁带?", goal: "评估真实可调度时间" },
    ],
    actions: [
      { name: "肩颈放松流", reason: "中年女性高接受度入口" },
      { name: "靠墙静蹲", reason: "无压感、易完成,制造小成就" },
      { name: "呼吸训练", reason: "建立『健身=照顾自己』认知" },
    ],
    objections: [
      { q: "其实我不太想坚持", answer: "不推卡 + 留个『偶尔来一次』的钩子" },
      { q: "老公帮我交了我不好意思走", answer: "把决策权还给她,反而拉好感" },
    ],
    pitfalls: [
      "今天不要承单,第一次来抗拒型学员推卡 = 直接劝退",
      "全程语速放慢,不要展示『专业感压迫』",
    ],
  },
  {
    id: "D",
    name: "小琪",
    meta: "微信昵称 · 私域转介绍 · 几乎零信息",
    tag: "私域 · 极低信息",
    tier: 1,
    tierLabel: "零信息退化版",
    type: "trial",
    hasInfo: { wechat: 2, phone: false, obs: false },
    motivationGuess: "信息不足以判断,先按通用 SOP 摸排",
    motivationDetail:
      "介绍人提到「坐办公室、腰累、想动一动」,初步假设『办公室白领-健康预警型』。今天关键是摸排 5 项基础信息,而不是个性化推进。",
    questions: [
      { q: "您今年大概多大、平时主要做什么工作?", goal: "补全基础信息" },
      { q: "之前有没有运动经历?最近一次是什么时候?", goal: "评估运动基础" },
      { q: "身体上现在有没有哪里不太舒服?", goal: "摸排禁忌" },
      { q: "今天来主要想了解什么、解决什么?", goal: "动机摸排" },
      { q: "平时几点能比较稳定?", goal: "时间可控性" },
    ],
    actions: [
      { name: "通用体态评估", reason: "私域学员第一节课先看身体" },
      { name: "胸椎/髋关节灵活性", reason: "白领高发短板" },
      { name: "1 个轻量爆点动作", reason: "留下「我能做到」的体感" },
    ],
    objections: [
      { q: "我朋友说你们不错才来的", answer: "私域信任基础好,不要急着推销,先把体验做足" },
    ],
    pitfalls: [
      "私域来的学员信任基础好,但反推单更敏感,今天不要推卡",
      "她甚至没填过小程序,体感全靠现场,准备好『摸排清单』",
    ],
  },
  {
    id: "E",
    name: "王思敏",
    meta: "32岁 · 女 · 162/55 · 正式课第 8 节 · 改变之星早期",
    tag: "正式课老学员",
    tier: 2,
    tierLabel: "正式课模式",
    type: "formal",
    hasInfo: { wechat: 0, phone: false, obs: true },
    motivationGuess: "训练已进入第 4 周,适应良好",
    motivationDetail:
      "今天主项:悬垂提膝。上节课「小腿屈膝」+「偶尔顶腰」需重点观察;学员主观感受『第 4 周适应得不错』,可在状态好时小幅尝试进阶。",
    questions: [
      { q: "上次课后 24-48 小时身体反应如何?有没有哪里特别酸?", goal: "评估恢复" },
      { q: "今天整体状态打几分(1-10)?", goal: "决定今天强度" },
      { q: "上次顶腰那次,今天有没有还在感觉?", goal: "确认安全边界" },
    ],
    actions: [
      { name: "悬垂提膝 × 3 组", reason: "主项,关注 6 个观察点" },
      { name: "卷腹 × 2 组", reason: "辅,继续巩固" },
      { name: "平板 × 2 组", reason: "辅,核心稳定" },
    ],
    objections: [],
    pitfalls: [
      "悬垂提膝 6 个观察点:抓握、头位、双腿、肩膀、腰部、提膝小腿",
      "「顶腰」信号优先快速响应,必要时退阶",
    ],
  },
];

export const contributions = [
  { coach: "李建华", title: "课中接电话信号判断法", refs: 12, type: "产后女性" },
  { coach: "王思敏", title: "腰背不适学员的「工作角度」话术", refs: 8, type: "都市男性" },
  { coach: "陈悦", title: "中年女性的「松一松」破冰提问", refs: 5, type: "中年女性" },
  { coach: "刘洋", title: "私域转介绍学员的『不推销』开场", refs: 4, type: "私域" },
];

export const audioMock = {
  user: "王思敏",
  coach: "李建华",
  duration: 60,
  fatigue: [
    { t: "00:08:23", quote: "这个有点累了", ctx: "第 2 组悬垂提膝" },
    { t: "00:23:15", quote: "我感觉到了!", ctx: "第 3 组卷腹" },
  ],
  pain: [
    { t: "00:31:48", quote: "有点顶腰", ctx: "第 4 组悬垂提膝" },
  ],
  breakthrough: [
    { t: "00:23:15", quote: "比上次好,这次能做了", ctx: "第 3 组卷腹" },
  ],
  active: [
    { t: "00:42:12", quote: "我能不能试 6 个?", ctx: "进阶意愿信号" },
  ],
  responseAvg: 8,
  responseSlow: { signal: "顶腰", time: 12 },
  command: { text: "收下巴看前方", count: 3, adjusted: 2 },
  synthesis: [
    "学员今天有 1 次明显突破(第 3 组卷腹),下节课可基于这个状态尝试小幅进阶",
    "学员有 1 次「顶腰」信号,响应延迟 12 秒,下节课关键观察:腰部状态和退阶时机",
    "学员主动提问「能不能试 6 个」— 训练动机已激活,下节课配合『挑战性目标』",
  ],
};
