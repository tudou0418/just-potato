// import React from 'react';
import React, { useMemo } from 'react';
import { 
  Github, 
  Twitter, 
  Mail, 
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
  Command,MapPin,BookOpen,MessageSquare,Hash,Calendar
} from 'lucide-react';

/**
 * 💡 亮色模式清晰度优化：
 * 1. 使用 text-ui-text-muted 替代 opacity-60，提升对比度。
 * 2. 给 TechStack 增加了不同的配色方案，避免单调。
 * 3. 增强了 border-ui-border 的可见度。
 */

// --- 增强型数据配置 ---
const TECH_STACK = [
  { 
    name: 'Next.js', 
    icon: <Globe size={14} />,
    colorClass: 'bg-ui-text text-ui-surface shadow-md shadow-ui-text/10' 
  },
  { 
    name: 'TypeScript', 
    icon: <Zap size={14} />,
    colorClass: 'bg-brand text-ui-surface shadow-md shadow-brand/20' 
  },
  { 
    name: 'Tailwind v4', 
    icon: <Layout size={14} />,
    colorClass: 'border-2 border-brand text-brand bg-ui-surface' 
  },
  { 
    name: 'React', 
    icon: <Sparkles size={14} />,
    colorClass: 'bg-brand/10 text-brand border border-brand/20' 
  },
  { 
    name: 'Node.js', 
    icon: <Layers size={14} />,
    colorClass: 'bg-ui-text-muted/10 text-ui-text-muted border border-ui-text-muted/20' 
  },
];

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

// --- 页面区块组件 ---

// const HeroVariant = () => {
//   // 模拟热力图数据：52周 * 7天
//   const weeks = 28; // 展示最近28周
//   const days = 7;
//   const heatmapData = Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 5));
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

//   return (
//     <section className="relative min-h-screen pt-24 pb-16 bg-ui-surface transition-colors duration-500 overflow-hidden">
//       {/* 背景微弱网格装饰 */}
//       <div className="absolute inset-0 opacity-[0.3] pointer-events-none bg-[radial-gradient(var(--color-ui-border)_1px,transparent_1px)] [background-size:32px_32px]" />

//       <div className="container mx-auto relative z-10 max-w-7xl">
//         <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
//           {/* --- 左侧：个人 Profile (约 1/3 宽度) --- */}
//           <div className="w-full lg:w-[350px] shrink-0 space-y-8">
//             {/* 头像区 */}
//             <div className="relative group">
//               <div className="w-48 h-48 rounded-[2.5rem] bg-ui-border p-1 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
//                 <div className="w-full h-full rounded-[2.2rem] bg-ui-surface overflow-hidden border-4 border-ui-surface flex items-center justify-center">
//                   {/* 用户头像占位 */}
//                   <div className="text-brand font-black text-5xl tracking-tighter">POTATO</div>
//                 </div>
//               </div>
//               {/* 在线状态 */}
//               <div className="absolute top-4 right-4 bg-emerald-500 w-4 h-4 rounded-full border-4 border-ui-surface shadow-sm animate-pulse" />
//             </div>

//             {/* 个人介绍 */}
//             <div className="space-y-4">
//               <div>
//                 <h1 className="text-4xl font-black text-ui-text tracking-tight">土豆酱 <span className="text-brand">.</span></h1>
//               </div>
              
//               <p className="text-ui-text-muted leading-relaxed font-medium">
//                 一个热爱折腾前端技术的数字游民。正在专注于构建极简且高效的 Web 应用，探索代码中的设计美学。
//               </p>

//               <div className="space-y-2 pt-2 text-sm font-bold text-ui-text-muted">
//                 <div className="flex items-center gap-2">
//                   <MapPin size={16} className="text-brand" />
//                   <span>上海, 中国</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <LinkIcon size={16} className="text-brand" />
//                   <a href="#" className="hover:text-brand transition-colors">maplezz.com</a>
//                 </div>
//               </div>
//             </div>

//             {/* 社交按钮 */}
//             <div className="flex items-center gap-3">
//               {[Github, Twitter, Mail].map((Icon, i) => (
//                 <a key={i} href="#" className="p-3 rounded-2xl border border-ui-border text-ui-text-muted hover:text-brand hover:bg-brand/5 transition-all">
//                   <Icon size={20} />
//                 </a>
//               ))}
//             </div>

//             {/* 技能标签 */}
//             <div className="space-y-3">
//               <div className="text-[10px] font-black text-ui-text-muted uppercase tracking-[0.3em]">Skill Stack</div>
//               <div className="flex flex-wrap gap-2">
//                 {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Rust'].map(tag => (
//                   <span key={tag} className="px-3 py-1 bg-ui-border/50 text-ui-text-muted rounded-lg text-xs font-bold border border-ui-border">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* --- 右侧：内容矩阵 (约 2/3 宽度) --- */}
//           <div className="flex-1 w-full space-y-6">
            
