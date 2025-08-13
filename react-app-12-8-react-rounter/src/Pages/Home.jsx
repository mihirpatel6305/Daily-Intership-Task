import { useNavigate } from "react-router-dom";
import { books } from "./DummyData";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6"> Book Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => navigate(`/book/${book.id}`,{state:book})}
            className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-56 object-contain"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {book.title}
              </h2>
              <p className="text-sm text-gray-500">By {book.author}</p>
              <p className="text-green-600 font-bold mt-2">₹{book.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
