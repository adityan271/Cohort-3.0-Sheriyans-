import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  //dynamic routing
  let navigate = useNavigate();

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div
        // dynamic routing
        onClick={() => navigate(`/detail/${product.id}`)}
        className="flex h-64 items-center justify-center bg-gray-50 p-6"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        <span className="mb-2 w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-600">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="min-h-14 line-clamp-2 text-lg font-bold leading-7 text-gray-900">
          {product.title}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        {/* Price + Rating */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          {/* Price */}
          <div>
            <p className="text-xs font-medium text-gray-400">Price</p>

            <p className="text-2xl font-extrabold text-gray-900">
              ${product.price}
            </p>
          </div>

          {/* Rating */}
          <div className="text-right">
            <p className="text-xs font-medium text-gray-400">Rating</p>

            <div className="mt-1 flex items-center gap-1">
              <span className="text-lg text-yellow-400">★</span>

              <span className="font-bold text-gray-900">
                {product.rating.rate}
              </span>

              <span className="text-xs text-gray-400">
                ({product.rating.count})
              </span>
            </div>
          </div>
        </div>

        {/* Add To Cart */}
        <button
          onClick={() => console.log("Added to cart:", product)}
          className="mt-5 w-full rounded-xl bg-gray-900 py-4 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-indigo-600 hover:shadow-lg active:scale-[0.98]"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
