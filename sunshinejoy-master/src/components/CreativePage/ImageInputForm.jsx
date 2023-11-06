import { CloudUpload } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../hooks/useAppStore";
import {
  ClearResolutionImg,
  EvenLightingImg,
  NoMovementInstructionImg,
} from "../../utils/Assets";
import Button from "../common/Button";

const GridItem = ({ img, text }) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className="h-[250px] max-xl:h-[200px] max-xl:w-[200px] max-md:h-[120px] max-md:w-[120px] max-lg:w-[160px] max-lg:h-[160px] rounded-full w-[250px]"
        style={{ background: `url(${img}) center center/cover` }}
      ></div>
      <div className="text-center mt-3 text-xl max-md:text-base max-lg:text-lg font-[400]">{text}</div>
    </div>
  );
};



const ImageInputForm = () => {
  const numberPeople = [1,2,3, 'custom']
  const inputRef = useRef();
  const setSelectedImage = useAppStore(state=>state.setSelectedImage);
  const selectedImage = useAppStore(state=>state.selectedImage);
  const additionalComments = useAppStore(state=>state.additionalComments);
  const setAdditionalComments = useAppStore(state=>state.setAdditionalComments);
  const numberOfPersonTobeDrawn = useAppStore(state=>state.numberOfPersonTobeDrawn);
  const setNumberOfPersonTobeDrawn = useAppStore(state=>state.setNumberOfPersonTobeDrawn);
  const selectedDrawingStyle = useAppStore(state=>state.drawingStyle);
  const setCurrentShopStep = useAppStore(state=>state.setCurrentShopStep);
  const updateSelectedProducts = useAppStore(state=>state.updateSelectedProducts);
  const currentProduct = useAppStore(state=>state.product);
  const selectedProducts = useAppStore(state=>state.selectedProducts);
  // console.log(selectedDrawingStyle,setNumberOfPersonTobeDrawn,numberOfPersonTobeDrawn,setAdditionalComments,additionalComments)
  const handleSubmit = ()=>{
    if (!selectedImage) {
      window.scrollTo({
        top : document.querySelector('.input-image').getBoundingClientRect().top + window.scrollY,
        behavior : 'smooth'
      });
      toast.error('Please upload a picture');
      return;
    }
    if (!numberOfPersonTobeDrawn) {
      window.scrollTo({
        top : document.querySelector('.input-image').getBoundingClientRect().top + window.scrollY,
        behavior : 'smooth'
      });
      toast.error('Please select number of people');
      return;
    }
    if (!selectedDrawingStyle) {
      window.scrollTo({
        top : document.querySelector('.select-drawing-style').getBoundingClientRect().top + window.scrollY,
        behavior : 'smooth'
      });
      toast.error('Please select a drawing style');
      return;
    }
    if (selectedProducts?.length == 0) {
    updateSelectedProducts({product : currentProduct, quantity : 1});
    }
    setCurrentShopStep(2);
  }
  const handleFileChange = (e)=>{
    if (e.target.files.length>0) {
      setSelectedImage(e.target.files[0])
    }else {
      setSelectedImage(null)
    }
  }
  return (
    <div>
      <div className="text-2xl max-xs:text-xl font-[400] text-center">
        Please ensure that your pictures have:{" "}
      </div>
      <div className="mt-12 grid grid-cols-3 w-full max-sm:flex max-sm:flex-wrap max-sm:gap-12 justify-center">
        <GridItem img={ClearResolutionImg} text="Clear resolution" />
        <GridItem img={EvenLightingImg} text="Even Lighting" />
        <GridItem img={NoMovementInstructionImg} text="No Movements" />
      </div>
      <div className="text-base mt-12 opacity-80 text-center">
        Please note that joy will draw accordingly to your picture uploaded.{" "}
      </div>
      <div className="mt-12 input-image max-xs:mt-12 grid max-md:grid-cols-1 max-md:gap-6 grid-cols-[3fr_1fr] gap-8 items-center">
        <input className="hidden" accept="img" onChange={handleFileChange} type='file' ref={inputRef}/>
        <div onClick={()=>inputRef.current.click()} className={`${selectedImage?'opacity-100 border-primary text-black':'opacity-50 border-black'} flex justify-center items-center py-6  hover:opacity-100 transition-all cursor-pointer text-center border-[2px]  border-dashed gap-2`}>
          <CloudUpload /> {selectedImage?`Selected Image : ${selectedImage?.name || 'Added'}`:'Upload your moments here'}
        </div>
        <div>
          <div className="md:text-center">Select number of person to be drawn: </div>
          <div className="flex items-center max-md:justify-center max-md:mt-3 gap-4 mt-3">
            {numberPeople.map((item) => (<>
            {item==='custom'?<div><input min={4} value={numberOfPersonTobeDrawn<=3?'':numberOfPersonTobeDrawn} onChange={(e)=>setNumberOfPersonTobeDrawn(e.target.value)} type='number' placeholder="custom" className="border-b-[3px] text-sm placeholder:text-opacity-25 outline-none rounded-md border-b-black w-[90px]"/></div>:
            <div onClick={()=>setNumberOfPersonTobeDrawn(item)} className={`${item==='custom'?'':''} w-[30px] ${numberOfPersonTobeDrawn == item?'opacity-90':'opacity-30'} hover:opacity-80 transition-all hover: h-[30px] cursor-pointer bg-black text-white  rounded-full flex items-center justify-center`}>
              {item}
            </div>}
            </>))}
          </div>
        </div>
      </div>
      <div className="mt-12">
        <TextField value={additionalComments} onChange={(e)=>setAdditionalComments(e.target.value)} multiline rows={5} variant='outlined' color="warning" sx={{fontSize : '24px'}} fullWidth label='Additional Comments for Joy (The Artist)'/>
      </div>
      <div className="flex mt-12 justify-end max-sm:justify-center">
        <Button onClick={handleSubmit}>Print illustration on gifts !</Button>
      </div>
    </div>
  );
};

export default ImageInputForm;
