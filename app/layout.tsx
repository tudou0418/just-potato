import type { Metadata } from "next";
// 提示：如果在本地运行遇到 next/font/google 错误，请确保 next 版本为最新。
// 在预览环境中，我们暂时移除特定字体导入以确保编译通过，本地可以根据需要保留。
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';
import "./globals.css";

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
    /**
     * suppressHydrationWarning 是使用 next-themes 的关键，
     * 它能防止浏览器在切换主题时产生不匹配的警告。
     */
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}