import React from 'react'

const AuthInput = ({...props}) => {
  return (
    <div className='w-full'>
        <input {...props} className='py-[10px] outline-none border-b-[1px] w-full placeholder:text-[#333] border-black placeholder:text-center bg-[#fde9a1] text-center'/>
    </div>
  )
}

export default AuthInput