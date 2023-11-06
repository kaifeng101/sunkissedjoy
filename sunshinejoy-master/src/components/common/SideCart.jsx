import { ArrowBack, Delete } from "@mui/icons-material";
import { CircularProgress, Drawer, IconButton, Tooltip } from "@mui/material";
import React from "react";
import useAppStore from "../../hooks/useAppStore";
import { TEST_CART_IMAGE } from "../../utils/Assets";
import Button from "./Button";
// import Button as MuiB from "@mui/material";
import {Button as MuiButton} from "@mui/material";
import useCart from "../../hooks/useCart";
import EmptyCart from "../Checkout/EmptyCart";
import { CheckoutDrawingStyleComponent } from "../Checkout/CartAndTotal";
import { useNavigate } from "react-router-dom";
import { usePrices } from "../../hooks/usePrices";

const CartItem = ({ data }) => {
  const {f,p} = usePrices();
  return (
    <div className="flex items-center justify-between py-3 max-sm:px-0 border-b-[1px] px-2">
      <div className="flex items-center gap-3">
        <div
          className="w-[55px] h-[55px] max-sm:h-[45px] max-sm:w-[45px] rounded-md"
          style={{ background: `url(${data?.product?.images?.at(0)}) center center/cover` }}
        ></div>
        <div>
          <div className="text-lg max-sm:text-base font-[500]">{data?.product?.title}</div>
          <div className=" text-gray-500 max-sm:text-sm max-xs:text-xs underline">
            Quantity : {data?.quantity}
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-sm opacity-50 max-sm:text-xs">
          <strike>{f(p(data?.quantity*data?.price))}</strike>
        </div>
        <div className="text-lg font-[600] max-sm:text-base">{f(p(data?.quantity*data?.price))}</div>
      </div>
    </div>
  );
};

const SideCart = () => {
  const {p,f} = usePrices();
  const showCart = useAppStore((state) => state.showCart);
  const setShowCart = useAppStore((state) => state.setShowCart);
  const navigate = useNavigate();
  const {cart,isFetchCartLoading,totalItems, deleteCart, isDeleteCartLoading} = useCart();
  const handleCartDelete = ()=>{
    deleteCart();
  }
  return (
    <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}>
      <div className="w-[50vw] relative max-w-[600px] max-lg:w-[60vw] max-md:w-[70vw] max-sm:w-[90vw] max-xs:w-[98vw] h-full p-2 max-xs:px-3 px-6">
        <div className=" py-2 flex justify-between items-center border-b-[1px]">
          <div className="flex items-center gap-3">
            <IconButton
              onClick={() => setShowCart(false)}
              sx={{ color: "black" }}
            >
              <ArrowBack />
            </IconButton>
            <div className="text-2xl font-semibold">Cart</div>
          </div>
          <div className="">
            <Tooltip title='Delete Cart' >
            <MuiButton onClick={handleCartDelete} disabled={(totalItems===0 || isDeleteCartLoading)} variant="contained" sx={{backgroundColor : 'red', "&:hover" : {backgroundColor : 'rgba(255,0,0,0.7)'}}}>{isDeleteCartLoading?<CircularProgress sx={{color : 'white'}} size={20}/>:<Delete/>}</MuiButton>
            </Tooltip>
          </div>
        </div>
        {isFetchCartLoading?<div className="w-full h-[70vh] p-10 flex flex-col items-center justify-center">
            <CircularProgress sx={{color : '#f97b64'}} size={32}/>
            <div className="mt-3 text-lg max-sm:text-sm">Fetching Cart..</div>
        </div>:totalItems===0?(<EmptyCart height={'50vh'} className='mt-24'/>):<>
        <div className="mt-3 text-base px-2">Products</div>
        <div className="mt-2 space-y-3">
         {cart?.items?.map(item=>(<CartItem data={item}/>))}
        </div>
        <div className="mt-6 text-base max-sm:text-sm">Drawing Style</div>
        <div className="mt-1">
            <CheckoutDrawingStyleComponent data={cart?.drawingStyle} numberOfPeople={cart?.numberOfPeople}/>
        </div>
        <div className="mt-7 max-sm:mt-5 flex items-center justify-between">
          <div className="text-lg max-sm:text-base">Total</div>
          <div className="text-2xl max-sm:text-xl  font-[600]">{f(p(cart?.total))}</div>
        </div>
        <div className="mt-10 flex justify-end">
          <Button onClick={()=>{
            setShowCart(false)
            navigate('/checkout')
          }} className={"sm:py-[9px] max-sm:text-sm"}>
            Proceed to checkout!
          </Button>
        </div>
        </>}
      </div>
    </Drawer>
  );
};

export default SideCart;
