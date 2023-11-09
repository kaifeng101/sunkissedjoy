import React from "react";
import { MdArrowBack } from "react-icons/md";

import AccountLayout from "../../../components/Account/AccountLayout";
import { useFetchGifts } from "../../../hooks/useGifts";

import noDraftSVG from "../../../assets/no-drafts.svg";
import ErrorState from "../../../components/Account/ErrorState";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePrices } from "../../../hooks/usePrices";

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const {p,f} = usePrices();
  return (
    <>
      <div className="lg:hidden  flex items-center p-2 space-x-4">
        <div className="p-1 border-2 rounded-md">
          <img
            alt="product"
            src={order?.items?.at(0)?.product?.images?.at(0)}
            className="w-[70px] object-contain h-[70px]"
          />
        </div>
        <div>
          <div className="font-semibold ">
            {order?.items?.at(0)?.product?.title}{" "}
            {order?.items?.length > 1
              ? ` and ${order?.items?.length - 1} more items`
              : ""}
          </div>
          <div className="text-sm text-gray-400">
            Shipping Date {order?.shippingDate}
          </div>
          {/* <div className='text-xs  text-blue-600'>Status : In Transit</div> */}
        </div>
      </div>
      <div className="hidden lg:block rounded-md font-default border-2">
        <div className="">
          <div className="justify-between p-3 bg-gray-100 text-gray-500 flex items-center">
            <div className="flex space-x-7 items-center text-sm">
              <div className="flex flex-col">
                <div className="">Shipping Date</div>
                <div className="font-semibold">{order?.shippingDate}</div>
              </div>
              <div className="flex flex-col">
                <div>Total</div>
                <div className="font-semibold">{f(p(order?.total))}</div>
              </div>
              <div className="flex flex-col">
                <div>Delivered To</div>
                <div className="font-semibold">
                  {order?.customerFirstName} {order?.customerLastName}
                </div>
              </div>
            </div>
            <div className="flex flex-col text-xs">
              <div>ORDER #{order._id?.substr(0, 10)}</div>
              <div className="text-primary underline">View Order Details</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 mt-1 flex justify-between 3xl:p-5">
          <div>
            <div className="flex space-x-6 mt-3">
              {order?.items?.map(item=>(
                <div>
                <img
                  alt="product"
                  src={item?.product?.images?.at(0)}
                  width={60}
                  className='object-contain w-[60px] h-[60px]'
                  height={60}
                />
              </div>
              ))}
            </div>
            <div className="mt-2 text-sm">
              {order?.items?.length} Items in this Order
            </div>
          </div>
          <div>
            <div
              onClick={() => navigate(`/account/mygifts/${order._id}`)}
              className="text-xs cursor-pointer px-4 py-[2px] border-2 rounded-md shadow-lg xl:text-sm  2xl:px-8 "
            >
              View Order
            </div>
          </div>
        </div>
      </div>
      <hr className="lg:hidden" />
    </>
  );
};

const Orders = () => {
  const {
    fetchGifts: { data: giftData, isLoading, error },
  } = useFetchGifts();
  const navigate = useNavigate();
  
  return (
    <AccountLayout>
      <div className="p-3 font-poppins lg:p-4">
        <div className="text-2xl font-semibold flex items-center gap-4">
          <MdArrowBack onClick={()=>navigate('/account')} className="hidden max-md:block" /> MY GIFTS
        </div>
        <div className="w-[5%] mt-1 h-[5px] bg-primary"></div>
        <div className="mt-4 flex space-x-3 items-center">
          <div className="w-[100%]">
            <input
              type="text"
              className="text-sm border-2 outline-none w-[100%] lg:p-2 p-[6px] rounded-md"
              placeholder="Search All Orders"
            />
          </div>
          <div>
            <select
              name="filterOrders"
              className="border-2 lg:p-[7px] p-1 rounded-md"
              id="filterOrder"
            >
              <option value="AllOrders">All Orders</option>
              <option value="Active Orders">Active Orders</option>
              <option value="Active Orders">Delivered Orders</option>
              <option value="cancelledOrders">Cancelled Orders</option>
            </select>
          </div>
        </div>
        <hr className="lg:hidden" />
        {error ? (
          <ErrorState />
        ) : isLoading ? (
          <div className="w-full flex-col text-primary h-[50vh] flex items-center justify-center">
            <CircularProgress color="inherit" />
            <div className="text-center mt-2 text-base text-black">
              Loading..
            </div>
          </div>
        ) : giftData?.length === 0 ? (
          <div className="w-full h-[300px] flex items-center justify-center mt-16 flex-col">
            <img src={noDraftSVG} className="w-[60%] object-contain h-full" />
            <div className="mt-6 text-xl">No Orders Found!</div>
          </div>
        ) : (
          <div className="mt-6 space-y-3 lg:space-y-6">
            {giftData?.map((item) => (
              <OrderItem key={item._id} order={item} />
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Orders;
