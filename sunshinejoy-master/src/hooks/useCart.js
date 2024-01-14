import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { addItemToCartAPI, deleteCartAPI, getCartAPI, updateCartAPI } from "../api/cart.api";
import useAppStore from "./useAppStore";
import useAuth from "./useAuth";

const useCart = (props={})=>{
    const {updateCartErrorCallback = false, updateCartSuccessCallback = false} = props;
    // const {isLoggedin} = useAuth();
    const isLoggedin = useAppStore(state=>state.isLoggedin);
    const queryClient = useQueryClient();
    const setDrawingStyle = useAppStore(state=>state.setDrawingStyle);
    const setAdditionalComments = useAppStore(state=>state.setAdditionalComments);
    const setNumberOfPersonTobeDrawn = useAppStore(state=>state.setNumberOfPersonTobeDrawn);
    const setSelectedImage = useAppStore(state=>state.setSelectedImage);
    const setProduct = useAppStore(state=>state.setProduct);
    const updateSelectedProducts = useAppStore(state=>state.updateSelectedProducts);

    const setClientState = ()=>{
        let data = queryClient.getQueryData(['cart']);
        if (data && data?.cart && data?.cart?.items?.length>0) {
            console.log('Client state updated')
            let cart = data?.cart;
            let {drawingStyle, additionalComments, numberOfPeople, momentsImage, items} = cart;
            setDrawingStyle(drawingStyle);
            setAdditionalComments(additionalComments);
            setNumberOfPersonTobeDrawn(numberOfPeople);
            setSelectedImage(momentsImage);
            items.forEach(item=>{
                updateSelectedProducts({product : item.product, quantity : item.quantity, content : item.content});
            })
        }
    }



    const {data : cart, isLoading : isFetchCartLoading, isError : isFetchCartError, error : fetchCartError} = useQuery(['cart'],getCartAPI, {
        staleTime : 1000*60,
        cacheTime : 10*60*10000,
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
        enabled : isLoggedin,
        select : (data)=>data?.cart
    });

    useEffect(()=>{
        if (isLoggedin) {
            setClientState();
        }
    }, [cart?._id])

    const {mutate : updateCart,data : updatedCartData, isLoading : isUpdateCartLoading,isError : isUpdateCartError, error : updateCartError} = useMutation(updateCartAPI, {
        onSuccess : (data)=>{
            let currentData = queryClient.getQueryData(['cart']);
            queryClient.setQueryData(['cart'],{
                ...currentData,
                cart : data.cart
            });
            if (updateCartSuccessCallback) updateCartSuccessCallback(data);
        },
        onError : (error)=>{
            toast.error(error?.response?.data?.message || 'Something went wrong!');
            if (updateCartErrorCallback) updateCartErrorCallback(error);
        },
    });

    const { mutate: addItemToCart, data: addedItemData, isLoading: isAddItemLoading, error: addItemError } = useMutation(
        addItemToCartAPI,
        {
          onSuccess: (data) => {
            let currentData = queryClient.getQueryData(["cart"]);
            queryClient.setQueryData(["cart"], {
              ...currentData,
              cart: data.cart,
            });
            // You can perform additional actions after adding an item to the cart
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to add item to the cart!");
            // You can handle the error or perform additional actions
          },
        }
      );
      
    const {mutate : deleteCart, data : deleteCartData,isLoading : isDeleteCartLoading, error : deleteCartError } = useMutation(deleteCartAPI, {
        onSuccess : (data)=>{
            queryClient.setQueryData(['cart'],null);
            toast.success('Deleted Cart successfully!');
        },
        onError : (data)=>{
            toast.error(data?.response?.data?.message || 'Something went wrong!');
        }
    });




    return {
        cart : cart || {},
        isFetchCartLoading,
        isFetchCartError,
        fetchCartError,
        isUpdateCartLoading,
        isUpdateCartError,
        updateCartError,
        setClientState,
        updateCart,
        addItemToCart,
        setClientState,
        items : cart?.items || [],
        total : cart?.total || 0,
        totalItems : cart?.items?.length || 0,
        deleteCart,
        deleteCartData,
        deleteCartError,
        isDeleteCartLoading
    }


}

export default useCart;