import React from 'react';
import { Calendar, Clock, ChevronRight, Search, Sparkles } from 'lucide-react';

/**
 * 💡 琥珀主题样式适配：
 * 1. 使用 bg-ui-surface 和 text-ui-text 替代硬编码的 zinc/white。
 * 2. 使用 text-brand 替代 blue-600。
 * 3. 保持原有的 MANUAL_POSTS 和 getAllPosts 逻辑不变。
 */

// --- 1. 手动定义的文章列表 ---
const MANUAL_POSTS = [
  {
    slug: 'my-first-post',
    metadata: {
      title: '我的第一篇博客文章：开启 Next.js 的创意之旅',
      date: '2024-05-21',
      category: '技术笔记',
      readTime: '5 min',
      description: '在这篇文章中，我将分享我是如何利用 Next.js 15 和 Tailwind CSS v4 搭建起这个数字花园的...'
    }
  }
];

// --- 2. 动态获取文章逻辑 (保持原逻辑) ---
let getAllPosts: () => any[];
try {
  const postsModule = require('../../lib/posts');
  getAllPosts = postsModule.getAllPosts;
} catch (error) {
  getAllPosts = () => [];
}

export default async function PostsListPage() {
  // 获取动态文章
  let dynamicPosts = [];
  try {
    if (typeof getAllPosts === 'function') {
      dynamicPosts = getAllPosts();
    }
  } catch (error) {
    console.error("加载动态文章列表失败:", error);
  }

  // --- 3. 合并与排序逻辑 (保持原逻辑) ---
  const combinedPosts = [...MANUAL_POSTS];
  
  dynamicPosts.forEach((dPost) => {
    if (!combinedPosts.find(m => m.slug === dPost.slug)) {
      combinedPosts.push(dPost);
    }
  });

  const sortedPosts = combinedPosts.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  return (
    <div className="min-h-screen bg-ui-surface transition-colors duration-500 pb-20 relative overflow-hidden">
      {/* 顶部艺术装饰背景 */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-brand/10 to-transparent pointer-events-none" />

      <main className="relative container mx-auto px-6 pt-16 max-w-5xl">
        <header className="mb-16">
          <div className="flex items-center gap-2 text-brand font-bold tracking-widest text-sm uppercase mb-4">
             <Sparkles size={16} /> Digital Garden
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-ui-text mb-6 tracking-tight leading-tight">
            全部文章 <span className="text-brand">.</span>
          </h1>
          <p className="text-xl text-ui-text opacity-70 max-w-2xl leading-relaxed font-medium">
            这里汇集了手动创建的页面和动态 MDX 内容。您可以灵活选择写作方式。
          </p>
        </header>

        {/* 搜索过滤区域 */}
        <div className="relative mb-12 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ui-text opacity-40 group-focus-within:text-brand transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="搜索文章标题..." 
            className="w-full pl-12 pr-4 py-4 rounded-smooth bg-ui-surface border border-ui-border focus:outline-none focus:ring-2 focus:ring-brand/20 text-ui-text transition-all shadow-sm"
          />
        </div>

        {/* 文章列表展示 */}
        <div className="grid gap-8">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <a 
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group relative p-8 rounded-smooth border border-ui-border bg-ui-surface/50 backdrop-blur-sm hover:bg-brand/5 hover:shadow-brand hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                      <span className="text-brand bg-brand/10 px-2 py-0.5 rounded">
                        {post.metadata.category || '未分类'}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-ui-border" />
                      <time className="text-ui-text opacity-40">{post.metadata.date}</time>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-ui-text group-hover:text-brand transition-colors leading-tight">
                      {post.metadata.title}
                    </h2>
                    
                    <p className="text-ui-text opacity-60 line-clamp-2 max-w-3xl leading-relaxed">
                      {post.metadata.description || '点击阅读全文，查看更多内容...'}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-2 text-xs text-ui-text opacity-40 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.metadata.readTime || '5 min'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="p-4 rounded-2xl bg-brand/5 text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-sm group-hover:scale-110">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center py-24 bg-brand/5 rounded-smooth border border-dashed border-ui-border">
              <p className="text-ui-text opacity-40 font-medium italic">目前暂无文章发布。</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}