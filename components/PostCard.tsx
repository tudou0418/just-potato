'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Clock, MessageCircle, Heart, Eye, ArrowUpRight } from 'lucide-react'

interface PostCardProps {
  post: {
    slug: string
    metadata: {
      title: string
      date: string
      category: string
      readTime: string
      description: string
      tags: string[]
    }
  }
  index: number
}

// 渐变色方案
const GRADIENT_PALETTES_DARK = [
  'from-rose-400/20 via-pink-300/10 to-orange-200/10',
  'from-violet-400/20 via-purple-300/10 to-fuchsia-200/10',
  'from-blue-400/20 via-cyan-300/10 to-teal-200/10',
  'from-emerald-400/20 via-green-300/10 to-lime-200/10',
  'from-amber-400/20 via-yellow-300/10 to-orange-200/10',
  'from-sky-400/20 via-blue-300/10 to-indigo-200/10',
]

const GRADIENT_PALETTES_LIGHT = [
  'from-rose-400/10 via-pink-200/5 to-orange-100/5',
  'from-violet-400/10 via-purple-200/5 to-fuchsia-100/5',
  'from-blue-400/10 via-cyan-200/5 to-teal-100/5',
  'from-emerald-400/10 via-green-200/5 to-lime-100/5',
  'from-amber-400/10 via-yellow-200/5 to-orange-100/5',
  'from-sky-400/10 via-blue-200/5 to-indigo-100/5',
]

const TAG_COLORS = [
  'dark:bg-rose-400/15 dark:text-rose-300 bg-rose-500/10 text-rose-600',
  'dark:bg-violet-400/15 dark:text-violet-300 bg-violet-500/10 text-violet-600',
  'dark:bg-blue-400/15 dark:text-blue-300 bg-blue-500/10 text-blue-600',
  'dark:bg-emerald-400/15 dark:text-emerald-300 bg-emerald-500/10 text-emerald-600',
  'dark:bg-amber-400/15 dark:text-amber-300 bg-amber-500/10 text-amber-600',
  'dark:bg-sky-400/15 dark:text-sky-300 bg-sky-500/10 text-sky-600',
]

const PostCard = ({ post, index }: PostCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 200) + 10)

  const colorIdx = index % GRADIENT_PALETTES_DARK.length

  const descriptionLines = post.metadata.description?.length || 0
  const isLong = descriptionLines > 80

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block break-inside-avoid mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl
          dark:bg-white/[0.04] bg-ui-surface
          border dark:border-white/[0.06] border-ui-border
          transition-all duration-500 ease-out
          ${isHovered
            ? 'dark:border-white/20 border-brand/30 dark:bg-white/[0.08] bg-ui-surface shadow-lg dark:shadow-black/20 shadow-brand/10 -translate-y-1 scale-[1.02]'
            : ''
          }
        `}
      >
        {/* 顶部渐变装饰条 */}
        <div className={`
          h-1 w-full bg-gradient-to-r ${GRADIENT_PALETTES_DARK[colorIdx]} dark:block hidden
          transition-all duration-500 ${isHovered ? 'h-1.5 opacity-100' : 'opacity-60'}
        `} />
        <div className={`
          h-1 w-full bg-gradient-to-r ${GRADIENT_PALETTES_LIGHT[colorIdx]} dark:hidden block
          transition-all duration-500 ${isHovered ? 'h-1.5 opacity-100' : 'opacity-60'}
        `} />

        {/* 封面区域 */}
        <div className={`relative h-28 ${isLong ? 'h-36' : ''} overflow-hidden`}>
          {/* 暗色渐变 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_PALETTES_DARK[colorIdx]} dark:block hidden`} />
          {/* 亮色渐变 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_PALETTES_LIGHT[colorIdx]} dark:hidden block`} />

          {/* 装饰性几何元素 */}
          <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full dark:bg-white/5 bg-brand/5 transition-transform duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`} />
          <div className={`absolute -left-2 -bottom-2 w-12 h-12 rounded-full dark:bg-white/5 bg-brand/5 transition-transform duration-700 ${isHovered ? 'scale-125 translate-x-2' : ''}`} />

          {/* 分类标签 */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full dark:bg-black/30 bg-white/70 backdrop-blur-md dark:text-white text-ui-text text-[10px] font-bold uppercase tracking-wider">
              {post.metadata.category || '未分类'}
            </span>
          </div>

          {/* 阅读时间 */}
          <div className="absolute top-3 right-3 flex items-center gap-1 dark:text-white/60 text-ui-text-muted text-[10px]">
            <Clock size={10} />
            <span>{post.metadata.readTime || '5 min'}</span>
          </div>

          {/* 悬浮阅读按钮 */}
          <div className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="px-4 py-2 rounded-full dark:bg-white/20 bg-brand/20 backdrop-blur-md dark:text-white text-brand text-xs font-bold flex items-center gap-1.5">
              阅读全文 <ArrowUpRight size={12} />
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-4">
          {/* 标题 */}
          <h3 className={`
            text-sm font-bold dark:text-white/90 text-ui-text leading-snug mb-2 line-clamp-2
            group-hover:text-brand transition-colors duration-300
          `}>
            {post.metadata.title}
          </h3>

          {/* 描述 */}
          <p className={`
            text-xs dark:text-white/40 text-ui-text-muted leading-relaxed mb-3
            ${isLong ? 'line-clamp-3' : 'line-clamp-2'}
            transition-colors duration-300
            ${isHovered ? 'dark:text-white/60 text-ui-text' : ''}
          `}>
            {post.metadata.description}
          </p>

          {/* 标签 */}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.metadata.tags.slice(0, 3).map((tag: string, tagIdx: number) => (
                <span
                  key={tag}
                  className={`
                    px-2 py-0.5 rounded-full text-[10px] font-semibold
                    ${TAG_COLORS[(colorIdx + tagIdx) % TAG_COLORS.length]}
                    transition-all duration-300
                    ${isHovered ? 'opacity-100' : 'opacity-70'}
                  `}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 底部互动栏 */}
          <div className={`flex items-center justify-between pt-3 border-t dark:border-white/[0.06] border-ui-border`}>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`
                  flex items-center gap-1 text-[10px] font-medium transition-all duration-300
                  ${isLiked ? 'text-rose-400' : 'dark:text-white/30 text-ui-text-muted hover:text-rose-400'}
                `}
              >
                <Heart
                  size={12}
                  className={`transition-all duration-300 ${isLiked ? 'fill-rose-400 scale-110' : ''}`}
                />
                <span>{likeCount}</span>
              </button>

              <span className={`flex items-center gap-1 text-[10px] dark:text-white/30 text-ui-text-muted`}>
                <MessageCircle size={12} />
                {Math.floor(Math.random() * 30) + 1}
              </span>

              <span className={`flex items-center gap-1 text-[10px] dark:text-white/30 text-ui-text-muted`}>
                <Eye size={12} />
                {Math.floor(Math.random() * 500) + 50}
              </span>
            </div>

            <time className={`text-[10px] dark:text-white/20 text-ui-text-muted font-medium`}>
              {post.metadata.date}
            </time>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
