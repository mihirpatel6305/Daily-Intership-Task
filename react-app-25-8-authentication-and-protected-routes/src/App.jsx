import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import UserList from "./pages/userList";
import Logout from "./pages/Logout";

function App() {
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
