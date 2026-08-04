'use client';

import React from 'react';
import { Check, Copy, FileCode2 } from 'lucide-react';

const normalizeCode = (value: React.ReactNode): string => {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeCode(item)).join('');
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (React.isValidElement(value)) {
    return normalizeCode((value.props as { children?: React.ReactNode }).children);
  }

  return '';
};

const parseFilename = (meta: unknown, language: string) => {
  if (typeof meta !== 'string' || !meta.trim()) return language || 'code';
  const filenameMatch = meta.match(/filename\s*=\s*("[^"]+"|'[^']+'|[^\s}]+)/i);
  if (!filenameMatch) return meta.trim();
  return filenameMatch[1].replace(/^['"]|['"]$/g, '');
};

export default function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = React.useState(false);

  const codeElement = React.Children.only(children) as React.ReactElement<{
    className?: string;
    children?: React.ReactNode;
    metastring?: string;
    'data-filename'?: string;
    'data-language'?: string;
  }>;

  const rawCode = normalizeCode(codeElement?.props?.children).replace(/\n$/, '');
  const className = codeElement?.props?.className || '';
  const language = codeElement?.props?.['data-language'] || className.match(/language-([a-z0-9_-]+)/i)?.[1] || '';
  const filename = codeElement?.props?.['data-filename'] || parseFilename(codeElement?.props?.metastring, language);

  const onCopy = async () => {
    if (!rawCode) return;
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-900/20">
      <figcaption className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-300">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-sky-300">
            <FileCode2 size={16} />
          </span>
          <div className="min-w-0">
            <div className="truncate font-medium text-slate-100">{filename || language || 'code'}</div>
            <div className="text-xs text-slate-400">{language ? language.toUpperCase() : 'SNIPPET'}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-sky-500/60 hover:bg-slate-700"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? '已复制' : '复制'}
        </button>
      </figcaption>

      <pre className="overflow-x-auto px-4 py-5 text-[13px] leading-7 text-slate-100">
        {React.cloneElement(codeElement, {
          className: `${className} block font-mono`,
        })}
      </pre>
    </figure>
  );
}
