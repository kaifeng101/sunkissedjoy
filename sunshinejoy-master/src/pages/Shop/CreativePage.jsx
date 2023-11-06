import React, { useEffect, useState } from "react";
import useAppStore from "../../hooks/useAppStore";
import HeroComponent from "../../components/common/HeroComponent";
import Stepper from "../../components/common/Stepper";
import DrawingStylesGroup from "../../components/CreativePage/DrawingStylesGroup";
import ImageInputForm from "../../components/CreativePage/ImageInputForm";
import CaptureComponent from "../../components/Home/CaptureComponent";
import Layout from "../../components/Layout/Layout";
import {
  ComingSoonImg,
  DrawMeJoyImg,
  HomeSecondaryBannerImg,
} from "../../utils/Assets";
import DRAWING_ITEMS from "../../utils/data/temp/drawingStyles.json";
import useContent from "../../hooks/useContent";
const CreativePage = () => {
  const currentShopStep = useAppStore(state=>state.currentShopStep);
  const {drawingStyles} = useContent();
  const [showForm, setShowForm] = useState(false);
  useEffect(()=>{
    if (!showForm) {
      window.scrollTo({
        top : document.querySelector('.capture-component').getBoundingClientRect().top + window.scrollY - 100,
        behavior : 'smooth'
      });
    }else {
      window.scrollTo({
        top : window.scrollY +500,
        behavior : 'smooth'

      });
    }
  }, [showForm])
  return (
    <Layout>
      <HeroComponent
        hideButton={true}
        backgroundImage={HomeSecondaryBannerImg}
        title="Create your Gift in 3 Simple Steps!"
      />
      <main className="mt-10 max-sm:mt-36 max-lg:mt-32 max-xs:mt-0  px-24 max-xl:px-10 max-lg:px-7 max-sm:px-3">
        <Stepper activeValue={currentShopStep} />
        <div className="capture-component max-lg:mt-14 items-start max-md:grid-cols-1 mt-16 grid max-lg:gap-6 grid-cols-2 gap-36 max-xl:gap-16">
          <CaptureComponent
            img={DrawMeJoyImg}
            onClick={() => setShowForm(prev=>!prev)}
            selected={showForm}
            title="DRAW ME, JOY!"
            desc="Joy and her artists got their paint brushes ready. Pick a style and they’ll paint you into a whole new world! "
          />
          <CaptureComponent
            img={ComingSoonImg}
            disabled={true}
            title="CREATE MY OWN MINIME CHARACTERS!"
            desc="feeling creative and adventurous for somemore fun? Create your own Minime Characters and have them printed immediately onto your products with no drawing waiting time!"
          />
        </div>
        {showForm&&<>
          <div className="mt-28">
            <div className="text-center select-drawing-style max-md:text-3xl text-[33px] leading-[1.115rem] font-semibold">
              Select a drawing style.
            </div>
            <div className="mt-20 max-md:mt-16">
              <DrawingStylesGroup drawingItems={drawingStyles} />
            </div>
          </div>
          <div className="mt-28 upload-picture max-md:mt-18 max-sm:mt-20">
            <div className="text-2xl max-md:text-xl font-semibold text-center">
              Upload your Picture and Joy will draw you into your selected
              style.{" "}
            </div>
            <div
              className="mt-12 w-full h-[450px] max-xs:h-[150px] max-md:h-[300px] max-sm:h-[200px] rounded-xl"
              style={{
                background: `url(https://cdn.igp.com/f_auto,q_auto,t_pnopt32prodlp/banners/birthday_d_igp_banner_20221227.jpg) center center/cover`,
              }}
            ></div>
            <div className="mt-16 max-xs:mt-12">
              <ImageInputForm />
            </div>
          </div>
        </>}
      </main>
    </Layout>
  );
};

export default CreativePage;
