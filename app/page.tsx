'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import {
  ExternalLink,
  Sparkles,
  BookOpen,
  Wrench,
  Users,
  User,
  Plane,
  ChevronDown,
  Github,
  Mail,
  PenTool,
} from 'lucide-react'
import { SplineLoadingScreen } from '@/components/Spline/SplineLoadingScreen'

const SplineScene = dynamic(() => import('@/components/Spline/SplineScene'), {
  ssr: false,
  loading: () => <SplineLoadingScreen />,
})

// ========== 常量 ==========

const SCENE_COUNT = 3
const SCROLL_THRESHOLD = 90
const TRANSITION_DURATION = 560

const PROJECTS = [
  {
    title: '我的个人博客',
    description: '基于 Next.js 构建的现代化响应式博客，增强型主题配置，确保多端阅读清晰。',
    tags: ['Next.js', 'High Contrast'],
    link: '/projects',
  },
  {
    title: '开源组件库',
    description: '一套轻量级、高性能的 React 组件库，专为开发者打造，开箱即用。',
    tags: ['React', 'TypeScript'],
    link: '/projects',
  },
  {
    title: 'AI 辅助工具',
    description: '基于 LLM 的智能代码助手，提升开发效率，减少重复劳动。',
    tags: ['AI', 'Productivity'],
    link: '/projects',
  },
]

const RADIAL_MENU_ITEMS = [
  { icon: BookOpen, label: '项目文章', href: '/posts', color: '#60a5fa', desc: '技术笔记、踩坑记录和长期写作。' },
  { icon: Wrench, label: '实用工具', href: '/tools', color: '#34d399', desc: '一些能直接打开使用的小工具。' },
  { icon: Users, label: '友情链接', href: '/friends', color: '#fbbf24', desc: '朋友们的站点和我常看的角落。' },
  { icon: User, label: '关于我', href: '/about', color: '#f472b6', desc: '一点背景、联系入口和留言板。' },
  { icon: Plane, label: '旅游足迹', href: '/travel', color: '#a78bfa', desc: '把去过的地方和路上的片段收起来。' },
]

const HOT_CHANNEL_CONTENT = [
  {
    eyebrow: 'Hot Articles',
    metric: '2.4k reads',
    trend: '+18%',
    hero: {
      title: 'WebGL 渲染优化笔记',
      desc: '从贴图、draw call 到首屏加载，整理一次 3D 博客场景的优化过程。',
      href: '/posts',
      tag: '性能',
    },
    keywords: ['WebGL', '首屏', '贴图压缩', 'Draw Call', 'Spline'],
    items: [
      { title: 'MDX 组件化写作实践', meta: 'MDX / React' },
      { title: 'Next.js 博客结构整理', meta: 'App Router' },
    ],
  },
  {
    eyebrow: 'Popular Tools',
    metric: '486 runs',
    trend: '+31%',
    hero: {
      title: 'JSON Formatter',
      desc: '格式化、压缩和检查 JSON 片段，适合临时调试接口返回。',
      href: '/tools#json',
      tag: '开发',
    },
    keywords: ['JSON', '字数统计', '时间戳', '颜色板', '轻量'],
    items: [
      { title: 'JSON Formatter', meta: '格式化 / 压缩' },
      { title: '字数统计', meta: '写作辅助' },
    ],
  },
  {
    eyebrow: 'Friend Radar',
    metric: '12 links',
    trend: '+6%',
    hero: {
      title: '常看的开发者角落',
      desc: '收集一些风格稳定、内容真诚、值得长期订阅的个人站点。',
      href: '/friends',
      tag: '链接',
    },
    keywords: ['独立博客', '设计系统', '开发日志', '灵感', '长期订阅'],
    items: [
      { title: 'React 框架与生态', meta: 'updated' },
      { title: '独立开发日志', meta: 'reading' },
    ],
  },
  {
    eyebrow: 'About Activity',
    metric: '36 notes',
    trend: '+12%',
    hero: {
      title: '最近的留言和状态',
      desc: '关于我、留言板和联系方式都在这里，适合快速建立一点上下文。',
      href: '/about',
      tag: '个人',
    },
    keywords: ['留言板', '技术栈', '联系', '重庆', '状态'],
    items: [
      { title: '留言板', meta: 'new replies' },
      { title: '联系方式', meta: 'available' },
    ],
  },
  {
    eyebrow: 'Travel Highlights',
    metric: '8 places',
    trend: '+9%',
    hero: {
      title: '川西鱼子西',
      desc: '雪山、风和高海拔的黄昏，适合放进旅行地图的高光片段。',
      href: '/travel',
      tag: '旅行',
    },
    keywords: ['川西', '洱海', 'City Walk', '雪山', '地图'],
    items: [
      { title: '大理洱海', meta: 'slow day' },
      { title: '上海武康路', meta: 'city walk' },
    ],
  },
]

