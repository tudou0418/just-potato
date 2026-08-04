import React from 'react';
import {
  CheckCircle2,
  Info,
  Lightbulb,
  TriangleAlert,
  XCircle,
} from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'note';

const CALLOUT_META: Record<
  CalloutType,
  {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    shell: string;
    header: string;
  }
> = {
  info: {
    label: 'Info',
    icon: Info,
    shell: 'border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-100',
    header: 'border-sky-200/70 bg-sky-100/80 text-sky-900 dark:border-sky-900/60 dark:bg-sky-900/35 dark:text-sky-100',
  },
  warning: {
    label: 'Warning',
    icon: TriangleAlert,
    shell: 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/35 dark:text-amber-100',
    header: 'border-amber-200/70 bg-amber-100/80 text-amber-900 dark:border-amber-900/60 dark:bg-amber-900/35 dark:text-amber-100',
  },
  success: {
    label: 'Success',
    icon: CheckCircle2,
    shell: 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/35 dark:text-emerald-100',
    header: 'border-emerald-200/70 bg-emerald-100/80 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-900/35 dark:text-emerald-100',
  },
  error: {
    label: 'Error',
    icon: XCircle,
    shell: 'border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/35 dark:text-rose-100',
    header: 'border-rose-200/70 bg-rose-100/80 text-rose-900 dark:border-rose-900/60 dark:bg-rose-900/35 dark:text-rose-100',
  },
  note: {
    label: 'Note',
    icon: Lightbulb,
    shell: 'border-slate-200 bg-slate-50 text-slate-950 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100',
    header: 'border-slate-200/80 bg-slate-100/80 text-slate-900 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-100',
  },
};

export const Callout = ({
  children,
  type = 'note',
  title,
}: {
  children: React.ReactNode;
  type?: CalloutType;
  title?: string;
}) => {
  const meta = CALLOUT_META[type];
  const Icon = meta.icon;

  return (
    <aside className={`not-prose my-8 overflow-hidden rounded-2xl border shadow-sm ${meta.shell}`}>
      <div className={`flex items-center gap-3 border-b px-5 py-3 text-sm font-semibold ${meta.header}`}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-current shadow-sm ring-1 ring-black/5 dark:bg-white/10">
          <Icon size={16} />
        </span>
        <span>{title || meta.label}</span>
      </div>
      <div className="px-5 py-4 text-[15px] leading-7">{children}</div>
    </aside>
  );
};

export const Alert = ({ children, type = 'note' }: { children: React.ReactNode; type?: CalloutType }) => {
  return <Callout type={type} title={CALLOUT_META[type].label}>{children}</Callout>;
};

export const FeatureGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
};

export const FeatureItem = ({
  icon,
  title,
  children,
  description,
}: {
  icon: string;
  title: string;
  children?: React.ReactNode;
  description?: string;
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3 text-2xl">{icon}</div>
      <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
      {description ? (
        <p className="m-0 text-sm text-slate-600 dark:text-slate-300">{description}</p>
      ) : (
        <div className="text-sm text-slate-600 dark:text-slate-300">{children}</div>
      )}
    </div>
  );
};

export const Details = ({ children }: { children: React.ReactNode }) => {
  return (
    <details className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60">
      {children}
    </details>
  );
};

export const Summary = ({ children }: { children: React.ReactNode }) => {
  return (
    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800/50">
      {children}
      <span className="ml-2">▶</span>
    </summary>
  );
};

export const CodeGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="my-6">{children}</div>;
};

export const CodeGroupTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-2 inline-block rounded-t-lg bg-slate-100 px-3 py-1 text-xs font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      {children}
    </div>
  );
};

export const ChartGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">{children}</div>;
};

export const ChartCard = ({
  title,
  type,
  children,
  description,
}: {
  title: string;
  type: string;
  children?: React.ReactNode;
  description?: string;
}) => {
  const icons: Record<string, string> = {
    line: '📈',
    pie: '🥧',
    bar: '📊',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3 text-2xl">{icons[type] || '📊'}</div>
      <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
      {description ? (
        <p className="m-0 text-sm text-slate-600 dark:text-slate-300">{description}</p>
      ) : (
        <div className="text-sm text-slate-600 dark:text-slate-300">{children}</div>
      )}
    </div>
  );
};

export const ChallengeCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
      {children}
    </div>
  );
};

export const ChallengeTitle = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-2 font-semibold text-slate-900 dark:text-slate-100">{children}</div>;
};

export const ChallengeSolution = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-3 font-semibold text-brand">{children}</div>;
};

export const ChallengeDetails = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>;
};

export const mdxComponents = {
  Callout,
  Alert,
  pre: CodeBlock,
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
};
