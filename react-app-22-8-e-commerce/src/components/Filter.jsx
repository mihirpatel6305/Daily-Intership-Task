import { useState } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../feature/ProductSlice";

export default function Filter({ setOpenFilter }) {
  const [price, setPrice] = useState({ min: null, max: null });
  const [categories, setCategories] = useState({
    "men's clothing": false,
    jewelery: false,
    electronics: false,
    "women's clothing": false,
  });
  const [reviews, setReviews] = useState(null);
  const dispatch = useDispatch();

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleReviewChange = (value) => {
    setReviews(reviews === value ? null : value);
  };

  function handleApply() {
    const selectedCategories =
      Object.keys(categories).filter((cat) => categories[cat]) || [];

    const filterObj = {
      price: {
        max: Number(price?.max) || Infinity,
        min: Number(price?.min),
      },
      category: selectedCategories,
      review: reviews,
    };

    if (filterObj.price.max < filterObj.price.min) {
      alert("maximum should be greater than minimum");
    } else {
      setOpenFilter(false);
      dispatch(productActions.applyFilter(filterObj));
    }
  }

  const categoryLabels = {
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing",
    jewelery: "Jewelry",
    electronics: "Electronics",
  };

  return (
    <div className="w-72 bg-white shadow-lg rounded-2xl p-4">
      <h2 className="text-xl font-bold text-center mb-4">FILTER</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={price?.min ?? ""}
            max={price?.max ? price.max - 1 : undefined}
            onChange={(e) => setPrice({ ...price, min: e.target.value })}
            className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Max"
            value={price?.max ?? ""}
            min={price?.min ? Number(price.min) + 1 : undefined}
            onChange={(e) => setPrice({ ...price, max: e.target.value })}
            className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category</h3>
        <div className="space-y-2">
          {Object.keys(categories).map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={cat}
                checked={categories[cat]}
                onChange={handleCategoryChange}
                className="w-5 h-5 accent-blue-500 rounded focus:ring-blue-400"
              />
              <span>{categoryLabels[cat]}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Review</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={reviews === 4}
              onChange={() => handleReviewChange(4)}
              className="w-5 h-5 accent-blue-500 rounded focus:ring-blue-400"
            />
            <span>4 stars &amp; up</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={reviews === 3}
              onChange={() => handleReviewChange(3)}
              className="w-5 h-5 accent-blue-500 rounded focus:ring-blue-400"
            />
            <span>3 stars &amp; up</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={reviews === 2}
              onChange={() => handleReviewChange(2)}
              className="w-5 h-5 accent-blue-500 rounded focus:ring-blue-400"
            />
            <span>2 stars &amp; up</span>
          </label>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleApply}
          className="flex-1 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
        >
          Apply
        </button>
        <button
          onClick={() => {
            setOpenFilter(false);
          }}
          className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setOpenFilter(false);
            dispatch(productActions.removeFilter());
          }}
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium 
             text-gray-700 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-600 
             hover:border-red-300 active:scale-95"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