// ========== Hooks ==========

function useScrollJack(
  onAfterLast: () => void,
  onProjectStep: (direction: 1 | -1) => boolean
) {
  const [currentScene, setCurrentScene] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const scrollAccumulator = useRef(0)
  const lastTouchY = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goToScene = useCallback(
    (target: number) => {
      if (isTransitioning) return
      if (target >= SCENE_COUNT) {
        onAfterLast()
        return
      }
      if (target < 0 || target === currentScene) return

      setIsTransitioning(true)
      setCurrentScene(target)
      scrollAccumulator.current = 0

      setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION)
    },
    [currentScene, isTransitioning, onAfterLast]
  )

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isTransitioning) return

      scrollAccumulator.current += e.deltaY

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        scrollAccumulator.current = 0
      }, 200)

      if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD) {
        const direction = scrollAccumulator.current > 0 ? 1 : -1
        if (currentScene === 1 && onProjectStep(direction)) {
          scrollAccumulator.current = 0
          return
        }
        goToScene(currentScene + direction)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentScene, isTransitioning, goToScene, onProjectStep])

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return
      const deltaY = lastTouchY.current - e.changedTouches[0].clientY
      if (Math.abs(deltaY) >= 50) {
        const direction = deltaY > 0 ? 1 : -1
        if (currentScene === 1 && onProjectStep(direction)) return
        goToScene(currentScene + direction)
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentScene, isTransitioning, goToScene, onProjectStep])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        if (currentScene === 1 && onProjectStep(1)) return
        goToScene(currentScene + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        if (currentScene === 1 && onProjectStep(-1)) return
        goToScene(currentScene - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentScene, isTransitioning, goToScene, onProjectStep])

  return {
    currentScene,
    isTransitioning,
    goNext: () => goToScene(currentScene + 1),
    goPrev: () => goToScene(currentScene - 1),
    goToScene,
  }
}

// ========== 场景 0: Hero — 数字空间入口 ==========

