'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { 
  Sun, Moon, Github, Menu, X, ArrowRight, Command, Zap,
  Home, FolderCode, BookOpen, User, Sparkles
} from 'lucide-react';

/**
 * 💡 修复说明：
 * 1. 提升了整体 z-index 层级，确保菜单面板 (z-[950]) 和 导航条 (z-[1000]) 高于页面所有元素。
 * 2. 菜单切换按钮提升至 z-[1010]，确保在面板打开时依然可点击。
 */

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      if (!mobileMenuOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  if (!mounted) return null;

  const navLinks = [
    { name: '首页', href: '/', icon: Home, desc: '回到起点' },
    { name: '项目', href: '/projects', icon: FolderCode, desc: '作品集锦' },
    { name: '文章', href: '/posts', icon: BookOpen, desc: '深度思考' },
    { name: '关于', href: '/about', icon: User, desc: '了解更多' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          scrolled || mobileMenuOpen
            ? 'h-16 bg-ui-surface/80 backdrop-blur-xl border-b border-ui-border shadow-sm' 
            : 'h-20 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand to-amber-300 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                <Zap size={22} fill="currentColor" className="text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-black tracking-tight text-ui-text leading-tight">
                <span className="text-brand">Just</span> Potato
              </div>
              <div className="text-[9px] text-ui-text-muted font-bold tracking-[0.4em] uppercase opacity-40">
                Creative Tech
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-1 p-1.5 bg-ui-border/10 rounded-2xl border border-ui-border/5">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all duration-300 z-10 rounded-xl ${
                    hoveredIndex === index ? 'text-brand' : 'text-ui-text/60 hover:text-ui-text'
                  }`}
                >
                  <Icon size={16} strokeWidth={2.5} className={hoveredIndex === index ? 'animate-bounce-subtle' : ''} />
                  {link.name}
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-ui-surface shadow-sm border border-ui-border/20 rounded-xl -z-10 animate-in fade-in zoom-in-95 duration-200" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-ui-border/20 text-ui-text/40 text-xs border border-transparent hover:border-brand/20 transition-all cursor-text group">
              <Command size={14} className="group-hover:text-brand transition-colors" />
              <span className="font-medium">搜索文档</span>
              <kbd className="hidden xl:inline-flex h-5 items-center gap-1 rounded border border-ui-border bg-ui-surface px-1.5 font-mono text-[10px] font-medium opacity-100">
                K
              </kbd>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-xl text-ui-text/50 hover:text-brand hover:bg-brand/10 transition-all active:scale-90"
              >
                {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button className="hidden sm:flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand/20 group">
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                <span>订阅</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl text-ui-text hover:bg-ui-border/20 transition-all z-[1010]"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 移动端菜单面板 - z-index 设为 950 */}
      <div 
        className={`fixed inset-0 z-[950] bg-ui-surface md:hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          mobileMenuOpen ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="h-full flex flex-col pt-28 px-6 pb-8 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            <p className="px-2 text-[10px] uppercase tracking-[0.3em] text-brand font-black opacity-60">探索世界</p>
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`group flex items-center gap-5 p-4 rounded-2xl bg-ui-border/5 border border-ui-border/10 hover:border-brand/30 transition-all duration-500 ${
                    mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-12 h-12 rounded-xl bg-ui-surface shadow-sm border border-ui-border/20 flex items-center justify-center text-ui-text/40 group-hover:text-brand group-hover:border-brand/20 transition-all">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-ui-text group-hover:text-brand transition-colors">{link.name}</span>
                    <span className="text-xs text-ui-text-muted font-medium">{link.desc}</span>
                  </div>
                  <ArrowRight size={16} className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-30 group-hover:translate-x-0 transition-all" />
                </a>
              );
            })}
          </div>
          
          <div className={`mt-auto pt-10 flex flex-col gap-6 transition-all duration-700 delay-300 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
             <div className="p-5 rounded-3xl bg-gradient-to-br from-brand/10 to-transparent border border-brand/10 relative overflow-hidden group">
               <div className="relative z-10 flex items-center justify-between">
                 <div>
                   <h4 className="font-bold text-ui-text">加入社区</h4>
                   <p className="text-[10px] text-ui-text-muted">订阅我们获取更新</p>
                 </div>
                 <button className="px-4 py-2 bg-brand text-white text-xs font-bold rounded-lg shadow-brand/20 shadow-md">立即订阅</button>
               </div>
               <Zap size={80} className="absolute -right-4 -bottom-4 text-brand opacity-[0.03] -rotate-12 group-hover:scale-110 transition-transform duration-700" />
             </div>

             <div className="flex items-center justify-between px-2">
               <div className="flex gap-4">
                 <a href="#" className="text-ui-text/40 hover:text-brand transition-colors"><Github size={20} /></a>
                 <div className="w-[1px] h-5 bg-ui-border/50"></div>
                 <p className="text-[10px] text-ui-text/30 font-bold uppercase tracking-widest leading-loose">Potato Blog v2.5</p>
               </div>
               <div className="flex items-center gap-1 text-[10px] font-bold text-brand">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></div>
                 ONLINE
               </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;