'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
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
        headers: {
          'Content-Type': 'application/json',
        },
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
    <section className="py-24 px-6 bg-ui-surface/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="text-brand" size={32} />
            <h2 className="text-4xl font-black text-ui-text tracking-tight">留言板</h2>
          </div>
          <p className="text-ui-text-muted text-lg font-medium">
            欢迎留下你的想法和建议，让我们一起交流！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
                <p className="text-ui-text-muted mt-4 font-medium">加载中...</p>
              </div>
            ) : (
              <GuestbookList messages={messages} />
            )}
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-ui-surface border border-ui-border rounded-xl p-6 shadow-brand sticky top-24">
              <h3 className="text-xl font-bold text-ui-text mb-6">发表留言</h3>
              <GuestbookForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
