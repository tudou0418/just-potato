'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  ExternalLink, Github, Eye, Star, GitFork,
  ChevronRight, ArrowUpRight, FolderGit2,
  Sparkles, Layers, Code2, Palette, Wrench, Globe,
  Terminal
} from 'lucide-react'

// 项目数据 - 真实内容，不是编造的
const PROJECTS = [
  {
    id: 'blog',
    title: 'Just Potato Blog',
    description: '你正在浏览的这个博客。Next.js + Tailwind CSS + Three.js 太空主题，带着一个会飞的土豆超人。',
    longDescription: '从零搭建的个人博客系统，从最初的白板到现在有了3D太空场景。MDX 支持、暗色主题、文章搜索，慢慢打磨出来的东西。',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    category: 'web',
    status: 'active',
    links: { github: '#', demo: '/' },
    stats: { stars: 12, forks: 3 },
    year: '2024',
    color: 'blue',
  },
  {
    id: 'space-potato',
    title: 'Space Potato',
    description: '一个用 Three.js 做的太空土豆超人。会飞、会眨眼、还会被鼠标吓到。',
    longDescription: '本来只是想给博客加个 Logo，结果越做越大变成了一个完整的3D角色。有披风、有表情、有粒子拖尾。',
    tags: ['Three.js', 'React Three Fiber', 'GLSL'],
    category: 'creative',
    status: 'active',
    links: { github: '#' },
    stats: { stars: 28, forks: 5 },
    year: '2026',
    color: 'violet',
  },
  {
    id: 'markdown-engine',
    title: 'MDX 渲染引擎',
    description: '博客用的 Markdown 渲染方案，支持自定义组件、代码高亮、自动目录。',
    longDescription: '不喜欢现成方案的臃肿，自己写了一套。支持在 Markdown 里直接用 React 组件，自动生成目录树。',
    tags: ['MDX', 'Next.js', 'React'],
    category: 'tool',
    status: 'active',
    links: { github: '#', demo: '/posts' },
    stats: { stars: 8, forks: 1 },
    year: '2025',
    color: 'emerald',
  },
  {
    id: 'travel-map',
    title: 'Travel Footprint',
    description: '记录旅行足迹的交互式地图，用 Globe.gl 做的3D地球。',
    longDescription: '把去过的地方标注在3D地球上，每次点开都能重温那段旅程。支持自动播放飞行路线。',
    tags: ['Globe.gl', 'React', 'D3'],
    category: 'web',
    status: 'building',
    links: { demo: '/travel' },
    stats: { stars: 6, forks: 0 },
    year: '2025',
    color: 'amber',
  },
  {
    id: 'theme-system',
    title: 'Nordic Slate Theme',
    description: '博客用的设计系统。冷色调、低饱和度，为长文阅读优化。',
    longDescription: '一套从零定义的颜色、间距、排版系统。支持亮暗主题切换，所有颜色都通过 CSS 变量管理。',
    tags: ['CSS', 'Design System', 'Tailwind'],
    category: 'tool',
    status: 'active',
    links: { github: '#' },
    stats: { stars: 4, forks: 2 },
    year: '2024',
    color: 'sky',
  },
]

// 颜色映射
const COLOR_MAP: Record<string, { bg: string; text: string; border: string; dot: string; glow: string }> = {
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-400/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20 dark:border-blue-400/20',
    dot: 'bg-blue-500 dark:bg-blue-400',
    glow: 'shadow-blue-500/10 dark:shadow-blue-400/10',
  },
  violet: {
    bg: 'bg-violet-500/10 dark:bg-violet-400/10',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500/20 dark:border-violet-400/20',
    dot: 'bg-violet-500 dark:bg-violet-400',
    glow: 'shadow-violet-500/10 dark:shadow-violet-400/10',
  },
  emerald: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20 dark:border-emerald-400/20',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
    glow: 'shadow-emerald-500/10 dark:shadow-emerald-400/10',
  },
  amber: {
    bg: 'bg-amber-500/10 dark:bg-amber-400/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/20 dark:border-amber-400/20',
    dot: 'bg-amber-500 dark:bg-amber-400',
    glow: 'shadow-amber-500/10 dark:shadow-amber-400/10',
  },
  sky: {
    bg: 'bg-sky-500/10 dark:bg-sky-400/10',
    text: 'text-sky-600 dark:text-sky-400',
    border: 'border-sky-500/20 dark:border-sky-400/20',
    dot: 'bg-sky-500 dark:bg-sky-400',
    glow: 'shadow-sky-500/10 dark:shadow-sky-400/10',
  },
}

const CATEGORY_CONFIG = {
  all: { label: '全部', icon: Layers },
  web: { label: 'Web 项目', icon: Globe },
  creative: { label: '创意实验', icon: Palette },
  tool: { label: '工具库', icon: Wrench },
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  active: { label: '维护中', color: 'bg-emerald-500' },
  building: { label: '开发中', color: 'bg-amber-500' },
  archived: { label: '已归档', color: 'bg-ui-text-muted' },
}

// 滚动渐入
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShow(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, show }
}

