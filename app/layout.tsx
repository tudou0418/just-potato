import type { Metadata } from "next";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';
import Character3D from '../components/Character3D';
import "./globals.css";
// 导入styles里面的globals.css以应用全局样式
export const metadata: Metadata = {
  title: "我的个人博客 | 技术与分享",
  description: "探索前端技术与生活的个人博客空间",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased font-sans">
        {/* attribute="class" 会将 .dark 类添加到 <html> 标签上 */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* 注意：移除了外层 div 的 dark:bg-zinc-950，
              因为我们在 globals.css 的 body 里已经通过变量处理了背景 
          */}
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Character3D />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
