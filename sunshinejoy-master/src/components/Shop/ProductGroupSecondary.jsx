import React from "react";
import useAppStore from "../../hooks/useAppStore";
import ProductCard from "./ProductCard";

const ProductGroupSecondary = ({ products,setCurrentSelectedProduct }) => {
  const selectedProducts = useAppStore((state) => state.selectedProducts);
  const getProductQuantityById = useAppStore(state=>state.getProductQuantityById);
  const updateSelectedProducts = useAppStore((state) => state.updateSelectedProducts);

  const handleProductClick = (product)=>{
    const quantity = getProductQuantityById(product._id);
    console.log(product,quantity);
    if (quantity === 0) return updateSelectedProducts({product, quantity : 1});
    else return updateSelectedProducts({product,quantity : 0});
  }

  const handleUpdateQuantity = (product,quantity)=>{
    updateSelectedProducts({product,quantity});
  }

  return (
    <div className="grid grid-cols-3 max-xl:gap-10 max-lg:grid-cols-2 max-lg:gap-6 max-lg:gap-y-10 max-sm:grid-cols-1 max-sm:gap-12 gap-24">
      {products.map((product, index) => (
        <ProductCard
        imageClick={() => setCurrentSelectedProduct(product)}
          key={index}
          isQuantity={true}
          data={product}
          handleUpdateQuantity = {(quantity)=>{
            handleUpdateQuantity(product,quantity);
          }}
          quantity={getProductQuantityById(product._id)}
        />
      ))}
    </div>
  );
};

export default ProductGroupSecondary;
