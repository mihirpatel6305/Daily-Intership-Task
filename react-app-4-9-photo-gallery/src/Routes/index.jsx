import { Route, Routes } from "react-router-dom";
import Gallery from "../pages/Gallery";
import UploadFile from "../Components/UploadFile";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UploadFile />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default AllRoutes;
