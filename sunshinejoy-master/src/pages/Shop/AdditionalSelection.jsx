import React, { useEffect, useState } from "react";
import ProductDescriptionModal from "../../components/AdditionalProducts/ProductDescriptionModal";
import Button from "../../components/common/Button";
import HeroComponent from "../../components/common/HeroComponent";
import Stepper from "../../components/common/Stepper";
import Layout from "../../components/Layout/Layout";
import ProductGroupSecondary from "../../components/Shop/ProductGroupSecondary";
import useAppStore from "../../hooks/useAppStore";
import useContent from "../../hooks/useContent";
import { HomeSecondaryBannerImg } from "../../utils/Assets";
import { scrollSmoothly } from "../../utils/functions/scrollSmoothly";

const AdditionalSelection = () => {
  const { products, } = useContent();
  const selectedProducts = useAppStore((state) => state.selectedProducts);
  const currentShopStep = useAppStore(state=>state.currentShopStep);
  const setCurrentShopStep = useAppStore(state=>state.setCurrentShopStep);
  const [currentSelectedProduct,setCurrentSelectedProduct] = useState(null);
  console.log(currentSelectedProduct, 'Current Selected Product')
  useEffect(()=>{
    scrollSmoothly('.start-content');
  }, [])
  return (
    <Layout>
      <ProductDescriptionModal open={Boolean(currentSelectedProduct)} data={currentSelectedProduct} handleClose={()=>setCurrentSelectedProduct(false)}/>
      <HeroComponent
        hideButton={true}
        backgroundImage={HomeSecondaryBannerImg}
        title="Create your Gift in 3 Simple Steps!"
      />
      <div className="px-20 start-content max-sm:mt-36 max-xs:mt-28 max-xl:px-10 max-lg:px-7 max-xs:px-3 mt-10 max-content-width">
        <Stepper activeValue={1} />
        <div className="mt-12  text-center text-3xl font-semibold w-[50%] max-xl:w-[80%] max-md:w-[90%] max-sm:text-2xl max-sm:w-full mx-auto">
          Would you like to print this Illustration on another product?
        </div>
        <div className="mt-16 max-xs:mt-12">
          <ProductGroupSecondary setCurrentSelectedProduct={setCurrentSelectedProduct} products={products} />
        </div>
        <div className="mt-20 flex gap-6 justify-end">
          <Button className={` ${selectedProducts?.length>1?'hidden':''} bg-gray-500`}>I will give this a miss!</Button>
          <Button onClick={()=>setCurrentShopStep(currentShopStep+1)}>Design Products!</Button>
        </div>
      </div>
    </Layout>
  );
};

export default AdditionalSelection;
