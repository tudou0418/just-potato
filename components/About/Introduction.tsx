'use client'

import { Github, Twitter, Mail, MapPin, Link as LinkIcon, Terminal, Coffee, Sparkles, ArrowUpRight } from 'lucide-react'

const Introduction = () => {
  return (
    <section className="pt-28 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">

        {/* 头部：名字 + 一句话 */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={14} className="text-brand" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">~/about</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black dark:text-white text-ui-text tracking-tight mb-5 leading-[1.1]">
            土豆酱
          </h1>
          <p className="dark:text-white/40 text-ui-text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            全栈开发者，白日梦想家。在重庆写代码，偶尔写点东西。
          </p>
        </div>

        {/* 个人卡片 */}
        <div className="rounded-2xl border dark:border-white/[0.06] border-ui-border dark:bg-white/[0.02] bg-ui-surface p-6 md:p-8 mb-16 shadow-brand hover:shadow-lg transition-shadow duration-500">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* 头像 */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-brand/30 to-violet-500/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-700" />
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maple"
                alt="Avatar"
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 dark:border-white/10 border-ui-border bg-ui-surface object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                <h2 className="text-xl font-black dark:text-white text-ui-text tracking-tight">土豆酱</h2>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-medium dark:text-white/30 text-ui-text-muted">Open to collaborate</span>
                </div>
              </div>
              <p className="text-sm dark:text-white/40 text-ui-text-muted leading-relaxed mb-4">
                喜欢用代码把脑子里奇奇怪怪的想法变成现实。白天写业务，晚上造轮子。相信好的工具能让人更自由。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs dark:text-white/30 text-ui-text-muted">
                  <MapPin size={12} className="text-brand" />
                  重庆
                </div>
                <div className="w-px h-3 dark:bg-white/10 bg-ui-border" />
                <a
                  href="https://github.com/tudou0418"
                  target="_blank"
                  className="flex items-center gap-1.5 text-xs dark:text-white/30 text-ui-text-muted hover:text-brand transition-colors"
                >
                  <Github size={12} />
                  GitHub
                  <ArrowUpRight size={10} />
                </a>
                <div className="w-px h-3 dark:bg-white/10 bg-ui-border" />
                <a
                  href="mailto:potato@example.com"
                  className="flex items-center gap-1.5 text-xs dark:text-white/30 text-ui-text-muted hover:text-brand transition-colors"
                >
                  <Mail size={12} />
                  邮箱
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 我的故事 */}
        <div className="mb-16">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] dark:text-white/30 text-ui-text-muted mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-brand" />
            我的故事
          </h3>
          <div className="space-y-4 max-w-2xl">
            <p className="dark:text-white/60 text-ui-text leading-relaxed">
              从第一次在浏览器里看到自己写的 "Hello World" 开始，就知道这行干得下去。后来学了前端、学了后端、学了各种框架，发现最好玩的还是把东西做出来的那个过程。
            </p>
            <p className="dark:text-white/60 text-ui-text leading-relaxed">
              这个博客是我的数字花园。不追求流量，不蹭热点，只是把学到的东西和偶尔冒出来的想法记下来。如果恰好对你有用，那就更好了。
            </p>
            <p className="dark:text-white/60 text-ui-text leading-relaxed">
              工作之余喜欢折腾各种小项目——给博客加了3D太空场景、做了个3D地球记录旅行足迹、还搞了个会飞的土豆超人。有些项目做着做着就变成了正经东西，有些纯粹是为了好玩。
            </p>
          </div>
        </div>

        {/* 技术栈 */}
        <div className="mb-16">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] dark:text-white/30 text-ui-text-muted mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-brand" />
            技术栈
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { category: '前端', items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'] },
              { category: '后端', items: ['Node.js', 'Go', 'Rust (学习中)', 'Supabase'] },
              { category: '工具', items: ['Git / GitHub', 'VS Code', 'Figma', 'Vercel'] },
              { category: '兴趣', items: ['WebGL / GLSL', '创意编程', '3D 建模', '设计系统'] },
            ].map((group) => (
              <div
                key={group.category}
                className="rounded-xl border dark:border-white/[0.06] border-ui-border dark:bg-white/[0.02] bg-ui-surface p-5"
              >
                <h4 className="text-sm font-black dark:text-white text-ui-text mb-3 tracking-tight">{group.category}</h4>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm dark:text-white/40 text-ui-text-muted">
                      <span className="w-1 h-1 rounded-full bg-brand/60" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 时间线 */}
        <div className="mb-16">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] dark:text-white/30 text-ui-text-muted mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-brand" />
            足迹
          </h3>
          <div className="relative pl-6 border-l-2 dark:border-white/[0.06] border-ui-border space-y-8">
            {[
              { year: '2026', event: '给博客加了3D太空场景和一个会飞的土豆超人', tag: '创意' },
              { year: '2025', event: '开始写博客，记录技术笔记和生活', tag: '写作' },
              { year: '2024', event: '深入学习 Next.js 和 TypeScript，搭建个人博客', tag: '全栈' },
              { year: '2023', event: '接触 React 生态，开始前端之旅', tag: '起点' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full border-2 dark:border-white/20 border-ui-border dark:bg-[#0a0e1a] bg-ui-surface">
                  {index === 0 && <div className="absolute inset-0.5 rounded-full bg-brand" />}
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xs font-black dark:text-white/20 text-ui-text-muted tracking-wider shrink-0 pt-0.5">
                    {item.year}
                  </span>
                  <div>
                    <p className="text-sm dark:text-white/60 text-ui-text leading-relaxed">
                      {item.event}
                    </p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[9px] font-bold bg-brand/10 text-brand">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 闲聊 */}
        <div className="rounded-2xl border dark:border-white/[0.06] border-ui-border dark:bg-white/[0.02] bg-ui-surface p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Coffee size={18} className="text-brand" />
            <h3 className="text-sm font-black dark:text-white text-ui-text">随便聊聊</h3>
          </div>
          <p className="text-sm dark:text-white/40 text-ui-text-muted leading-relaxed mb-4">
            不管是想讨论技术、合作项目、还是单纯想聊聊天，都欢迎找我。我很喜欢认识新朋友。
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:potato@example.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-brand/20 active:scale-95"
            >
              <Mail size={15} />
              发邮件
            </a>
            <a
              href="https://github.com/tudou0418"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold dark:text-white/60 text-ui-text-muted border dark:border-white/[0.06] border-ui-border dark:hover:bg-white/[0.04] hover:bg-ui-border/20 transition-all"
            >
              <Github size={15} />
              GitHub
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export { Introduction }
