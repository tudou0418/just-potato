'use client'

import React, { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Calculator,
  Clock3,
  Code2,
  Copy,
  Hash,
  Palette,
  Search,
  Sparkles,
  Type,
  Wrench,
} from 'lucide-react'

const TOOLS = [
  {
    title: 'JSON Formatter',
    desc: '格式化、压缩和检查 JSON 片段。',
    category: '开发',
    icon: Code2,
    status: '可用',
    href: '#json',
    color: '#60a5fa',
  },
  {
    title: '字数统计',
    desc: '快速统计中文、英文、字符数和阅读时间。',
    category: '写作',
    icon: Type,
    status: '可用',
    href: '#text',
    color: '#f472b6',
  },
  {
    title: '时间戳转换',
    desc: 'Unix 时间戳与本地时间互转。',
    category: '开发',
    icon: Clock3,
    status: '计划中',
    href: '#',
    color: '#34d399',
  },
  {
    title: '颜色取值板',
    desc: '保存常用色、生成轻量色阶。',
    category: '设计',
    icon: Palette,
    status: '计划中',
    href: '#',
    color: '#fbbf24',
  },
]

const CATEGORIES = ['全部', '开发', '写作', '设计']

function JsonTool() {
  const [value, setValue] = useState('{"name":"just-potato","kind":"blog"}')
  const [error, setError] = useState('')

  const format = () => {
    try {
      setValue(JSON.stringify(JSON.parse(value), null, 2))
      setError('')
    } catch {
      setError('JSON 格式不太对，再检查一下括号和逗号。')
    }
  }

  const minify = () => {
    try {
      setValue(JSON.stringify(JSON.parse(value)))
      setError('')
    } catch {
      setError('JSON 格式不太对，再检查一下括号和逗号。')
    }
  }

  return (
    <section id="json" className="rounded-2xl border border-ui-border bg-ui-surface p-5 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-ui-text dark:text-white">JSON Formatter</h2>
          <p className="text-xs text-ui-text-muted dark:text-white/35">粘贴 JSON 后格式化或压缩。</p>
        </div>
        <div className="flex gap-2">
          <button onClick={format} className="rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white">格式化</button>
          <button onClick={minify} className="rounded-lg border border-ui-border px-3 py-2 text-xs font-bold text-ui-text-muted hover:text-brand dark:border-white/10 dark:text-white/50">压缩</button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        className="min-h-56 w-full resize-y rounded-xl border border-ui-border bg-white p-4 font-mono text-sm leading-relaxed text-ui-text outline-none focus:border-brand dark:border-white/10 dark:bg-black/20 dark:text-white/70"
      />
      {error && <p className="mt-3 text-xs font-bold text-rose-500">{error}</p>}
    </section>
  )
}

function TextTool() {
  const [text, setText] = useState('把一段文字放进来，看看它有多少字符、词语和阅读时间。')
  const stats = useMemo(() => {
    const compact = text.trim()
    const chars = compact.length
    const noSpaces = compact.replace(/\s/g, '').length
    const words = compact.match(/[A-Za-z0-9]+|[\u4e00-\u9fa5]/g)?.length ?? 0
    const minutes = Math.max(1, Math.ceil(words / 300))
    return { chars, noSpaces, words, minutes }
  }, [text])

  return (
    <section id="text" className="rounded-2xl border border-ui-border bg-ui-surface p-5 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-ui-text dark:text-white">字数统计</h2>
          <p className="text-xs text-ui-text-muted dark:text-white/35">适合文章摘要、标题和长文草稿。</p>
        </div>
        <Copy size={16} className="text-ui-text-muted dark:text-white/25" />
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-40 w-full resize-y rounded-xl border border-ui-border bg-white p-4 text-sm leading-relaxed text-ui-text outline-none focus:border-brand dark:border-white/10 dark:bg-black/20 dark:text-white/70"
      />
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['字符', stats.chars],
          ['去空格', stats.noSpaces],
          ['词数', stats.words],
          ['阅读', `${stats.minutes} min`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-ui-border/30 p-3 dark:bg-white/[0.04]">
            <div className="text-[10px] font-black uppercase tracking-widest text-ui-text-muted dark:text-white/25">{label}</div>
            <div className="mt-1 text-lg font-black text-ui-text dark:text-white">{value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ToolsPage() {
  const [category, setCategory] = useState('全部')
  const [query, setQuery] = useState('')

  const filtered = TOOLS.filter((tool) => {
    const matchCategory = category === '全部' || tool.category === category
    const matchQuery = `${tool.title} ${tool.desc}`.toLowerCase().includes(query.toLowerCase())
    return matchCategory && matchQuery
  })

  return (
    <main className="min-h-screen bg-ui-surface px-6 pb-20 pt-28 dark:bg-[#0a0e1a]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-brand">
              <Wrench size={13} />
              Tools
            </div>
            <h1 className="text-3xl font-black tracking-tight text-ui-text dark:text-white md:text-5xl">
              小工具<span className="text-brand">工作台</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ui-text-muted dark:text-white/40 md:text-base">
              放一些我自己常用的小工具，优先做轻、快、打开就能用的版本。
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索工具"
              className="w-full rounded-xl border border-ui-border bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-brand dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
            />
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-xl px-4 py-2 text-xs font-black transition-all ${
                category === item
                  ? 'bg-brand text-white shadow-lg shadow-brand/20'
                  : 'border border-ui-border text-ui-text-muted hover:border-brand/30 hover:text-brand dark:border-white/10 dark:text-white/40'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((tool) => {
            const Icon = tool.icon
            return (
              <a
                key={tool.title}
                href={tool.href}
                className="group rounded-2xl border border-ui-border bg-ui-surface p-5 transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 dark:border-white/[0.07] dark:bg-white/[0.03]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${tool.color}18`, color: tool.color }}>
                    <Icon size={19} />
                  </div>
                  <ArrowUpRight size={15} className="text-ui-text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand dark:text-white/25" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <h2 className="font-black text-ui-text dark:text-white">{tool.title}</h2>
                  <span className="rounded bg-ui-border/40 px-1.5 py-0.5 text-[9px] font-bold text-ui-text-muted dark:bg-white/[0.06] dark:text-white/30">{tool.status}</span>
                </div>
                <p className="text-xs leading-relaxed text-ui-text-muted dark:text-white/38">{tool.desc}</p>
              </a>
            )
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <JsonTool />
          <div className="space-y-5">
            <TextTool />
            <section className="rounded-2xl border border-ui-border bg-ui-surface p-5 dark:border-white/[0.07] dark:bg-white/[0.03]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h2 className="font-black text-ui-text dark:text-white">下一批</h2>
                  <p className="text-xs text-ui-text-muted dark:text-white/35">时间戳、颜色板、Hash 生成器。</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[Clock3, Palette, Hash, Calculator].map((Icon, idx) => (
                  <div key={idx} className="flex h-10 w-10 items-center justify-center rounded-xl border border-ui-border text-ui-text-muted dark:border-white/10 dark:text-white/30">
                    <Icon size={16} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
