import React from "react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useProductsApi } from "../hooks/productHooks";
import Filters from "../components/Filters";

const ShopPage = () => {
  let { isPending, data, error,filteredProducts} = useProductsApi();

  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="min-h-screen bg-black p-10">
      <Filters />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isPending
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ShopPage;
