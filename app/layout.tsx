import type { Metadata } from "next";
import ThemeProvider from '../components/ThemeProvider';
import LayoutShell from '../components/LayoutShell';
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
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LayoutShell>
            {children}
          </LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
