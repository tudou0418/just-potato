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
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="你的名字"
          className="w-full px-4 py-3 dark:bg-white/[0.03] bg-ui-border/10 border dark:border-white/[0.06] border-ui-border rounded-xl text-sm dark:text-white text-ui-text dark:placeholder-white/20 placeholder-ui-text-muted/50 focus:outline-none focus:border-brand/40 transition-all"
          disabled={isSubmitting}
          required
        />
      </div>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="说点什么..."
          rows={3}
          className="w-full px-4 py-3 dark:bg-white/[0.03] bg-ui-border/10 border dark:border-white/[0.06] border-ui-border rounded-xl text-sm dark:text-white text-ui-text dark:placeholder-white/20 placeholder-ui-text-muted/50 focus:outline-none focus:border-brand/40 transition-all resize-none"
          disabled={isSubmitting}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !name.trim() || !message.trim()}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-bold rounded-xl hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand/20 active:scale-95"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            发送中...
          </>
        ) : (
          <>
            <Send size={15} />
            发送
          </>
        )}
      </button>
    </form>
  )
}
