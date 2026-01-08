import React from 'react';
import { ArrowLeft, Calendar, Clock, Tag, Share2, MessageCircle } from 'lucide-react';

const notFound = () => <div className="p-20 text-center font-bold text-ui-text">404 - 文章未找到</div>;
const MDXRemote = ({ source }: { source: string }) => (
  <div className="space-y-4">
    <p>{source}</p>
    <p className="text-sm text-ui-text-muted italic">（此处在本地运行时将通过 MDX 渲染真实内容）</p>
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

const getPostData = (slug: string) => {
  return mockPost; 
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) return { title: '文章未找到' };
  return {
    title: `${post.metadata.title} | My Blog`,
    description: post.metadata.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) return notFound();

  const { title, date, category, readTime, description, tags } = post.metadata;

  return (
    <div className="min-h-screen bg-ui-surface transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand/10 via-transparent to-transparent pointer-events-none" />

      <main className="relative container mx-auto px-6 pt-12 pb-24 max-w-4xl">
        <a 
          href="/posts" 
          className="inline-flex items-center gap-2 text-ui-text-muted hover:text-brand transition-colors mb-12 group font-bold text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          返回文章列表
        </a>

        <div className="w-full h-[320px] md:h-[420px] rounded-smooth bg-gradient-to-tr from-brand/20 via-brand/10 to-brand/20 mb-16 overflow-hidden shadow-brand flex items-center justify-center border border-ui-border">
            <div className="relative text-center">
                <div className="absolute -inset-10 bg-brand/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative">
                  <div className="text-brand font-black text-5xl opacity-30 italic tracking-tighter uppercase">Article</div>
                  <div className="text-ui-text-muted text-xs font-black uppercase tracking-[0.3em] mt-2 text-center">Personal Space</div>
                </div>
            </div>
        </div>

        <div className="space-y-8 mb-16">
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="px-4 py-1.5 bg-brand text-ui-surface rounded-full shadow-brand">
              {category || '技术文章'}
            </span>
            <div className="flex items-center gap-2 text-ui-text-muted">
              <Calendar size={14} className="text-ui-text-muted/70" />
              {date || '2025-01-01'}
            </div>
            {readTime && (
              <div className="flex items-center gap-2 text-ui-text-muted">
                <Clock size={14} className="text-ui-text-muted/70" />
                {readTime}
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-ui-text leading-[1.15] tracking-tight">
            {title}
          </h1>
          
          {description && (
            <p className="text-xl md:text-2xl text-ui-text-muted leading-relaxed font-medium border-l-[6px] border-brand pl-8 py-2">
              {description}
            </p>
          )}
        </div>

        <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
          prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-ui-text-muted prose-p:leading-relaxed
          prose-a:text-brand prose-a:no-underline hover:prose-a:underline
          prose-strong:text-ui-text
          prose-code:text-brand prose-code:bg-brand/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-smooth prose-img:shadow-xl">
          
          <MDXRemote source={post.content} />
        </article>

        <div className="mt-24 pt-12 border-t border-ui-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-ui-text text-ui-surface font-bold hover:scale-105 transition-all shadow-xl active:scale-95">
               <Share2 size={18} /> 分享文章
             </button>
             <button className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-ui-border text-ui-text-muted font-bold hover:bg-ui-border transition-all active:scale-95">
               <MessageCircle size={18} /> 发表评论
             </button>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
             {tags?.map((tag: string) => (
               <span key={tag} className="px-4 py-1.5 bg-ui-border/30 rounded-xl text-xs font-black text-ui-text-muted uppercase tracking-tighter hover:text-brand transition-colors">
                 #{tag}
               </span>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
}
