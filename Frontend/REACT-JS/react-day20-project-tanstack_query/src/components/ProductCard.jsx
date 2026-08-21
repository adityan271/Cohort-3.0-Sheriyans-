import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Product Image */}
      <div className="flex h-64 items-center justify-center bg-gray-800 p-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">
          {product.title}
        </h2>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-green-400">${product.price}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 rounded-lg bg-gray-800 px-3 py-2">
            <button
              onClick={decreaseQuantity}
              className="text-xl font-bold text-white hover:text-red-400"
            >
              −
            </button>

            <span className="font-semibold text-white">{quantity}</span>

            <button
              onClick={increaseQuantity}
              className="text-xl font-bold text-white hover:text-green-400"
            >
              +
            </button>
          </div>
        </div>

        {/* Add To Cart */}
        <button className="mt-5 w-full rounded-xl bg-white py-3 font-semibold text-gray-900 transition hover:bg-gray-300 active:scale-95">
          Add {quantity} to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
