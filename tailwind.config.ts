import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // 必须添加这一行！！
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ... 其他配置
};
export default config;
// tailwind.config.js
// tailwind.config.js
// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   darkMode: 'class',  // 使用类名切换暗黑模式
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
