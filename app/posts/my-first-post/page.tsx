"use client";

import React from 'react';
import { ArrowLeft, Calendar, Clock, Tag, Share2, MessageCircle } from 'lucide-react';

const ArticlePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* 文章顶部的装饰背景 */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 pointer-events-none" />

      <main className="relative container mx-auto px-6 pt-12 pb-24 max-w-4xl">
        {/* 返回按钮 - 预览环境中使用 a 标签替代 next/link */}
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          返回首页
        </a>

        {/* 文章头图 (可选) */}
        <div className="w-full h-[300px] md:h-[450px] rounded-[2.5rem] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 mb-12 overflow-hidden shadow-2xl shadow-zinc-200/50 dark:shadow-none flex items-center justify-center">
             <span className="text-zinc-400 dark:text-zinc-600 font-bold text-lg">Featured Image Placeholder</span>
        </div>

        {/* 文章元数据 */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-widest">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">技术笔记</span>
            <div className="flex items-center gap-2 text-zinc-400">
              <Calendar size={14} />
              2024年05月21日
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Clock size={14} />
              5 分钟阅读
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white leading-tight">
            我的第一篇博客文章：开启 Next.js 的创意之旅
          </h1>
          
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed italic border-l-4 border-blue-600 pl-6">
            “记录不仅仅是为了保留记忆，更是为了理清思路。”
          </p>
        </div>

        {/* 文章正文 */}
        <article className="prose prose-zinc dark:prose-invert max-w-none text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 space-y-8">
          <p>
            欢迎来到我的博客！这是我使用 <strong>Next.js 15</strong> 和 <strong>Tailwind CSS v4</strong> 搭建的第一个技术空间。
            在这个快速变化的时代，拥有一个属于自己的“数字花园”显得尤为重要。
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white pt-4">为什么选择 Next.js？</h2>
          <p>
            Next.js 不仅仅是一个 React 框架。它通过 App Router 提供的服务器组件（RSC）和极简的路由配置，让我们能以最轻量的方式构建极具动感的网页。
            配合 Tailwind v4 的强大性能，我们可以轻松实现：
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>极速的冷启动响应</li>
            <li>流畅的暗色模式切换体验</li>
            <li>基于类的灵活主题管理</li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 my-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Tag className="text-blue-600" size={20} /> 写给未来的自己
            </h3>
            <p className="m-0">
              希望在这里，我能坚持记录每一个解决的技术难题，分享每一刻生活的感悟。如果你也对前端开发感兴趣，欢迎和我一起交流！
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white pt-4">后续计划</h2>
          <p>
            接下来，我会逐步引入 MDX 渲染、代码高亮组件以及响应式评论系统。在这个过程中，
            我也会持续更新我的<strong>项目开发手册</strong>，以便回顾这段有趣的搭建时光。
          </p>
        </article>

        {/* 文章底部操作 */}
        <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:scale-105 transition-all">
               <Share2 size={18} /> 分享文章
             </button>
             <button className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
               <MessageCircle size={18} /> 评论
             </button>
          </div>
          
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold text-zinc-400">#NEXTJS</span>
             <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold text-zinc-400">#TAILWIND</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;