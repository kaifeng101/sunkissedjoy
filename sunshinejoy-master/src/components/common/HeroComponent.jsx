import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroImg from "../../assets/hero-center.png";
import HomeBanner from "../../assets/homebanner.png";
import Button from "./Button";

const HeroComponent = ({ title, backgroundImage, hideButton, titleClass }) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div
        style={{
          background: `url(${
            backgroundImage || HomeBanner
          }) center center/cover`,
        }}
        className={`${
          hideButton ? "pt-32" : "pt-24 max-md:pt-24 max-sm:mb-40"
        } h-[70vh] max-h-[550px] max-xs:h-[45vh] max-sm:h-[50vh] rounded-xl max-xs:px-3 mb-24  max-xs:mb-36  w-full flex items-center justify-center flex-col`}
      >
        <div
          className={`${
            titleClass || ""
          } text-3xl max-md:text-2xl max-md:w-[90%] max-xs:w-full text-shadow max-xs:text-xl drop-shadow-xl font-extrabold w-[60%] max-xl:w-[80%]  text-center text-white`}
        >
          {title ||
            "Create Your Own Personalized Gifts to Show How Much You Care."}
        </div>
        <div
          className={`${
            hideButton ? "top-[70px]" : "top-[60px] max-sm:top-[30px] "
          } bg-[#ffd98f] rounded-md relative  h-auto flex items-center max-xs:py-4  px-28 max-md:px-20  max-sm:px-12 py-6 justify-center flex-col`}
        >
          <img
            src={HeroImg}
            className={`${hideButton ? "h-[270px] max-sm:h-[200px]" : "h-[210px]"} max-xs:h-[170px] w-auto`}
          />
          {!hideButton && (
            <Button
              primary={false}
              className="mt-5 max-sm:py-[6px] hover:scale-105 transition-all max-xs:mt-3 hover:bg-opacity-80  shadow-md font-[500] max-xs:text-base text-lg w-full"
              onClick={()=>navigate('/shop')}
            >
              <>Start your gift!</>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
