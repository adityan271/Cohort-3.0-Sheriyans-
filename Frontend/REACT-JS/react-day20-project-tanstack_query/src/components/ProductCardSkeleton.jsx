import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm animate-pulse overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-lg">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-800"></div>

      {/* Content Skeleton */}
      <div className="p-5">
        {/* Title */}
        <div className="mb-4 h-6 w-3/4 rounded bg-gray-700"></div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="h-8 w-20 rounded bg-gray-700"></div>

          {/* Quantity */}
          <div className="h-10 w-32 rounded-lg bg-gray-700"></div>
        </div>

        {/* Button */}
        <div className="mt-5 h-12 w-full rounded-xl bg-gray-700"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
