import React from 'react'
import { Link } from 'react-router-dom';
import { NoProductSVG } from '../../utils/Assets';
import Button from '../common/Button';
const EmptyCart = ({height,className}) => {
  return (
    <div style={{height : height || '40vh'}} className={` w-full flex items-center justify-center flex-col ${className || ''}`}>
        <img src={NoProductSVG} className='h-[70%] w-auto'/>
        <div className='mt-5 text-xl'>Oops! Seems like your cart is empty.</div>
        <Button className={'mt-3'}><Link to='/shop'>Shop Now!</Link></Button>
    </div>
  )
}

export default EmptyCart