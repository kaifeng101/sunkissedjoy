import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { ControllerButton, SWIPER_PARAMS } from "../Home/Testimonials";
import ProductCard from "./ProductCard";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
const RecommendedProductsGroup = ({ products,setCurrentProduct }) => {
  return (
    <div className="relative">
      <ControllerButton className="swiper-prev-btn -translate-x-[50%] shadow-lg hover:shadow-xl left-0 z-[100] ml-10" />
      <ControllerButton
        className="swiper-next-btn translate-x-[50%] shadow-lg hover:shadow-xl right-0 z-[100] mr-10"
        isNext={true}
      />
      <Swiper loop={true} slidesPerView={1} breakpoints={{600 : {slidesPerView : 2}, 900 : {slidesPerView : 3}}}  navigation={{nextEl : '.swiper-next-btn', prevEl : '.swiper-prev-btn'}} {...SWIPER_PARAMS}>
        {products?.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard handleClick={()=>setCurrentProduct(product)} data={product}  />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendedProductsGroup;
