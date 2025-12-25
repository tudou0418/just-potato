// import React from 'react';
// import { 
//   Github, 
//   Twitter, 
//   Mail, 
//   ExternalLink, 
//   BookOpen, 
//   Cpu, 
//   Layers,
//   ChevronRight
// } from 'lucide-react';

// // --- 模拟数据 ---
// const TECH_STACK = [
//   { name: 'Next.js', color: 'bg-black text-white' },
//   { name: 'TypeScript', color: 'bg-blue-600 text-white' },
//   { name: 'Tailwind CSS', color: 'bg-cyan-500 text-white' },
//   { name: 'React', color: 'bg-sky-400 text-white' },
//   { name: 'Node.js', color: 'bg-green-600 text-white' },
//   { name: 'Prisma', color: 'bg-emerald-700 text-white' },
// ];

// const PROJECTS = [
//   {
//     title: '我的个人博客',
//     description: '基于 Next.js 14 和 Tailwind CSS 构建的现代化响应式博客，支持暗色模式和 MDX。',
//     tags: ['Next.js', 'Tailwind', 'MDX'],
//     link: '#',
//     github: '#'
//   },
//   {
//     title: 'AI 助手工具',
//     description: '一个集成多种大模型的聚合工具，支持流式输出和多轮对话管理。',
//     tags: ['React', 'OpenAI', 'API'],
//     link: '#',
//     github: '#'
//   },
//   {
//     title: '开源 UI 组件库',
//     description: '一套轻量级的 React 组件库，专注于极致的交互体验和性能优化。',
//     tags: ['TypeScript', 'Rollup', 'CSS'],
//     link: '#',
//     github: '#'
//   }
// ];

// const RECENT_POSTS = [
//   {
//     title: '如何使用 Next.js 搭建高性能博客',
//     date: '2024-05-20',
//     excerpt: '在这篇文章中，我们将探讨 Next.js 的最新特性，并学习如何优化你的博客加载速度...',
//     category: '技术'
//   },
//   {
//     title: '我的 2023 年度总结',
//     date: '2024-01-01',
//     excerpt: '回望过去的一年，我在技术成长、生活感悟以及开源贡献方面的一些心得体会...',
//     category: '生活'
//   },
//   {
//     title: 'Tailwind CSS 的进阶技巧分享',
//     date: '2023-11-15',
//     excerpt: '不仅仅是类名堆砌，带你领略 Tailwind 强大的配置文件和插件生态系统...',
//     category: '设计'
//   }
// ];

// // --- 页面局部组件 ---

// const Hero = () => (
//   <section className="py-20 md:py-32">
//     <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
//       <div className="flex-1 space-y-6">
//         <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-gray-900 leading-tight">
//           你好，我是 <span className="text-blue-600">土豆</span> 👋
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
//           一名专注于前端开发的软件工程师。我热爱开源，喜欢分享，致力于利用代码创造优雅的用户体验。在这里，我记录我的技术探索和生活点滴。
//         </p>
//         <div className="flex items-center gap-4">
//           <a href="#" className="p-2 text-gray-500 hover:text-blue-600 transition-all border border-gray-200 rounded-lg hover:border-blue-200 bg-white shadow-sm">
//             <Github size={20} />
//           </a>
//           <a href="#" className="p-2 text-gray-500 hover:text-blue-600 transition-all border border-gray-200 rounded-lg hover:border-blue-200 bg-white shadow-sm">
//             <Twitter size={20} />
//           </a>
//           <a href="#" className="p-2 text-gray-500 hover:text-blue-600 transition-all border border-gray-200 rounded-lg hover:border-blue-200 bg-white shadow-sm">
//             <Mail size={20} />
//           </a>
//         </div>
//       </div>
//       <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-lg">
//         <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
//            {/* 这里可以放你的头像图片 */}
//            <div className="text-blue-500 font-bold text-4xl">LOGO</div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// const TechStack = () => (
//   <section className="py-12 bg-gray-50/50 border-y border-gray-100">
//     <div className="container mx-auto px-6">
//       <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-8">
//         <Cpu className="text-blue-500" size={24} /> 技术栈
//       </h2>
//       <div className="flex flex-wrap gap-3">
//         {TECH_STACK.map((tech) => (
//           <span key={tech.name} className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ${tech.color}`}>
//             {tech.name}
//           </span>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// const Projects = () => (
//   <section className="py-20">
//     <div className="container mx-auto px-6">
//       <div className="flex items-center justify-between mb-10">
//         <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
//           <Layers className="text-blue-500" size={24} /> 项目展示
//         </h2>
//         <a href="#" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
//           查看全部 <ChevronRight size={16} />
//         </a>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {PROJECTS.map((project, idx) => (
//           <div key={idx} className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
//             <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//               {project.title}
//             </h3>
//             <p className="mt-4 text-gray-600 text-sm flex-grow">
//               {project.description}
//             </p>
//             <div className="mt-6 flex flex-wrap gap-2">
//               {project.tags.map(tag => (
//                 <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//             <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
//               <a href={project.github} className="text-gray-500 hover:text-black transition-colors">
//                 <Github size={18} />
//               </a>
//               <a href={project.link} className="flex items-center gap-1 text-sm font-medium text-blue-600">
//                 预览 <ExternalLink size={14} />
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// const RecentPosts = () => (
//   <section className="py-20 bg-white">
//     <div className="container mx-auto px-6">
//        <div className="flex items-center justify-between mb-10">
//         <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
//           <BookOpen className="text-blue-500" size={24} /> 最近文章
//         </h2>
//         <a href="#" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
//           阅读更多 <ChevronRight size={16} />
//         </a>
//       </div>
//       <div className="space-y-6">
//         {RECENT_POSTS.map((post, idx) => (
//           <article key={idx} className="group block p-6 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div className="space-y-2">
//                 <div className="flex items-center gap-3">
//                    <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">
//                     {post.category}
//                   </span>
//                   <time className="text-xs text-gray-400 font-medium">{post.date}</time>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                   {post.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm line-clamp-2 max-w-3xl">
//                   {post.excerpt}
//                 </p>
//               </div>
//               <div className="hidden md:block">
//                  <div className="p-3 rounded-full bg-white text-gray-300 group-hover:text-blue-600 group-hover:shadow-md transition-all">
//                    <ChevronRight size={20} />
//                  </div>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default function Home() {
//   return (
//     <div className="bg-white font-sans text-gray-950 antialiased selection:bg-blue-100 selection:text-blue-900">
//       <Hero />
//       <TechStack />
//       <Projects />
//       <RecentPosts />
//     </div>
//   );
// }
"use client";
import React from 'react';
import { 
  Github, 
  Twitter, 
  Mail, 
  ExternalLink, 
  BookOpen, 
  Cpu, 
  Layers,
  ChevronRight
} from 'lucide-react';

