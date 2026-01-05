import React from 'react';
import { 
  Github, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Layers,
  ChevronRight,
  Link as LinkIcon,
  Users,
  Sparkles
} from 'lucide-react';

/**
 * 💡 重构要点：
 * 1. 使用 text-ui-text 替代 text-gray-900/text-white
 * 2. 使用 bg-ui-surface 替代 bg-white/bg-zinc-900
 * 3. 使用 border-ui-border 替代 border-zinc-200
 * 4. 使用 bg-brand 和 text-brand 替代蓝色的硬编码
 * 5. 使用 p-safe 和 rounded-smooth 统一间距和圆角
 */

// --- 数据配置 ---
const TECH_STACK = [
  { name: 'Next.js', color: 'bg-brand text-white shadow-brand/20 shadow-lg' },
  { name: 'TypeScript', color: 'bg-brand/80 text-white' },
  { name: 'Tailwind v4', color: 'bg-brand/60 text-white' },
  { name: 'React', color: 'bg-brand/40 text-brand font-bold' },
  { name: 'Node.js', color: 'bg-brand/20 text-brand font-bold' },
];

const PROJECTS = [
  {
    title: '我的个人博客',
    description: '基于 Next.js 14 构建的现代化响应式博客，支持一键切换暗色模式。',
    tags: ['Next.js', 'Theme v4'],
    link: '#'
  },
  {
    title: 'AI 辅助工具',
    description: '集成大语言模型的生产力工具，完美适配多种品牌配色方案。',
    tags: ['OpenAI', 'Config'],
    link: '#'
  },
  {
    title: 'UI 设计系统',
    description: '一套基于 CSS 变量驱动的精美组件库。',
    tags: ['Design', 'Atomic'],
    link: '#'
  }
];

const FRIEND_LINKS = [
  { name: "愧怍", url: "https://kuizuo.cn", description: "人生漫漫，只想留下一路足迹。", avatar: "K" },
  { name: "示例友链", url: "#", description: "优秀的博客示例，欢迎互换友链。", avatar: "E" },
  { name: "技术交流", url: "#", description: "记录技术感悟，分享生活点滴。", avatar: "T" }
];

// --- 页面区块组件 ---

const Hero = () => (
  <section className="py-20 md:py-32">
    <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <div className="space-y-4">
          <h2 className="text-brand font-bold tracking-widest text-sm uppercase flex items-center justify-center md:justify-start gap-2">
            <Sparkles size={16} /> Welcome to my space
          </h2>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl text-ui-text leading-[1.1]">
            构建 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">有温度</span> 的代码
          </h1>
        </div>
        <p className="text-xl text-ui-text opacity-70 max-w-2xl mx-auto md:mx-0 leading-relaxed">
          我是 <span className="text-brand font-black underline decoration-brand/30 underline-offset-8">土豆</span>。一名专注于前端技术的开发者，在这里记录我的成长历程。
        </p>
        <div className="flex items-center justify-center md:justify-start gap-4">
          <button className="px-8 py-4 bg-brand hover:bg-brand-dark text-white rounded-smooth font-bold hover:scale-105 transition-all shadow-lg shadow-brand/20">
            浏览项目
          </button>
          <div className="flex items-center gap-2">
            {[Github, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" className="p-3 text-ui-text opacity-50 hover:opacity-100 hover:text-brand transition-all border border-ui-border rounded-smooth bg-ui-surface">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute -inset-4 bg-brand rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-brand to-brand-dark p-1 shadow-brand">
          <div className="w-full h-full rounded-full bg-ui-surface flex items-center justify-center overflow-hidden">
            <div className="text-brand font-black text-6xl">KV</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TechStack = () => (
  <section className="py-12 border-y border-ui-border bg-ui-surface/50 backdrop-blur-sm">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Tech Stack</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {TECH_STACK.map((tech) => (
            <span key={tech.name} className={`px-5 py-2 rounded-full text-sm font-bold transition-all hover:-translate-y-1 ${tech.color}`}>
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
          <h2 className="text-3xl font-bold text-ui-text mb-4">精选项目</h2>
          <p className="text-ui-text opacity-60 font-medium text-lg">通过这些项目了解我的工程实践。</p>
        </div>
        <a href="#" className="group flex items-center gap-2 font-bold text-brand transition-colors">
          全部项目 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <div key={idx} className="group flex flex-col rounded-smooth border border-ui-border bg-ui-surface p-safe shadow-sm hover:shadow-brand hover:-translate-y-2 transition-all duration-300">
            <div className="mb-6 w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
              <Layers size={24} />
            </div>
            <h3 className="text-2xl font-bold text-ui-text group-hover:text-brand transition-colors">{project.title}</h3>
            <p className="mt-4 text-ui-text opacity-60 flex-grow leading-relaxed">{project.description}</p>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-brand/5 rounded-lg text-xs font-bold text-brand">{tag}</span>
                ))}
              </div>
              <a href={project.link} className="p-2 rounded-full hover:bg-brand/10 text-brand transition-colors">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FriendLinks = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold text-ui-text mb-4">
            <Users className="text-brand" size={32} /> 友情链接
          </h2>
          <p className="text-ui-text opacity-60 font-medium text-lg">
            与优秀的人并肩而行，记录值得被发现的角落。
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FRIEND_LINKS.map((friend, idx) => (
          <a 
            key={idx} 
            href={friend.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-smooth border border-ui-border bg-ui-surface hover:bg-brand/5 hover:border-brand/30 transition-all duration-300"
          >
            <div className="w-14 h-14 shrink-0 rounded-full bg-brand text-white flex items-center justify-center text-xl font-black group-hover:scale-110 transition-transform">
              {friend.avatar}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-ui-text group-hover:text-brand transition-colors truncate">
                {friend.name}
              </h3>
              <p className="text-sm text-ui-text opacity-50 truncate">
                {friend.description}
              </p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <LinkIcon size={16} className="text-brand/50" />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="bg-ui-surface min-h-screen transition-colors duration-500">
      <Hero />
      <TechStack />
      <Projects />
      <FriendLinks />

      <section className="py-24 px-6">
        <div className="container mx-auto bg-brand/5 rounded-smooth p-12 border border-brand/10 text-center">
          <h2 className="text-3xl font-bold text-ui-text mb-4">准备好开启新篇章了吗？</h2>
          <p className="text-ui-text opacity-60 mb-10 max-w-md mx-auto">
            订阅我的周刊，第一时间获取前端技术动向和生活感悟。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="px-6 py-3 bg-ui-surface border border-ui-border rounded-smooth outline-none focus:ring-2 ring-brand transition-all"
            />
            <button className="bg-brand text-white px-8 py-3 rounded-smooth font-bold hover:bg-brand-dark transition-colors">
              立即订阅
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-ui-text opacity-40 text-sm">
        <p>© 2026KV Studio. Built with Tailwind CSS v4 Theme System.</p>
      </footer>
    </div>
  );
}