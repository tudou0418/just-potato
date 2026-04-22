import React from 'react';
import { ArrowLeft, Calendar, Clock, Share2, MessageCircle } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import TableOfContents from '@/components/TableOfContents';
import {
  Callout,
  Alert,
  FeatureGrid,
  FeatureItem,
  Details,
  Summary,
  CodeGroup,
  CodeGroupTitle,
  ChartGrid,
  ChartCard,
  ChallengeCard,
  ChallengeTitle,
  ChallengeSolution,
  ChallengeDetails
} from '@/components/MDXComponents';

const notFound = () => <div className="p-20 text-center font-bold text-ui-text">404 - 文章未找到</div>;

const getPostData = (slug: string) => {
  const allPosts = getAllPosts();
  return allPosts.find(post => post.slug === slug) || null;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) return { title: '文章未找到' };
  return {
    title: `${post.metadata.title} | Just Potato`,
    description: post.metadata.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) return notFound();

  const { title, date, category, readTime, description, tags } = post.metadata;

  return (
    <div className="min-h-screen bg-ui-surface">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand/10 via-transparent to-transparent pointer-events-none" />

      {/* 面包屑导航 */}
      <div className="relative container mx-auto px-6 pt-12 max-w-7xl">
        <a
          href="/posts"
          className="inline-flex items-center gap-2 text-ui-text-muted hover:text-brand transition-colors mb-8 group font-bold text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          返回文章列表
        </a>
      </div>

      {/* 两栏布局：左侧文章，右侧目录 */}
      <main className="relative container mx-auto px-6 pb-24 max-w-7xl">
        <div className="flex flex-col xl:flex-row gap-12">

          {/* 左侧：文章内容区域 */}
          <div className="flex-1 max-w-4xl">
            {/* 文章元信息 */}
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

              <h1 className="text-2xl md:text-2xl font-black text-ui-text leading-[1.15] tracking-tight">
                {title}
              </h1>

              {description && (
                <p className="text-xl md:text-1xl text-ui-text-muted leading-relaxed font-medium border-l-[6px] border-brand pl-8 py-2">
                  {description}
                </p>
              )}
            </div>

            {/* 文章正文 - 添加 id 给 article 标签以便目录提取标题 */}
            <article
              id="article-content"
              className="prose prose-zinc dark:prose-invert max-w-none
              prose-headings:font-black prose-headings:tracking-tight prose-headings:scroll-mt-32
              prose-p:text-ui-text-muted prose-p:leading-relaxed prose-p:text-base
              prose-a:text-brand prose-a:no-underline hover:prose-a:underline
              prose-strong:text-ui-text
              prose-code:text-brand prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-ui-surface prose-pre:border prose-pre:border-ui-border prose-pre:rounded-xl prose-pre:shadow-sm
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-ui-border prose-h2:pb-4 prose-h2:font-black
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:font-black
              prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4 prose-h4:font-bold
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-ui-text-muted
              [&_:where(div,figure)]:p-0"
            >
              <MDXRemote
                source={post.content}
                components={{
                  Callout,
                  Alert,
                  FeatureGrid,
                  FeatureItem,
                  Details,
                  Summary,
                  CodeGroup,
                  CodeGroupTitle,
                  ChartGrid,
                  ChartCard,
                  ChallengeCard,
                  ChallengeTitle,
                  ChallengeSolution,
                  ChallengeDetails,
                  h1: ({ children, ...props }) => null
                }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    format: 'mdx'
                  }
                }}
              />
            </article>

            {/* 底部操作区 */}
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
          </div>

          {/* 右侧：目录导航 - 使用固定定位 */}
          <div className="hidden xl:block w-72 shrink-0">
            <div className="sticky top-32 w-full">
              <TableOfContents />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
