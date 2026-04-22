'use client';

import React from 'react';

// Callout 提示框组件
export const Callout = ({
  children,
  type = 'info'
}: {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error';
}) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    success: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
  };

  return (
    <div className={`my-6 p-5 rounded-xl border ${styles[type]}`}>
      {children}
    </div>
  );
};

// Alert 警告组件
export const Alert = ({
  children,
  type = 'note'
}: {
  children: React.ReactNode;
  type?: 'tip' | 'warning' | 'success' | 'note' | 'info';
}) => {
  const icons = {
    tip: '💡',
    warning: '⚠️',
    success: '✅',
    note: '📝',
    info: 'ℹ️'
  };

  return (
    <div className="my-6 p-5 rounded-xl bg-brand/5 border border-brand/20">
      <div className="flex gap-3">
        <span className="text-xl">{icons[type]}</span>
        <div className="flex-1 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

// FeatureGrid 功能网格
export const FeatureGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {children}
    </div>
  );
};

export const FeatureItem = ({
  icon,
  title,
  children,
  description
}: {
  icon: string;
  title: string;
  children?: React.ReactNode;
  description?: string;
}) => {
  return (
    <div className="p-5 rounded-2xl bg-ui-surface border border-ui-border hover:border-brand/30 hover:shadow-lg transition-all">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-bold text-ui-text mb-2">{title}</h4>
      {description ? (
        <p className="text-sm text-ui-text-muted m-0">{description}</p>
      ) : (
        <div className="text-sm text-ui-text-muted">{children}</div>
      )}
    </div>
  );
};

// Details 折叠面板
export const Details = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <details className="my-6 bg-ui-surface border border-ui-border rounded-xl overflow-hidden">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Summary) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, setIsOpen });
        }
        return (
          <div className={`px-5 pb-5 text-sm ${isOpen ? 'block' : 'hidden'}`}>
            {child}
          </div>
        );
      })}
    </details>
  );
};

export const Summary = ({
  children,
  isOpen,
  setIsOpen
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}) => {
  return (
    <summary
      className="px-5 py-4 cursor-pointer font-bold text-ui-text hover:bg-ui-border/30 transition-colors flex items-center justify-between"
      onClick={(e) => {
        e.preventDefault();
        setIsOpen?.(!isOpen);
      }}
    >
      {children}
      <span className={`ml-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
    </summary>
  );
};

// CodeGroup 代码组
export const CodeGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-6">
      {children}
    </div>
  );
};

export const CodeGroupTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-2 text-xs font-mono text-ui-text-muted bg-ui-border/20 px-3 py-1 rounded-t-lg inline-block">
      {children}
    </div>
  );
};

// ChartGrid 和 ChartCard
export const ChartGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {children}
    </div>
  );
};

export const ChartCard = ({
  title,
  type,
  children,
  description
}: {
  title: string;
  type: string;
  children?: React.ReactNode;
  description?: string;
}) => {
  const icons: Record<string, string> = {
    line: '📈',
    pie: '🥧',
    bar: '📊'
  };

  return (
    <div className="p-5 rounded-2xl bg-ui-surface border border-ui-border hover:shadow-lg transition-all">
      <div className="text-2xl mb-2">{icons[type] || '📊'}</div>
      <h4 className="font-bold text-ui-text mb-2">{title}</h4>
      {description ? (
        <p className="text-sm text-ui-text-muted m-0">{description}</p>
      ) : (
        <div className="text-sm text-ui-text-muted">{children}</div>
      )}
    </div>
  );
};

// ChallengeCard 挑战卡片
export const ChallengeCard = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-ui-surface to-ui-border/10 border border-ui-border">
      {children}
    </div>
  );
};

export const ChallengeTitle = ({ children }: { children: React.ReactNode }) => {
  return <div className="font-bold text-ui-text mb-2">{children}</div>;
};

export const ChallengeSolution = ({ children }: { children: React.ReactNode }) => {
  return <div className="font-bold text-brand mb-3">{children}</div>;
};

export const ChallengeDetails = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-sm text-ui-text-muted leading-relaxed">{children}</div>;
};

// 导出所有组件的映射，供 MDX 使用
export const mdxComponents = {
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
};
