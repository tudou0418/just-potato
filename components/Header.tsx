// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';
// import { Sun, Moon, Code2, Github } from 'lucide-react';

// const Header = () => {
//   const { theme, setTheme } = useTheme();
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
//               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//               className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
//               aria-label="Toggle Theme"
//             >
//               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
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
import { Sun, Moon, Code2, Github } from 'lucide-react';

const Header = () => {
  const { theme, setTheme,resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免 Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-transparent bg-transparent transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo 区域 */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code2 size={20} className="text-white" />
          </div>
          <div className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">MyBlog.</div>
        </div>
        
        {/* 导航菜单 */}
        <div className="hidden space-x-8 md:flex text-sm font-medium text-gray-600 dark:text-gray-400">
          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">首页</a>
          <a href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">项目</a>
          <a href="/posts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">文章</a>
          <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">关于</a>
        </div>

        {/* 右侧交互 */}
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com" 
            target="_blank" 
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Github size={20} />
          </a>
          
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <button className="hidden sm:block rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            订阅
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
