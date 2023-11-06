import React, { useEffect, useRef, useState } from "react";
import { createStore } from "polotno/model/store";
import { Editor } from "./Editor";
import { LogoImg } from '../../utils/Assets';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Button from "../common/Button";
import { Button as MuiButton, IconButton } from "@mui/material";

import { ArrowBackIos, ArrowForward } from "@mui/icons-material";
import { useUpdateDraft } from "../../hooks/useDraft";
import { toast, Toaster } from "react-hot-toast";
import dataURLtoFile from "../../utils/functions/dataURLToFile";
import { getFileLink } from "../../utils/functions/generateImageLink";
const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T",
  // showCredit: true,
});

const EditorExport = ({isLoading,isFirst,handleProceed,currentContent,handlePrev, isLast,currentProduct,currentQuantity}) => {

  const headerRef = useRef();
  const [height,setHeight] = useState(window.innerHeight - 70);

  useEffect(()=>{
    if (headerRef.current) {
        setHeight(window.innerHeight - headerRef.current.clientHeight - 3); 
    }
  }, [headerRef.current])

  useEffect(() => {
    if (store.pages.length === 0) {
      store.addPage();
    }
    if (currentProduct?.title?.toLowerCase()?.includes('card')) {
      store.setSize(408,616,true);
    }
  }, [currentProduct]);

  const handleContinue = ()=>{
    let jsonData = store.toJSON();
    console.log(jsonData)
    handleProceed(jsonData);
    let ids = store.pages.map(p=>p.id);
    if (currentContent) {
      store.fromJSON(currentContent);
    }else {
    store.deletePages(ids);
    store.addPage(); 
    }
  }

  const {updateDraft} = useUpdateDraft();
  const [imgLoading,setImgLoading] = useState(false);

  const handleDraftSave = async()=>{
    if (updateDraft.isLoading) return; 
    if (imgLoading) return;
    const draftId = crypto.randomUUID();
    setImgLoading(true);
    try {
    const jsonContent = await store.toJSON();
    const dataURL = await store.toDataURL();
    let file = dataURLtoFile(dataURL, 'testimg');
    let fileURL = await getFileLink(file);
    updateDraft.mutate({
      draftId,
      data : {
        data : jsonContent,
        preview : fileURL
      }
    });
  }catch(err) {
    toast.error(err?.response?.data?.message || 'Something went wrong!');
  }finally {
    setImgLoading(false);
  }
  }

  return (
    <>
    <Toaster position="top-center"/>
      <div ref={headerRef} className="py-4 max-md:px-5 max-xs:px-2 relative px-8 flex items-center justify-between">
        <div className="text-lg hover:text-black transition-all cursor-pointer max-md:text-base text-primary gap-3 font-semibold flex items-center justify-center">
            <WbSunnyIcon sx={{xs : 25,sm: 32}}/>
            <span className="max-md:hidden">Sunshine Joy Editor</span><span className="text-black hidden max-md:flex font-[400]">Phone Cover 1</span>
        </div>
        <div className="absolute left-[50%] -translate-x-[50%] max-md:hidden">Designing {currentProduct?.title} ({currentQuantity})</div>
        <div className="flex items-center gap-3">
          {/* <IconButton disabled={isFirst} onClick={handlePrev}>
            <ArrowBackIos/>
          </IconButton> */}
        <div onClick={handleDraftSave} className="underline cursor-pointer mr-2">{(updateDraft.isLoading || imgLoading)?'Saving..':'Save as draft'}</div>
        <Button  onClick={handleContinue} className={`py-[7px] max-sm:text-sm max-sm:px-2 px-3 flex items-center gap-3`}>
          {isLoading?<div>Loading..</div>:<>{isLast?'Checkout':'Design next gift'}<ArrowForward sx={{fontSize: 20}}/></>}
        </Button>
        </div>
      </div>
      <div style={{height}} className=" w-full custom-scroll">
        <Editor handleContinue={handleContinue} store={store} />
      </div>
    </>
  );
};

export default EditorExport;
