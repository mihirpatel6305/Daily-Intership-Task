import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../feature/CartSlice";

function Detail() {
  const { state: product } = useLocation();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg overflow-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full max-w-sm h-80 object-contain"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-between overflow-auto">
          <div>
            <h2 className="text-2xl font-bold mb-2">{product?.title}</h2>

            <div className="flex items-center gap-4 mb-2 flex-wrap">
              <p className="text-xl font-semibold text-green-600">
                ${product?.price}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 font-bold">
                  ⭐ {product?.rating?.rate}
                </span>
                <span className="text-gray-500">
                  ({product?.rating?.count} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-500 mb-4">Category: {product?.category}</p>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5"
                fill="currentColor"
              >
                <path
                  d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z"
                  data-name="Shopping Cart"
                />
              </svg>
              Add to Cart 
            </button>

            <h3 className="text-gray-700">{product?.description}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
