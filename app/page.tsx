'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Layers,
  ChevronRight,
  Link as LinkIcon,
  Users,
  Sparkles,
  Zap,
  Layout,
  Globe,
  MessageCircle,
  Coffee,
  Command,
  Calendar,
  Mail,
  MapPin
} from 'lucide-react';
import { ZdogBackground } from '@/components/ZdogBackground';


const PROJECTS = [
  {
    title: '我的个人博客',
    description: '基于 Next.js 14 构建的现代化响应式博客，采用增强型琥珀主题配置，确保多端阅读清晰。',
    tags: ['Next.js', 'High Contrast'],
    link: '#'
  },
  {
    title: '开源组件库',
    description: '一套轻量级、高性能的 React 组件库，专为开发者打造，开箱即用。',
    tags: ['React', 'TypeScript'],
    link: '#'
  },
  {
    title: 'AI 辅助工具',
    description: '基于 LLM 的智能代码助手，提升开发效率，减少重复劳动。',
    tags: ['AI', 'Productivity'],
    link: '#'
  },
];

const FRIENDS = [
  { name: 'Next.js', url: 'https://nextjs.org', description: 'React 框架' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com', description: '原子化 CSS' },
  { name: 'Vercel', url: 'https://vercel.com', description: '部署平台' },
  { name: 'Supabase', url: 'https://supabase.com', description: '后端服务' },
  { name: 'TypeScript', url: 'https://typescriptlang.org', description: '类型安全' },
  { name: 'Radix UI', url: 'https://radix-ui.com', description: '无头组件' },
];

/**
 * HeroVariant 组件 - 适配 Tailwind CSS v4 与 Nordic Slate 主题
 * 包含：Zdog 3D 角色效果
 */
// const HeroVariant = () => {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
//     checkTheme();
//     const obs = new MutationObserver(checkTheme);
//     obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <section className="relative w-full h-[45vh] flex items-center justify-center overflow-hidden">
//       {/* Zdog 3D 角色背景 */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <ZdogBackground isDark={isDark} />
//       </div>
//       {/* 蒙版 */}
//       <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-95" />
//       {/* UI 引导层 */}
//       <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-12 lg:p-24">
//         <div className="flex justify-center">
//         </div>

//         <div className="flex flex-col md:flex-row items-end justify-between gap-12 animate-reveal">
//           <div className="flex flex-col gap-2 pointer-events-auto text-left opacity-60 hover:opacity-100 transition-opacity">
//                <span className="text-[10px] font-black uppercase tracking-widest text-ui-text-muted mb-2">Connect</span>
//                <div className="flex gap-5">
//                  <a href="#" className="text-ui-text-muted hover:text-brand transition-all font-black uppercase text-xs tracking-widest">Git</a>
//                  <a href="#" className="text-ui-text-muted hover:text-brand transition-all font-black uppercase text-xs tracking-widest">Twi</a>
//                  <a href="#" className="text-ui-text-muted hover:text-brand transition-all font-black uppercase text-xs tracking-widest">Mail</a>
//                </div>
//             </div>

//             <div className="flex flex-col items-end pointer-events-auto text-right bg-ui-surface/20 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl max-w-xs transition-all hover:-translate-y-2 duration-700 group">
//               <div className="flex items-center gap-4 text-ui-text font-black text-2xl mb-2 tracking-tighter uppercase group-hover:text-brand transition-colors">
//                 <MapPin size={22} className="text-brand" />
//                 CQ · CHN
//               </div>
//               <div className="h-1 w-24 bg-brand rounded-full mb-4"></div>
//               <p className="text-[9px] text-ui-text-muted font-black leading-relaxed opacity-60 uppercase tracking-[0.2em]">
//                 记录想法，也记录成长<br/>
//                 保持克制，持续输出
//               </p>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// };
const HeroVariant = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const obs = new MutationObserver(checkTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
      {/* 1. 背景大型装饰文字 (让空间不再空旷) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black text-ui-text/[0.03] uppercase tracking-tighter leading-none italic">
          Potato
        </span>
      </div>

      {/* 2. Zdog 3D 角色背景 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ZdogBackground isDark={isDark} />
      </div>
      
      {/* 3. 渐变蒙版 */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-90" />

      {/* 4. UI 交互/引导层 (HUD 风格布局) */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
        
        {/* --- Top Row: 品牌与状态 --- */}
        <div className="flex justify-between items-start animate-reveal" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col gap-1 pointer-events-auto">
             <div className="flex items-center gap-2 text-brand font-black italic tracking-tighter text-xl">
               <Zap size={20} fill="currentColor" />
               Just Potato
             </div>
             <div className="text-[10px] text-ui-text-muted font-bold tracking-[0.3em] uppercase opacity-50">
               换脑洞 · 不换行
             </div>
          </div>

          <div className="hidden md:flex flex-col items-end gap-1 text-[10px] font-bold text-ui-text-muted opacity-60">
            <span>VER: 2026.1.13</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
              STATUS: EXPLORING 3D SPACE
            </div>
          </div>
        </div>

        {/* --- Middle: 如果你觉得中心还是空，可以在这里加个微型指示器 --- */}

        {/* --- Bottom Row: 连接与卡片 --- */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 animate-reveal" style={{ animationDelay: '0.5s' }}>
          
          {/* 左下：连接社交媒体 */}
          <div className="flex flex-col gap-4 pointer-events-auto text-left group">
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand mb-1">保持 联系</span>
               <div className="flex gap-6">
                 {['GitHub', '掘金', '邮箱'].map((platform) => (
                   <a key={platform} href="#" className="text-ui-text hover:text-brand transition-all font-black uppercase text-xs tracking-widest relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand hover:after:w-full after:transition-all">
                     {platform}
                   </a>
                 ))}
               </div>
            </div>
            <div className="w-32 h-px bg-ui-border/50 group-hover:w-48 transition-all duration-700"></div>
          </div>

          {/* 右下：身份卡片 */}
          <div className="flex flex-col items-end pointer-events-auto text-right bg-ui-surface/40 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] border border-ui-border shadow-2xl max-w-[280px] transition-all hover:-translate-y-2 duration-700 group">
            <div className="flex items-center gap-3 text-ui-text font-black text-2xl mb-1 tracking-tighter uppercase group-hover:text-brand transition-colors">
              <MapPin size={22} className="text-brand" />
              CQ · CHN
            </div>
            
            <div className="text-[11px] text-ui-text font-bold mb-4 flex items-center gap-2 opacity-80">
               <span className="w-8 h-[2px] bg-brand/30"></span>
               POTATO DESIGNER
            </div>
            
            <p className="text-[12px] text-ui-text-muted font-medium leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
              "记录想法，也记录成长。<br/>
              保持克制，持续输出。"
            </p>
            
            <div className="mt-4 flex gap-1 self-start">
               <div className="w-1 h-1 bg-brand rounded-full"></div>
               <div className="w-1 h-1 bg-brand/40 rounded-full"></div>
               <div className="w-1 h-1 bg-brand/10 rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
const CalendarSection = () => {
  const [calendarData, setCalendarData] = useState<Array<{ date: string; count: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const data = [];
    const today = new Date();
    const weights = [0, 0, 0, 0, 1, 1, 2, 3, 4];
    
    for (let i = 370; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      data.push({
        date: dateStr,
        count: weights[Math.floor(Math.random() * weights.length)],
      });
    }
    
    setCalendarData(data);
    setIsMounted(true);
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getLevelColor = (count: number | undefined) => {
    if (count === 0) return 'bg-ui-border/30';
    if (count === 1) return 'bg-brand/20';
    if (count === 2) return 'bg-brand/45';
    if (count === 3) return 'bg-brand/70';
    return 'bg-brand';
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mx-auto px-6 lg:px-30 py-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* 日历卡片 */}
        <div className="lg:col-span-12">
          <div className="bg-ui-surface border border-ui-border rounded-smooth p-5 shadow-brand transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-ui-text flex items-center gap-2">
                <Calendar size={16} className="text-brand" />
                过去365天我干啥了？
              </h3>
              <div className="hidden sm:flex items-center gap-2 text-[9px] text-ui-text-muted bg-ui-border/20 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
                Active for 365 days
              </div>
            </div>

            {/* 日历展示区 */}
            <div className="relative flex-1 flex flex-col justify-center min-h-0">
              {/* 月份标注 - 简单平均分布 */}
              <div className="flex text-[8px] text-ui-text-muted mb-1 ml-1 justify-between pr-4">
                {months.map(m => <span key={m}>{m}</span>)}
              </div>

              {/* 滚动容器 */}
              <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-ui-border scrollbar-track-transparent">
                <div className="inline-grid grid-flow-col grid-rows-7 gap-1 min-w-max pr-2">
                  {calendarData.map((item, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-[1px] transition-all hover:ring-1 hover:ring-brand hover:scale-110 cursor-help ${getLevelColor(item.count)}`}
                      title={`${item.date}: ${item.count === 0 ? 'No' : item.count} articles updated`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-2 border-t border-ui-border/40">
              <span className="text-[10px] text-ui-text-muted italic">
                {calendarData.reduce((acc, curr) => acc + curr.count, 0)} updates in the past year
              </span>
              <div className="flex items-center gap-1 text-[8px] text-ui-text-muted uppercase font-medium">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map(l => (
                  <div key={l} className={`w-2.5 h-2.5 rounded-[1px] ${getLevelColor(l)}`}></div>
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-ui-text tracking-tight">精选工程实践</h2>
          <p className="text-ui-text-muted font-medium text-lg">专注性能与可访问性的实际案例。</p>
        </div>
        <a href="#" className="group flex items-center gap-2 font-bold text-brand hover:underline underline-offset-4 decoration-2 transition-all">
          查看全部作品 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {PROJECTS.map((project, idx) => (
          <div key={idx} className="group flex flex-col rounded-smooth border-2 border-ui-border bg-ui-surface p-8 shadow-sm hover:shadow-brand hover:-translate-y-2 transition-all duration-300">
            <div className="mb-8 w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand shadow-inner">
              <Layers size={28} />
            </div>
            <h3 className="text-2xl font-black text-ui-text group-hover:text-brand transition-colors tracking-tight">{project.title}</h3>
            <p className="mt-4 text-ui-text-muted flex-grow leading-relaxed font-medium">{project.description}</p>
            <div className="mt-10 flex items-center justify-between border-t border-ui-border pt-6">
              <div className="flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-ui-text text-ui-surface rounded-lg text-[10px] font-black uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <a href={project.link} className="p-3 rounded-full bg-brand/5 hover:bg-brand hover:text-ui-surface text-brand transition-all">
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
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-ui-text tracking-tight">友情链接</h2>
          <p className="text-ui-text-muted font-medium text-lg">与优秀的人同行。</p>
        </div>
        <a href="#" className="group flex items-center gap-2 font-bold text-brand hover:underline underline-offset-4 decoration-2 transition-all">
          申请友链 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {FRIENDS.map((friend, idx) => (
          <a
            key={idx}
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-6 rounded-smooth border-2 border-ui-border bg-ui-surface hover:border-brand hover:shadow-brand transition-all duration-300"
          >
            <Users size={32} className="text-ui-text-muted group-hover:text-brand mb-3 transition-colors" />
            <span className="font-bold text-ui-text group-hover:text-brand transition-colors text-sm">{friend.name}</span>
            <span className="text-xs text-ui-text-muted mt-1">{friend.description}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="bg-ui-surface min-h-screen transition-colors duration-500 pb-20">
      <HeroVariant />
      <CalendarSection />
      <Projects />
      <FriendLinks />

     {/* 💡 这里是替换后的新区块：联系与合作 (Connect Section) */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="rounded-smooth border border-ui-border bg-ui-surface p-12 text-center shadow-brand">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-bold mb-6">
              <Zap size={14} className="fill-brand" /> 
              Currently open for new opportunities
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-ui-text mb-6 tracking-tight leading-tight">
              让我们建立 <span className="text-brand">有价值</span> 的连接
            </h2>
            
            <p className="text-lg text-ui-text-muted mb-12 max-w-xl mx-auto leading-relaxed font-medium">
              无论你是有项目想找我合作，还是只想聊聊技术、产品或者分享生活，
              我的收件箱永远为你敞开。保持联系，一起构建更美好的数字空间。
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:potato@example.com" 
                className="px-8 py-4 bg-brand text-white rounded-smooth font-bold hover:bg-brand-dark transition-all flex items-center gap-2 shadow-lg shadow-brand/20 active:scale-95"
              >
                <Mail size={20} /> 发送邮件
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                className="px-8 py-4 border border-ui-border text-ui-text font-bold rounded-smooth hover:bg-brand/5 transition-all flex items-center gap-2"
              >
                <MessageCircle size={20} className="text-brand" /> 在 Twitter 聊聊
              </a>
              <button className="px-8 py-4 border border-ui-border text-ui-text font-bold rounded-smooth hover:bg-brand/5 transition-all flex items-center gap-2">
                <Coffee size={20} className="text-brand" /> 请我喝咖啡
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: fadeInUp 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .bg-radial-vignette {
          background: radial-gradient(circle at center, transparent 0%, var(--ui-surface) 100%);
        }
        canvas {
          touch-action: none;
        }
      `}</style>

      <footer className="py-8 text-center text-ui-text-muted font-bold text-xs tracking-widest uppercase">
        <p>© 2026 KV Studio. Designed for clarity & warmth.</p>
      </footer>
    </div>
  );
}
