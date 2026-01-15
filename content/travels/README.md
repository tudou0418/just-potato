# 旅游 MDX 文件编写指南

## 文件位置

所有旅游相关的 MDX 文件应放在 `content/travels/` 目录下。

## 文件命名规范

- 使用小写字母、连字符和数字
- 建议格式：`地点-主题.mdx`
- 示例：`dali-erhai.mdx`、`chuanxi-yuzixi.mdx`

## Front Matter 必填字段

每个 MDX 文件必须包含以下 front matter 字段：

```yaml
---
title: "标题"              # 旅行标题
location: "地点"          # 城市或地区名称
coord: [经度, 纬度, 高度] # 地图坐标 [经度, 纬度, 高度值]
date: "YYYY-MM-DD"        # 旅行日期
year: "YYYY"              # 年份，用于筛选
days: 数字                # 旅行天数
cost: 数字                # 总花费（元）
image: "图片URL"          # 封面图片URL
transport: "plane" | "train" | "car"  # 交通方式
---
```

## Front Matter 可选字段

```yaml
---
description: "简短描述"   # 旅行简介
tags: ["标签1", "标签2"]  # 标签列表
---
```

## 完整示例

```yaml
---
title: "大理洱海：追逐苍山的晚霞"
location: "大理"
coord: [100.22, 25.59, 100]
date: "2024-12-20"
year: "2024"
days: 4
cost: 3200
image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=800&q=80"
transport: "plane"
description: "在大理的四天，我追逐着苍山的晚霞，感受洱海的宁静。"
tags: ["自然", "摄影", "放松"]
---

# 大理洱海之旅

## 第一天：抵达大理

乘坐飞机抵达大理，入住洱海边的民宿...

## 第二天：环洱海骑行

租了一辆电动车，沿着洱海骑行...

## 旅行小贴士

- 最佳旅行时间：3-5月，9-11月
- 推荐住宿：洱海边的民宿
- 必备物品：防晒霜、墨镜、舒适的鞋子
```

## 字段说明

### coord（坐标）

- 格式：`[经度, 纬度, 高度值]`
- 经度范围：-180 到 180
- 纬度范围：-90 到 90
- 高度值：用于地图上点的大小，建议 50-200

### transport（交通方式）

可选值：
- `plane` - 飞机
- `train` - 火车/高铁
- `car` - 自驾/汽车

### year（年份）

用于年份筛选器，建议与 date 字段中的年份保持一致。

## 内容格式

- 使用标准 Markdown 语法
- 可以使用 MDX 扩展语法（如导入 React 组件）
- 建议按时间顺序组织内容
- 可以添加图片、代码块等

## 图片建议

- 使用 Unsplash 或其他图床
- 建议尺寸：800x600 或 1600x900
- 建议格式：jpg 或 webp
- 建议大小：小于 500KB
