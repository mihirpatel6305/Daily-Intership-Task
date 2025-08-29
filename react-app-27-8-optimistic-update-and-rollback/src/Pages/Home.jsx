import { useNavigate } from "react-router-dom";
import DisplayPosts from "../Components/DisplayPosts";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Add Post
        </button>
      </div>
      <DisplayPosts />
    </div>
  );
}

export default Home;