//             {/* 创作热力图卡片 */}
//             <div className="bg-ui-surface border border-ui-border rounded-[2.5rem] p-8 shadow-brand transition-all">
//               <header className="flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-3 text-ui-text font-black text-xl">
//                   <Command className="text-brand" size={24} />
//                   <span>Commit Records</span>
//                 </div>
//                 <div className="text-xs font-bold text-ui-text-muted bg-ui-border/30 px-3 py-1 rounded-full">
//                   Year 2026
//                 </div>
//               </header>

//               {/* 热力图网格 */}
//               <div className="overflow-x-auto pb-4 scrollbar-hide">
//                 <div className="min-w-[600px] space-y-4">
//                   {/* 月份头部 */}
//                   <div className="flex text-[10px] font-bold text-ui-text-muted uppercase tracking-widest pl-6">
//                     {months.map(m => (
//                       <div key={m} className="flex-1">{m}</div>
//                     ))}
//                   </div>
                  
//                   <div className="flex gap-2">
//                     {/* 周几标识 */}
//                     <div className="flex flex-col gap-2 text-[8px] font-bold text-ui-text-muted uppercase pt-1">
//                       <span>Mon</span>
//                       <span className="opacity-0">Tue</span>
//                       <span>Wed</span>
//                       <span className="opacity-0">Thu</span>
//                       <span>Fri</span>
//                     </div>
                    
//                     {/* 格子阵列 */}
//                     <div className="flex-1 grid grid-cols-[repeat(28,1fr)] gap-2">
//                       {heatmapData.map((heat, i) => (
//                         <div 
//                           key={i} 
//                           className={`aspect-square rounded-[4px] border transition-colors duration-500
//                             ${heat === 0 ? 'bg-ui-border/30 border-transparent' : ''}
//                             ${heat === 1 ? 'bg-brand/10 border-brand/5' : ''}
//                             ${heat === 2 ? 'bg-brand/30 border-brand/10' : ''}
//                             ${heat === 3 ? 'bg-brand/60 border-brand/20' : ''}
//                             ${heat === 4 ? 'bg-brand border-brand/40 shadow-sm' : ''}
//                           `}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* 底部统计 */}
//               <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-ui-border pt-6">
//                 <div className="flex gap-10">
//                   <div>
//                     <div className="text-2xl font-black text-ui-text tracking-tighter">1,204</div>
//                     <div className="text-[10px] font-bold text-ui-text-muted uppercase tracking-widest">Total Contributions</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-black text-brand tracking-tighter">84</div>
//                     <div className="text-[10px] font-bold text-ui-text-muted uppercase tracking-widest">Current Streak</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[10px] font-bold text-ui-text-muted uppercase">Less</span>
//                   <div className="flex gap-1">
//                     {[0, 1, 2, 3, 4].map(h => (
//                       <div key={h} className={`w-3 h-3 rounded-sm ${h === 0 ? 'bg-ui-border/30' : h === 1 ? 'bg-brand/20' : h === 2 ? 'bg-brand/40' : h === 3 ? 'bg-brand/70' : 'bg-brand'}`} />
//                     ))}
//                   </div>
//                   <span className="text-[10px] font-bold text-ui-text-muted uppercase">More</span>
//                 </div>
//               </div>
//             </div>

//             {/* 下方状态条 / 最新动态 */}
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1 bg-ui-surface border border-ui-border rounded-3xl p-6 flex items-center justify-between group hover:border-brand/30 transition-all cursor-pointer shadow-sm">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-2xl bg-brand/5 text-brand flex items-center justify-center">
//                     <Sparkles size={24} />
//                   </div>
//                   <div>
//                     <div className="text-sm font-black text-ui-text">Current Project</div>
//                     <div className="text-xs text-ui-text-muted font-medium">正在开发基于 Next.js 15 的博客主题系统...</div>
//                   </div>
//                 </div>
//                 <ChevronRight className="text-ui-text-muted group-hover:text-brand group-hover:translate-x-1 transition-all" size={20} />
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
/**
 * HeroVariant 组件 - 适配 Tailwind CSS v4 与 Nordic Slate 主题
 * 已解决 TypeScript 隐式 any 类型问题，并优化了组件高度以适配页面比例
 */
/**
 * HeroVariant 组件 - 适配 Tailwind CSS v4 与 Nordic Slate 主题
 * 包含：365天完整更新日历、交互式 Tooltip、数据统计卡片
 */
