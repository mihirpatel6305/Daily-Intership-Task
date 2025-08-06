import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddEditPost() {
  const [postData, setPostData] = useState();
  const BASE_API = import.meta.env.VITE_BASE_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const prevData = state?.prevData;

  function handleChange(e) {
    setPostData((prev) => ({ ...prev, [e.target?.name]: e.target?.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await axios.patch(`${BASE_API}/posts/${id}`, postData);
      } else {
        await axios.post(`${BASE_API}/posts`, postData);
      }
      navigate("/");
    } catch (err) {
      console.error("Failed to submit", err);
    }
  }
  async function getPostData() {
    if (id && prevData) {
      setPostData(prevData);
    } else if (id) {
      const post = await axios(`${BASE_API}/posts/${id}`);
      setPostData(post?.data);
    }
  }
  useEffect(() => {
    if (id) {
      getPostData();
    }
  }, []);

  return (
    <div
      style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        {id ? "Edit Post" : "Add Post"}
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter Post Title"
          value={postData?.title}
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="body"
          placeholder="Enter Post Body"
          value={postData?.body}
          onChange={handleChange}
          rows={5}
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <button type="submit">{id ? "Edit" : "Add"}</button>
      </form>
    </div>
  );
}

export default AddEditPost;
