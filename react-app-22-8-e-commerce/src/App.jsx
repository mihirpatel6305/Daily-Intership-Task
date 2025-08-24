import { Route, Routes } from "react-router-dom";
import List from "./pages/List";
import Detail from "./pages/Detail";
import CartPage from "./pages/CartPage";
import NavBar from "./pages/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
