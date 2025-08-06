import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PostList() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_API = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  async function getAllPost() {
    try {
       const allpost = await axios(`${BASE_API}/posts`);
      setPostData(allpost?.data);
      setLoading(false);
    } catch (error) {
      console.error('Error in fetch post List',error);
    }
  }
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button onClick={() => navigate("/addpost")}>Add Post</button>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh", 
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Loading ...
        </div>
      ) : (
        <div>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {postData.map((post) => (
                <tr
                  key={post?.id}
                  onClick={() => navigate(`/posts/${post?.id}`)}
                >
                  <td>{post?.id}</td>
                  <td>{post?.title}</td>
                  <td>{post?.body}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/editpost/${post?.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/deletepost/${post?.id}`);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default PostList;
