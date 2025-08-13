import { useLocation, useParams } from "react-router-dom";
import { books } from "./DummyData";

function BookDetail() {
  // const { id } = useParams();
  // const book = books.find((book) => book.id == id);

  const book = useLocation()?.state;

  return (
    <div className="max-w-md mx-auto m-2 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden p-5 hover:shadow-lg transition-shadow">
      <img
        src={book?.image}
        alt={book?.title}
        className="w-full object-contain h-60 rounded-lg"
      />

      <div className="mt-4 space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{book?.title}</h2>
        <p className="text-gray-500 text-sm">By {book?.author}</p>
        <p className="text-lg font-semibold text-green-600">₹{book?.price}</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {book?.description}
        </p>
      </div>
    </div>
  );
}

export default BookDetail;
