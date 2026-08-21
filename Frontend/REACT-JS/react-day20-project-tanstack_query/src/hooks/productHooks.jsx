import { useQuery } from "@tanstack/react-query";
import { getProductDataApi } from "../api/productsApi";
import { useEffect, useState } from "react";

export const useProductsApi = () => {
  const [filteredProducts, setFilteredProducts] = useState(null);

  let { data, isPending, error } = useQuery({
    queryKey: ["product"],
    queryFn: getProductDataApi,
    staleTime: 5000,
  });

  let filterProducts = (searchParams) => {
    let filteredData = data.filter((val) =>
      val.title.toLowerCase().includes(searchParams.toLowerCase()),
    );
    if (filteredData) {
      setFilteredProducts(filteredProducts);
    } 
  };
  useEffect(()=>{
    setFilteredProducts(data)
  },[data])

  return {
    isPending,
    data,
    error,
    filterProducts,
    filteredProducts,
  };
};
