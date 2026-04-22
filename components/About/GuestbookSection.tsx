'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, PenLine } from 'lucide-react'
import { GuestbookForm } from './GuestbookForm'
import { GuestbookList, Message } from './GuestbookList'

export const GuestbookSection = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/guestbook')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: { name: string; message: string }) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await fetchMessages()
      } else {
        throw new Error('Failed to submit message')
      }
    } catch (error) {
      console.error('Failed to submit message:', error)
      alert('提交失败，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* 标题 */}
        <div className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] dark:text-white/30 text-ui-text-muted mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-brand" />
            留言板
          </h3>
          <p className="dark:text-white/40 text-ui-text-muted text-sm">
            路过的话，留个言再走吧。
          </p>
        </div>

        {/* 留言表单 */}
        <div className="rounded-2xl border dark:border-white/[0.06] border-ui-border dark:bg-white/[0.02] bg-ui-surface p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <PenLine size={16} className="text-brand" />
            <h4 className="text-sm font-black dark:text-white text-ui-text">写点什么</h4>
          </div>
          <GuestbookForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* 留言列表 */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <GuestbookList messages={messages} />
        )}
      </div>
    </section>
  )
}
