import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/simulatedPostsApi";
import { useNavigate } from "react-router-dom";

function DisplayPosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  const navigate = useNavigate();

  console.log("posts>>>", posts);

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">No posts found.</div>
    );
  }


  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      {posts?.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col gap-2"
          >
            {console.log("id>>", post.id)}
            <h2 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.body}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => navigate(`/edit/${post.id}`, { state: post })}
                className="bg-yellow-400 text-white py-1 px-3 rounded hover:bg-yellow-500 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => navigate(`/delete/${post.id}`, { state: post })}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>There is No Post Found</div>
      )}
    </div>
  );
}

export default DisplayPosts;
