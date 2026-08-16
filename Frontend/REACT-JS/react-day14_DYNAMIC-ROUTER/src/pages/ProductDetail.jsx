import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProductDetail = () => {
  const [singleProductData, setSingleProductData] = useState({});
  console.log(singleProductData);
  let { id } = useParams();
  let getSingleProductData = async () => {
    try {
      let res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setSingleProductData(res.data);
    } catch (error) {
      console.log("Detail Error in api", error);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, []);

  return (
    <div className="min-h-[90%] bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Product Details */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative flex h-125 items-center justify-center bg-linear-to-br from-gray-50 via-white to-indigo-50 p-10">
              <div className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 shadow-sm">
                Product
              </div>

              <img
                src={singleProductData.image}
                alt={singleProductData.title}
                className="h-[85%] w-[85%] object-contain drop-shadow-xl transition duration-500 hover:scale-105"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col p-8 lg:p-12">
              {/* Category */}
              <span className="mb-5 w-fit rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-indigo-600">
                {singleProductData.category}
              </span>

              {/* Title */}
              <h1 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-gray-900 lg:text-4xl">
                {singleProductData.title}
              </h1>

              {/* Rating */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-yellow-100 bg-yellow-50 px-4 py-2.5">
                  <span className="text-xl text-yellow-400">★</span>

                  <span className="font-bold text-gray-900">
                    {singleProductData.rating?.rate}
                  </span>
                </div>

                <span className="text-sm font-medium text-gray-500">
                  {singleProductData.rating?.count} reviews
                </span>
              </div>

              {/* Price */}
              <div className="mt-8">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Price
                </p>

                <p className="text-4xl font-black tracking-tight text-gray-900">
                  ${singleProductData.price}
                </p>
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-gray-100" />

              {/* Description */}
              <div>
                <h2 className="text-lg font-bold text-gray-900">Description</h2>

                <p className="mt-3 max-w-xl text-[15px] leading-7 text-gray-500">
                  {singleProductData.description}
                </p>
              </div>

              {/* Add To Cart */}
              <button
                onClick={() => console.log("Added:", product)}
                className="mt-9 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-4.5 text-lg font-bold text-white shadow-lg shadow-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-100 active:translate-y-0 active:scale-[0.98]"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
