import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast";
import { stripeCheckoutSessionAPI } from "../api/order.api"

export const useStripe = ()=>{
    const stripeCall = useMutation(stripeCheckoutSessionAPI, {
        onSuccess: (data)=>{
            window.open(data?.url);
        },
        onError : (err)=>{
            toast.error(err?.response?.data?.message || 'Something went wrong');
        }
    });
    

    return {
        stripeCall
    }
}