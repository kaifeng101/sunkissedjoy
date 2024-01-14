import { TextField } from "@mui/material";
import React from "react";
import useAppStore from "../../hooks/useAppStore";
import useCart from "../../hooks/useCart";
import { usePrices } from "../../hooks/usePrices";
import { TEST_CART_IMAGE } from "../../utils/Assets";
import { formatNumbers } from "../../utils/functions/formatNumbers";
import Button from "../common/Button";
import CheckoutCartItem from "./CheckoutCartItem";



export const CheckoutDrawingStyleComponent = ({data,numberOfPeople})=>{
  const {p,f} = usePrices();
  return (
    <div className="flex py-3 border-b-[1px] items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-[50px] h-[50px] rounded-full" style={{background : `url(${data?.images?.at(0)}) center center/cover`}}></div>
        <div>
          <div className="text-base font-[600]">{data?.title} <span className="font-bold">(${(p(data?.price))})</span></div>
          <div className="text-sm opacity-70 mt-[2px]">{numberOfPeople} People</div>
        </div>
      </div>
      <div className="text-lg font-semibold">{f(p(formatNumbers((+data?.price)*numberOfPeople)))}</div>
    </div>
  )
}

const CartAndTotal = ({handleCheckout,fastService,isLoading}) => {
  const {cart} = useCart();
  const {p,f} = usePrices();
  console.log(cart);
  return (
    <div className="bg-primary relative max-md:rounded-md max-md:order-1 bg-opacity-5 h-auto py-5  px-6 max-sm:px-3 w-full">
      <div className="">Products</div>
      <div className="space-y-5 mt-1">
        {cart?.items?.map(item=>(
          <CheckoutCartItem data={item}/>
        ))}
      </div>
      <div className="mt-7">Drawing Style</div>
      <div className="mt-2">
        <CheckoutDrawingStyleComponent data={cart?.drawingStyle} numberOfPeople={cart?.numberOfPeople}/>
      </div>
      <div className="mt-10 max-sm:mt-7 flex items-center gap-4">
        <div className="w-full">
          <input
            className="w-full py-[10px] max-sm:py-[6px] border-[1px] px-3 rounded-md"
            placeholder="Apply Coupon"
          />
        </div>
        <Button className="py-[10px] max-sm:py-[6px]">Apply</Button>
      </div>
      <div className="mt-10 max-sm:mt-7 border-t-[1px] text-gray-600 space-y-2 py-4 border-[#0000003c] border-b-[1px]">
        <div className="flex items-center text-base justify-between w-full">
            <div className="font-[400] ">Subtotal</div>
            <div className="font-[500] ">{f(p(formatNumbers(cart?.total)))}</div>
        </div>
        <div className="flex items-center text-base justify-between w-full ">
            <div className="font-[400] ">Shipping</div>
            <div className="font-[500]">{f(p(3.54))}</div>
        </div>
        {fastService&&<div className="flex text-base items-center justify-between w-full ">
            <div className="font-[400]">Fast Service (Additional)</div>
            <div className="font-[500]">{f(p(10.00))}</div>
        </div>}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Total</div>
        <div className="text-3xl font-bold max-md:text-2xl max-sm:text-xl">{f(p((cart?.total + 3.54+(fastService?10:0))))}</div>
      </div>
      <div className="mt-10"></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button style={{ width: "100%"}} disabled={isLoading} onClick={handleCheckout}>{isLoading?'Loading..':'Checkout'}</Button>
      </div>
    </div>
  );
};

export default CartAndTotal;
