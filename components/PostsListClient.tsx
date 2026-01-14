'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Eye, 
  Flame, 
  ArrowUpRight, 
  Search, 
  Sparkles,
  Quote,
  List,
  Loader2
} from 'lucide-react';

const QUOTE_CONTENT = {
  text: "在大脑的数字花园里，每一行代码都是一粒种子，每一次思考都是一场春雨。",
  author: "— 写给未来的自己"
};

interface Post {
  slug: string;
  metadata: {
    title: string;
    date: string;
    category: string;
    readTime: string;
    description: string;
  };
}

interface PostsListClientProps {
  initialPosts: Post[];
  totalPosts: number;
}

export default function PostsListClient({ initialPosts, totalPosts }: PostsListClientProps) {
  const [displayPosts, setDisplayPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalPosts > 4);
  const loaderRef = useRef(null);

  const loadMorePosts = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    setTimeout(() => {
      const currentLength = displayPosts.length;
      const nextBatch = initialPosts.slice(currentLength, currentLength + 2);
      
      if (nextBatch.length > 0) {
        setDisplayPosts(prev => [...prev, ...nextBatch]);
      }
      
      if (currentLength + nextBatch.length >= initialPosts.length) {
        setHasMore(false);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    }, { threshold: 1.0 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [displayPosts, hasMore, loading]);

  return (
    <div className="min-h-screen bg-ui-surface transition-colors duration-500 text-ui-text font-sans">
      {/* <div className="w-full bg-ui-surface/90 backdrop-blur-xl h-12 flex items-center overflow-hidden mb-2">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-4 animate-reveal overflow-hidden">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-brand bg-brand/10 rounded-full">
              <Quote size={12} fill="currentColor" />
            </div>
            <p className="text-xs md:text-sm font-medium text-ui-text opacity-70 truncate tracking-tight">
              {QUOTE_CONTENT.text} <span className="ml-2 opacity-40 font-serif italic">{QUOTE_CONTENT.author}</span>
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0 text-brand">
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Inspiration</span>
          </div>
        </div>
      </div> */}

      <main className="max-w-7xl mx-auto px-6 pt-2">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
                 全部文章 <span className="text-ui-text opacity-30">/ {displayPosts.length}</span>
               </h2>
               <div className="h-[1px] flex-1 ml-8 bg-ui-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayPosts.map((post) => (
                <a 
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col bg-ui-surface border border-ui-border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand/10 transition-all duration-500"
                >
                  <div className="aspect-[16/10] overflow-hidden relative bg-gradient-to-br from-brand/20 to-brand/5">
                    <div className="absolute top-6 left-6">
                      <span className="bg-ui-surface/90 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-black text-brand uppercase border border-ui-border shadow-sm">
                        {post.metadata.category || '未分类'}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-ui-text opacity-40 uppercase tracking-widest mb-4">
                      <span>{post.metadata.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand/20" />
                      <span className="flex items-center gap-1"><Clock size={12}/> {post.metadata.readTime || '5 min'}</span>
                    </div>
                    
                    <h3 className="text-2xl font-black leading-tight tracking-tight mb-4 group-hover:text-brand transition-colors">
                      {post.metadata.title}
                    </h3>
                    
                    <p className="text-ui-text opacity-60 text-sm leading-relaxed mb-8 line-clamp-2">
                      {post.metadata.description || '点击阅读全文，查看更多内容...'}
                    </p>

                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-ui-border">
                       <div className="flex items-center gap-4 text-[10px] font-bold text-ui-text opacity-40">
                          <span className="flex items-center gap-1"><Eye size={12}/> 1.2k</span>
                          <span className="flex items-center gap-1"><Flame size={12} className="text-brand" /> 85%</span>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-ui-surface transition-all shadow-inner">
                         <ArrowUpRight size={18} />
                       </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div ref={loaderRef} className="py-20 flex flex-col items-center justify-center">
              {loading ? (
                <div className="flex items-center gap-3 text-ui-text opacity-60">
                  <Loader2 size={24} className="animate-spin text-brand" />
                  <span className="text-xs font-black uppercase tracking-widest">正在挖掘更多内容...</span>
                </div>
              ) : !hasMore ? (
                <div className="flex flex-col items-center gap-4 opacity-30">
                  <div className="h-[1px] w-24 bg-ui-border" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">没有更多内容了</span>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-[128px] h-fit space-y-12 pb-20">
            <section className="bg-ui-surface border border-ui-border rounded-[2.5rem] p-8 shadow-sm">
               <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-brand/10 rounded-lg text-brand">
                   <List size={18} />
                 </div>
                 <h4 className="text-sm font-black uppercase tracking-widest">文章分类</h4>
               </div>
               <div className="space-y-2">
                 {[
                    {name: '技术干货', count: 12}, 
                    {name: '生活哲学', count: 5}, 
                    {name: '创意技术', count: 8}, 
                    {name: '架构设计', count: 4}
                 ].map((cat) => (
                   <div key={cat.name} className="flex items-center justify-between p-3 rounded-2xl hover:bg-brand/5 cursor-pointer group transition-colors">
                      <span className="text-sm font-bold text-ui-text opacity-60 group-hover:text-brand">{cat.name}</span>
                      <span className="text-[10px] font-mono px-2 py-1 bg-ui-border rounded-lg opacity-40 group-hover:opacity-100">{cat.count}</span>
                   </div>
                 ))}
               </div>
            </section>

            <section className="p-8 bg-brand/5 rounded-[2.5rem]">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-30">最新发布 / RECENT</h4>
               <div className="space-y-8">
                 {displayPosts.slice(0, 3).map((post) => (
                   <a 
                     key={post.slug}
                     href={`/posts/${post.slug}`}
                     className="group cursor-pointer flex gap-4"
                   >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-ui-border bg-brand/10">
                        <div className="w-full h-full flex items-center justify-center text-brand/30">
                          <Sparkles size={24} />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-sm font-bold leading-tight line-clamp-2 group-hover:text-brand transition-colors mb-1">{post.metadata.title}</h5>
                        <time className="text-[9px] font-bold text-ui-text opacity-40 uppercase tracking-wider">{post.metadata.date}</time>
                      </div>
                   </a>
                 ))}
               </div>
            </section>
          </aside>
        </div>

      </main>
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        article, section {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        button, a, [role="button"] {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
