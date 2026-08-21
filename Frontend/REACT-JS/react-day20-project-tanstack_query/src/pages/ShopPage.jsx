import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { getProductDataApi } from "../api/productsApi";

const ShopPage = () => {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    let data = await getProductDataApi();
    setProductsData(data);
    setIsLoading(false)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-black p-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ShopPage;
