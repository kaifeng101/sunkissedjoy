import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import useAppStore from "../../hooks/useAppStore";
import useAuth from "../../hooks/useAuth";
import { usePrices } from "../../hooks/usePrices";
import Button from "../common/Button";
import RecommendedProductsGroup from "./RecommendedProductsGroup";

const ProductDetail = ({ data }) => {
  const setCurrentShopStep = useAppStore(state=>state.setCurrentShopStep);
  const setShowAuthModal = useAppStore(state=>state.setShowAuthModal);
  const {p,f} = usePrices();
  // const {isLoggedin} = useAuth();
  const isLoggedin = useAppStore(state=>state.isLoggedin);
  const handleClick = ()=>{
    console.log(isLoggedin);
    if (!isLoggedin) {
    setShowAuthModal(true);
    toast.error('Please login to continue your purchase');
    return;
    }
    setCurrentShopStep(1)
  }

  // console.log(setCurrentShopStep);
  return (
    <div className="mt-12">
      <div className="flex items-start max-2xl:gap-24 max-xl:gap-10 gap-28 max-md:block">
        <section className="flex-[0.6] max-xl:flex-[0.65] max-lg:flex-[0.5]">
          <div className="grid max-lg:grid-cols-1 grid-cols-[1fr_3fr] gap-16 max-xl:gap-6">
            <div className="space-y-6 max-lg:order-2 max-lg:justify-center max-md:justify-start max-lg:space-y-0 max-lg:flex max-lg:space-x-4 max-xl:space-y-4">
              {data?.images?.map((img, index) => (
                <img src={img} key={index} className="w-full max-lg:h-[100px] max-lg:w-[100px] h-[200px]" />
              ))}
            </div>
            <div className="w-full max-lg:order-1 max-lg:h-[500px] max-xs:h-[450px] h-[620px]">
              <img src={data?.images?.at(0)} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
        <section className="flex-[0.45] max-md:mt-12">
          <div className="pb-3 border-b-[3px]">
            <div className="text-3xl font-bold">{data?.title}</div>
            <div className="text-xl max-xl:text-lg">{data?.subTitle}</div>
          </div>
          <ul className="mt-4 text-lg opacity-80 space-y-[3px]">
            <li>A4 Size Card</li>
            <li>3D popup features</li>
            <li>1x Personalized illustration desgin</li>
            <li>1x Background design</li>
            <li>Unlimited personalized message</li>
            <li>Free delivery</li>
          </ul>
         
          <div className="mt-8">
            <div className="text-3xl font-semibold">{f(p(data?.price))} </div>
            <div className="text-sm w-[70%] mt-1 opacity-80">
              Or ${p(5.63)} x 3 monthly installments. No interest fees with{" "}
              <span className="font-semibold text-base">SHOPBACK</span>
            </div>
            <Button onClick={handleClick} className="mt-5 text-xl max-sm:text-lg max-xs:text-base hover:bg-opacity-80">
              Start designing product
            </Button>
            <div className="mt-8">
              <div className="">Share on social media</div>
              <div className="flex items-center mt-2 gap-3">
                <AiOutlineInstagram
                  className="hover:text-primary cursor-pointer"
                  size={32}
                />
                <AiOutlineFacebook
                  className="hover:text-primary cursor-pointer"
                  size={30}
                />
                <FaTiktok
                  className="hover:text-primary cursor-pointer"
                  size={25}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
