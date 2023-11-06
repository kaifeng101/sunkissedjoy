import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../common/Button'

const ExpressComponent = ({title,img,showOnHover}) => {
  const navigate = useNavigate();
  return (
    <div className='w-full cursor-pointer relative group hover:bg-opacity-80 hover:bg-[#ffd187] transition-all bg-[#FBF9E6] px-20 max-lg:px-10 py-6 rounded-md flex items-center justify-center flex-col'>
      {showOnHover&&<div className="absolute top-0 left-0 w-full h-full z-[10] bg-opacity-60 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 bg-white">
        <Button onClick={()=>navigate('/shop')} className={"bg-black hover:scale-105 transition-all"}><>Start Your Gift</></Button>
      </div>}
        <div className='text-2xl group-hover:text-white transition-all'>{title}</div>
        <div className='mt-6 max-xs:h-[300px] h-[400px] max-md:h-[250px] w-full max-lg:h-[350px] group-hover:border-white group-hover:border-[1px] transition-all group-hover:rounded-md' style={{background : `url(${img}) center center/cover`}}></div>
    </div>
  )
}

export default ExpressComponent