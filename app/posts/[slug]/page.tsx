import React from 'react';
import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';
import ModernDevBlogLayout from '@/components/posts/ModernDevBlogLayout';
import RobotFollowCursorArticle from '@/components/posts/RobotFollowCursorArticle';

const getPostData = (slug: string) => {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug) || null;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) return { title: '文章未找到' };

  return {
    title: `${post.metadata.title} | Just Potato`,
    description: post.metadata.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return <div className="p-20 text-center font-bold text-slate-900">404 - 文章未找到</div>;
  }

  if (slug === 'robot-follow-cursor') {
    return <RobotFollowCursorArticle metadata={post.metadata} />;
  }

  return <ModernDevBlogLayout post={post} />;
}
