function ProductCard({ product }) {
  return (
    <div className="border-2 rounded-lg p-4 w-64 h-80 flex flex-col items-center justify-between shadow-md">
      <div className="h-32 w-full flex items-center justify-center overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="max-h-full object-contain"
        />
      </div>
      <p className="text-sm font-semibold text-center">{product?.title}</p>
      <p className="text-lg font-bold text-green-600">${product?.price}</p>
      <div className="flex justify-between w-full text-sm">
        <span>⭐ {product?.rating?.rate}</span>
        <span>({product?.rating?.count} reviews)</span>
      </div>
    </div>
  );
}

export default ProductCard;
