import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewPost() {
  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(true);
  const BASE_API = import.meta.env.VITE_BASE_URL;

  const { id } = useParams();
  const navigate = useNavigate();

  async function getPostData() {
    const post = await axios(`${BASE_API}/posts/${id}`);
    setPostData(post?.data);
    setLoading(false);
  }
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
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
          <div
            style={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h2>Post Detail</h2>
            <p>
              <strong>User ID:</strong> {postData?.userId}
            </p>
            <p>
              <strong>Post ID:</strong> {postData?.id}
            </p>
            <p>
              <strong>Title:</strong> {postData?.title}
            </p>
            <p>
              <strong>Body:</strong>
            </p>
            <pre style={{ whiteSpace: "pre-wrap" }}>{postData?.body}</pre>
          </div>
          <div>
            <button
              onClick={(e) => {
                navigate(`/editpost/${postData?.id}`, {
                  state: { prevData: postData },
                });
              }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                navigate(`/deletepost/${postData?.id}`);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewPost;
