'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { List, Hash } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

/**
 * 目录组件 - 自动提取文章标题并生成导航
 * 支持点击跳转、滚动高亮、层级缩进
 * 注意：sticky 定位由父组件控制
 */
export default function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // 从页面中提取所有标题
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('article h2, article h3, article h4')
    );

    // 用于跟踪重复的 id
    const idCount = new Map<string, number>();
    const headingData: Heading[] = [];

    elements.forEach((elem, index) => {
      const baseId = generateId(elem.textContent || '', index);
      const currentCount = idCount.get(baseId) || 0;

      // 如果 id 重复，添加数字后缀
      const uniqueId = currentCount > 0 ? `${baseId}-${currentCount}` : baseId;
      idCount.set(baseId, currentCount + 1);

      if (!elem.id) elem.id = uniqueId;

      headingData.push({
        id: uniqueId,
        text: elem.textContent || '',
        level: parseInt(elem.tagName.substring(1)),
      });
    });

    setHeadings(headingData);
  }, []);

  // 生成安全的 ID
  const generateId = (text: string, index: number): string => {
    const cleaned = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // 如果清理后为空，使用索引作为 fallback
    return cleaned || `heading-${index}`;
  };

  // 监听滚动，高亮当前目录项
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const elem = document.getElementById(heading.id);
      if (elem) observer.observe(elem);
    });

    return () => observer.disconnect();
  }, [headings]);

  // 点击跳转
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      const top = elem.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* 目录卡片 */}
      <div className="bg-ui-surface/80 backdrop-blur-xl border border-ui-border rounded-[2rem] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-brand/10 rounded-lg text-brand">
            <List size={16} />
          </div>
          <h4 className="text-sm font-black uppercase tracking-widest">目录</h4>
        </div>

        {/* 目录列表 */}
        <nav className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-hide">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const paddingLeft = heading.level > 2 ? `${(heading.level - 2) * 1}rem` : '0';

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`group flex items-start gap-2 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-brand bg-brand/10 border-l-2 border-brand'
                    : 'text-ui-text-muted hover:text-ui-text hover:bg-ui-border/20'
                }`}
                style={{ paddingLeft: `calc(${paddingLeft} + 0.75rem)` }}
              >
                <Hash
                  size={12}
                  className={`mt-1 flex-shrink-0 transition-colors ${
                    isActive ? 'text-brand' : 'text-ui-text/40 group-hover:text-ui-text/60'
                  }`}
                />
                <span className="leading-snug line-clamp-2">{heading.text}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* 底部装饰 */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ui-border/20 rounded-full text-[10px] font-bold text-ui-text/40">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
          {headings.length} 个章节
        </div>
      </div>
    </div>
  );
}
