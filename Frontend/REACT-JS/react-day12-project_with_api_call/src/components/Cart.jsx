import React from "react";

const Cart = ({ product }) => {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#1a1d20] p-6">
      <div className="flex w-full items-center gap-8">
        {/* IMAGE */}
        <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-xl bg-[#222529] p-5">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm capitalize text-blue-400">
            {product.category}
          </span>

          <h2 className="mt-3 text-xl font-bold text-white">{product.title}</h2>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
            {product.description}
          </p>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-yellow-500/10 px-3 py-2">
              <span className="text-xl text-yellow-400">★</span>

              <span className="font-bold text-white">
                {product.rating?.rate}
              </span>
            </div>

            <span className="text-sm text-gray-500">
              {product.rating?.count} reviews
            </span>
          </div>
        </div>

        {/* PRICE + REMOVE */}
        <div className="flex w-32 shrink-0 flex-col items-end gap-5">
          <div>
            <p className="text-xs uppercase text-gray-500">Price</p>

            <p className="mt-1 text-2xl font-bold text-white">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <button className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
