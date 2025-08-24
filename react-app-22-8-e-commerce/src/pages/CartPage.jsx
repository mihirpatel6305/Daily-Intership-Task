import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../feature/CartSlice";

function CartPage() {
  const cartProduct = useSelector((state) => state.cart.products || []);
  const dispatch = useDispatch();

  return (
    <>
      {cartProduct.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-around">
          {cartProduct.map((product, index) => (
            <div
              key={index}
              className="w-full max-w-2xl mx-auto my-6 p-4 bg-white shadow-md rounded-lg"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                <div className="flex justify-center items-center md:w-1/2">
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-32 md:w-40 h-32 md:h-40 object-contain"
                  />
                </div>

                <div className="flex flex-col md:w-1/2 gap-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg md:text-xl font-bold">
                      {product?.title}
                    </h2>
                    <p className="text-lg md:text-xl font-semibold text-green-600">
                      ${product?.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {product?.quantity > 1 ? (
                      <button
                        className="px-2 py-1 bg-gray-300 rounded"
                        onClick={() =>
                          dispatch(cartActions.decreaseQuantity(product.id))
                        }
                      >
                        -
                      </button>
                    ) : (
                      <button
                        className="px-2 py-1 bg-gray-300 rounded"
                        onClick={() =>
                          dispatch(cartActions.removeFromCart(product.id))
                        }
                      >
                        ❌
                      </button>
                    )}

                    <p className="text-gray-700">{product.quantity}</p>

                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() =>
                        dispatch(cartActions.increaseQuantity(product.id))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-64 text-gray-500">
          <span className="text-5xl mb-4">🛒</span>
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="text-sm">Start adding products to see them here</p>
        </div>
      )}
    </>
  );
}

export default CartPage;