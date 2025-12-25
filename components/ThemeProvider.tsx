'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * 这是一个包装组件，用于处理 Next.js 中的主题切换。
 * 将其改为默认导出 (default export) 可以显著减少导入错误。
 */
const ThemeProvider = ({ children, ...props }: any) => {
  // 安全检查：如果 NextThemesProvider 未定义（例如库未安装或版本不兼容），
  // 则降级为仅渲染子组件，防止页面彻底崩溃。
  if (typeof NextThemesProvider === 'undefined') {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default ThemeProvider;