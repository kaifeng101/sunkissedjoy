import React from 'react'
import NewProductCard from './NewProductCard'



const NewProductGroup = ({products,setCurrentProduct}) => {
  return (
    <div className='grid mx-10 grid-cols-6 max-xl:gap-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 max-lg:gap-6 max-lg:gap-y-10 max-sm:gap-12 gap-10 gap-y-16'>
        {products.map((product, index) => (
            <NewProductCard handleClick={()=>setCurrentProduct(product)} key={index} data={product}/>
        ))}
    </div>
  )
}

export default NewProductGroup