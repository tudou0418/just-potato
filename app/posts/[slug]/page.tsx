import Head from 'next/head';
import { getAllPosts } from '../../../lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const mdxSource = await serialize(post.content);

  return (
    <>
      <Head>
        <title>{post.metadata.title} | My Blog</title>
        <meta name="description" content={post.metadata.description || 'No description'} />
        <meta name="keywords" content={post.metadata.tags.join(', ')} />
        <meta property="og:title" content={post.metadata.title} />
        <meta property="og:description" content={post.metadata.description || 'No description'} />
      </Head>

      <article>
        <h1>{post.metadata.title}</h1>
        <MDXRemote {...mdxSource} />
      </article>
    </>
  );
}
