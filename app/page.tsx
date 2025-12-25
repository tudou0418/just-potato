import { getAllPosts } from '../lib/posts';
import PostCard from '../components/PostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </main>
  );
}
