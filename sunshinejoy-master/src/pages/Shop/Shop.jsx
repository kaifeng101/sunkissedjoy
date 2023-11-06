import React, { useEffect, useState } from "react";
import HeroComponent from "../../components/common/HeroComponent";
import Stepper from "../../components/common/Stepper";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Shop/ProductCard";
import ProductDetail from "../../components/Shop/ProductDetail";
import ProductGroup from "../../components/Shop/ProductGroup";
import RecommendedProductsGroup from "../../components/Shop/RecommendedProductsGroup";
import useAppStore from "../../hooks/useAppStore";
import useContent from "../../hooks/useContent";
import { HomeSecondaryBannerImg } from "../../utils/Assets";
import { scrollSmoothly } from "../../utils/functions/scrollSmoothly";


const Shop = () => {
  // const [currentProduct, setCurrentProduct] = useState(false);
  const currentShopStep = useAppStore(state=>state.currentShopStep)
  const clearCartDetails = useAppStore(state=>state.clearCartDetails);
  const {products : PRODUCTS_DATA} = useContent();
  const setCurrentProduct = useAppStore(state=>state.setProduct);
  const currentProduct =useAppStore(state=>state.product);

  useEffect(()=>{
    if (currentProduct) {
      scrollSmoothly('.start-content')
    }
  }, [currentProduct])

  useEffect(()=>{
    clearCartDetails('.start-content');
  }, [])


  return (
    <Layout>
      <HeroComponent
        hideButton={true}
        backgroundImage={HomeSecondaryBannerImg}
        title="Create your Gift in 3 Simple Steps!"
      />
      <div className="px-20 start-content max-xs:mt-28 max-xl:px-10 max-lg:px-7 max-xs:px-3 mt-10 max-content-width">
      <Stepper activeValue={currentShopStep} />
        {currentProduct ? (
          <>
          <ProductDetail data={currentProduct}/>
          <div className="mt-24">
            <RecommendedProductsGroup setCurrentProduct={setCurrentProduct} products={PRODUCTS_DATA?.filter(product=>product?._id !== currentProduct?._id)} />
          </div>
          </>
        ) : (
          <>
            <div className="mt-12">
              <ProductGroup setCurrentProduct={setCurrentProduct} products={PRODUCTS_DATA} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Shop;
