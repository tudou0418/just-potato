import React from 'react';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

/**
 * 💡 琥珀主题适配说明：
 * 1. bg-ui-surface: 适配亮色的暖黄背景和深色的深棕背景
 * 2. text-ui-text: 适配亮色的焦糖色和深色的奶油色
 * 3. border-ui-border: 适配主题色边框
 * 4. text-brand: 品牌强调色，用于 Icon 和关键链接
 */

const Footer = () => {
  return (
    <footer className="py-16 border-t border-ui-border bg-ui-surface">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* 品牌与简介 */}
          <div className="space-y-3 text-center md:text-left">
            <div className="text-2xl font-black tracking-tight text-ui-text">
              My<span className="text-brand">Blog</span>.
            </div>
            <p className="text-sm text-ui-text opacity-60 max-w-xs leading-relaxed mx-auto md:mx-0">
              记录技术与生活的点滴，构建有温度的代码空间。
            </p>
          </div>

          {/* 底部导航 */}
          <div className="flex gap-8 text-sm font-bold text-ui-text opacity-60">
            <a href="#" className="hover:text-brand hover:opacity-100 transition-colors">Github</a>
            <a href="#" className="hover:text-brand hover:opacity-100 transition-colors">RSS</a>
            <a href="#" className="hover:text-brand hover:opacity-100 transition-colors">隐私政策</a>
          </div>

          {/* 社交媒体 */}
          <div className="flex items-center gap-4">
            {[Github, Twitter, Mail].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="p-3 bg-brand/5 rounded-2xl text-brand hover:bg-brand/10 hover:scale-110 transition-all border border-brand/10"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        {/* 版权信息 */}
        <div className="mt-12 pt-8 border-t border-ui-border/50 text-center">
          <div className="text-xs text-ui-text opacity-50 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
            <span>© {new Date().getFullYear()} 土豆酱</span>
            <span className="hidden md:inline opacity-30">|</span>
            <span className="flex items-center gap-1">
              Powered by Next.js & <span className="text-brand font-medium">Tailwind v4</span>
              <Heart size={12} className="text-brand fill-brand animate-pulse ml-1" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;