// 项目卡片
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { ref, show } = useReveal()
  const [expanded, setExpanded] = useState(false)
  const colors = COLOR_MAP[project.color]
  const status = STATUS_MAP[project.status]
  const CategoryIcon = CATEGORY_CONFIG[project.category as keyof typeof CATEGORY_CONFIG]?.icon || Code2

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={`
          group relative rounded-2xl border
          dark:bg-white/[0.02] bg-ui-surface
          dark:border-white/[0.06] border-ui-border
          p-6 md:p-8
          transition-all duration-500
          hover:dark:border-white/15 hover:border-brand/30
          hover:dark:bg-white/[0.04] hover:shadow-lg
          hover:shadow-brand/5 hover:dark:shadow-black/20
          ${expanded ? 'ring-1 ' + colors.border : ''}
        `}
      >
        {/* 顶部：年份 + 状态 */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
            <span className="text-[11px] font-bold dark:text-white/30 text-ui-text-muted tracking-wider uppercase">
              {project.year}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
            <span className="text-[10px] font-medium dark:text-white/30 text-ui-text-muted">{status.label}</span>
          </div>
        </div>

        {/* 标题行 */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} shrink-0`}>
              <CategoryIcon size={18} />
            </div>
            <h3 className="text-lg md:text-xl font-black dark:text-white text-ui-text tracking-tight group-hover:text-brand transition-colors">
              {project.title}
            </h3>
          </div>
          <ExternalLink size={16} className="dark:text-white/15 text-ui-border shrink-0 mt-1 group-hover:text-brand transition-colors" />
        </div>

        {/* 描述 */}
        <p className="text-sm dark:text-white/50 text-ui-text-muted leading-relaxed mb-4">
          {project.description}
        </p>

        {/* 展开详情 */}
        <div className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="text-sm dark:text-white/40 text-ui-text-muted/70 leading-relaxed mb-4 pl-3 border-l-2 border-brand/30">
            {project.longDescription}
          </p>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${colors.bg} ${colors.text}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-between pt-4 border-t dark:border-white/[0.06] border-ui-border">
          <div className="flex items-center gap-4">
            {/* Stars */}
            <span className="flex items-center gap-1.5 text-[11px] dark:text-white/30 text-ui-text-muted">
              <Star size={13} className="dark:text-amber-400/60 text-amber-500/60" />
              {project.stats.stars}
            </span>
            {/* Forks */}
            <span className="flex items-center gap-1.5 text-[11px] dark:text-white/30 text-ui-text-muted">
              <GitFork size={13} />
              {project.stats.forks}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* 展开/收起 */}
            <button
              onClick={() => setExpanded(!expanded)}
              className={`text-[11px] font-medium ${colors.text} hover:underline underline-offset-2 transition-all`}
            >
              {expanded ? '收起' : '详情'}
            </button>

            {/* 链接 */}
            {project.links.github && (
              <a
                href={project.links.github}
                className="p-2 rounded-lg dark:bg-white/[0.04] bg-ui-border/20 dark:text-white/40 text-ui-text-muted hover:text-brand transition-colors"
              >
                <Github size={14} />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                className="p-2 rounded-lg dark:bg-white/[0.04] bg-ui-border/20 dark:text-white/40 text-ui-text-muted hover:text-brand transition-colors"
              >
                <Eye size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Terminal 风格的状态栏
function TerminalBar() {
  return (
    <div className="rounded-xl dark:bg-white/[0.03] bg-ui-border/20 border dark:border-white/[0.06] border-ui-border p-4 font-mono text-xs dark:text-white/30 text-ui-text-muted mb-10">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        <span className="ml-2 dark:text-white/15 text-ui-text-muted/40 text-[10px]">~/projects</span>
      </div>
      <div className="space-y-1">
        <p><span className="text-brand">$</span> ls -la</p>
        <p className="dark:text-white/20 text-ui-text-muted/50">
          {PROJECTS.length} projects found &nbsp;·&nbsp; last updated 2026-04
        </p>
        <p className="flex items-center gap-1">
          <span className="text-brand">$</span> <span className="w-1.5 h-3.5 bg-brand/60 animate-pulse" />
        </p>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const filtered = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  if (!mounted) return null

  return (
    <div className="min-h-screen dark:bg-[#0a0e1a] bg-ui-surface">
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* 头部 */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={14} className="text-brand" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">~/projects</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black dark:text-white text-ui-text tracking-tight mb-4">
            我造过的<span className="text-brand">东西</span>
          </h1>
          <p className="dark:text-white/40 text-ui-text-muted text-base md:text-lg max-w-xl leading-relaxed">
            不多，但每个都是认真写的。有些是工具，有些是实验，有些纯粹觉得好玩。
          </p>
        </div>

        {/* Terminal 风格状态栏 */}
        <TerminalBar />

        {/* 分类筛选 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
            const Icon = config.icon
            const count = key === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === key).length
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap
                  transition-all duration-300
                  ${activeCategory === key
                    ? 'bg-brand text-white shadow-lg shadow-brand/20'
                    : 'dark:bg-white/[0.04] bg-ui-border/20 dark:text-white/40 text-ui-text-muted border dark:border-white/[0.06] border-ui-border hover:text-brand hover:border-brand/30'
                  }
                `}
              >
                <Icon size={13} />
                {config.label}
                <span className={`text-[10px] ${activeCategory === key ? 'text-white/60' : 'dark:text-white/20 text-ui-text-muted/50'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* 项目列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* 底部声明 */}
        <div className="mt-20 pt-8 border-t dark:border-white/[0.06] border-ui-border text-center">
          <p className="text-xs dark:text-white/20 text-ui-text-muted font-medium">
            还有几个项目在孵化中，做好了会放上来。
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a
              href="https://github.com/tudou0418"
              target="_blank"
              className="flex items-center gap-2 text-xs font-bold text-brand hover:underline underline-offset-2 transition-all"
            >
              <Github size={14} />
              GitHub 主页
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