// --- 数据配置 ---
const TECH_STACK = [
  { name: 'Next.js', color: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' },
  { name: 'TypeScript', color: 'bg-blue-600 text-white' },
  { name: 'Tailwind CSS', color: 'bg-cyan-500 text-white' },
  { name: 'React', color: 'bg-sky-400 text-white' },
  { name: 'Node.js', color: 'bg-green-600 text-white' },
];

const PROJECTS = [
  {
    title: '我的个人博客',
    description: '基于 Next.js 14 构建的现代化响应式博客，支持暗色模式。',
    tags: ['Next.js', 'Tailwind'],
    link: '#'
  },
  {
    title: 'AI 辅助工具',
    description: '集成大语言模型的生产力工具，支持实时对话。',
    tags: ['OpenAI', 'Next.js'],
    link: '#'
  },
  {
    title: 'UI 设计系统',
    description: '一套基于 Tailwind 的精美组件库。',
    tags: ['Design', 'React'],
    link: '#'
  }
];

// --- 页面区块组件 ---

const Hero = () => (
  <section className="py-20 md:py-32">
    <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <div className="space-y-4">
          <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-widest text-sm uppercase">Welcome to my space</h2>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl text-gray-900 dark:text-white leading-[1.1]">
            构建 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">有温度</span> 的代码
          </h1>
        </div>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
          我是 <span className="text-gray-900 dark:text-white font-bold">KV</span>。一名专注于前端技术的开发者，在这里记录我的成长历程。
        </p>
        <div className="flex items-center justify-center md:justify-start gap-4">
          <button className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg">
            浏览项目
          </button>
          <div className="flex items-center gap-2">
            {[Github, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" className="p-3 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-3xl opacity-10 dark:opacity-30 animate-pulse"></div>
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] rotate-3 bg-gradient-to-br from-blue-600 to-indigo-700 p-1.5 shadow-2xl shadow-blue-500/20">
          <div className="w-full h-full rounded-[2.2rem] bg-white dark:bg-zinc-950 flex items-center justify-center">
             <div className="text-blue-600 dark:text-blue-400 font-black text-6xl text-center">KV</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TechStack = () => (
  <section className="py-12 border-y border-zinc-100 dark:border-zinc-900">
    <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Tech Stack</h3>
            <div className="flex flex-wrap gap-3 justify-center">
                {TECH_STACK.map((tech) => (
                <span key={tech.name} className={`px-5 py-2 rounded-2xl text-sm font-bold transition-colors ${tech.color}`}>
                    {tech.name}
                </span>
                ))}
            </div>
        </div>
    </div>
  </section>
);

const Projects = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">精选项目</h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">通过这些项目了解我的工程实践。</p>
        </div>
        <a href="#" className="group flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 transition-colors">
          全部项目 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <div key={idx} className="group flex flex-col rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="mb-6 w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Layers size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{project.title}</h3>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400 flex-grow leading-relaxed">{project.description}</p>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {project.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold text-zinc-400">{tag}</span>
                ))}
              </div>
              <a href={project.link} className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="pb-20">
      <Hero />
      <TechStack />
      <Projects />
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[4rem] mx-4 mb-20 border border-zinc-100 dark:border-zinc-800">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">开始阅读</h2>
            <p className="text-zinc-500 mb-10">点击上方导航栏的文章查看更多</p>
            <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white animate-bounce">
                <ChevronRight size={24} className="rotate-90" />
            </div>
        </div>
      </section>
    </div>
  );
}