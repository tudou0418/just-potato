'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Terminal,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Lightbulb,
  ChevronRight,
} from 'lucide-react'
import type { PostMetadata } from '@/lib/posts'

type RobotFollowCursorArticleProps = {
  metadata: PostMetadata
}

type PointerState = { x: number; y: number }

// ========== 真实代码片段 ==========

const pointerSnippet = `// 转发鼠标事件给底层 Spline canvas
const forwardPointerToSpline = useCallback(
  (event: React.PointerEvent<HTMLElement>) => {
    const canvas = document.querySelector<HTMLCanvasElement>(
      '.spline-scene-forward-target canvas'
    )
    if (!canvas) return
    canvas.dispatchEvent(new PointerEvent('pointermove', {
      clientX: event.clientX,
      clientY: event.clientY,
      // ...其他坐标字段
    }))
  }, []
)`

const starFieldSnippet = `// 纯 CSS box-shadow 星空，零 DOM 开销
.stars-layer-md {
  width: 1px;
  height: 1px;
  box-shadow:
    132px 44px #fff4,  /* 200+ 个随机坐标 */
    807px 218px #fff3,
    /* ... */;
}`

const videoScrollSnippet = `// 滚动驱动视频帧
const onScroll = () => {
  const max = document.body.scrollHeight - window.innerHeight
  const p = Math.min(1, Math.max(0, window.scrollY / max))
  video.currentTime = p * video.duration
}
window.addEventListener('scroll', onScroll, { passive: true })`

// ========== 真实开发记录数据 ==========

// ========== 复刻指南 ==========

const REPRODUCE_STEPS = [
  {
    step: '1',
    title: '在 Spline 建一个机器人场景',
    content:
      '注册 spline.design → 新建项目 → 用 Library 里的机器人模板（或自己搭）→ 添加鼠标跟随事件（Head Look At → Mouse Position）→ 导出为 .splinecode 文件 → 放到 public/models/',
    prompt: '给 AI 的提示词示例：\n"用 Spline 创建一个友好的小机器人角色，头部跟随鼠标移动，有轻微的待机呼吸动画，场景背景透明"',
  },
  {
    step: '2',
    title: '安装依赖',
    content: 'pnpm add @splinetool/react-spline @splinetool/runtime',
    prompt: '',
  },
  {
    step: '3',
    title: '接入 Next.js',
    content:
      '用 next/dynamic + ssr:false 包裹 Spline 组件，避免 SSR 报错。场景文件用 public/ 目录下的 .splinecode 路径。',
    prompt: '给 AI 的提示词示例：\n"创建一个全屏 Spline 3D 背景，fixed 定位，z-index 在最底层，支持深空主题，SSR 安全"',
  },
  {
    step: '4',
    title: '实现滚动劫持',
    content:
      '用 useScrollJack 自定义 Hook 捕获 wheel/touch/keyboard 事件，累积 delta 达到阈值后切换场景。每个场景是一个 fixed inset-0 的 overlay，用 CSS scale + opacity 做切换动画。',
    prompt: '给 AI 的提示词示例：\n"实现单屏滚动劫持导航，3 个全屏场景，滚轮切换，CSS scale 缩放过渡动画，wheel 事件需要 passive:false 阻止默认滚动"',
  },
  {
    step: '5',
    title: '星空 + 聚光灯背景',
    content:
      '星空：纯 CSS box-shadow（3 层 200+ 随机坐标），零 DOM。聚光灯：3 层 radial-gradient 叠加（暗角 + 鼠标亮斑 + 头部光源），用 useState 跟踪鼠标位置。',
    prompt: '给 AI 的提示词示例：\n"深空极简星空背景，3 层 box-shadow 星点，加一个从机器人头部位置发散的聚光灯效果，跟随鼠标移动"',
  },
  {
    step: '6',
    title: '视频帧同步（可选）',
    content:
      '滚动到最后一屏时释放 scroll jacking，切换为 body 原生滚动。用 window.scrollY / (scrollHeight - innerHeight) 算出进度 0-1，赋值给 video.currentTime。视频用 muted + playsInline + preload=auto。',
    prompt: '给 AI 的提示词示例：\n"实现滚动驱动视频播放，视频固定全屏背景，body 400vh 滚动高度，scrollY 映射到 video.currentTime"',
  },
]

