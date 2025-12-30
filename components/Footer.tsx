// 'use client';  
// import React from 'react';
// import { Github, Twitter, Mail } from 'lucide-react';
// import { useTheme } from 'next-themes';

// const Footer = () => {
//   const { resolvedTheme } = useTheme(); // 获取当前的主题

//   return (
//     <footer 
//       className={`py-16 border-t border-gray-100 ${resolvedTheme === 'dark' ? 'dark:border-zinc-900 bg-zinc-950' : 'bg-white border-gray-100'}`}
//     >
//       <div className="container mx-auto px-6">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
//           <div className="space-y-2">
//             <div className="text-xl font-bold text-gray-900 dark:text-white">MyBlog.</div>
//             <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-xs">
//               记录技术与生活的点滴，构建有温度的代码空间。
//             </p>
//           </div>

//           <div className="flex gap-6 text-sm font-bold text-gray-400 dark:text-zinc-400">
//             <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Github</a>
//             <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">RSS</a>
//             <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">隐私政策</a>
//           </div>

//           <div className="flex items-center gap-4">
//             {[Github, Twitter, Mail].map((Icon, i) => (
//               <a key={i} href="#" className="p-2 text-gray-400 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all">
//                 <Icon size={18} />
//               </a>
//             ))}
//           </div>
//         </div>
        
//         <div className="mt-12 pt-8 border-t border-gray-50 dark:border-zinc-900 text-center">
//           <p className="text-xs text-gray-400 dark:text-zinc-500">
//             © {new Date().getFullYear()} 你的名字. Powered by Next.js & Tailwind CSS.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

/**
 * 修复说明：
 * 移除了 useTheme 的 JS 逻辑判断。
 * 直接使用 Tailwind 的 dark: 变体来处理主题颜色。
 * 这样可以确保服务端和客户端生成的 HTML 结构完全一致，解决 Hydration 报错。
 */
const Footer = () => {
  return (
    <footer className="py-16 border-t border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <div className="text-xl font-bold text-gray-900 dark:text-white">MyBlog.</div>
            <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-xs">
              记录技术与生活的点滴，构建有温度的代码空间。
            </p>
          </div>

          <div className="flex gap-6 text-sm font-bold text-gray-400 dark:text-zinc-500">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Github</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">RSS</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">隐私政策</a>
          </div>

          <div className="flex items-center gap-4">
            {[Github, Twitter, Mail].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="p-2 text-gray-400 hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-400 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-50 dark:border-zinc-900 text-center">
          <p className="text-xs text-gray-400 dark:text-zinc-500">
            © {new Date().getFullYear()} 你的名字. Powered by Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;