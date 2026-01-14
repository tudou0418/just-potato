'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Github, Terminal, Activity, GitBranch, 
  Monitor, Smartphone, Zap, ExternalLink, Code2, 
  Cpu, Layers, Calendar, Globe, Rocket,
  ChevronRight, ArrowRight, CheckCircle2,
  Gauge, ShieldCheck, ChevronDown, MousePointer2, FileCode,
  Download, Play, BookOpen, Share2, Copy
} from 'lucide-react';

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState<'WEB' | 'APP'>('WEB'); 
  const [selectedProjectId, setSelectedProjectId] = useState('NR');
  const [isDark, setIsDark] = useState(true);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const projects = useMemo(() => [
    { 
      id: 'NR', 
      title: "Nordic Reader", 
      tagline: "重新定义阅读的深度。",
      type: "WEB",
      tags: ["Rust", "Wasm", "Tailwind"], 
      version: "v1.2.0", 
      description: "高性能沉浸式排版引擎。通过 Rust 编译为 Wasm 驱动，在边缘侧实现毫秒级的排版计算与渲染优化。",
      sections: [
        {
          title: "极简，即是巅峰。",
          desc: "放弃传统的 DOM 渲染，我们直接在 Wasm 内存中操作字符，让每一行文字的韵律都达到印刷级精准。",
          image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600&auto=format&fit=crop",
          dark: true
        },
        {
          title: "Rust 强力驱动。",
          desc: "基于内存安全特性的 Rust 核心，确保在处理万亿级字符流时依然稳如磐石，零卡顿，零崩溃。",
          image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
          dark: false
        }
      ],
      metrics: [
        { label: "延迟", value: "0.12ms", icon: <Zap size={20}/> },
        { label: "帧率", value: "120FPS", icon: <Activity size={20}/> },
        { label: "体积", value: "42KB", icon: <Layers size={20}/> }
      ]
    },
    { 
      id: 'SS', 
      title: "Slate UI Core", 
      tagline: "秩序，源于克制。",
      type: "WEB",
      tags: ["TypeScript", "Radix", "PostCSS"], 
      version: "v0.8.5", 
      description: "一套专为文档阅读而生的设计协议。定义了极致的阅读深度与间距秩序。",
      sections: [
        {
          title: "光影的几何学。",
          desc: "每一像素的留白都经过数学推导。我们拒绝无意义的装饰，只保留最纯粹的层级逻辑。",
          image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop",
          dark: true
        }
      ],
      metrics: [
        { label: "标准", value: "A11y", icon: <ShieldCheck size={20}/> },
        { label: "组件", value: "42+", icon: <Code2 size={20}/> },
        { label: "大小", value: "12KB", icon: <Layers size={20}/> }
      ]
    },
    { 
      id: 'AW', 
      title: "Arctic Engine", 
      tagline: "分布式算力的极点。",
      type: "WEB",
      tags: ["Go", "gRPC", "Redis"], 
      version: "v3.4.1", 
      description: "在高并发的极地科研环境下，Arctic Engine 实现了毫秒级的数据强一致性分发。",
      sections: [
        {
          title: "跨越地平线的同步。",
          desc: "在高并发的极地科研环境下，Arctic Engine 实现了毫秒级的数据强一致性分发。",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
          dark: true
        }
      ],
      metrics: [
        { label: "并发", value: "100K", icon: <Cpu size={20}/> },
        { label: "节点", value: "Global", icon: <Globe size={20}/> },
        { label: "延迟", value: "<15ms", icon: <Gauge size={20}/> }
      ]
    },
    { 
      id: 'TM', 
      title: "Tundra Mobile", 
      tagline: "极端环境下的生存交互。",
      type: "APP",
      tags: ["Flutter", "Dart", "SQLite"], 
      version: "v2.0.4", 
      description: "专为戴手套操作优化的巨型触控区域与高对比度视觉反馈，确保生命线永不断裂。",
      sections: [
        {
          title: "冰点下的触控。",
          desc: "专为戴手套操作优化的巨型触控区域与高对比度视觉反馈，确保生命线永不断裂。",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop",
          dark: true
        }
      ],
      metrics: [
        { label: "响应", value: "Instant", icon: <Zap size={20}/> },
        { label: "离线", value: "100%", icon: <Layers size={20}/> },
        { label: "能耗", value: "UltraLow", icon: <Zap size={20}/> }
      ]
    }
  ], []);

  const currentProjectList = useMemo(() => 
    projects.filter(p => p.type === activeCategory), 
  [activeCategory, projects]);

  const currentProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId) || projects[0], 
  [selectedProjectId, projects]);

  useEffect(() => {
    if (currentProjectList.length > 0) {
      setSelectedProjectId(currentProjectList[0].id);
    }
  }, [activeCategory, currentProjectList]);

  if (booting) {
    return (
      <div className="h-screen w-screen bg-ui-surface flex items-center justify-center font-mono text-brand">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="tracking-[0.5em] text-[10px] uppercase opacity-50 italic">System_Init</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ui-surface transition-colors duration-500 overflow-hidden">
      <style>{`
        .glass-dock {
          background: rgba(var(--ui-bg-rgb), 0.2);
          backdrop-filter: blur(30px);
          border: 1px solid var(--ui-border);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .text-integrated {
          text-shadow: 0 4px 40px rgba(0, 0, 0, 0.6);
        }
        .snap-container {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100vh;
        }
        .snap-section {
          scroll-snap-align: start;
          height: 100vh;
          position: relative;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        .project-transition {
          animation: projectFade 0.8s cubic-bezier(0.2, 1, 0.2, 1);
        }
        @keyframes projectFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        button, a, [role="button"] {
          cursor: pointer;
        }
      `}</style>

      <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-6">
        <div className="glass-dock p-4 rounded-[2.5rem] flex flex-col gap-5 min-w-[240px]">
          <div className="flex p-1.5 bg-brand/5 dark:bg-brand/10 rounded-full border border-brand/20 relative">
            {['WEB', 'APP'].map(t => (
              <button
                key={t}
                onClick={() => setActiveCategory(t as 'WEB' | 'APP')}
                className={`flex-1 py-3 px-8 rounded-full text-sm font-bold tracking-widest transition-all relative z-10 ${activeCategory === t ? 'text-white' : 'text-ui-text opacity-60 hover:opacity-100'}`}
              >
                {t}
              </button>
            ))}
            <div 
              className="absolute top-1.5 bottom-1.5 left-1.5 bg-brand rounded-full transition-all duration-300 ease-out z-0 shadow-lg shadow-brand/20"
              style={{ 
                width: 'calc(50% - 6px)',
                transform: `translateX(${activeCategory === 'APP' ? '100%' : '0%'})` 
              }}
            />
          </div>

          <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto no-scrollbar py-3 px-2">
            {currentProjectList.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between transition-all group relative border ${selectedProjectId === p.id ? 'bg-brand border-brand text-white shadow-lg shadow-brand/20' : 'border-transparent hover:bg-brand/5 text-ui-text opacity-60 hover:opacity-100'}`}
              >
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-sm font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    {p.title}
                  </span>
                  <span className={`text-xs font-bold opacity-50 uppercase tracking-widest transition-opacity ${selectedProjectId === p.id ? 'block' : 'hidden group-hover:block'}`}>
                    {p.id} // {p.version}
                  </span>
                </div>
                <ChevronRight size={16} className={`shrink-0 transition-transform ${selectedProjectId === p.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => setIsDark(!isDark)}
          className="glass-dock w-16 h-16 rounded-[2rem] flex items-center justify-center text-ui-text hover:border-brand transition-all shadow-xl self-start ml-2"
        >
          {isDark ? <Zap size={22} className="text-brand" /> : <Zap size={22} />}
        </button>
      </aside>

      <main className="snap-container no-scrollbar">
        <div key={currentProject.id} className="project-transition">
          <section className="snap-section flex flex-col items-center justify-center text-center px-6 overflow-hidden">
            <img 
              src={currentProject.sections[0].image} 
              className="absolute inset-0 w-full h-full object-cover scale-105" 
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
            
            <div className="relative z-10 space-y-6 max-w-6xl">
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-ui-border/20 bg-brand/5 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.5em]">
                <Rocket size={14} className="text-brand" /> {currentProject.version} Final Release
              </div>
              <h1 className="text-8xl md:text-[11rem] font-black tracking-tighter uppercase leading-none text-white text-integrated italic select-none">
                {currentProject.title}
              </h1>
              <p className="text-xl md:text-3xl font-bold text-white/80 uppercase tracking-[0.2em] text-integrated">
                {currentProject.tagline}
              </p>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/40">
               <ChevronDown size={32} strokeWidth={3} />
            </div>
          </section>

          {currentProject.sections.map((section, idx) => (
            <section key={idx} className="snap-section flex items-center px-16 md:px-48 overflow-hidden">
              <img 
                src={section.image} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.1]" 
                alt="Feature"
              />
              <div className={`absolute inset-0 ${section.dark ? 'bg-black/70' : 'bg-white/50'}`} />
              
              <div className={`relative z-10 max-w-3xl space-y-10 ${section.dark ? 'text-white' : 'text-black'}`}>
                <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] italic">
                  {section.title}
                </h2>
                <p className="text-xl md:text-3xl font-medium leading-relaxed opacity-90 border-l-8 border-brand pl-10">
                  {section.desc}
                </p>
              </div>              
              
              <div className="absolute right-48 top-1/2 -translate-y-1/2 hidden xl:block opacity-[0.05] pointer-events-none">
                <span className="text-[25rem] font-black italic tracking-tighter leading-none select-none">
                  0{idx + 1}
                </span>
              </div>
            </section>
          ))}

          <section className="snap-section flex flex-col items-center justify-center bg-ui-surface px-10">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-10">
               {currentProject.metrics.map((m, i) => (
                 <div key={i} className="group p-14 rounded-[3rem] border border-ui-border bg-ui-surface shadow-2xl hover:border-brand transition-all duration-500 hover:-translate-y-2">
                    <div className="w-20 h-20 rounded-3xl bg-brand/10 text-brand flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner">
                       {m.icon}
                    </div>
                    <h4 className="text-6xl font-black tracking-tighter italic mb-4 uppercase">{m.value}</h4>
                    <p className="text-xs font-bold text-ui-text opacity-40 uppercase tracking-[0.4em]">{m.label} Performance</p>
                 </div>
               ))}
            </div>

            <div className="mt-28 flex flex-col md:flex-row gap-10 w-full max-w-3xl">
               <button className="flex-1 py-7 bg-brand text-white rounded-[2rem] font-bold text-xs uppercase tracking-[0.5em] hover:scale-105 hover:shadow-2xl hover:shadow-brand/40 transition-all flex items-center justify-center gap-4">
                 <Terminal size={20} /> Deploy_Instance
               </button>
               <button className="flex-1 py-7 border-2 border-ui-border rounded-[2rem] font-bold text-xs uppercase tracking-[0.5em] hover:bg-ui-text hover:text-ui-surface transition-all flex items-center justify-center gap-4 group">
                 <Github size={20} className="group-hover:rotate-12 transition-transform" /> Fetch_Repository
               </button>
            </div>
            
            <footer className="absolute bottom-12 w-full px-16 flex justify-between items-center text-[10px] font-black text-ui-text opacity-30 uppercase tracking-[0.6em]">
               <div className="flex items-center gap-4">
                 <Layers size={14} />
                 <span>System // All Protocols Encrypted</span>
               </div>
               <div className="flex gap-12">
                 <span className="hover:text-brand cursor-pointer transition-colors">Documentation</span>
                 <span className="hover:text-brand cursor-pointer transition-colors">Terminal_Access</span>
               </div>
            </footer>
          </section>
        </div>
      </main>

      <div className="fixed bottom-10 right-10 z-[110] flex items-center gap-3 px-5 py-2 glass-dock rounded-full text-[9px] font-bold tracking-widest opacity-50">
        <MousePointer2 size={12} className="text-brand" />
        SCROLL TO EXPLORE_
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] glass-dock p-4 rounded-[2.5rem] flex items-center gap-3">
        <button className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-brand/20 bg-brand/5 hover:bg-brand/20 hover:border-brand/50 text-ui-text hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-brand/30">
          <Play size={16} className="transition-transform duration-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider">预览</span>
        </button>
        
        <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-brand/50 bg-brand hover:bg-brand/90 text-white shadow-xl shadow-brand/30 hover:shadow-brand/60 hover:border-brand transition-all duration-300 hover:-translate-y-1">
          <Download size={24} className="transition-transform duration-300" />
          <span className="text-sm font-black uppercase tracking-wider">下载</span>
        </button>
        
        <button className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-brand/20 bg-brand/5 hover:bg-brand/20 hover:border-brand/50 text-ui-text hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-brand/30">
          <BookOpen size={16} className="transition-transform duration-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider">文档</span>
        </button>
        
        <div className="w-px h-8 bg-ui-border/30 mx-1" />
        
        <button className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-brand/20 bg-brand/5 hover:bg-brand/20 hover:border-brand/50 text-ui-text hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-brand/30">
          <Share2 size={16} className="transition-transform duration-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider">分享</span>
        </button>
        
        <button className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-brand/20 bg-brand/5 hover:bg-brand/20 hover:border-brand/50 text-ui-text hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-brand/30">
          <Copy size={16} className="transition-transform duration-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider">复制链接</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectsPage;
