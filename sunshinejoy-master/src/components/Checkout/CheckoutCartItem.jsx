import React from 'react'
import { usePrices } from '../../hooks/usePrices';
import { TEST_CART_IMAGE } from '../../utils/Assets';
import { formatNumbers } from '../../utils/functions/formatNumbers';

const CheckoutCartItem = ({data}) => {
  const {p,f} = usePrices();
    return (
      <div className="flex items-center justify-between w-full py-[8px] border-b-[1px] border-[#0000003c]">
        <div className="flex items-center gap-4 max-sm:gap-2">
          <div
            className="w-[55px] h-[55px] max-sm:h-[50px] max-sm:w-[50px] rounded-md"
            style={{ background: `url(${data?.product?.images?.at(0)}) center center/cover` }}
          ></div>
          <div>
            <div className="text-lg font-[600] max-sm:text-base">{data?.product?.title}</div>
            <div className="text-sm text-gray-500 max-sm:text-xs">Quantity : {data?.quantity}</div>
          </div>
        </div>
        <div>
          <div className="text-sm opacity-40">
            <strike>{p(16.09)}</strike>
          </div>
          <div className="font-semibold text-lg max-sm:text-base">{f(p(formatNumbers(data?.quantity*data?.price)))}</div>
        </div>
      </div>
    );
  };
export default CheckoutCartItem