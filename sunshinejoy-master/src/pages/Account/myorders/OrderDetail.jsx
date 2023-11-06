import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCheck2 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from "polotno/model/store";

import AccountLayout from "../../../components/Account/AccountLayout";
import ErrorState from "../../../components/Account/ErrorState";
import BasicModal from "../../../components/common/BasicModal";
import { useFetchGift } from "../../../hooks/useGifts";
import { getImageLinkFromTemplate } from "../../../utils/functions/getImageLinkFromTemplate";
import CustomLightBox from "../../../components/Account/CustomLightBox";
import { createImageSlides } from "../../../utils/functions/createImageSlides";
import { usePrices } from "../../../hooks/usePrices";
// AccountLayout

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T",
  // showCredit: true,
});

export const OrderItem = ({ data }) => {
  const {f,p} = usePrices();
  const [selectedData,setSelectedData] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [isOpen,setIsOpen] = useState(false);
  const showImg = async()=>{
    try {
      console.log(data?.content)
    setIsLoading(true);
    const slides = await createImageSlides(data?.content,data?.product?.title,store);
    setSelectedData(slides);
    setIsOpen(true)
    }catch(err) {
      console.log(err);
      toast.error('Image unavailable')
    }finally {setIsLoading(false)}
  }
  return (
    <div className="flex justify-between items-center p-1 px-2 border-[1px] rounded-md">
    <div className="hidden"><Workspace pageControlsEnabled={false} store={store} /></div>
    <CustomLightBox isOpen={isOpen} handleClose={()=>{
      setSelectedData(null)
      setIsOpen(false);
    }} slides={selectedData}/>
    <div className="flex items-center space-x-5 ">
      <div className="p-1">
        <img
          alt="product"
          src={data?.product?.images?.at(0)}
          className="h-[50px] object-contain w-[50px]"
        />
      </div>
      <div>
        <div className="font-semibold text-base">{data?.product?.title}</div>
        <div className="text-accent text-xs ">
          Price : {f(p(data?.product?.price))}
        </div>
      </div>
      <hr />
    </div>
    <div className="flex items-center gap-5">
      <div onClick={showImg} className="bg-primary px-3 py-1 rounded-md cursor-pointer text-xs">{isLoading?<CircularProgress size={18} className='text-white' color="inherit"/>:'Design'}</div>
    </div>
    </div>
  );
};

const Order = () => {
  const { id } = useParams();
  const {p,f} = usePrices();
  const {
    fetchGift: { data, isLoading, error },
  } = useFetchGift({ orderId: id });

  console.log(data, "Order data");

  return (
    <AccountLayout>
      {error ? (
        <ErrorState
          error={error?.response?.data?.message || "Something went wrong!"}
        />
      ) : isLoading ? (
        <div className="h-[60vh] flex items-center justify-center w-full flex-col text-primary">
          <CircularProgress color="inherit" size={45} />
          <div className="text-lg mt-2 text-black">Loading..</div>
        </div>
      ) : (
        <div className="font-default 2xl:px-5">
          <div className="p-2 pb-3 border-b-[2px] ">
            <div className="text-sm text-gray-500 font-semibold">
              #{data?._id?.substr(0, 10)}
            </div>
            <div className="mt-1 text-2xl font-bold font-poppins ">
              ORDER DETAILS
            </div>
          </div>
          <div className="mt-3 p-2">
            <div className="font-semibold text-lg">Items in this Order</div>
            <div className="mt-2 space-y-3">
              {data?.items?.map((item) => (
                <OrderItem key={item._id} data={item} />
              ))}
            </div>
          </div>
          <div className="mt-3 p-2">
            <div className="font-semibold text-lg">Drawing Style</div>
            <div className="mt-2 flex items-center p-1 rounded-md border-[1px] justify-between">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    background: `url(${data?.drawingStyle?.images?.at(
                      0
                    )}) center center/cover`,
                  }}
                  className="w-[50px] bg-gray-200 rounded-full h-[50px]"
                ></div>
                <div>
                  <div className="text-base font-semibold">
                    {data?.drawingStyle?.title}
                  </div>
                  <div className="text-gray-500 text-sm">
                    Price: ${p(data?.drawingStyle?.price)} * {data?.numberOfPeople}{" "}
                    (People) = 
                    {f(p(+data?.drawingStyle?.price * +data?.numberOfPeople))}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 p-2">
            <div className="font-semibold text-lg">Order Summary</div>
            <div className="mt-3">
              <div className="justify-between flex">
                <div>Items Subtotal(3) : </div>
                <div>{f(p(data?.subTotal))}</div>
              </div>
              <div className="justify-between flex">
                <div>Delivery Charges : </div>
                <div>{f(p(data?.total - data?.subTotal))}</div>
              </div>
              <div className="justify-between flex mt-3">
                <div className="font-bold">Grand Total : </div>
                <div className="font-bold">{f(p(data?.total))}</div>
              </div>
            </div>
          </div>
         {data?.additionalComments&&<div className="mt-5 p-2">
            <div className="text-lg font-semibold">Additional Comments</div>
            <div className="mt-1">
              <div className="text-base opacity-70">{data?.additionalComments}</div>
            </div>
          </div>}
          <div className="mt-5 p-2">
            <div className="text-lg font-semibold">Delivery Address</div>
            <div className="mt-2">
              <div className="text-sm font-[600]">
                {data?.customerFirstName} {data?.customerLastName}
              </div>
              <div>{data?.customerEmail} | {data?.customerPhoneNumber}</div>
              <div>{data?.customerAddress}</div>
              <div>
                <span className="font-[600]">Shipping Date: </span>
                {data?.shippingDate}
              </div>
            </div>
          </div>
          <div className="flex mt-7 p-2">
            <div className="px-3 py-1 bg-accent text-white rounded-md">
              Cancel Order
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default Order;
