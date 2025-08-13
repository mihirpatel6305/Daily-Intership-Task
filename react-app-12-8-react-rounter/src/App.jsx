import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Services from "./Pages/Services";
import Navbar from "./Pages/Navbar";
import BookDetail from "./Pages/BookDetail";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