const TOOLCHAIN = [
  { name: 'Spline', role: '3D 机器人建模 + 场景', url: 'https://spline.design' },
  { name: 'Next.js 16', role: 'App Router / RSC / 动态路由', url: 'https://nextjs.org' },
  { name: 'Tailwind CSS', role: '样式系统，深空主题全部手写', url: 'https://tailwindcss.com' },
  { name: 'Claude Code', role: 'AI 编程助手，写了 90% 的组件代码', url: 'https://claude.ai' },
  { name: 'Kling AI', role: '视频生成，用于第四屏电影叙事', url: 'https://klingai.com' },
]

const DEVLOG = [
  {
    phase: '01',
    title: '选型：为什么是 Spline 而不是 Three.js',
    type: 'decision' as const,
    content:
      '直接用 Three.js 写机器人太重了，维护成本也高。Spline 的可视化编辑器能快速调角度、灯光和跟随参数，导出 `.splinecode` 后通过 `@splinetool/react-spline` 接入 Next.js，一行 `<Spline scene="..." />` 就完事。',
    lesson: '简单场景别自己写 WebGL，工具链成熟就用工具链。',
  },
  {
    phase: '02',
    title: 'SSR 崩溃：window is not defined',
    type: 'bug' as const,
    content:
      'Spline 场景依赖 `window`，Next.js 服务端渲染直接报错。用 `next/dynamic` + `ssr: false` 解决。但后来 `ProjectsShowcase` 里直接用了 `window.innerWidth` 又崩一次，改成 `useEffect` 里初始化响应式状态。',
    code: `// 错误：SSR 时 window 不存在
const isMd = window.innerWidth > 768  // 💥

// 修复：客户端初始化
const [isMd, setIsMd] = useState(false)
useEffect(() => {
  setIsMd(window.innerWidth > 768)
}, [])`,
    lesson: 'Next.js 项目里 `window` 只能出现在 `useEffect` 或 `ssr: false` 的组件里。',
  },
  {
    phase: '03',
    title: '机器人只有上半身',
    type: 'bug' as const,
    content:
      '调了很多次 CSS scale、translateY 都不行，最后分析 `.splinecode` 二进制文件才发现——模型里只有 Head、Neck、arm、elbow、forearm、Hand 节点，根本没有腿。是 Spline 导出时选错了范围。',
    prompt: '用户原话："我发现原因所在了机器人模型只有上半身，但是我看 /app.spline.design 的模板是有全身的"',
    lesson: '调 CSS 之前先确认模型本身的数据完整性。',
  },
  {
    phase: '04',
    title: '深色背景上的文字全部消失',
    type: 'bug' as const,
    content:
      '首页强制深空背景（`#060810`），但组件里用的是 `dark:text-white`。博客默认主题是 `light`，`<html>` 上没有 `dark` class，所有 `dark:` 前缀的样式都不会生效。解决方案：首页所有文字直接用 `text-white/X`，不再依赖 `dark:` 前缀。',
    lesson: '强制覆盖背景色时，必须同步检查文字颜色是否走了主题前缀。',
  },
  {
    phase: '05',
    title: '聚光灯 + 星空背景',
    type: 'feature' as const,
    prompt: '用户原话："整个背景太光秃秃的，可以弄成星空的背景效果，然后灯光是从机器人的头部位置发散出来的"',
    content:
      '星空用纯 CSS `box-shadow` 实现（3 层，200+ 个随机坐标），零 DOM 开销。聚光灯用 3 层 `radial-gradient` 叠加：暗角、鼠标亮斑、头部光源。',
    code: starFieldSnippet,
  },
  {
    phase: '06',
    title: '滚动劫持 + 视频帧同步',
    type: 'feature' as const,
    content:
      '前 3 屏用 scroll jacking（捕获 wheel 事件，累积 delta 切换场景），第 4 屏切换为 body 原生滚动，用 `window.scrollY` 驱动 `video.currentTime`。中间遇到内部 scrollable div 在 fixed 容器里事件不传递的问题，改成 body 滚动才解决。',
    code: videoScrollSnippet,
  },
  {
    phase: '07',
    title: '视频一直 Loading 的排查',
    type: 'bug' as const,
    content:
      '`onLoadedData` 只在首次网络加载时触发一次，浏览器缓存后不再 fire。但每次离开 Scene 3 都重置了 `videoReady = false`，回来就永远卡 loading。改用手动 `addEventListener` + `readyState >= 2` 立即检查双重保险。',
    lesson: '浏览器缓存的视频不会重复触发 loadeddata，需要主动检查 readyState。',
  },
  {
    phase: '08',
    title: '鼠标事件转发：让机器人继续跟随',
    type: 'feature' as const,
    content:
      '最后一屏是"机器人 + 热点卡片"布局，卡片覆盖在 canvas 上方，机器人感知不到鼠标。解决方案是在卡片上监听 `onPointerMove`，手动构造一个新的 `PointerEvent` dispatch 给底层 canvas。',
    code: pointerSnippet,
  },
]

