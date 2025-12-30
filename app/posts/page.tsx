// "use client";

// import React from 'react';
// import { Calendar, Clock, ChevronRight, BookOpen, Search } from 'lucide-react';

// // --- 模拟所有文章的数据 ---
// // 以后你可以将这些数据提取到独立文件或从数据库/MDX中读取
// const ALL_POSTS = [
//   {
//     id: 'my-first-post',
//     title: '我的第一篇博客文章：开启 Next.js 的创意之旅',
//     date: '2024-05-21',
//     excerpt: '在这篇文章中，我将分享我是如何利用 Next.js 15 和 Tailwind CSS v4 搭建起这个数字花园的...',
//     category: '技术笔记',
//     readTime: '5 min'
//   },
//   {
//     id: 'hello-world',
//     title: 'Hello World：记录不仅仅是为了保留记忆',
//     date: '2024-05-20',
//     excerpt: '这是我的博客开启的第一天，我想谈谈为什么在今天建立一个个人博客依然有意义...',
//     category: '生活感悟',
//     readTime: '3 min'
//   }
// ];

// const PostsListPage = () => {
//   return (
//     <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 pb-20">
//       {/* 顶部背景装饰 */}
//       <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/10 pointer-events-none" />

//       <main className="relative container mx-auto px-6 pt-16 max-w-5xl">
//         {/* 标题区域 */}
//         <div className="mb-16">
//           <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6">
//             全部文章 <span className="text-blue-600">.</span>
//           </h1>
//           <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
//             这里记录了我的技术探索、生活随笔以及对这个世界的思考。
//           </p>
//         </div>

//         {/* 搜索栏 (演示用) */}
//         <div className="relative mb-12 max-w-md">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="搜索文章标题或关键词..." 
//             className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white transition-all"
//           />
//         </div>

//         {/* 文章列表 */}
//         <div className="grid gap-8">
//           {ALL_POSTS.map((post) => (
//             <a 
//               key={post.id}
//               href={`/posts/${post.id}`}
//               className="group relative p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300"
//             >
//               <div className="flex flex-col md:flex-row justify-between gap-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
//                     <span className="text-blue-600 dark:text-blue-400">{post.category}</span>
//                     <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
//                     <time className="text-zinc-400">{post.date}</time>
//                   </div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
//                     {post.title}
//                   </h2>
//                   <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 max-w-3xl leading-relaxed">
//                     {post.excerpt}
//                   </p>
//                   <div className="flex items-center gap-4 pt-2 text-sm text-zinc-400 font-bold">
//                     <div className="flex items-center gap-1.5">
//                       <Clock size={14} />
//                       {post.readTime}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-center">
//                   <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
//                     <ChevronRight size={24} />
//                   </div>
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PostsListPage;

import React from 'react';
import { Calendar, Clock, ChevronRight, Search } from 'lucide-react';

/**
 * 【逻辑说明】
 * 我们现在采用“双轨制”：
 * 1. MANUAL_POSTS: 手动定义的文章（对应 app/posts/ 目录下的文件夹路由）。
 * 2. getAllPosts(): 动态读取的文章（对应 content/posts/ 目录下的 .mdx 文件）。
 * 最终将两者合并展示。
 */

// --- 1. 手动定义的文章列表 (对应您之前在 app 目录下创建的文件夹) ---
const MANUAL_POSTS = [
  {
    slug: 'my-first-post', // 必须与文件夹名一致
    metadata: {
      title: '我的第一篇博客文章：开启 Next.js 的创意之旅',
      date: '2024-05-21',
      category: '技术笔记',
      readTime: '5 min',
      description: '在这篇文章中，我将分享我是如何利用 Next.js 15 和 Tailwind CSS v4 搭建起这个数字花园的...'
    }
  }
];

// --- 2. 尝试导入动态获取文章的逻辑 ---
let getAllPosts: any;
try {
  const postsModule = require('../../lib/posts');
  getAllPosts = postsModule.getAllPosts;
} catch (error) {
  getAllPosts = () => [];
}

export default async function PostsListPage() {
  // 获取动态文章
  let dynamicPosts = [];
  try {
    if (typeof getAllPosts === 'function') {
      dynamicPosts = getAllPosts();
    }
  } catch (error) {
    console.error("加载动态文章列表失败:", error);
  }

  // --- 3. 合并两个来源的文章 ---
  // 我们使用 slug 作为排重标准，如果 MDX 和文件夹重名，优先显示文件夹版本
  const combinedPosts = [...MANUAL_POSTS];
  
  dynamicPosts.forEach((dPost: any) => {
    if (!combinedPosts.find(m => m.slug === dPost.slug)) {
      combinedPosts.push(dPost);
    }
  });

  // 排序：按日期降序排列
  const sortedPosts = combinedPosts.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 pb-20">
      {/* 顶部艺术装饰背景 */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/10 pointer-events-none" />

      <main className="relative container mx-auto px-6 pt-16 max-w-5xl">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
            全部文章 <span className="text-blue-600">.</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed font-medium">
            这里汇集了手动创建的页面和动态 MDX 内容。您可以灵活选择写作方式。
          </p>
        </header>

        {/* 搜索过滤区域 */}
        <div className="relative mb-12 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="搜索文章标题..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white transition-all shadow-sm"
          />
        </div>

        {/* 文章列表展示 */}
        <div className="grid gap-8">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post: any) => (
              <a 
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group relative p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                      <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded">
                        {post.metadata.category || '未分类'}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <time className="text-zinc-400">{post.metadata.date}</time>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {post.metadata.title}
                    </h2>
                    
                    <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 max-w-3xl leading-relaxed">
                      {post.metadata.description || '点击阅读全文，查看更多内容...'}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-2 text-xs text-zinc-400 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.metadata.readTime || '5 min'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:scale-110">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-400 font-medium italic">目前暂无文章发布。</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}