import { useState, useEffect } from "react";
import LazyImage from "../Components/LazyImage";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const savedGallery = JSON.parse(localStorage.getItem("gallery") || "[]");
    setImages(savedGallery);
  }, []);

  return (
    <div className="p-4 sm:p-6">
      {images.length === 0 ? (
        <p className="text-gray-600 text-center">No images uploaded yet.</p>
      ) : (
        <div
          className="grid 
            grid-cols-[repeat(auto-fit,minmax(200px,1fr))]   /* mobile */
            sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] /* tablets */
            lg:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] /* laptops & bigger */
            gap-4 sm:gap-6"
        >
          {images.map((img) => (
            <div
              key={img.id}
              className="aspect-square bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <LazyImage
                src={img.url}
                lowResSrc={img.lowRes}
                alt="uploaded"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
