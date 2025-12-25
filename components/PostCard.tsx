const PostCard = ({ post }: { post: any }) => {
  return (
    <div className="border p-4 mb-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
      <h2 className="text-xl font-semibold">{post.metadata.title}</h2>
      <p className="text-sm text-gray-500">{post.metadata.date}</p>
      <p className="text-sm text-gray-700">{post.metadata.tags.join(', ')}</p>
    </div>
  );
};

export default PostCard;
