import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, User2 } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { Post } from '@/lib/posts';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgressBar from '@/components/posts/ReadingProgressBar';
import { mdxComponents } from '@/components/MDXComponents';

type ModernDevBlogLayoutProps = {
  post: Post;
};

const author = {
  name: 'Just Potato',
  role: 'Frontend Devlog',
  initials: 'JP',
};

const prettyCodeOptions = {
  theme: 'github-dark-dimmed',
  keepBackground: false,
};

export default async function ModernDevBlogLayout({ post }: ModernDevBlogLayoutProps) {
  const rehypePrettyCode = (await import('rehype-pretty-code')).default;
  const mdxRehypePlugins: any = [[rehypePrettyCode, prettyCodeOptions]];
  const { title, date, category, readTime, description, tags } = post.metadata;
  const tagList = Array.isArray(tags) ? tags : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <ReadingProgressBar />

      <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            返回文章列表
          </Link>
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            Modern DevBlog
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 xl:pt-14">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)] xl:gap-12">
          <section className="min-w-0">
            <header className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/85 p-7 shadow-sm backdrop-blur xl:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white">
                  {category || '技术文章'}
                </span>
                {tagList.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-5">
                <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
                  {title}
                </h1>
                {description && (
                  <p className="max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
                    {description}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-semibold text-white shadow-sm">
                    {author.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                      <User2 size={14} className="text-slate-500" />
                      {author.name}
                    </div>
                    <div className="text-sm text-slate-500">{author.role}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={14} />
                    {date || '2026-07-30'}
                  </span>
                  {readTime && (
                    <span className="inline-flex items-center gap-2">
                      <Clock size={14} />
                      {readTime}
                    </span>
                  )}
                </div>
              </div>
            </header>

            <article
              id="article-content"
              className="prose prose-slate mt-10 max-w-none prose-headings:font-black prose-headings:tracking-normal prose-headings:text-slate-950 prose-headings:scroll-mt-32 prose-h1:text-4xl prose-h2:mt-16 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-4 prose-h2:text-3xl prose-h3:mt-10 prose-h3:text-2xl prose-h4:mt-8 prose-h4:text-xl prose-p:text-slate-700 prose-p:leading-8 prose-a:text-sky-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-950 prose-blockquote:border-sky-300 prose-blockquote:bg-sky-50/70 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:not-italic prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:text-slate-900 prose-pre:p-0 prose-pre:bg-transparent prose-pre:shadow-none prose-hr:border-slate-200 prose-li:text-slate-700 prose-img:rounded-2xl prose-img:shadow-lg prose-table:my-8 prose-table:w-full prose-th:border-slate-200 prose-td:border-slate-200"
            >
              <MDXRemote
                source={post.content}
                components={{
                  ...mdxComponents,
                  h1: () => null,
                }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: mdxRehypePlugins as any,
                    format: 'mdx',
                  },
                }}
              />
            </article>
          </section>

          <aside className="xl:pt-3">
            <div className="sticky top-28 space-y-6">
              <TableOfContents />

              <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Article Stats
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>分类</span>
                    <span className="font-medium text-slate-950">{category || '技术文章'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>字数</span>
                    <span className="font-medium text-slate-950">{post.content.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>标签</span>
                    <span className="font-medium text-slate-950">{tagList.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

