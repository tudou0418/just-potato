'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Loader2, Search, SlidersHorizontal, Sparkles, TrendingUp, LayoutGrid, List, X } from 'lucide-react'
import PostCard from './PostCard'

interface Post {
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

interface PostsListClientProps {
  initialPosts: Post[]
  allPosts: Post[]
}

// 筛选标签
const FILTER_TAGS = [
  { label: '全部', value: 'all' },
  { label: '技术笔记', value: '技术笔记' },
  { label: '创意技术', value: '创意技术' },
  { label: '生活', value: '生活' },
  { label: '项目实战', value: '项目实战' },
]

export default function PostsListClient({ initialPosts, allPosts }: PostsListClientProps) {
  const [displayPosts, setDisplayPosts] = useState<Post[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(allPosts.length > 4)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'masonry' | 'list'>('masonry')
  const [showSearch, setShowSearch] = useState(false)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const loaderRef = useRef(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // 过滤文章
  const filteredPosts = allPosts.filter((post) => {
    const matchesFilter = activeFilter === 'all' || post.metadata.category === activeFilter
    const matchesSearch = !searchQuery ||
      post.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.metadata.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.metadata.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  // 加载更多
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return
    setLoading(true)

    setTimeout(() => {
      const currentLength = displayPosts.length
      const nextBatch = filteredPosts.slice(currentLength, currentLength + 4)

      if (nextBatch.length > 0) {
        setDisplayPosts(prev => [...prev, ...nextBatch])
      }

      if (currentLength + nextBatch.length >= filteredPosts.length) {
        setHasMore(false)
      }
      setLoading(false)
    }, 800)
  }, [loading, hasMore, displayPosts.length, filteredPosts])

  // IntersectionObserver 加载更多
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts()
      }
    }, { threshold: 1.0 })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [displayPosts, hasMore, loading, loadMorePosts])

  // 卡片入场动画
  useEffect(() => {
    const timer = setTimeout(() => {
      const newVisible = new Set<string>()
      filteredPosts.forEach((post, i) => {
        setTimeout(() => {
          newVisible.add(post.slug)
          setVisibleCards(new Set(newVisible))
        }, i * 100)
      })
    }, 100)
    return () => clearTimeout(timer)
  }, [activeFilter, searchQuery])

  // 搜索框自动聚焦
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  // 切换筛选时重置
  const handleFilterChange = (value: string) => {
    setActiveFilter(value)
    setDisplayPosts(filteredPosts.slice(0, 4))
    setHasMore(filteredPosts.length > 4)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const results = allPosts.filter((post) => {
      const matchesFilter = activeFilter === 'all' || post.metadata.category === activeFilter
      const matchesSearch = !query ||
        post.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
        post.metadata.description?.toLowerCase().includes(query.toLowerCase())
      return matchesFilter && matchesSearch
    })
    setDisplayPosts(results.slice(0, 4))
    setHasMore(results.length > 4)
  }

  return (
    <div className="min-h-screen dark:bg-[#0a0e1a] bg-ui-surface dark:text-white/90 text-ui-text">
      {/* 顶部标题区域 */}
      <div className="pt-28 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* 标题行 */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-brand" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">探索发现</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                文章<span className="dark:text-white/20 text-ui-text-muted">宇宙</span>
              </h1>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-2">
              {/* 搜索 */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`
                  p-2.5 rounded-xl transition-all duration-300
                  ${showSearch
                    ? 'bg-brand/20 text-brand border border-brand/30'
                    : 'dark:bg-white/[0.04] bg-ui-border/20 dark:text-white/40 text-ui-text-muted border dark:border-white/[0.06] border-ui-border hover:text-brand hover:border-brand/30'
                  }
                `}
              >
                {showSearch ? <X size={16} /> : <Search size={16} />}
              </button>

              {/* 视图切换 */}
              <button
                onClick={() => setViewMode(viewMode === 'masonry' ? 'list' : 'masonry')}
                className="p-2.5 rounded-xl dark:bg-white/[0.04] bg-ui-border/20 dark:text-white/40 text-ui-text-muted border dark:border-white/[0.06] border-ui-border hover:text-brand hover:border-brand/30 transition-all duration-300"
              >
                {viewMode === 'masonry' ? <List size={16} /> : <LayoutGrid size={16} />}
              </button>
            </div>
          </div>

          {/* 搜索栏 */}
          <div className={`
            overflow-hidden transition-all duration-500 ease-out
            ${showSearch ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0'}
          `}>
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-white/30 text-ui-text-muted" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="搜索文章标题、内容或标签..."
                className="w-full pl-10 pr-4 py-3 rounded-xl dark:bg-white/[0.04] bg-ui-surface border dark:border-white/[0.06] border-ui-border text-sm dark:text-white/90 text-ui-text placeholder-ui-text-muted/40 focus:outline-none focus:border-brand/30 dark:focus:bg-white/[0.06] focus:bg-ui-surface transition-all duration-300"
              />
            </div>
          </div>

          {/* 筛选标签 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag.value}
                onClick={() => handleFilterChange(tag.value)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap
                  transition-all duration-300
                  ${activeFilter === tag.value
                    ? 'bg-brand text-white shadow-lg shadow-brand/20'
                    : 'dark:bg-white/[0.04] bg-ui-border/20 dark:text-white/40 text-ui-text-muted border dark:border-white/[0.06] border-ui-border hover:text-brand hover:border-brand/30'
                  }
                `}
              >
                {tag.label}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-1.5 text-[10px] dark:text-white/20 text-ui-text-muted">
              <TrendingUp size={10} />
              <span>{filteredPosts.length} 篇文章</span>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            /* 空状态 */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl dark:bg-white/[0.04] bg-ui-border/20 flex items-center justify-center mb-4">
                <Search size={24} className="dark:text-white/20 text-ui-text-muted/40" />
              </div>
              <p className="dark:text-white/30 text-ui-text-muted text-sm font-medium">没有找到相关文章</p>
              <button
                onClick={() => { setActiveFilter('all'); setSearchQuery(''); handleSearch('') }}
                className="mt-4 px-4 py-2 rounded-xl bg-brand/10 text-brand text-xs font-bold hover:bg-brand/20 transition-all"
              >
                清除筛选
              </button>
            </div>
          ) : viewMode === 'masonry' ? (
            /* 瀑布流布局 */
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {filteredPosts.map((post, index) => (
                <div
                  key={post.slug}
                  className={`
                    transition-all duration-700 ease-out
                    ${visibleCards.has(post.slug) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: `${(index % 8) * 80}ms` }}
                >
                  <PostCard post={post} index={index} />
                </div>
              ))}
            </div>
          ) : (
            /* 列表布局 */
            <div className="max-w-3xl mx-auto space-y-3">
              {filteredPosts.map((post, index) => (
                <a
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className={`
                    group flex items-center gap-4 p-4 rounded-2xl
                    dark:bg-white/[0.03] bg-ui-surface border dark:border-white/[0.06] border-ui-border
                    dark:hover:bg-white/[0.06] hover:bg-ui-surface dark:hover:border-white/15 hover:border-brand/30
                    transition-all duration-300
                    ${visibleCards.has(post.slug) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  {/* 序号 */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg dark:bg-white/[0.04] bg-ui-border/20 flex items-center justify-center text-xs font-black dark:text-white/20 text-ui-text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold dark:text-white/80 text-ui-text group-hover:text-brand transition-colors truncate">
                      {post.metadata.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] dark:text-white/30 text-ui-text-muted">{post.metadata.category}</span>
                      <span className="dark:text-white/10 text-ui-border">·</span>
                      <span className="text-[10px] dark:text-white/30 text-ui-text-muted">{post.metadata.readTime}</span>
                    </div>
                  </div>

                  {/* 日期 */}
                  <time className="flex-shrink-0 text-[10px] dark:text-white/20 text-ui-text-muted font-medium">
                    {post.metadata.date}
                  </time>
                </a>
              ))}
            </div>
          )}

          {/* 加载更多 */}
          <div ref={loaderRef} className="py-12 flex flex-col items-center justify-center">
            {loading ? (
              <div className="flex items-center gap-2 dark:text-white/30 text-ui-text-muted">
                <Loader2 size={16} className="animate-spin text-brand" />
                <span className="text-sm">加载更多...</span>
              </div>
            ) : !hasMore ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-px dark:bg-white/10 bg-ui-border" />
                <span className="text-xs dark:text-white/20 text-ui-text-muted">已展示全部内容</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