function HeroOverlay({ isActive }: { isActive: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [bootLines, setBootLines] = useState<string[]>([])
  const [showHint, setShowHint] = useState(false)

  // 视差
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 开机动画：逐行显示终端文字
  useEffect(() => {
    if (!isActive) { setBootLines([]); setShowHint(false); return }

    const lines = [
      '> sys.init()',
      '> loading potato.core v2.5...',
      '> companion bot: online ✓',
      '> signal: CQ, Earth',
      '> status: ready to explore',
    ]

    setBootLines([])
    lines.forEach((line, i) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, line])
      }, 300 + i * 260)
    })

    setTimeout(() => setShowHint(true), 300 + lines.length * 260 + 400)
  }, [isActive])

  const parallaxLeft = `translate(${mousePos.x * 5}px, ${mousePos.y * 3}px)`
  const parallaxRight = `translate(${mousePos.x * -3}px, ${mousePos.y * -2}px)`

  return (
    <div
      className={`scene-layer fixed inset-0 pointer-events-none transition-all ${
        isActive ? 'scene-active' : 'scene-exit'
      }`}
    >
      {/* ===== 左侧：终端面板（靠近机器人） ===== */}
      <div
        className="absolute left-[8%] md:left-[15%] lg:left-[22%] top-1/2 -translate-y-1/2 w-[240px] md:w-[290px] select-none"
        style={{ transform: parallaxLeft, transition: 'transform 0.3s ease-out' }}
      >
        {/* 终端窗口 */}
        <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl">
          {/* 终端标题栏 */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            <span className="ml-2 text-[9px] text-white/25 font-mono">potato@space ~ </span>
          </div>

          {/* 终端内容 */}
          <div className="px-4 py-4 flex flex-col gap-1.5 font-mono">
            {bootLines.map((line, i) => (
              <div
                key={i}
                className="text-[10px] md:text-[11px] leading-relaxed animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {line.startsWith('>') ? (
                  <span className="text-white/50">
                    <span className="text-brand/70">{line.slice(0, 1)}</span>
                    {line.slice(1)}
                  </span>
                ) : (
                  <span className="text-brand/60">{line}</span>
                )}
              </div>
            ))}
            {/* 闪烁光标 */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] text-brand/60">❯</span>
              <span className="inline-block w-1.5 h-3.5 bg-brand/60 animate-pulse" />
            </div>
          </div>
        </div>

        {/* 终端下方：身份信息 */}
        <div className="mt-4 px-1 flex flex-col gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white leading-none">
              Just <span className="text-brand">Potato</span>
            </h1>
            <p className="mt-1.5 text-[10px] text-white/35 font-medium tracking-[0.15em]">
              一个住在代码里的土豆 · 重庆
            </p>
          </div>
        </div>
      </div>

      {/* ===== 右侧：数据面板（靠近机器人） ===== */}
      <div
        className="absolute right-[8%] md:right-[15%] lg:right-[22%] top-1/2 -translate-y-1/2 w-[210px] md:w-[240px] flex flex-col gap-4"
        style={{ transform: parallaxRight, transition: 'transform 0.3s ease-out' }}
      >
        {/* 机器人对话气泡 */}
        <div className="pointer-events-auto bg-white/[0.04] backdrop-blur-xl p-4 rounded-2xl border border-white/[0.06] relative">
          <div className="absolute -left-1.5 top-5 w-3 h-3 rotate-45 bg-white/[0.04] border-l border-b border-white/[0.06]" />
          <p className="text-[11px] text-white/55 font-medium leading-relaxed">
            嘿，欢迎来到我的小宇宙 🛸
          </p>
          <p className="text-[11px] text-white/40 font-medium leading-relaxed mt-2">
            我在这里写代码、折腾想法、记录一些值得留下的东西。往前翻翻，说不定能找到你感兴趣的。
          </p>
        </div>

        {/* 最近动态 */}
        <div className="flex flex-col gap-2">
          <span className="text-[8px] text-white/25 font-black uppercase tracking-[0.3em] px-1">
            Recent Activity
          </span>
          {[
            { emoji: '✏️', text: '写了篇关于 WebGL 渲染优化的笔记' },
            { emoji: '🔧', text: '给博客加了 3D 机器人，就是这个家伙' },
            { emoji: '📚', text: '在学 Rust，试图理解所有权' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 px-3 py-2 rounded-xl bg-white/[0.02]"
            >
              <span className="text-[11px] shrink-0 mt-px">{item.emoji}</span>
              <span className="text-[10px] text-white/40 font-medium leading-relaxed">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* 社交链接 */}
        <div className="flex items-center gap-4 pointer-events-auto px-1">
          {[
            { icon: Github, label: 'GitHub', href: '#' },
            { icon: PenTool, label: '掘金', href: '#' },
            { icon: Mail, label: '邮箱', href: '#' },
          ].map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                className="group flex items-center gap-1.5 text-[10px] text-white/30 hover:text-brand transition-all font-bold tracking-wide"
              >
                <Icon size={12} className="group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline">{s.label}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* ===== 底部提示 ===== */}
      {showHint && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] text-white/25 font-medium tracking-[0.2em] uppercase">
            Scroll to explore
          </span>
          <ChevronDown size={12} className="text-white/25" />
        </div>
      )}
    </div>
  )
}

// ========== 场景 1: 项目展示 — 3D 旋转木马 ==========