// ========== 交互 Demo ==========

function DemoStage() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 })

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = stageRef.current?.getBoundingClientRect()
    if (!bounds) return
    const nextX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const nextY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    setPointer({ x: Math.max(-1, Math.min(1, nextX)), y: Math.max(-1, Math.min(1, nextY)) })
  }
  const resetPointer = () => setPointer({ x: 0, y: 0 })

  const eyeX = pointer.x * 11
  const eyeY = pointer.y * 8
  const haloX = pointer.x * 28
  const haloY = pointer.y * 20

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative min-h-[380px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-[#080d18]"
    >
      <div
        className="absolute left-1/2 top-[16%] h-48 w-48 -translate-x-1/2 rounded-full blur-3xl transition-transform duration-200"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 70%)',
          transform: `translate(calc(-50% + ${haloX}px), ${haloY}px)`,
        }}
      />

      <div className="absolute left-4 top-4 font-mono text-[11px] text-white/25">
        demo: 移动鼠标试试
      </div>

      <div className="absolute right-4 top-4 font-mono text-right text-[11px] text-white/25">
        <div>x {pointer.x.toFixed(2)}</div>
        <div>y {pointer.y.toFixed(2)}</div>
      </div>

      <div className="article-robot-float absolute left-1/2 top-[28%] h-[220px] w-[200px] -translate-x-1/2">
        <div
          className="absolute left-1/2 top-0 h-[120px] w-[146px] -translate-x-1/2 rounded-[36px] border border-white/10 bg-[#0a1020]"
          style={{ transform: `translateX(-50%) rotate(${pointer.x * 6}deg)` }}
        >
          <div className="absolute left-[30px] top-[36px] h-8 w-8 rounded-full bg-[radial-gradient(circle,#fff_0_18%,#bae6fd_24%,#38bdf8_55%,rgba(56,189,248,0.16)_100%)]">
            <span
              className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-slate-950 transition-transform duration-150"
              style={{ transform: `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))` }}
            />
          </div>
          <div className="absolute right-[30px] top-[36px] h-8 w-8 rounded-full bg-[radial-gradient(circle,#fff_0_18%,#bae6fd_24%,#38bdf8_55%,rgba(56,189,248,0.16)_100%)]">
            <span
              className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-slate-950 transition-transform duration-150"
              style={{ transform: `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))` }}
            />
          </div>
          <div className="absolute bottom-5 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-sky-300/80 to-transparent" />
        </div>

        <div
          className="absolute bottom-0 left-1/2 h-[110px] w-[130px] -translate-x-1/2 rounded-[28px] border border-white/10 bg-[#0a1020]"
          style={{ transform: `translateX(-50%) rotate(${pointer.x * 3}deg)` }}
        >
          <div className="absolute left-1/2 top-[22px] h-[48px] w-[48px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0_16%,#7dd3fc_28%,rgba(59,130,246,0.8)_62%,transparent_100%)]" />
          <div className="absolute left-[-8px] top-[28px] h-[58px] w-3.5 rotate-[18deg] rounded-full bg-slate-500/60" />
          <div className="absolute right-[-8px] top-[28px] h-[58px] w-3.5 rotate-[-18deg] rounded-full bg-slate-500/60" />
        </div>
      </div>
    </div>
  )
}

// ========== 开发日志条目 ==========

