import React, { useContext } from "react";
import { MyStore } from "../context/MyContext";

const Cart = ({ cartItems }) => {
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  useContext(MyStore);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-10">
      {/* Heading */}
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

        <p className="mt-1 text-gray-500">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
          cart
        </p>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="mt-10 flex min-h-100 flex-col items-center justify-center rounded-2xl bg-white shadow-sm">
            <div className="text-6xl">🛒</div>

            <h2 className="mt-5 text-2xl font-bold text-gray-800">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some products to your cart.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Products */}
            <div className="space-y-4 lg:col-span-2">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row"
                >
                  {/* Product Image */}
                  <div className="flex h-40 w-full items-center justify-center rounded-xl bg-gray-100 p-4 sm:h-32 sm:w-32 sm:shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium capitalize text-blue-600">
                        {item.category}
                      </p>

                      <h2 className="mt-1 line-clamp-2 text-lg font-bold text-gray-800">
                        {item.title}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">★</span>

                        <span className="text-sm font-semibold text-gray-700">
                          {item.rating?.rate}
                        </span>
                      </div>

                      <p className="text-xl font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-95">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
