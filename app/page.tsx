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
  Mail
} from 'lucide-react';
import { NeuralNetwork } from '@/components/NeuralNetwork';


const PROJECTS = [
  {
    title: '我的个人博客',
    description: '基于 Next.js 14 构建的现代化响应式博客，采用增强型琥珀主题配置，确保多端阅读清晰。',
    tags: ['Next.js', 'High Contrast'],
    link: '#'
  },
  {
    title: 'AI 辅助工具',
    description: '集成大语言模型的生产力工具，通过语义化变量实现极致的视觉一致性。',
    tags: ['OpenAI', 'Config'],
    link: '#'
  },
  {
    title: 'UI 设计系统',
    description: '一套基于 CSS 变量驱动的精美组件库，专注于可访问性和高对比度设计。',
    tags: ['Design', 'UX'],
    link: '#'
  }
];

const FRIEND_LINKS = [
  { name: "愧怍", url: "https://kuizuo.cn", description: "人生漫漫，只想留下一路足迹。", avatar: "K" },
  { name: "示例友链", url: "#", description: "优秀的博客示例，欢迎互换友链。", avatar: "E" },
  { name: "技术交流", url: "#", description: "记录技术感悟，分享生活点滴。", avatar: "T" }
];

/**
 * HeroVariant 组件 - 适配 Tailwind CSS v4 与 Nordic Slate 主题
 * 包含：Neural Network 效果、个人名片、365天更新日历
 */
const HeroVariant = () => {
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

  // 根据 count 获取颜色等级
  const getLevelColor = (count: number | undefined) => {
    if (count === 0) return 'bg-ui-border/30';
    if (count === 1) return 'bg-brand/20';
    if (count === 2) return 'bg-brand/45';
    if (count === 3) return 'bg-brand/70';
    return 'bg-brand';
  };

  if (!isMounted) {
    return (
      <section className="flex flex-col">
        <NeuralNetwork />
        <div className="mx-auto px-6 lg:px-30 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-12">
              <div className="bg-ui-surface border border-ui-border rounded-smooth p-5 shadow-brand">
                <div className="animate-pulse">
                  <div className="h-4 bg-ui-border/30 rounded mb-4"></div>
                  <div className="h-32 bg-ui-border/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col">
      {/* 顶部：Neural Network 效果（包含个人名片） */}
      <NeuralNetwork />

      {/* 下方：日历卡片单独一排 */}
      <div className="mx-auto px-6 lg:px-30 py-6">
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
    </section>
  );
}

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
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-black text-ui-text mb-4 tracking-tight">
            <Users className="text-brand" size={32} /> 友情链接
          </h2>
          <p className="text-ui-text-muted font-medium text-lg">
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
            className="group flex items-center gap-4 p-6 rounded-smooth border-2 border-ui-border bg-ui-surface hover:bg-brand/5 hover:border-brand/40 transition-all duration-300 shadow-sm"
          >
            <div className="w-14 h-14 shrink-0 rounded-full bg-brand text-ui-surface flex items-center justify-center text-xl font-black group-hover:rotate-12 transition-transform shadow-brand-sm">
              {friend.avatar}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-ui-text group-hover:text-brand transition-colors truncate">
                {friend.name}
              </h3>
              <p className="text-sm text-ui-text-muted truncate font-medium">
                {friend.description}
              </p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <LinkIcon size={16} className="text-brand" />
            </div>
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

      <footer className="py-8 text-center text-ui-text-muted font-bold text-xs tracking-widest uppercase">
        <p>© 2026 KV Studio. Designed for clarity & warmth.</p>
      </footer>
    </div>
  );
}