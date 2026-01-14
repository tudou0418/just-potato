'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Code2, Github, Menu, X, ArrowRight, Command } from 'lucide-react';

/**
 * 💡 琥珀主题适配说明：
 * 1. bg-brand: 使用琥珀主色 (Amber 500)
 * 2. text-ui-text: 自动适配亮色的焦糖色和深色的奶油色
 * 3. border-ui-border: 适配主题色边框
 * 4. shadow-brand: 使用配置中的琥珀色光晕阴影
 */

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 基础滚动状态与交互状态
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 避免 Hydration Mismatch
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 1. 背景变化判断
      setScrolled(currentScrollY > 20);
      
      // 2. 智能隐藏/显示逻辑 (向下滚动隐藏，向上滚动显示)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!mounted) return null;

  // 导航项定义
  const navLinks = [
    { name: '首页', href: '/' },
    { name: '项目', href: '/projects' },
    { name: '文章', href: '/posts' },
    { name: '关于', href: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        scrolled 
          ? 'h-16 bg-ui-surface/80 backdrop-blur-xl border-b border-ui-border shadow-lg shadow-brand/5' 
          : 'h-20 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-6 relative">
        
        {/* Logo 区域 */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-1 bg-brand rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative w-9 h-9 bg-brand rounded-lg flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform">
              <Code2 size={20} className="text-white" />
            </div>
          </div>
          <div className="text-xl font-bold tracking-tight text-ui-text">
            My<span className="text-brand">Blog</span>.
          </div>
        </div>
        
        {/* 桌面端导航 - 聚光灯跟随效果 */}
        <div className="hidden md:flex items-center p-1 bg-ui-border/20 rounded-xl border border-ui-border/10">
          {navLinks.map((link, index) => (
            <a 
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 z-10 ${
                hoveredIndex === index ? 'text-brand' : 'text-ui-text opacity-70'
              }`}
            >
              {link.name}
              {/* 动态聚光灯底色 */}
              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-ui-surface rounded-lg -z-10 shadow-sm animate-in fade-in zoom-in-95 duration-200" />
              )}
            </a>
          ))}
        </div>

        {/* 右侧交互 */}
        <div className="flex items-center gap-3">
          {/* 搜索快捷键模拟 */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ui-border/20 text-ui-text/40 text-xs border border-transparent hover:border-brand/20 transition-colors cursor-text">
            <Command size={14} />
            <span>Search</span>
            <span className="opacity-40">K</span>
          </div>

          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex p-2 text-ui-text opacity-60 hover:text-brand hover:opacity-100 transition-all"
          >
            <Github size={20} />
          </a>
          
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-brand/10 text-brand hover:bg-brand/20 transition-all border border-brand/5 active:scale-90"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="hidden sm:flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-all shadow-brand group">
            订阅
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ui-text hover:text-brand transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 移动端全屏导航面板 */}
      <div 
        className={`fixed inset-0 top-0 z-[-1] bg-ui-surface md:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="h-full flex flex-col pt-24 px-8 space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-brand font-bold">导航菜单</p>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block text-4xl font-bold text-ui-text hover:text-brand transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="pt-8 border-t border-ui-border flex flex-col gap-5">
             <div className="flex items-center gap-4">
               <a href="#" className="w-12 h-12 rounded-2xl bg-ui-border/30 flex items-center justify-center text-ui-text"><Github size={24} /></a>
               <button className="flex-1 h-12 rounded-2xl bg-brand text-white font-bold shadow-brand">邮件订阅</button>
             </div>
             <p className="text-center text-xs text-ui-text/40 font-medium">EXPLORE THE DIGITAL GARDEN</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;