const HeroVariant = () => {
  // 生成过去 371 天（53周）的真实日期和模拟数据
  const calendarData = useMemo(() => {
    const data = [];
    const today = new Date();
    // 生成 53 周的数据以填满网格 (53 * 7 = 371)
    for (let i = 370; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      // 权重分布：0(无), 1-2(低), 3-4(高)
      const weights = [0, 0, 0, 0, 1, 1, 2, 3, 4];
      data.push({
        date: dateStr,
        count: weights[Math.floor(Math.random() * weights.length)],
      });
    }
    return data;
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // 根据 count 获取颜色等级
  const getLevelColor = (count) => {
    if (count === 0) return 'bg-ui-border/30';
    if (count === 1) return 'bg-brand/20';
    if (count === 2) return 'bg-brand/45';
    if (count === 3) return 'bg-brand/70';
    return 'bg-brand'; // count >= 4
  };

  return (
    // 限制大屏高度占比约 40%-45% 视口高度
    <section className="mx-auto px-30 py-6 lg:h-[45vh] flex flex-col justify-center font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        
        {/* 左侧：个人名片 */}
        <div className="lg:col-span-4 h-full">
          <div className="bg-ui-surface border border-ui-border rounded-smooth p-5 shadow-brand h-full flex flex-col justify-between transition-all hover:shadow-lg">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand to-brand-dark rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maple" 
                  alt="Avatar"
                  className="relative w-16 h-16 rounded-full border-2 border-ui-surface bg-ui-surface object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-ui-text tracking-tight">土豆</h1>
                <p className="text-ui-text-muted text-[10px] mt-1 leading-relaxed line-clamp-1">
                  纯牛马
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3 my-3">
              <SocialIcon icon={<Github size={14} />} href="#" label="Github" />
              <SocialIcon icon={<Twitter size={14} />} href="#" label="Twitter" />
              <SocialIcon icon={<Mail size={14} />} href="#" label="Email" />
            </div>

            <div className="border-t border-ui-border/60 mb-3"></div>

            <div className="space-y-1.5 px-1">
              <InfoItem icon={<MapPin size={12} />} text="ChongQin, China" />
              <InfoItem icon={<LinkIcon size={12} />} text="just-potato.netlify.app" href="https://just-potato.netlify.app/" />
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {['Next.js', 'React', 'Rust', 'TS'].map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-ui-border/30 text-ui-text-muted text-[9px] font-medium rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：统计与日历 */}
        <div className="lg:col-span-8 flex flex-col gap-4 h-full overflow-hidden">
          
          {/* 顶部统计卡片 */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={<BookOpen size={16} />} label="Articles" count="156" />
            <StatCard icon={<MessageSquare size={16} />} label="Comments" count="892" />
            <StatCard icon={<Hash size={16} />} label="Tags" count="34" />
          </div>

          {/* 更新日历卡片 */}
          <div className="bg-ui-surface border border-ui-border rounded-smooth p-5 shadow-brand flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between mb-2">
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

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-ui-border/40">
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
    </section>
  );
}

/**
 * @param {{ icon: React.ReactNode, href: string, label: string }} props
 */
function SocialIcon({ icon, href, label }) {
  return (
    <a 
      href={href} 
      aria-label={label}
      className="p-1.5 bg-ui-border/20 text-ui-text-muted hover:text-white hover:bg-brand rounded-md transition-all"
    >
      {icon}
    </a>
  );
}

/**
 * @param {{ icon: React.ReactNode, text: string, href?: string }} props
 */
function InfoItem({ icon, text, href }) {
  return (
    <div className="flex items-center gap-2 text-[11px] text-ui-text-muted group">
      <span className="text-ui-text-muted/70 group-hover:text-brand transition-colors">{icon}</span>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="hover:text-brand transition-colors truncate">
          {text}
        </a>
      ) : (
        <span className="truncate">{text}</span>
      )}
    </div>
  );
}

/**
 * @param {{ label: string, count: string, icon: React.ReactNode }} props
 */
function StatCard({ label, count, icon }) {
  return (
    <div className="bg-ui-surface border border-ui-border rounded-smooth p-3 group hover:border-brand/40 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <div className="p-1 bg-brand/5 text-brand rounded-md group-hover:bg-brand group-hover:text-white transition-all">
          {icon}
        </div>
        <span className="text-base font-black text-ui-text">{count}</span>
      </div>
      <div className="text-[8px] font-bold text-ui-text-muted uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
//-------------
const TechStack = () => (
  <section className="py-16 border-y border-ui-border bg-ui-surface relative">
    {/* 背景装饰：微弱的斜线纹理增强质感 */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(45deg,var(--color-brand),var(--color-brand)_1px,transparent_1px,transparent_10px)]"></div>
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="text-center lg:text-left">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-ui-text-muted mb-2">Technology Stack</h3>
          <p className="text-ui-text font-bold">我热衷于使用以下技术栈构建应用</p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {TECH_STACK.map((tech) => (
            <div 
              key={tech.name} 
              className={`px-6 py-3 rounded-2xl text-sm font-black transition-all hover:-translate-y-2 flex items-center gap-2 cursor-default ${tech.colorClass}`}
            >
              {tech.icon}
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

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
      <TechStack />
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