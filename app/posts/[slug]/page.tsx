// import Head from 'next/head';
// import { getAllPosts } from '../../../lib/posts';
// import { notFound } from 'next/navigation';
// import { MDXRemote } from 'next-mdx-remote';
// import { serialize } from 'next-mdx-remote/serialize';

// export async function generateStaticParams() {
//   const posts = getAllPosts();
//   return posts.map((post) => ({ slug: post.slug }));
// }

// export default async function PostPage({ params }: { params: { slug: string } }) {
//   const posts = getAllPosts();
//   const post = posts.find((p) => p.slug === params.slug);
//   if (!post) return notFound();

//   const mdxSource = await serialize(post.content);

//   return (
//     <>
//       <Head>
//         <title>{post.metadata.title} | My Blog</title>
//         <meta name="description" content={post.metadata.description || 'No description'} />
//         <meta name="keywords" content={post.metadata.tags.join(', ')} />
//         <meta property="og:title" content={post.metadata.title} />
//         <meta property="og:description" content={post.metadata.description || 'No description'} />
//       </Head>

//       <article>
//         <h1>{post.metadata.title}</h1>
//         <MDXRemote {...mdxSource} />
//       </article>
//     </>
//   );
// }

import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts } from '@/lib/posts';
import { ArrowLeft, Calendar, Clock, Tag, Share2, MessageCircle } from 'lucide-react';

/**
 * Next.js 15 动态元数据生成
 * 注意：params 在 Next.js 15 中是 Promise
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return { title: '文章未找到' };

  return {
    title: `${post.metadata.title} | My Blog`,
    description: post.metadata.description || '阅读更多关于技术与生活的分享',
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
    },
  };
}

/**
 * 预生成静态路径 (SSG)
 */
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * 文章详情页主组件
 */
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 在 Next.js 15 中必须 await params
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* 顶部艺术背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none" />

      <main className="relative container mx-auto px-6 pt-12 pb-24 max-w-4xl">
        {/* 返回文章列表 */}
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
              {post.metadata.category || '技术文章'}
            </span>
            <div className="flex items-center gap-2 text-zinc-400">
              <Calendar size={14} className="text-zinc-300 dark:text-zinc-600" />
              {post.metadata.date}
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Clock size={14} className="text-zinc-300 dark:text-zinc-600" />
              {post.metadata.readTime || '5 min'}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white leading-[1.15] tracking-tight">
            {post.metadata.title}
          </h1>
          
          {post.metadata.description && (
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium border-l-[6px] border-blue-600 pl-8 py-2">
              {post.metadata.description}
            </p>
          )}
        </div>

        {/* MDX 内容渲染区 */}
        <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
          prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-zinc-900 dark:prose-strong:text-white
          prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-[2rem] prose-img:shadow-xl">
          
          <MDXRemote source={post.content} />
        </article>

        {/* 底部互动与标签 */}
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
             {post.metadata.tags?.map((tag: string) => (
               <span key={tag} className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">
                 #{tag}
               </span>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
}
