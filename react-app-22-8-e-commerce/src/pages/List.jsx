import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { productActions } from "../feature/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Filter from "../components/filter";
import { useState } from "react";

function List() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts || []
  );

  if (products) {
    dispatch(productActions.setProductList(products));
  }

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error:{error?.message}</div>;
  }

  return (
    <div className="relative">
      <div className="relative">
        <button
          onClick={() => setOpenFilter((prev) => !prev)}
          className="absolute top-2 right-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      {openFilter && (
        <div className="absolute top-0 right-0 mt-2 mr-2 z-50">
          <Filter setOpenFilter={setOpenFilter} />
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-around">
        {(filteredProducts.length > 0 ? filteredProducts : products).map(
          (product, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/detail/${product?.id}`, { state: product });
              }}
            >
              <ProductCard product={product} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default List;
