import { getAllPosts } from '../../../lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

// 让 Next.js 知道要静态生成哪些文章
// serialize + MDXRemote 渲染 Markdown 内容
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return notFound();

  const mdxSource = await serialize(post.content);

  return (
    <article>
      <h1>{post.metadata.title}</h1>
      <MDXRemote {...mdxSource} />
    </article>
  );
}
