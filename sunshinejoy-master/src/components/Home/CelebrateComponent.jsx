import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../common/Button'

const CelebrateComponent = ({img,title,showOnHover}) => {
  const navigate = useNavigate();
  return (
    <div className='w-full relative max-w-[400px] group mx-auto group'>
      {showOnHover&&<div className="absolute top-0 left-0 w-full h-full z-[10] bg-opacity-60 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 bg-white">
        <Button onClick={()=>navigate('/shop')} className={"bg-black py-[7px] hover:scale-105 transition-all text-sm px-3"}><>Start Your Gift</></Button>
      </div>}
        <div className='w-full h-[320px] cursor-pointer group-hover:scale-105 transition-all rounded-md' style={{background : `url(${img}) center center/cover`}}></div>
        <div className='mt-3 text-xl text-center '>{title}</div>
    </div>
  )
}

export default CelebrateComponent