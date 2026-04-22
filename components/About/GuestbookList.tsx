'use client'

import { Clock } from 'lucide-react'

export interface Message {
  id: string
  name: string
  message: string
  created_at: string
}

interface GuestbookListProps {
  messages: Message[]
}

export const GuestbookList = ({ messages }: GuestbookListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60))
        return `${minutes} 分钟前`
      }
      return `${hours} 小时前`
    } else if (days === 1) {
      return '昨天'
    } else if (days < 7) {
      return `${days} 天前`
    } else {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="dark:text-white/20 text-ui-text-muted text-sm">还没有留言，来做第一个吧。</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="rounded-xl border dark:border-white/[0.06] border-ui-border dark:bg-white/[0.02] bg-ui-surface p-5 hover:dark:border-white/10 hover:border-brand/20 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-black text-xs shrink-0">
              {msg.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-bold dark:text-white text-ui-text truncate">{msg.name}</span>
              <span className="text-[10px] dark:text-white/20 text-ui-text-muted shrink-0 flex items-center gap-1">
                <Clock size={10} />
                {formatDate(msg.created_at)}
              </span>
            </div>
          </div>
          <p className="text-sm dark:text-white/50 text-ui-text-muted leading-relaxed pl-11">{msg.message}</p>
        </div>
      ))}
    </div>
  )
}
