import React from "react";
import useAppStore from "../../hooks/useAppStore";
import { usePrices } from "../../hooks/usePrices";

const DrawingStyleComponent = ({ data }) => {
  const selectedDrawingStyle = useAppStore(state=>state.drawingStyle);
  const setSelectedDrawingStyle = useAppStore(state=>state.setDrawingStyle);
  const setNumberOfPersonTobeDrawn = useAppStore(state=>state.setNumberOfPersonTobeDrawn);
  const {p} = usePrices();
  const handleClick = ()=>{
    setSelectedDrawingStyle(data)
    setNumberOfPersonTobeDrawn(1);
    window.scrollTo({
      top : document.querySelector('.upload-picture').getBoundingClientRect().top + window.scrollY,
      behavior : 'smooth'
    });
  }
  return (
    <div onClick={handleClick} className="flex items-center justify-center flex-col">
      <div
        style={{ background: `url(${data?.images?.at(0)}) center center/cover` }}
        className={`flex cursor-pointer ${data?._id === selectedDrawingStyle?._id?'border-[8px]   border-primary':'hover:border-[2px] hover:border-primary'} transition-all w-[250px] max-lg:h-[200px] max-md:h-[150px] max-xs:h-[120px] max-xs:w-[120px] max-md:w-[150px] max-lg:w-[200px] h-[250px] rounded-full`}
      ></div>
      <div className="text-xl mt-4 text-center max-xs:text-base max-sm:text-lg">{data?.title}</div>
      <div className="text-2xl mt-1 font-[600] max-xs:Text-base text-center max-sm:text-xl flex items-center gap-1">${p(data?.price)} <span className="text-sm ml-1 opacity-80">(per person)</span></div>
    </div>
  );
};

export default DrawingStyleComponent;