function DevLogEntry({ entry }: { entry: typeof DEVLOG[number] }) {
  const [expanded, setExpanded] = useState(false)
  const typeConfig = {
    bug: { icon: AlertTriangle, color: 'text-amber-500 dark:text-amber-400', label: 'Bug' },
    feature: { icon: Lightbulb, color: 'text-sky-500 dark:text-sky-400', label: '功能' },
    decision: { icon: CheckCircle2, color: 'text-emerald-500 dark:text-emerald-400', label: '决策' },
  }
  const cfg = typeConfig[entry.type]
  const Icon = cfg.icon

  return (
    <div className="group relative pl-10 pb-10 border-l-2 border-slate-200 dark:border-white/8 last:border-l-0 last:pb-0">
      {/* 时间线节点 */}
      <div className={`absolute left-0 top-0 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-[#080d18] ${cfg.color}`}>
        <Icon size={13} />
      </div>

      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[11px] text-slate-300 dark:text-white/25">{entry.phase}</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.color} opacity-70`}>
          {cfg.label}
        </span>
      </div>

      <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">
        {entry.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-white/55">
        {entry.content}
      </p>

      {/* 用户原话 */}
      {entry.prompt && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 dark:border-white/6 dark:bg-white/[0.03] px-4 py-3">
          <div className="flex items-start gap-2">
            <MessageSquare size={13} className="text-slate-300 dark:text-white/20 mt-0.5 shrink-0" />
            <p className="text-[13px] leading-6 text-slate-400 dark:text-white/40 italic">
              {entry.prompt}
            </p>
          </div>
        </div>
      )}

      {/* 代码块（可折叠） */}
      {entry.code && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300 hover:text-slate-500 dark:text-white/30 dark:hover:text-white/50 transition-colors"
          >
            <ChevronRight size={12} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
            {expanded ? '收起代码' : '查看代码'}
          </button>
          {expanded && (
            <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-200 dark:border-white/6 bg-[#060a14] p-4 text-[12px] leading-6 text-sky-200/70 font-mono">
              <code>{entry.code}</code>
            </pre>
          )}
        </div>
      )}

      {/* 经验总结 */}
      {entry.lesson && (
        <div className="mt-4 flex items-start gap-2 text-[13px] text-slate-400 dark:text-white/45">
          <span className="text-emerald-500/60 dark:text-emerald-400/60 shrink-0">→</span>
          <span>{entry.lesson}</span>
        </div>
      )}
    </div>
  )
}

// ========== 主组件 ==========

