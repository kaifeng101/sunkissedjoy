import { ArrowBackIos, ArrowForwardIos, Star, StarHalf } from "@mui/icons-material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  EffectFade,
  EffectCreative,
  Navigation,
  EffectCoverflow,
  Pagination,
  Autoplay,
} from "swiper";

export const SWIPER_PARAMS = {
    spaceBetween: 24,
    // effect: "fade",
    autoHeight: true,
    speed: 800,
    modules: [EffectFade, Navigation, Pagination,EffectFade],
   
  };

const TestimonialComponent = ({ img, content }) => {
  return (
    <div className="w-full rounded-xl border-white p-2 border-[2px]">
      <div className="bg-white py-3 px-8 rounded-xl flex items-center justify-center flex-col">
        {/*<div className="w-[70px] border-[1px] h-[70px] p-1 rounded-md">*/}
        {/*  <div*/}
        {/*    style={{ background: `url(${img}) center center/cover` }}*/}
        {/*    className="w-full h-full rounded-md"*/}
        {/*  ></div>*/}
        {/*</div>*/}
        {/*<div className="mt-2 flex items-center gap-2">*/}
        {/*  <div className="flex text-primary items-center justify-center ">*/}
        {/*    <Star sx={{ fontSize: 22 }} />*/}
        {/*    <Star sx={{ fontSize: 22 }} />*/}
        {/*    <Star sx={{ fontSize: 22 }} />*/}
        {/*    <StarHalf sx={{ fontSize: 22 }} />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="mt-4 text-center italic" style={{ whiteSpace: 'pre-line' }}>
            {content}
        </div>

        {/*<div className="mt-10 text-gray-500 text-center uppercase text-sm">*/}
        {/*  - Kunal Sangtiani*/}
        {/*  <div className="opacity-50 text-xs">04 January 2023</div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export const ControllerButton = ({className,isNext})=>{
    return (
        <div className={`${className} ${!isNext?'rotate-[180deg]':''} cursor-pointer absolute top-[50%] text-center -translate-y-[50%] rounded-full w-[50px] flex items-center justify-center h-[50px] bg-white`}>
        
            <ArrowForwardIos sx={{fontSize : 25}}/>
        </div>
    )
}

const Testimonials = () => {
  return (
    <div className="w-full bg-gradient-to-tr   px-20 max-xl:px-10 max-lg:px-7 bg-opacity-50 py-12 from-[#fde9a1] to-primary">
      <div className="text-center max-content-width text-3xl font-semibold text-white text-shadow">
        The Joy Of Gifting.
      </div>
      <div className="mt-10 max-xs:mt-12 relative max-content-width">
        <ControllerButton className='swiper-prev-btn -translate-x-[50%] shadow-lg hover:shadow-xl left-0 z-[100]'/>
        <ControllerButton className='swiper-next-btn translate-x-[50%] shadow-lg hover:shadow-xl right-0 z-[100]' isNext={true}/>
        <Swiper breakpoints={{650 : {slidesPerView : 2, spaceBetween : 20}, 1024 : {slidesPerView :3, spaceBetween : 24 }}} loop navigation={{nextEl : '.swiper-next-btn', prevEl : '.swiper-prev-btn'}} {...SWIPER_PARAMS} slidesPerView={1}>
            <SwiperSlide>
                <TestimonialComponent 
                    content="I think your service is really great! Also very fast and efficient 🤩 definitely will engage you again if i want a handcrafted and meaningful present for my friends 🥰 Thank you again and my bf loved it! 😊"
                />
            </SwiperSlide>
            <SwiperSlide>
                <TestimonialComponent
                    content={`It's a pleasure to order from hellojiajia as their beautiful creations make meaningful, and adorable gifts. The receivers of the gifts are always so pleased and surprised!\n\nThank you very much for being kind and sweet throughout the entire process which includes initial enquiries, placing of orders... till delivery! 🥰🤗❤`}
                />
            </SwiperSlide>
            <SwiperSlide>
                <TestimonialComponent 
                    content={`I really love your works! 2nd time getting your stuff and have no regrats! And I like that fact that you guys give different options of styles to choose from! Super easy to work with you guys! Even the the instructions via email thing was easy to understand etc!\n\nTbh my friend tried from another illustration account cause she wanted to get for my birthday but she was quite disappointed with the outcome 🥴 that's how I thought about yall, cause I really like your works and trust yall in delivering the product! Which did not disappoint at all! Heheh thank you so much!`}
                />
            </SwiperSlide>
            <SwiperSlide>
                <TestimonialComponent 
                    content="Yes I received the item within 2 days of it being mailed. I really love it! It is such a precious and unique card. Thank you for accommodating to my requests and for the prompt service. Definitely will recommend to my friends and make a 2nd purchase 🙊 keep going! 👏🏼💐"
                />
            </SwiperSlide>
            <SwiperSlide>
                <TestimonialComponent 
                    content="Really love the 3d card ! it's worth the price, cause you get what you pay for. maybe even more 🤭 thank you for being accommodating to my requests as well, going back and forth between the designs 🥰 will definitely order again in the future for my other friends 🙊 please don't ever go on hiatus or anything !! it's definitely smth we all need but never knew we needed 😂 thank youuuuu 🙌🏼🙌🏼🙌🏼"
                />
            </SwiperSlide>
            <SwiperSlide>
                <TestimonialComponent 
                    content="Yes we love it!! Thank you for the prompt reply and very smooth transaction with no hiccups. Very awesome artwork done! 👍"
                />
            </SwiperSlide>
            <SwiperSlide>
                <TestimonialComponent 
                    content="Delivery was so prompt! Super love the cute illustration! And thank you for sending a draft of the illustration first! ❤️ Such a perfect customized gift for someone special. Thank you again! ☺️"
                />
            </SwiperSlide>
            <SwiperSlide>
                <TestimonialComponent 
                    content="Thank you for not rejecting my order within such a short noticed.  Glad that Hellojiajia provide fast service otherwise im running out of idea for my anniversary gift. Very impressed with Hellojiajia for making my 20yrs wedding photo into a comical style. Everything is perfect especially the look alike photo vs comical, the 3D effect and the beach background which i requested for. My hubby love his gift so much. We'll definitely recommend our friends."
                />
            </SwiperSlide>
            <SwiperSlide>
                <TestimonialComponent 
                    content="I really like the artwork I commissioned. My queries were answered very promptly. Even though my order was an urgent one, it was done well and above expectations 💯"
                />
            </SwiperSlide>
            <SwiperSlide>
                <TestimonialComponent 
                    content={`My bestie has received her card, and it’s nice to hear her happy and touched by it, a gesture that’s possible, thanks to your art & service ♥️ your illustration and choice of colours are so pretty! And the card is huge and of such good quality. And you’ve always been so kind and friendly with your replies 😊 my go-to person when gifting cards to my loved ones now! (Already have four more orders in mind 🤭)\n\nJust received my item, and you never disappoint, over the multiple times I ordered! Thank you for the easy communication all the time, that’s why I keep going back to you for my cards! It’s nice that you send drafts first where we can suggest edits before it goes for printing, BUT I’ve always loved your colour picks and designs so I’m always happy with the drafts at first sight 🤩 and it’s nice to see you come up with different things now, apart from the cards. Got a 3D frame before too and it serves as a very pretty night light! Keep making good stuff 💫 will always be supporting! Thank you for taking my order once again!`}
                />
            </SwiperSlide>
          {/*<SwiperSlide>*/}
          {/*  <TestimonialComponent img="data:image/jpeg;base64,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" />*/}
          {/*</SwiperSlide>*/}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
