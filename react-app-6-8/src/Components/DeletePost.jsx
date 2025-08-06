import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DeletePost() {
  const BASE_API = import.meta.env.VITE_BASE_URL;

  const { id } = useParams();
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      await axios.delete(`${BASE_API}/posts/${id}`);
      navigate("/");
    } catch (error) {
      console.error("something is Wrong in post delete", error);
    }
  }

  return (
    <>
      <div
        style={{
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Are you sure you want to Delete?</h2>
        <div>
          <button onClick={() => handleDelete()}>yes</button>
          <button onClick={() => navigate(`/posts/${id}`)}>No</button>
        </div>
      </div>
    </>
  );
}

export default DeletePost;