function ProjectsShowcase({
  isActive,
  activeIdx,
  setActiveIdx,
}: {
  isActive: boolean
  activeIdx: number
  setActiveIdx: (idx: number) => void
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // 旋转木马：3 张卡绕 Y 轴分布，中间那张面向用户
  const cardSpacing = 320 // 卡片间距（px）
  const sideAngle = 35 // 侧面卡片旋转角度
  const sideZ = -80 // 侧面卡片 Z 偏移（后退感）
  const sideOpacity = 0.6
  const sideScale = 0.85

  const cards = PROJECTS.map((project, idx) => {
    const isCenter = idx === activeIdx
    const isHovered = hoveredIdx === idx
    let transform = ''
    let opacity = 1
    let zIndex = 5

    if (isCenter) {
      transform = `translateX(0) translateZ(0) rotateY(0deg) scale(${isHovered ? 1.04 : 1})`
      zIndex = 10
    } else {
      const direction = idx < activeIdx ? -1 : 1
      transform = `translateX(${direction * cardSpacing * 0.5}px) translateZ(${sideZ}px) rotateY(${direction * -sideAngle}deg) scale(${sideScale})`
      opacity = sideOpacity
      zIndex = 3
    }

    return { ...project, idx, transform, opacity, zIndex, isCenter, isHovered }
  })

  return (
    <div
      className={`scene-layer fixed inset-0 flex flex-col items-center justify-center pointer-events-none transition-all ${
        isActive ? 'scene-active' : 'scene-exit'
      }`}
    >
      {/* 标题 */}
      <div className="absolute top-10 md:top-14 text-center">
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
          精选工程实践
        </h2>
        <p className="mt-1 text-[10px] text-white/40 font-medium">
          专注性能与可访问性的实际案例
        </p>
      </div>

      {/* 3D 旋转木马 */}
      <div style={{ perspective: '1200px' }}>
        <div
          className="relative"
          style={{
            width: 280,
            height: 320,
            transformStyle: 'preserve-3d',
          }}
        >
          {cards.map((card) => (
            <div
              key={card.idx}
              className="pointer-events-auto absolute inset-0 flex items-center justify-center"
              style={{
                transform: card.transform,
                opacity: card.opacity,
                zIndex: card.zIndex,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={() => setHoveredIdx(card.idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setActiveIdx(card.idx)}
            >
              <div
                className={`
                  w-[260px] md:w-[280px] rounded-2xl border backdrop-blur-xl p-5
                  bg-white/[0.04] border-white/[0.08]
                  ${card.isCenter ? 'border-brand/20' : ''}
                  hover:border-brand/40 hover:bg-white/[0.07]
                  transition-all duration-400 cursor-pointer
                  ${card.isHovered && card.isCenter ? '-translate-y-3' : ''}
                `}
                style={{
                  boxShadow: card.isCenter
                    ? '0 0 40px rgba(96,165,250,0.12), 0 8px 32px rgba(0,0,0,0.3)'
                    : '0 4px 16px rgba(0,0,0,0.15)',
                }}
              >
                {/* 终端窗口三圆点 */}
                <div className="terminal-dots mb-4 opacity-40" />

                {/* 图标 */}
                <div className="mb-4 w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                  <Sparkles size={18} />
                </div>

                {/* 标题 */}
                <h3 className="text-base font-black text-white tracking-tight">
                  {card.title}
                </h3>

                {/* 描述 */}
                <p className="mt-2 text-[11px] text-white/45 leading-relaxed font-medium">
                  {card.description}
                </p>

                {/* 分隔线 */}
                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

                {/* 标签和链接 */}
                <div className="flex items-center justify-between pt-3">
                  <div className="flex gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-brand/10 text-brand rounded text-[8px] font-black uppercase tracking-wider border border-brand/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={card.link}
                    className="p-1.5 rounded-full bg-brand/5 hover:bg-brand hover:text-white text-brand transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 左右切换箭头 */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-auto">
        <span className="hidden md:inline text-[10px] font-bold uppercase tracking-[0.22em] text-white/22">
          Scroll cards
        </span>
        <div className="flex items-center gap-1.5">
          {PROJECTS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? 'bg-brand w-5 h-1.5'
                  : 'bg-white/15 w-1.5 h-1.5 cursor-pointer'
              }`}
              onClick={() => setActiveIdx(i)}
            />
          ))}
        </div>
        <span className="hidden md:inline text-[10px] font-bold uppercase tracking-[0.22em] text-white/22">
          {activeIdx + 1}/{PROJECTS.length}
        </span>
      </div>
    </div>
  )
}

// ========== 场景 2: 轮盘菜单 ==========

function RadialMenu({
  isActive,
  onPointerMove,
}: {
  isActive: boolean
  onPointerMove: (event: React.PointerEvent<HTMLElement>) => void
}) {
  const [activeNode, setActiveNode] = useState(1)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  const previewIdx = hoveredNode ?? activeNode
  const preview = RADIAL_MENU_ITEMS[previewIdx]
  const PreviewIcon = preview.icon
  const hot = HOT_CHANNEL_CONTENT[previewIdx]

  return (
    <div
      className={`scene-layer fixed inset-0 flex items-center justify-center pointer-events-none transition-all ${
        isActive ? 'scene-active' : 'scene-exit'
      }`}
    >
      <div className="absolute left-1/2 top-12 -translate-x-1/2 text-center">
        <div className="text-[10px] font-black uppercase tracking-[0.32em] text-brand/70">
          Navigation Hub
        </div>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          接下来去哪？
        </h2>
      </div>

      <div className="grid w-[min(980px,86vw)] grid-cols-[1fr_500px] items-center gap-8 pointer-events-none">
        <div className="relative min-h-[460px]">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 rounded-2xl border border-white/[0.06] bg-[#060810]/35 px-4 py-3 backdrop-blur-md">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/22">
              Robot Focus
            </div>
            <div className="mt-1 text-xs font-bold text-white/42">
              Hover the hot card
            </div>
          </div>
          <div
            className={`absolute bottom-8 left-[18%] h-20 w-20 rounded-full border transition-all duration-700 ${
              isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{
              borderColor: `${preview.color}33`,
              boxShadow: `0 0 40px ${preview.color}18`,
            }}
          />
          <div
            className={`absolute bottom-16 left-[26%] h-2 w-32 rounded-full blur-sm transition-all duration-700 ${
              isActive ? 'opacity-60' : 'opacity-0'
            }`}
            style={{ background: preview.color }}
          />
        </div>

        <div className="pointer-events-auto grid h-[520px] grid-cols-[116px_1fr] items-stretch gap-0">
          <nav className="relative z-10 flex flex-col justify-center gap-2 pr-0">
            {RADIAL_MENU_ITEMS.map((item, idx) => {
              const Icon = item.icon
              const isSelected = previewIdx === idx

              return (
                <button
                  key={item.label}
                  className={`group relative flex h-[58px] items-center gap-2 rounded-l-2xl border px-3 text-left transition-all duration-300 ${
                    isSelected
                      ? 'translate-x-px border-white/[0.1] border-r-transparent bg-[#060810]/72 text-white backdrop-blur-xl'
                      : 'border-transparent bg-white/[0.025] text-white/42 hover:bg-white/[0.05] hover:text-white/70'
                  }`}
                  style={{
                    boxShadow: isSelected ? `-10px 0 28px ${item.color}14` : undefined,
                  }}
                  onMouseEnter={() => setHoveredNode(idx)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onFocus={() => setHoveredNode(idx)}
                  onBlur={() => setHoveredNode(null)}
                  onClick={() => setActiveNode(idx)}
                >
                  <Icon size={14} style={{ color: isSelected ? item.color : `${item.color}aa` }} />
                  <span className="text-[10px] font-black leading-tight">
                    {item.label}
                  </span>
                  {isSelected && (
                    <span
                      className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full"
                      style={{ background: item.color }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

        <section
          className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060810]/68 p-5 backdrop-blur-xl shadow-2xl"
          style={{ boxShadow: `0 0 44px ${preview.color}18` }}
          onPointerMove={onPointerMove}
        >
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl" style={{ background: preview.color }} />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/25">
                    {hot.eyebrow}
                  </div>
                  <h3 className="mt-1 text-xl font-black tracking-tight text-white">
                    {preview.label}
                  </h3>
                </div>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{ background: `${preview.color}18`, borderColor: `${preview.color}44` }}
                >
                  <PreviewIcon size={19} style={{ color: preview.color }} />
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/25">
                      Featured
                    </div>
                    <h4 className="mt-2 text-2xl font-black leading-tight tracking-tight text-white">
                      {hot.hero.title}
                    </h4>
                  </div>
                  <div className="rounded-lg border border-white/[0.07] bg-white/[0.04] px-2.5 py-2 text-right">
                    <div className="text-[9px] font-black uppercase tracking-[0.16em] text-white/24">
                      Heat
                    </div>
                    <div className="mt-0.5 whitespace-nowrap text-xs font-black text-white">
                      {hot.metric}
                    </div>
                  </div>
                </div>

                <p className="line-clamp-2 text-xs leading-6 text-white/43">
                  {hot.hero.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className="rounded-md px-2 py-1 text-[10px] font-black text-white"
                    style={{ background: preview.color }}
                  >
                    {hot.hero.tag}
                  </span>
                  {hot.keywords.slice(0, 4).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-md border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[10px] font-bold text-white/45"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-4 space-y-2">
                {hot.items.slice(0, 2).map((item, idx) => (
                  <div key={item.title} className="grid grid-cols-[22px_1fr] items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2.5">
                    <span className="font-mono text-[10px] text-white/22">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-black text-white/70">
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-[10px] font-medium text-white/25">
                        {item.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
                <div className="font-mono text-[10px] text-white/25">
                  just-potato{preview.href}
                </div>
                <a
                  href={hot.hero.href}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black text-white transition-all hover:-translate-y-0.5"
                  style={{
                    background: preview.color,
                    boxShadow: `0 12px 30px ${preview.color}26`,
                  }}
                >
                  进入
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// ========== 缩放穿梭过渡特效层 ==========

function SceneTransitionOverlay({ isTransitioning }: { isTransitioning: boolean }) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-500 ${
        isTransitioning ? 'opacity-60' : 'opacity-0'
      }`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: isTransitioning
            ? 'linear-gradient(180deg, transparent 0%, rgba(96,165,250,0.06) 45%, transparent 100%)'
            : 'none',
          animation: isTransitioning ? 'scene-wash 0.56s ease-out' : 'none',
        }}
      />
    </div>
  )
}

// ========== 移动端底部抽屉 ==========

function MobileRadialDrawer({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`scene-layer fixed inset-0 flex flex-col items-center justify-end pb-20 pointer-events-none transition-all md:hidden ${
        isActive ? 'scene-active' : 'scene-exit'
      }`}
    >
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
        <h2 className="text-xl font-black text-white tracking-tight">
          探索更多
        </h2>
        <p className="mt-1 text-xs text-white/40">
          选择一个入口继续
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 px-8 pointer-events-auto">
        {RADIAL_MENU_ITEMS.map((item, idx) => {
          const Icon = item.icon
          return (
            <a
              key={idx}
              href={item.href}
              className="flex flex-col items-center justify-center p-4 rounded-2xl
                bg-white/[0.06] border border-white/[0.1]
                backdrop-blur-xl hover:border-brand/30
                transition-all duration-300 active:scale-95"
              style={{
                gridColumn: idx === 4 ? '2' : undefined,
                boxShadow: `0 0 8px ${item.color}10`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                style={{
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}35`,
                }}
              >
                <Icon size={16} style={{ color: item.color }} />
              </div>
              <span className="text-[10px] font-bold text-white/70">
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

// ========== 场景 3: 电影级滚动驱动视频叙事 ==========

const CINEMATIC_SECTIONS = [
  {
    at: 0.08,
    num: '01',
    title: '诞生',
    subtitle: '从一个简单的想法开始',
    desc: '在代码与像素的交汇处，一个数字生命正在苏醒',
  },
  {
    at: 0.30,
    num: '02',
    title: '探索',
    subtitle: '跨越边界的好奇心',
    desc: '技术的世界没有围墙，只有等待被翻越的山峰',
  },
  {
    at: 0.55,
    num: '03',
    title: '创造',
    subtitle: '将想象力编译为现实',
    desc: '每一行代码都是一块砖，搭建通往未来的桥梁',
  },
  {
    at: 0.78,
    num: '04',
    title: '继续',
    subtitle: '去看看真正落地的东西',
    desc: '继续向下滚动，进入项目页',
    isLast: true,
  },
]

function CinematicScene({
  isActive,
  onBack,
  onComplete,
}: {
  isActive: boolean
  onBack: () => void
  onComplete: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [videoReady, setVideoReady] = useState(false)
  const wheelAccum = useRef(0)
  const completeAccum = useRef(0)

  // Scene 3 激活时切换为 body 原生滚动
  useEffect(() => {
    if (isActive) {
      window.scrollTo(0, 0)
      setProgress(0)
      wheelAccum.current = 0
      completeAccum.current = 0
      document.body.style.overflow = 'auto'
      document.body.style.height = '400vh'

      const video = videoRef.current
      if (video && video.readyState >= 2) setVideoReady(true)
    } else {
      document.body.style.overflow = 'hidden'
      document.body.style.height = ''
      setVideoReady(false)
    }
    return () => {
      document.body.style.overflow = 'hidden'
      document.body.style.height = ''
    }
  }, [isActive])

  // 视频加载监听
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onReady = () => setVideoReady(true)
    const onError = () => console.error('[Cinematic] 视频加载失败:', video.error?.message)

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    video.addEventListener('error', onError)
    if (video.readyState >= 2) setVideoReady(true)

    return () => {
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
      video.removeEventListener('error', onError)
    }
  }, [])

  // window scroll → 视频帧同步
  useEffect(() => {
    if (!isActive) return

    let raf = 0

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight
        if (max <= 0) return
        const p = Math.min(1, Math.max(0, window.scrollY / max))
        setProgress(p)

        const video = videoRef.current
        if (video?.duration && isFinite(video.duration)) {
          video.currentTime = p * video.duration
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [isActive])

  // 顶部向上滚动 → 返回上一个场景
  useEffect(() => {
    if (!isActive) return

    const onWheel = (e: WheelEvent) => {
      if (window.scrollY <= 2 && e.deltaY < 0) {
        wheelAccum.current += Math.abs(e.deltaY)
        if (wheelAccum.current >= 200) {
          wheelAccum.current = 0
          onBack()
        }
      } else if (progress >= 0.96 && e.deltaY > 0) {
        completeAccum.current += e.deltaY
        if (completeAccum.current >= 160) {
          completeAccum.current = 0
          onComplete()
        }
      } else {
        wheelAccum.current = 0
        completeAccum.current = 0
      }
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY
      if (window.scrollY <= 2) {
        if (dy < -60) onBack()
      } else if (progress >= 0.96 && dy > 60) {
        onComplete()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isActive, onBack, onComplete, progress])

  // 每个 section 的可见性
  const sectionVis = (at: number) => {
    const range = 0.18
    const rel = (progress - at) / range

    if (rel < -0.15 || rel > 1.15) return { opacity: 0, y: 50, scale: 0.96 }

    let o = 1
    if (rel < 0.15) o = rel / 0.15
    else if (rel > 0.85) o = (1 - rel) / 0.15

    const y = (0.5 - Math.min(1, Math.max(0, rel))) * 60
    return {
      opacity: Math.max(0, Math.min(1, o)),
      y,
      scale: 0.96 + Math.min(1, Math.max(0, rel)) * 0.04,
    }
  }

  return (
    <div
      className={`fixed inset-0 transition-all duration-700 ${
        isActive ? 'z-[60] opacity-100' : 'z-0 opacity-0 pointer-events-none'
      }`}
    >
      {/* 视频背景 — 固定铺满 */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        src="/videos/cinematic.mp4"
        style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.5s' }}
      />

      {/* 视频加载骨架 */}
      {!videoReady && isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#060810]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            <span className="text-white/30 text-xs tracking-widest font-medium">LOADING VIDEO...</span>
          </div>
        </div>
      )}

      {/* 上下暗角 — 保证文字可读 */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* 左侧时间线导航（桌面端） */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-5 pointer-events-none">
        {CINEMATIC_SECTIONS.map((s, i) => {
          const isNear = Math.abs(progress - s.at) < 0.1
          return (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  isNear ? 'bg-brand scale-[2]' : 'bg-white/20'
                }`}
              />
              <span className={`text-[9px] font-bold tracking-[0.2em] transition-colors duration-500 ${
                isNear ? 'text-white/60' : 'text-white/15'
              }`}>
                {s.num}
              </span>
            </div>
          )
        })}
      </div>

      {/* 叙事章节 — 固定在视口，随 progress 变化 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 初始滚动提示 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[6vh] flex flex-col items-center gap-2"
          style={{ opacity: Math.max(0, 1 - progress * 10), transition: 'opacity 0.3s' }}
        >
          <span className="text-[10px] text-white/25 font-medium tracking-[0.25em] uppercase">
            Scroll to play
          </span>
          <ChevronDown size={14} className="text-white/25" />
        </div>

        {CINEMATIC_SECTIONS.map((section, idx) => {
          const vis = sectionVis(section.at)
          return (
            <div
              key={idx}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: vis.opacity,
                transform: `translateY(${vis.y}px) scale(${vis.scale})`,
              }}
            >
              <div className="text-center max-w-md px-8 relative">
                <span
                  className="absolute inset-0 flex items-center justify-center text-[100px] md:text-[140px] font-black text-white/[0.03] leading-none select-none"
                  style={{ transform: `translateY(${vis.y * 0.4}px)` }}
                >
                  {section.num}
                </span>

                <div className="relative">
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base md:text-lg font-bold text-white/60 tracking-tight">
                    {section.subtitle}
                  </p>
                  <div className="mt-4 mx-auto w-10 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
                  <p className="mt-4 text-sm text-white/30 leading-relaxed max-w-sm mx-auto">
                    {section.desc}
                  </p>

                  {section.isLast && (
                    <button
                      onClick={onBack}
                      className="mt-8 px-7 py-2.5 bg-white/[0.06] border border-white/[0.12] rounded-full text-white/50 text-sm font-bold hover:bg-white/[0.12] hover:text-white/80 transition-all backdrop-blur-sm pointer-events-auto"
                    >
                      ← 回到主页
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 底部进度条 */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.06] pointer-events-none">
        <div
          className="h-full bg-brand"
          style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
        />
      </div>

      {/* 左上角返回按钮 */}
      <button
        onClick={onBack}
        className="absolute top-5 left-5 md:top-7 md:left-9 z-20 flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors text-xs font-bold tracking-wide pointer-events-auto"
      >
        <span className="text-base">←</span>
        <span className="hidden md:inline">返回</span>
      </button>

      {/* 右上角进度百分比 */}
      <div className="absolute top-5 right-5 md:top-7 md:right-9 z-20 pointer-events-none">
        <span className="text-[10px] text-white/20 font-mono tracking-wider">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  )
}

// ========== 深空极简星空背景 ==========

function StarField() {
  // 首页始终使用深空背景，不受主题影响
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* 深空渐变底色 */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 0%, #0a0e1a 0%, #060810 50%, #030408 100%)',
      }} />

      {/* 星点层 1：细碎微星 */}
      <div className="absolute inset-0 stars-layer-sm" />

      {/* 星点层 2：中等亮星 */}
      <div className="absolute inset-0 stars-layer-md" />

      {/* 星点层 3：少量高亮星 */}
      <div className="absolute inset-0 stars-layer-lg" />
    </div>
  )
}

// ========== 头部光锥聚光灯 ==========

function Spotlight() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const targetX = mouse.x * 100
  const targetY = mouse.y * 100

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    >
      {/* 全局暗角：让非光锥区域明显变暗 */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(
          ellipse 50% 45% at ${targetX}% ${targetY}%,
          transparent 0%,
          rgba(3,4,8,0.65) 100%
        )`,
        transition: 'background 0.15s ease-out',
      }} />

      {/* 鼠标位置亮斑：灯光照射区域 */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(
          circle 350px at ${targetX}% ${targetY}%,
          rgba(96,165,250,0.15) 0%,
          rgba(96,165,250,0.06) 35%,
          rgba(96,165,250,0.02) 60%,
          transparent 80%
        )`,
        transition: 'background 0.08s ease-out',
      }} />
    </div>
  )
}

// ========== 主页面组件 ==========

export default function Home() {
  const router = useRouter()
  const [projectIdx, setProjectIdx] = useState(0)
  const goProjects = useCallback(() => router.push('/projects'), [router])
  const handleProjectStep = useCallback((direction: 1 | -1) => {
    const next = Math.min(PROJECTS.length - 1, Math.max(0, projectIdx + direction))
    if (next === projectIdx) return false
    setProjectIdx(next)
    return true
  }, [projectIdx])
  const forwardPointerToSpline = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const canvas = document.querySelector<HTMLCanvasElement>('.spline-scene-forward-target canvas')
    if (!canvas) return

    canvas.dispatchEvent(new PointerEvent('pointermove', {
      bubbles: true,
      cancelable: true,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      clientX: event.clientX,
      clientY: event.clientY,
      screenX: event.screenX,
      screenY: event.screenY,
      buttons: event.buttons,
      pressure: event.pressure,
      width: event.width,
      height: event.height,
      isPrimary: event.isPrimary,
    }))
  }, [])
  const { currentScene, isTransitioning, goToScene } = useScrollJack(goProjects, handleProjectStep)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50">
      {/* 深空星空背景 */}
      <StarField />

      {/* Spline 3D 场景 */}
      <SplineScene
        className={currentScene === 2 ? 'robot-scene-attend' : ''}
        style={{
          transform: currentScene === 2 ? undefined : 'translateX(0) scale(1)',
        }}
      />

      {/* 头部光锥聚光灯 */}
      <Spotlight />

      <HeroOverlay isActive={currentScene === 0} />
      <ProjectsShowcase
        isActive={currentScene === 1}
        activeIdx={projectIdx}
        setActiveIdx={setProjectIdx}
      />

      <div className="hidden md:block">
        <RadialMenu
          isActive={currentScene === 2}
          onPointerMove={forwardPointerToSpline}
        />
      </div>

      <MobileRadialDrawer isActive={currentScene === 2} />

      <SceneTransitionOverlay isTransitioning={isTransitioning} />

      {/* 全局场景进度指示器 */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => goToScene(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === currentScene
                ? 'bg-brand w-2 h-6 shadow-lg shadow-brand/30'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`切换到场景 ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
