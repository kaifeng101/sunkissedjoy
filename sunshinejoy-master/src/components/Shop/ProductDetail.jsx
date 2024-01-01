import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from 'react';
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

  const [selectedImage, setSelectedImage] = useState(data?.images?.[0]);
  // const handleImageClick = (img) => {
  //   setSelectedImage(img);
  // };

  // Color selector
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color.id);
    // Update the selected image based on the color
    setSelectedImage(color.imageUrl);
  };

  const extractHexCode = (url) => {
    // Extract the hex code from the URL
    const match = url.match(/\/([0-9a-f]{6})\./i);
    return match ? match[1] : null;
  };

  // Create color objects from the hex codes in data?.images URLs
  const colors = data?.images?.map((imageUrl, index) => ({
    id: index + 1,
    name: `Color ${index + 1}`,
    value: extractHexCode(imageUrl),
    imageUrl: imageUrl,
  })) || [];

  // console.log(setCurrentShopStep);
  return (
    <div className="mt-20">
      <div className="flex items-start max-2xl:gap-24 max-xl:gap-10 gap-28 max-md:block">
        <section className="flex-[0.4] max-xl:flex-[0.65] max-lg:flex-[0.5]">
          {/* <div className="grid max-lg:grid-cols-1 grid-cols-[1fr_3fr] gap-16 max-xl:gap-6"> */}
            {/* <div className="space-y-6 m-auto max-lg:order-2 max-lg:justify-center max-md:justify-start max-lg:space-y-0 max-lg:flex max-lg:space-x-4 max-xl:space-y-4 max-h-[620px] overflow-auto">
              {data?.images?.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  className="w-full max-lg:h-[100px] max-lg:w-[100px] h-[200px]"
                  onClick={() => handleImageClick(img)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div> */}
            <div className="w-full max-lg:order-1 max-lg:h-[500px] max-xs:h-[250px] h-[620px] max-w-lg px-10 m-auto">
              <img src={selectedImage} className="w-full h-full object-cover" />
            </div>
          {/* </div> */}
        </section>
        <section className="flex-[0.45] max-md:mt-12 max-lg:mx-10 max-sm:mx-10 max-sm:margin-auto">
          <div className="pb-3 border-b-[3px]">
            <div className="text-xl font-bold">{data?.title}</div>
            <div className="text-md mt-1">{data?.subTitle}</div>
          </div>
          <ul className="mt-10 text-sm opacity-90 space-y-[3px]">
          {
            data?.description?.split('|').map((desc, index) => (
              <li key={index}>{desc.trim()}</li>
            ))
          }
          </ul>

          <div className="mt-10 text-xl font-bold">Material:</div>

          <div className="mt-10 text-xl font-bold flex items-center">
            <div className="mr-4">Color:</div>
            {colors.map((color) => (
              <button
                key={color.id}
                className={`w-7 h-7 flex items-center justify-center mr-1 rounded-full transition-all ${selectedColor === color.id ? 'border-gray-500' : 'border-white-300'}`}
                onClick={() => handleColorClick(color)}
                style={{ backgroundColor: "#" + color.value, borderWidth: "3px" }}
              ></button>
            ))}
          </div>

         
          <div className="mt-8 max-md:mx-auto">
            <div className="text-xl font-semibold">{f(p(data?.price))} </div>
            <div className="text-sm w-[70%] mt-1 opacity-80">
              Or ${p(5.63)} x 3 monthly installments. No interest fees with{" "}
              <span className="font-semibold text-base">SHOPBACK</span>
            </div>
            <Button onClick={handleClick} className="mt-5 text-md max-sm:text-lg max-xs:text-base hover:bg-opacity-80">
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
