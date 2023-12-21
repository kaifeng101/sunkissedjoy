import React from 'react'
import useAppStore from '../../hooks/useAppStore'
import QuantitySelector from '../common/QuantitySelector'

const NewProductCard = (props) => {
  const {data,handleClick = ()=>{},imageClick=()=>{}, isQuantity=false,quantity=0,handleUpdateQuantity = ()=>{}} = props

  return (
    <div onClick={handleClick} className='w-full cursor-pointer group'>
        <div onClick={imageClick} className={`${quantity>0?'border-[6px] border-black':''} w-full h-[200px] group-hover:p-2 transition-all rounded-md`}>
            <img src={data?.images?.at(0)} className='h-full  w-full object-cover rounded-md'/>
        </div>
        <div className='mt-3 text-lg font-semibold group-hover:scale-105 transition-all'>{data?.title}</div>
        <div className='flex mt-1'>
          <div className='text-md font-[400] line-through'>${data?.originalPrice}</div>
          <div className='text-md font-[400] ml-5'>From <b>${data?.price}</b></div>
        </div>
        {isQuantity&&<div className='mt-2 justify-center flex'>
          <QuantitySelector value={quantity} setValue={handleUpdateQuantity}/>
        </div>}
    </div>
  )
}

export default NewProductCard