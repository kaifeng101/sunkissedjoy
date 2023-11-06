import { useMutation } from "@tanstack/react-query"
import { placeOrderAPI } from "../api/order.api"

export default function useOrder(props={}) {
    const {placeOrderSuccessCallback, placeOrderErrorCallback} = props
    const {mutateAsync : placeOrder, isLoading : isPlaceOrderLoading, data : placeOrderData, error : placeOrderError} = useMutation(placeOrderAPI, {
        onSuccess: (data)=>{
            placeOrderSuccessCallback && placeOrderSuccessCallback(data)
        },
        onError: (error)=>{
            placeOrderErrorCallback && placeOrderErrorCallback(error)
        }
    });

    return {
        placeOrder,
        isPlaceOrderLoading,
        placeOrderData,
        placeOrderError
    }

}