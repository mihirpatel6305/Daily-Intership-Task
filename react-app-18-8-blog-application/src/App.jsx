import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Pages/Nav";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import AddEditPost from "./Pages/AddEditPost";
import Delete from "./Pages/Delete";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/add" element={<AddEditPost />}></Route>
          <Route path="/edit/:id" element={<AddEditPost />}></Route>
          <Route path="/delete/:id" element={<Delete />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
