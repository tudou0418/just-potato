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
        <p className="text-ui-text-muted font-medium">还没有留言，快来抢沙发吧！</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-ui-surface border border-ui-border rounded-xl p-6 hover:border-brand/30 transition-all"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-sm">
                {msg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-ui-text">{msg.name}</h4>
                <div className="flex items-center gap-1 text-ui-text-muted text-xs">
                  <Clock size={12} />
                  <span>{formatDate(msg.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-ui-text-muted leading-relaxed">{msg.message}</p>
        </div>
      ))}
    </div>
  )
}
