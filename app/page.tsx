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