import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostList from "./Components/PostList";
import ViewPost from "./Components/ViewPost";
import AddEditPost from "./Components/AddEditPost";
import DeletePost from "./Components/deletePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />}></Route>
        <Route path="/posts/:id" element={<ViewPost />}></Route>
        <Route path="/addpost" element={<AddEditPost />}></Route>
        <Route path="/editpost/:id" element={<AddEditPost />}></Route>
        <Route path="/deletepost/:id" element={<DeletePost />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
