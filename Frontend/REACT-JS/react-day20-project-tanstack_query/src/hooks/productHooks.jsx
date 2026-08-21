import { useQuery } from "@tanstack/react-query";
import { getProductDataApi } from "../api/productsApi";

export const useProductsApi = () => {
  let { data, isPending, error } = useQuery({
    queryKey: ["product"],
    queryFn: getProductDataApi,
    staleTime: 5000,
  });
  return {
    isPending,
    data,
    error,
  };
};
