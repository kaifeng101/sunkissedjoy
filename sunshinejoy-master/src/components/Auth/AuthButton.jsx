import React from 'react'

const AuthButton = ({title, ...props}) => {
  return (
    <button {...props} className='w-full disabled:opacity-50 py-2 bg-black text-white rounded-sm'>
        {title}
    </button>
  )
}

export default AuthButton