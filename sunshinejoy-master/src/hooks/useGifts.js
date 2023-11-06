import { useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { fetchOrderAPI, fetchOrdersAPI } from "../api/order.api"

export const useFetchGifts = ()=>{
    const fetchGifts = useQuery(['orders'], fetchOrdersAPI, {
        onError : (error)=>{
            toast.error(error?.response?.data?.message);
        },
        select : (data)=>data.orders,
        retry : false
    })

    return {
        fetchGifts
    }
}

export const useFetchGift = ({orderId})=>{
    const fetchGift = useQuery(['order', orderId], ()=>fetchOrderAPI({orderId}), {
        onError : (error)=>{
            toast.error(error?.response?.data?.message);
        },
        select  :(data)=>data.order,
        retry : false
    })
    return {
        fetchGift
    }
}