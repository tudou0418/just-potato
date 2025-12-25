// components/PostCard.tsx
const PostCard = ({ post }: { post: any }) => {
  return (
    <div>
      <h2>{post.metadata.title}</h2>
      <p>{post.metadata.date}</p>
      <p>{post.metadata.tags.join(', ')}</p>
    </div>
  );
};

export default PostCard;
