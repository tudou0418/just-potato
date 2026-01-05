import React from 'react';
import { ArrowLeft, Calendar, Clock, Tag, Share2, MessageCircle } from 'lucide-react';

/**
 * 【环境兼容性处理】
 * 由于预览环境无法直接解析部分 Next.js 模块和本地 lib 路径，
 * 我们在此定义了模拟逻辑。在您的本地项目中，请取消注释底部的真实导入。
 */

// 模拟导入和数据 (仅供预览窗口显示效果使用)
const notFound = () => <div className="p-20 text-center font-bold">404 - 文章未找到</div>;
const MDXRemote = ({ source }: { source: string }) => (
  <div className="space-y-4">
    <p>{source}</p>
    <p className="text-sm text-zinc-500 italic">（此处在本地运行时将通过 MDX 渲染真实内容）</p>
  </div>
);

const mockPost = {
  slug: 'preview-sample',
  content: '这是文章内容的预览示例。在暗色模式下，您可以看到文字会自动变为浅色，排版保持优雅。',
  metadata: {
    title: '深入理解 Next.js 15 的动态渲染',
    date: '2025-12-30',
    category: '技术笔记',
    readTime: '8 min',
    description: '本文将带你探索 Next.js 15 最新的异步路由参数处理方式以及如何在 App Router 中优化 MDX 渲染性能。',
    tags: ['Nextjs', 'React', 'Frontend']
  }
};

// --- 真实项目导入 (本地运行时请取消下方注释并删除上面的模拟定义) ---
/*
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts } from '@/lib/posts';
*/

// 为了演示，我们模拟一个获取数据的函数
const getPostData = (slug: string) => {
  // 在本地，这里应该是: const posts = getAllPosts(); return posts.find(p => p.slug === slug);
  return mockPost; 
};

/**
 * Next.js 15 动态元数据生成
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) return { title: '文章未找到' };
  return {
    title: `${post.metadata.title} | My Blog`,
    description: post.metadata.description,
  };
}

/**
 * 文章详情页主组件
 */
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 在 Next.js 15 中需要 await params
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) return notFound();

  const { title, date, category, readTime, description, tags } = post.metadata;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* 顶部装饰背景 - 支持暗色模式 */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none" />

      <main className="relative container mx-auto px-6 pt-12 pb-24 max-w-4xl">
        <a 
          href="/posts" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-12 group font-bold text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          返回文章列表
        </a>

        {/* 文章头图区域 */}
        <div className="w-full h-[320px] md:h-[420px] rounded-[3rem] bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-purple-500/20 mb-16 overflow-hidden shadow-2xl shadow-blue-500/5 flex items-center justify-center border border-white dark:border-zinc-800">
            <div className="relative text-center">
                <div className="absolute -inset-10 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative">
                  <div className="text-blue-600 dark:text-blue-400 font-black text-5xl opacity-30 italic tracking-tighter uppercase">Article</div>
                  <div className="text-zinc-400 dark:text-zinc-500 text-xs font-black uppercase tracking-[0.3em] mt-2 text-center">Personal Space</div>
                </div>
            </div>
        </div>

        {/* 文章头部信息 */}
        <div className="space-y-8 mb-16">
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20">
              {category || '技术文章'}
            </span>
            <div className="flex items-center gap-2 text-zinc-400">
              <Calendar size={14} className="text-zinc-300 dark:text-zinc-600" />
              {date || '2025-01-01'}
            </div>
            {readTime && (
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock size={14} className="text-zinc-300 dark:text-zinc-600" />
                {readTime}
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white leading-[1.15] tracking-tight">
            {title}
          </h1>
          
          {description && (
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium border-l-[6px] border-blue-600 pl-8 py-2">
              {description}
            </p>
          )}
        </div>

        {/* MDX 内容渲染区：使用 dark:prose-invert 响应主题切换 */}
        <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
          prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-zinc-900 dark:prose-strong:text-white
          prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-[2rem] prose-img:shadow-xl">
          
          <MDXRemote source={post.content} />
        </article>

        {/* 底部互动区 */}
        <div className="mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:scale-105 transition-all shadow-xl active:scale-95">
               <Share2 size={18} /> 分享文章
             </button>
             <button className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-95">
               <MessageCircle size={18} /> 发表评论
             </button>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
             {tags?.map((tag: string) => (
               <span key={tag} className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                 #{tag}
               </span>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
}
