import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";

const CaptureComponent = ({
  img,
  title,
  desc,
  disabled,
  onClick,
  selected,
  showOnHover,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={onClick}
      className={`${
        disabled ? "opacity-60" : "hover:scale-105"
      } w-full h-full ${
        selected ? "bg-[#ffd98f] scale-105" : "bg-[#fbf9e6]"
      }  rounded-md relative max-xs:px-6 max-xs:py-4 group  transition-all  cursor-pointer max-xl:px-10 px-24 py-6 max-lg:px-5 flex items-center justify-center flex-col`}
    >
      {showOnHover&&<div className="absolute   top-0 left-0 w-full h-full z-[10] bg-opacity-60 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 bg-white">
        <Button onClick={()=>navigate(`/shop`)} className={"bg-black hover:scale-105 transition-all"}>Start Your Gift</Button>
      </div>}
      <div
        className="h-[300px] w-[280px] max-xs:h-[280px]"
        style={{ background: `url(${img}) center center/cover` }}
      ></div>
      <div className="mt-6 text-2xl max-xs:text-xl text-center font-semibold">
        {title}
      </div>
      <div className="opacity-80 mt-2 max-xs:text-sm font-[400] text-base text-center">
        {desc}
      </div>
    </div>
  );
};

export default CaptureComponent;
