import React from 'react';
import PostsListClient from '@/components/PostsListClient';

// --- 1. 手动定义的文章列表 ---
const MANUAL_POSTS = [
  {
    slug: 'my-first-post',
    metadata: {
      title: '我的第一篇博客文章：开启 Next.js 的创意之旅',
      date: '2024-05-21',
      category: '技术笔记',
      readTime: '5 min',
      description: '在这篇文章中，我将分享我是如何利用 Next.js 15 和 Tailwind CSS v4 搭建起这个数字花园的...'
    }
  }
];

// --- 2. 动态获取文章逻辑 (保持原逻辑) ---
let getAllPosts: () => any[];
try {
  const postsModule = require('../../lib/posts');
  getAllPosts = postsModule.getAllPosts;
} catch (error) {
  getAllPosts = () => [];
}

export default async function PostsListPage() {
  let dynamicPosts = [];
  try {
    if (typeof getAllPosts === 'function') {
      dynamicPosts = getAllPosts();
    }
  } catch (error) {
    console.error("加载动态文章列表失败:", error);
  }

  const combinedPosts = [...MANUAL_POSTS];
  
  dynamicPosts.forEach((dPost) => {
    if (!combinedPosts.find(m => m.slug === dPost.slug)) {
      combinedPosts.push(dPost);
    }
  });

  const sortedPosts = combinedPosts.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  const initialPosts = sortedPosts.slice(0, 4);

  return <PostsListClient initialPosts={initialPosts} totalPosts={sortedPosts.length} />;
}
