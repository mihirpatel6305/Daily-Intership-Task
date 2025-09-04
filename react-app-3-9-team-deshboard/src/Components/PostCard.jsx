function PostCard({ post }) {
  return (
    <div className="cursor-pointer bg-gradient-to-b from-gray-50 to-white border border-gray-300 rounded-lg shadow hover:shadow-lg transition-all duration-300 p-6 m-3 w-96">
      <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-snug">
        {post?.title}
      </h2>
      <p className="text-gray-700 text-sm leading-relaxed line-clamp-5">
        {post?.body}
      </p>
    </div>
  );
}

export default PostCard;
