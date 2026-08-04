import Link from 'next/link'
import { ArrowUpRight, CalendarDays, CheckCircle2, Hammer, NotebookPen, Sparkles } from 'lucide-react'
import { getRecentActivityLogs, type ActivityLog } from '@/lib/activityLogs'

const STATUS_CONFIG: Record<ActivityLog['status'], { label: string; icon: typeof Sparkles; className: string }> = {
  shipped: {
    label: '已完成',
    icon: CheckCircle2,
    className: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  },
  building: {
    label: '进行中',
    icon: Hammer,
    className: 'border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-300',
  },
  writing: {
    label: '写作中',
    icon: NotebookPen,
    className: 'border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-300',
  },
  learning: {
    label: '学习中',
    icon: Sparkles,
    className: 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-300',
  },
}

export default function LogsPage() {
  const logs = getRecentActivityLogs()

  return (
    <main className="min-h-screen bg-ui-bg text-ui-text">
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-32 lg:px-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-ui-border bg-ui-surface px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.24em] text-brand shadow-sm">
            <Sparkles size={14} />
            Work Log
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-ui-text md:text-6xl">
            最近我在做什么
          </h1>
          <p className="mt-5 text-base leading-8 text-ui-text-muted md:text-lg">
            这里记录博客、工具、文章和实验项目的近况。不是完整流水账，只放能帮你快速了解进展的节点。
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {logs.map((log) => {
            const status = STATUS_CONFIG[log.status]
            const StatusIcon = status.icon
            const content = (
              <article className="group rounded-2xl border border-ui-border bg-ui-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ui-text-muted">
                        <CalendarDays size={14} />
                        {log.date}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-black ${status.className}`}>
                        <StatusIcon size={13} />
                        {status.label}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-black tracking-tight text-ui-text transition-colors group-hover:text-brand">
                      {log.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-ui-text-muted">
                      {log.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {log.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-ui-border bg-ui-bg px-3 py-1 text-[11px] font-bold text-ui-text-muted dark:border-white/[0.07] dark:bg-white/[0.03]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {log.href && (
                    <ArrowUpRight size={18} className="shrink-0 text-ui-text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  )}
                </div>
              </article>
            )

            return log.href ? (
              <Link key={`${log.date}-${log.title}`} href={log.href}>
                {content}
              </Link>
            ) : (
              <div key={`${log.date}-${log.title}`}>{content}</div>
            )
          })}
        </div>
      </section>
    </main>
  )
}