'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import {
  ExternalLink,
  ChevronRight,
  Users,
  Calendar,
  Mail,
  MessageCircle,
  Coffee,
  MapPin,
  Zap,
  Sparkles,
} from 'lucide-react'

// 动态加载 Three.js 场景，避免 SSR 问题
const SpaceScene = dynamic(() => import('@/components/Space/SpaceScene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 dark:bg-[#0a0e1a] bg-ui-surface flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        <span className="dark:text-blue-400 text-brand text-sm font-medium tracking-wider">LOADING SPACE...</span>
      </div>
    </div>
  ),
})

const PROJECTS = [
  {
    title: '我的个人博客',
    description: '基于 Next.js 14 构建的现代化响应式博客，采用增强型琥珀主题配置，确保多端阅读清晰。',
    tags: ['Next.js', 'High Contrast'],
    link: '#',
  },
  {
    title: '开源组件库',
    description: '一套轻量级、高性能的 React 组件库，专为开发者打造，开箱即用。',
    tags: ['React', 'TypeScript'],
    link: '#',
  },
  {
    title: 'AI 辅助工具',
    description: '基于 LLM 的智能代码助手，提升开发效率，减少重复劳动。',
    tags: ['AI', 'Productivity'],
    link: '#',
  },
]

const FRIENDS = [
  { name: '隻恶', url: 'lastwhisper.online', description: 'React 框架' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com', description: '原子化 CSS' },
  { name: 'Vercel', url: 'https://vercel.com', description: '部署平台' },
  { name: 'Supabase', url: 'https://supabase.com', description: '后端服务' },
  { name: 'TypeScript', url: 'https://typescriptlang.org', description: '类型安全' },
  { name: 'Radix UI', url: 'https://radix-ui.com', description: '无头组件' },
]

// 滚动渐入动画 hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// 渐入区块包装器
function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Hero 覆盖层 - 在 3D 场景上叠加文字
function HeroOverlay() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const opacity = Math.max(0, 1 - scrollY / 600)

  return (
    <section
      className="relative w-full h-screen flex items-end justify-between pointer-events-none"
      style={{ opacity }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-black dark:text-white/[0.03] text-ui-text/[0.04] uppercase tracking-tighter leading-none italic">
          Potato
        </span>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 pb-12 md:pb-16 flex flex-col md:flex-row items-end justify-between gap-8">
        {/* 左下：连接信息 */}
        <div className="flex flex-col gap-3 pointer-events-auto text-left group">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand mb-1">
            保持联系
          </span>
          <div className="flex gap-6">
            {['GitHub', '掘金', '邮箱'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="dark:text-white/70 text-ui-text/60 hover:text-brand transition-all font-black uppercase text-xs tracking-widest relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand hover:after:w-full after:transition-all"
              >
                {platform}
              </a>
            ))}
          </div>
          <div className="w-32 h-px dark:bg-white/10 bg-ui-border group-hover:w-48 group-hover:bg-brand/30 transition-all duration-700" />
        </div>

        {/* 右下：身份卡片 */}
        <div className="flex flex-col items-end pointer-events-auto text-right dark:bg-white/5 bg-ui-surface/60 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] dark:border-white/10 border-ui-border border max-w-[280px] transition-all hover:-translate-y-2 duration-700 group shadow-lg">
          <div className="flex items-center gap-3 dark:text-white text-ui-text font-black text-2xl mb-1 tracking-tighter uppercase group-hover:text-brand transition-colors">
            <MapPin size={22} className="text-brand" />
            CQ · CHN
          </div>
          <div className="text-[11px] dark:text-white/60 text-ui-text-muted font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-brand/30" />
            SPACE POTATO
          </div>
          <p className="text-[12px] dark:text-white/50 text-ui-text-muted font-medium leading-relaxed italic">
            "记录想法，也记录成长。
            <br />
            保持克制，持续输出。"
          </p>
          <div className="mt-4 flex gap-1 self-start">
            <div className="w-1 h-1 bg-brand rounded-full" />
            <div className="w-1 h-1 bg-brand/40 rounded-full" />
            <div className="w-1 h-1 bg-brand/10 rounded-full" />
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] dark:text-white/30 text-ui-text-muted font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b dark:from-white/30 from-ui-text/20 to-transparent" />
      </div>
    </section>
  )
}

