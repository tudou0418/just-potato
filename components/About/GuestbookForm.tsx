'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface GuestbookFormProps {
  onSubmit: (data: { name: string; message: string }) => Promise<void>
  isSubmitting: boolean
}

export const GuestbookForm = ({ onSubmit, isSubmitting }: GuestbookFormProps) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    await onSubmit({ name: name.trim(), message: message.trim() })
    setName('')
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-ui-text mb-2">
          昵称
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="请输入你的昵称"
          className="w-full px-4 py-3 bg-ui-surface border border-ui-border rounded-xl text-ui-text placeholder-ui-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-ui-text mb-2">
          留言内容
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="写下你的想法..."
          rows={4}
          className="w-full px-4 py-3 bg-ui-surface border border-ui-border rounded-xl text-ui-text placeholder-ui-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none"
          disabled={isSubmitting}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !name.trim() || !message.trim()}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-brand"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            提交中...
          </>
        ) : (
          <>
            <Send size={18} />
            发送留言
          </>
        )}
      </button>
    </form>
  )
}
