import Head from 'next/head';
import { getAllPosts } from '../lib/posts';
import PostCard from '../components/PostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A blog about tech and coding" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
