'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Hash, List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('article h2, article h3, article h4')
    );

    const idCount = new Map<string, number>();
    const headingData: Heading[] = [];

    elements.forEach((elem, index) => {
      const baseId = generateId(elem.textContent || '', index);
      const currentCount = idCount.get(baseId) || 0;
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

  const generateId = (text: string, index: number): string => {
    const cleaned = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    return cleaned || `heading-${index}`;
  };

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
        rootMargin: '-96px 0px -66%',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const elem = document.getElementById(heading.id);
      if (elem) observer.observe(elem);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      const top = elem.getBoundingClientRect().top + window.scrollY - 104;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <List size={16} />
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">目录</h4>
            <p className="text-xs text-slate-400">快速跳转文章章节</p>
          </div>
        </div>

        <nav className="max-h-[calc(100vh-280px)] space-y-1 overflow-y-auto pr-1 scrollbar-hide">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const paddingLeft = heading.level > 2 ? `${(heading.level - 2) * 0.75}rem` : '0';

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`group flex items-start gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
                style={{ paddingLeft: `calc(${paddingLeft} + 0.75rem)` }}
              >
                <Hash
                  size={12}
                  className={`mt-1 shrink-0 transition-colors ${
                    isActive ? 'text-sky-600' : 'text-slate-300 group-hover:text-slate-500'
                  }`}
                />
                <span className="line-clamp-2 leading-snug">{heading.text}</span>
              </a>
            );
          })}
        </nav>

        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-400">
          <span>{headings.length} 个章节</span>
          <span className="inline-flex items-center gap-1 text-sky-600">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            live
          </span>
        </div>
      </div>
    </div>
  );
}
