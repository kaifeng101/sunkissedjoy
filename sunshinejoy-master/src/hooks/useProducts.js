import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProductsAPI } from "../api/products.api";
import useAppStore from "./useAppStore";
import { useEffect } from "react";

const useProducts = () => {
  const isLoggedin = useAppStore((state) => state.isLoggedin);
  const queryClient = useQueryClient();

  const setClientState = (data) => {
    // Implement logic to set client state based on the fetched data
    console.log("Setting client state:", data);
  };

  const {
    data: productsData,
    isLoading: isFetchProductsLoading,
    isError: isFetchProductsError,
    error: fetchProductsError,
  } = useQuery(["products"], fetchProductsAPI, {
    staleTime: 1000 * 60, // 1 minute
    cacheTime: 10 * 60 * 10000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 0,
    enabled: isLoggedin,
    select: (data) => data?.products,
  });

  const { mutate: refetchProducts } = useQuery(["products"], () =>
    fetchProductsAPI()
  );

  useEffect(() => {
    if (isLoggedin) {
      setClientState(productsData);
    }
  }, [productsData]);

  const dataFetched = !!productsData;

  return {
    productsData: productsData || [],
    isFetchProductsLoading,
    isFetchProductsError,
    fetchProductsError,
    refetchProducts,
    setClientState,
    dataFetched,
  };
};

export default useProducts;
