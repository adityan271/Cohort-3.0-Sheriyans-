import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="flex h-64 items-center justify-center bg-gray-50 p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        <span className="mb-2 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="line-clamp-2 min-h-14 text-lg font-bold text-gray-800">
          {product.title}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-yellow-500">★</span>

          <span className="text-sm font-semibold text-gray-700">
            {product.rating.rate}
          </span>

          <span className="text-sm text-gray-400">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price + Button */}
        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <div>
            <p className="text-xs text-gray-400">PRICE</p>
            <p className="text-2xl font-extrabold text-gray-900">
              ${product.price}
            </p>
          </div>

          <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
