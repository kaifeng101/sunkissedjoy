import React from 'react'
import ProductCard from './ProductCard'



const ProductGroup = ({products,setCurrentProduct}) => {
  return (
    <div className='grid grid-cols-3 max-xl:gap-10 max-lg:grid-cols-2 max-lg:gap-6 max-lg:gap-y-10 max-sm:grid-cols-1 max-sm:gap-12 gap-24 gap-y-16'>
        {products.map((product, index) => (
            <ProductCard handleClick={()=>setCurrentProduct(product)} key={index} data={product}/>
        ))}
    </div>
  )
}

export default ProductGroup