export default function RobotFollowCursorArticle({ metadata }: RobotFollowCursorArticleProps) {
  const { title, date, category, readTime, tags } = metadata

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#050810] dark:text-white" style={{ scrollBehavior: 'smooth' }}>
      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-10">

        {/* 返回 */}
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-400 hover:text-slate-600 dark:text-white/30 dark:hover:text-white/60 transition-colors"
        >
          <ArrowLeft size={14} />
          返回文章列表
        </Link>

        {/* 标题区 */}
        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-slate-400 dark:text-white/30">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} />
              {date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} />
              {readTime}
            </span>
            <span className="rounded-full border border-slate-200 dark:border-white/10 px-3 py-1 text-[11px] font-bold tracking-wider text-slate-500 dark:text-white/40">
              {category}
            </span>
          </div>

          <h1 className="mt-6 text-3xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>

          <p className="mt-5 text-[15px] leading-7 text-slate-500 dark:text-white/45 max-w-2xl">
            {metadata.description}
          </p>

          {tags && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="font-mono text-[11px] text-slate-300 dark:text-white/20">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Demo */}
        <div className="mt-12">
          <DemoStage />
        </div>

        {/* 页内导航 */}
        <nav className="mt-12 flex flex-wrap gap-2">
          {[
            { id: 'tools', label: '工具链' },
            { id: 'reproduce', label: '复刻指南' },
            { id: 'ai-review', label: 'AI 协作' },
            { id: 'devlog', label: '开发记录' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-bold text-slate-500 transition-all hover:border-sky-300 hover:text-sky-600 dark:border-white/8 dark:bg-white/[0.03] dark:text-white/40 dark:hover:border-sky-400/40 dark:hover:text-sky-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 工具链 */}
        <section id="tools" className="mt-16">
          <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/25">
            <Wrench size={14} />
            工具链
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLCHAIN.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-slate-200 bg-white dark:border-white/6 dark:bg-white/[0.02] px-4 py-3"
              >
                <div className="font-bold text-[14px] text-slate-800 dark:text-white/80">{tool.name}</div>
                <div className="mt-1 text-[12px] text-slate-400 dark:text-white/30">{tool.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 复刻指南 */}
        <section id="reproduce" className="mt-16">
          <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/25">
            <Terminal size={14} />
            复刻指南
          </h2>
          <p className="mt-3 text-[14px] text-slate-500 dark:text-white/45 leading-7">
            如果你也需要做一个类似的 3D 沉浸式首页，按这个顺序来：
          </p>
          <div className="mt-6 space-y-6">
            {REPRODUCE_STEPS.map((s) => (
              <div key={s.step} className="relative pl-10">
                <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04] font-mono text-[11px] font-bold text-slate-400 dark:text-white/40">
                  {s.step}
                </div>
                <h3 className="text-[15px] font-bold text-slate-800 dark:text-white/75">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-slate-400 dark:text-white/40 whitespace-pre-line">
                  {s.content}
                </p>
                {s.prompt && (
                  <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 dark:border-white/6 dark:bg-white/[0.03] px-4 py-3">
                    <div className="flex items-start gap-2">
                      <MessageSquare size={13} className="text-slate-300 dark:text-white/20 mt-0.5 shrink-0" />
                      <p className="text-[12px] leading-6 text-slate-400 dark:text-white/35 italic whitespace-pre-line">
                        {s.prompt}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 和 AI 协作的真实感受 */}
        <section id="ai-review" className="mt-14 rounded-2xl border border-slate-200 bg-white dark:border-white/6 dark:bg-white/[0.02] p-6">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/25">
            关于 AI 协作
          </h2>
          <div className="mt-4 space-y-4 text-[14px] leading-7 text-slate-500 dark:text-white/50">
            <p>
              这次首页重写，大概 <span className="text-slate-800 dark:text-white/70 font-bold">90% 的组件代码是 Claude Code 生成的</span>。
              包括 scroll jacking hook、场景切换逻辑、星空背景、聚光灯效果、轮盘菜单、3D 旋转木马、视频帧同步。
            </p>
            <p>
              但 AI 写的代码不是直接就能用。有几个典型的"AI 式问题"：
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-amber-500/60 dark:text-amber-400/60 shrink-0">•</span>
                <span><span className="text-slate-700 dark:text-white/65 font-medium">过度设计</span>——一开始轮盘菜单搞了发光动画、呼吸效果、多层阴影，实际看起来太花哨，后来精简了</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500/60 dark:text-amber-400/60 shrink-0">•</span>
                <span><span className="text-slate-700 dark:text-white/65 font-medium">不验证就写</span>——CSS scale 改不了 3D 摄像机视角，但它连续试了好几次 CSS 方案才放弃</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500/60 dark:text-amber-400/60 shrink-0">•</span>
                <span><span className="text-slate-700 dark:text-white/65 font-medium">主题感知盲区</span>——改了背景色但忘了同步文字颜色，这种上下文丢失是最常见的</span>
              </li>
            </ul>
            <p>
              结论：AI 适合写<strong className="text-slate-800 dark:text-white/70">结构明确的组件和工具函数</strong>，
              但<strong className="text-slate-800 dark:text-white/70">视觉调优和上下文关联</strong>还是得自己盯着。
            </p>
          </div>
        </section>

        {/* 开发时间线 */}
        <section id="devlog" className="mt-16">
          <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/25">
            <Terminal size={14} />
            开发记录
          </h2>
          <div className="mt-8">
            {DEVLOG.map((entry) => (
              <DevLogEntry key={entry.phase} entry={entry} />
            ))}
          </div>
        </section>

        {/* 标签 */}
        {tags && tags.length > 0 && (
          <div className="mt-16 flex flex-wrap gap-2 border-t border-slate-200 dark:border-white/6 pt-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-100 dark:border-white/8 dark:bg-white/[0.03] px-3 py-1.5 text-[11px] font-mono text-slate-400 dark:text-white/30"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