// 通用卡片样式 token
const cardBase = 'rounded-2xl border backdrop-blur-xl p-5 transition-all'
const cardDark = 'dark:bg-white/[0.03] dark:border-white/10'
const cardLight = 'bg-ui-surface border-ui-border shadow-brand'
const textPrimary = 'dark:text-white text-ui-text'
const textSecondary = 'dark:text-white/40 text-ui-text-muted'
const textTertiary = 'dark:text-white/30 text-ui-text-muted'

// 日历区域
function CalendarSection() {
  const [calendarData, setCalendarData] = useState<Array<{ date: string; count: number }>>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const data = []
    const today = new Date()
    const weights = [0, 0, 0, 0, 1, 1, 2, 3, 4]

    for (let i = 370; i >= 0; i--) {
      const date = new Date()
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      data.push({
        date: dateStr,
        count: weights[Math.floor(Math.random() * weights.length)],
      })
    }

    setCalendarData(data)
    setIsMounted(true)
  }, [])

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const getLevelColor = (count: number) => {
    if (count === 0) return 'dark:bg-white/10 bg-ui-border/30'
    if (count === 1) return 'bg-brand/20'
    if (count === 2) return 'bg-brand/45'
    if (count === 3) return 'bg-brand/70'
    return 'bg-brand'
  }

  if (!isMounted) return null

  return (
    <RevealSection>
      <div className="mx-auto px-6 lg:px-30 py-6 relative z-10">
        <div className={`${cardBase} ${cardDark} ${cardLight}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-bold ${textPrimary} flex items-center gap-2`}>
              <Calendar size={16} className="text-brand" />
              过去365天我干啥了？
            </h3>
            <div className={`hidden sm:flex items-center gap-2 text-[9px] ${textSecondary} dark:bg-white/5 bg-ui-border/20 px-2 py-0.5 rounded-full`}>
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Active for 365 days
            </div>
          </div>

          <div className={`flex text-[8px] ${textTertiary} mb-1 ml-1 justify-between pr-4`}>
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          <div className="overflow-x-auto pb-2 scrollbar-thin dark:scrollbar-thumb-white/10 scrollbar-thumb-ui-border scrollbar-track-transparent">
            <div className="inline-grid grid-flow-col grid-rows-7 gap-1 min-w-max pr-2">
              {calendarData.map((item, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-[1px] transition-all hover:ring-1 hover:ring-brand hover:scale-110 cursor-help ${getLevelColor(item.count)}`}
                  title={`${item.date}: ${item.count === 0 ? 'No' : item.count} articles updated`}
                />
              ))}
            </div>
          </div>

          <div className={`flex items-center justify-between mt-4 pt-2 border-t dark:border-white/5 border-ui-border`}>
            <span className={`text-[10px] ${textTertiary} italic`}>
              {calendarData.reduce((acc, curr) => acc + curr.count, 0)} updates in the past year
            </span>
            <div className={`flex items-center gap-1 text-[8px] ${textTertiary} uppercase font-medium`}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} className={`w-2.5 h-2.5 rounded-[1px] ${getLevelColor(l)}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}

// 项目展示
function Projects() {
  return (
    <RevealSection>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <h2 className={`text-4xl font-black ${textPrimary} tracking-tight`}>精选工程实践</h2>
              <p className={`${textSecondary} font-medium text-lg`}>专注性能与可访问性的实际案例。</p>
            </div>
            <a
              href="#"
              className="group flex items-center gap-2 font-bold text-brand hover:underline underline-offset-4 decoration-2 transition-all"
            >
              查看全部作品{' '}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className={`group flex flex-col rounded-2xl border dark:border-white/10 border-ui-border dark:bg-white/[0.03] bg-ui-surface backdrop-blur-xl p-8 transition-all duration-300 dark:hover:bg-white/[0.06] hover:bg-ui-surface hover:-translate-y-2 dark:hover:border-blue-400/30 hover:border-brand/30 shadow-brand hover:shadow-lg`}
              >
                <div className="mb-8 w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                  <Sparkles size={28} />
                </div>
                <h3 className={`text-2xl font-black ${textPrimary} group-hover:text-brand transition-colors tracking-tight`}>
                  {project.title}
                </h3>
                <p className={`mt-4 ${textSecondary} flex-grow leading-relaxed font-medium`}>{project.description}</p>
                <div className={`mt-10 flex items-center justify-between border-t dark:border-white/10 border-ui-border pt-6`}>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-brand text-white rounded-lg text-[10px] font-black uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="p-3 rounded-full bg-brand/5 hover:bg-brand hover:text-white text-brand transition-all"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// 友情链接
function FriendLinks() {
  return (
    <RevealSection>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className={`text-4xl font-black ${textPrimary} tracking-tight`}>友情链接</h2>
              <p className={`${textSecondary} font-medium text-lg`}>与优秀的人同行。</p>
            </div>
            <a
              href="#"
              className="group flex items-center gap-2 font-bold text-brand hover:underline underline-offset-4 decoration-2 transition-all"
            >
              申请友链{' '}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FRIENDS.map((friend, idx) => (
              <a
                key={idx}
                href={friend.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center justify-center p-6 rounded-2xl border dark:border-white/10 border-ui-border dark:bg-white/[0.03] bg-ui-surface backdrop-blur-xl dark:hover:border-blue-400/30 hover:border-brand/30 dark:hover:bg-white/[0.06] hover:bg-ui-surface/80 transition-all duration-300`}
              >
                <Users size={32} className={`${textSecondary} group-hover:text-brand mb-3 transition-colors`} />
                <span className={`font-bold dark:text-white/70 text-ui-text group-hover:text-brand transition-colors text-sm`}>
                  {friend.name}
                </span>
                <span className={`text-xs ${textTertiary} mt-1`}>{friend.description}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

export default function Home() {
  return (
    <div className="dark:bg-[#0a0e1a] bg-ui-surface min-h-screen">
      {/* 3D 太空场景 - 固定背景 */}
      <SpaceScene />

      {/* Hero 覆盖层 */}
      <HeroOverlay />

      {/* 内容区域 - 半透明覆盖在3D场景上 */}
      <div className="relative z-10">
        {/* 渐变过渡 */}
        <div className="h-32 bg-gradient-to-b from-transparent dark:to-[#0a0e1a]/80 to-ui-surface/80" />

        <CalendarSection />
        <Projects />
        <FriendLinks />

        {/* 联系区域 */}
        <RevealSection>
          <section className="py-24 px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="container mx-auto max-w-4xl relative z-10">
              <div className={`rounded-2xl border dark:border-white/10 border-ui-border dark:bg-white/[0.03] bg-ui-surface backdrop-blur-xl p-12 text-center shadow-brand`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-bold mb-6">
                  <Zap size={14} className="fill-brand" />
                  Currently open for new opportunities
                </div>
                <h2 className={`text-3xl md:text-5xl font-black ${textPrimary} mb-6 tracking-tight leading-tight`}>
                  让我们建立 <span className="text-brand">有价值</span> 的连接
                </h2>
                <p className={`text-lg ${textSecondary} mb-12 max-w-xl mx-auto leading-relaxed font-medium`}>
                  无论你是有项目想找我合作，还是只想聊聊技术、产品或者分享生活， 我的收件箱永远为你敞开。保持联系，一起构建更美好的数字空间。
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="mailto:potato@example.com"
                    className="px-8 py-4 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark transition-all flex items-center gap-2 shadow-lg shadow-brand/20 active:scale-95"
                  >
                    <Mail size={20} /> 发送邮件
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    className={`px-8 py-4 border dark:border-white/10 border-ui-border dark:text-white/70 text-ui-text font-bold rounded-xl dark:hover:bg-white/5 hover:bg-ui-border/20 transition-all flex items-center gap-2`}
                  >
                    <MessageCircle size={20} className="text-brand" /> 在 Twitter 聊聊
                  </a>
                  <button className={`px-8 py-4 border dark:border-white/10 border-ui-border dark:text-white/70 text-ui-text font-bold rounded-xl dark:hover:bg-white/5 hover:bg-ui-border/20 transition-all flex items-center gap-2`}>
                    <Coffee size={20} className="text-brand" /> 请我喝咖啡
                  </button>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        <footer className={`py-8 text-center ${textTertiary} font-bold text-xs tracking-widest uppercase`}>
          <p>© 2026 KV Studio. Designed for clarity & warmth.</p>
        </footer>
      </div>
    </div>
  )
}
