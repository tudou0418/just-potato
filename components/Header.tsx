// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';
// import { Sun, Moon, Code2, Github } from 'lucide-react';

// const Header = () => {
//   const { theme, setTheme,resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // 避免 Hydration Mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-transparent bg-transparent transition-all">
//       <div className="container mx-auto flex h-16 items-center justify-between px-6">
//         {/* Logo 区域 */}
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <Code2 size={20} className="text-white" />
//           </div>
//           <div className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">MyBlog.</div>
//         </div>
        
//         {/* 导航菜单 */}
//         <div className="hidden space-x-8 md:flex text-sm font-medium text-gray-600 dark:text-gray-400">
//           <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">首页</a>
//           <a href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">项目</a>
//           <a href="/posts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">文章</a>
//           <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">关于</a>
//         </div>

//         {/* 右侧交互 */}
//         <div className="flex items-center gap-3">
//           <a 
//             href="https://github.com" 
//             target="_blank" 
//             className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
//           >
//             <Github size={20} />
//           </a>
          
//           {mounted && (
//             <button
//               onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
//               className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
//               aria-label="Toggle Theme"
//             >
//               {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
//             </button>
//           )}

//           <button className="hidden sm:block rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
//             订阅
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;
'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Code2, Github, Menu, X } from 'lucide-react';

/**
 * 💡 琥珀主题适配说明：
 * 1. bg-brand: 使用琥珀主色 (Amber 500)
 * 2. text-ui-text: 自动适配亮色的焦糖色和深色的奶油色
 * 3. border-ui-border: 适配主题色边框
 * 4. shadow-brand: 使用配置中的琥珀色光晕阴影
 */

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 避免 Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-ui-border bg-ui-surface/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        
        {/* Logo 区域 */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
            <Code2 size={20} className="text-white" />
          </div>
          <div className="text-xl font-bold tracking-tight text-ui-text">
            My<span className="text-brand">Blog</span>.
          </div>
        </div>
        
        {/* 桌面端导航菜单 */}
        <div className="hidden space-x-8 md:flex text-sm font-medium text-ui-text opacity-70">
          <a href="/" className="hover:text-brand hover:opacity-100 transition-colors">首页</a>
          <a href="/projects" className="hover:text-brand hover:opacity-100 transition-colors">项目</a>
          <a href="/posts" className="hover:text-brand hover:opacity-100 transition-colors">文章</a>
          <a href="/about" className="hover:text-brand hover:opacity-100 transition-colors">关于</a>
        </div>

        {/* 右侧交互 */}
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex p-2 text-ui-text opacity-60 hover:text-brand hover:opacity-100 transition-colors"
          >
            <Github size={20} />
          </a>
          
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-brand/10 text-brand hover:bg-brand/20 transition-all border border-brand/10"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <button className="hidden sm:block rounded-full bg-brand px-6 py-2 text-sm font-bold text-white hover:bg-brand-dark transition-all shadow-brand">
            订阅
          </button>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ui-text hover:text-brand transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ui-border bg-ui-surface/95 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 space-y-3">
            <a 
              href="/" 
              className="block py-2 text-sm font-medium text-ui-text hover:text-brand transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              首页
            </a>
            <a 
              href="/projects" 
              className="block py-2 text-sm font-medium text-ui-text hover:text-brand transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              项目
            </a>
            <a 
              href="/posts" 
              className="block py-2 text-sm font-medium text-ui-text hover:text-brand transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              文章
            </a>
            <a 
              href="/about" 
              className="block py-2 text-sm font-medium text-ui-text hover:text-brand transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              关于
            </a>
            <div className="pt-3 border-t border-ui-border/50 flex items-center gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-ui-text opacity-60 hover:text-brand hover:opacity-100 transition-colors"
              >
                <Github size={20} />
              </a>
              <button className="rounded-full bg-brand px-6 py-2 text-sm font-bold text-white hover:bg-brand-dark transition-all shadow-brand">
                订阅
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;