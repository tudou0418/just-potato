export type ActivityLog = {
  date: string
  title: string
  summary: string
  status: 'building' | 'shipped' | 'writing' | 'learning'
  tags: string[]
  href?: string
}

export const activityLogs: ActivityLog[] = [
  {
    date: '2026-07-31',
    title: '旅行足迹地图切到 MineMap',
    summary: '把旅行页从 ECharts 中国地图替换成 MineMap + WMTS 底图，并补上自定义旅行 Marker 和路线图层。',
    status: 'shipped',
    tags: ['MineMap', 'WMTS', 'Travel'],
    href: '/travel',
  },
  {
    date: '2026-07-31',
    title: '给博客补一个公开工作日志',
    summary: '新增日志页，用来记录最近在做什么、做完了什么，以及哪些想法正在路上。',
    status: 'building',
    tags: ['Blog', 'Changelog'],
    href: '/logs',
  },
  {
    date: '2026-07-31',
    title: '整理 pdf.js 文档预览教程',
    summary: '文章里加入可运行 Demo，把 FileReader、worker、canvas 渲染、缩放和拖拽上传串成完整示例。',
    status: 'writing',
    tags: ['pdf.js', 'MDX'],
    href: '/posts/pdf-js-document-preview',
  },
]

export function getRecentActivityLogs(limit?: number) {
  const logs = [...activityLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return typeof limit === 'number' ? logs.slice(0, limit) : logs
}