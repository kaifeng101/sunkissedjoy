import { Button } from "@mui/material";
import React from "react";
import BasicModal from "../common/BasicModal";
import { MdClear } from "react-icons/md";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
const ProductDescriptionModal = ({ data, open, handleClose }) => {
  return (
    <BasicModal open={open} handleClose={handleClose}>
      <div className="w-[80vw] max-xl:w-[90vw] max-lg:w-[95vw] max-h-[95vh] max-sm:px-3 overflow-y-auto py-5 rounded-md px-7">
        <div className="flex items-center justify-between pb-3 border-b-[1px]">
          <h1 className="text-2xl font-bold">Product Description</h1>
          <Button size="sm" color="inherit">
            <MdClear size={22} onClick={handleClose} />
          </Button>
        </div>
        <div className="flex mt-8 gap-16 max-lg:gap-6 max-md:flex-col max-md:gap-1">
          <section className="flex-[0.6] max-xl:flex-[0.65] max-lg:flex-[0.5]">
            <div className="grid max-lg:grid-cols-1 grid-cols-[1fr_3fr] gap-6 max-xl:gap-6">
              <div className="space-y-6 max-lg:order-2 max-lg:justify-center max-md:justify-center max-lg:space-y-0 max-lg:flex max-lg:space-x-4 max-xl:space-y-4">
                {data?.images?.map((img, index) => (
                  <img
                    src={img}
                    key={index}
                    className="w-full max-lg:h-[100px] max-lg:w-[100px] h-[200px]"
                  />
                ))}
              </div>
              <div className="w-full max-lg:order-1 max-lg:h-[550px] max-xs:h-[450px] h-[520px]">
                <img
                  src={data?.images?.at(0)}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </section>
          <section className="flex-[0.45] max-md:mt-7">
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
              <div className="text-3xl font-semibold">${data?.price} SGD</div>
              <div className="text-sm w-[70%] mt-1 opacity-80">
                Or $5.63 x 3 monthly installments. No interest fees with{" "}
                <span className="font-semibold text-base">SHOPBACK</span>
              </div>

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
    </BasicModal>
  );
};

export default ProductDescriptionModal;
