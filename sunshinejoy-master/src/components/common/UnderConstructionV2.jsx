import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import BackgroundImg from "../../assets/bgimg.png";
import Logo from "../../assets/coloredlogo.png";

const UnderConstructionV2 = () => {
    const [ip,setIp] = useState('');
    const handleEmailSubmit = ()=>{
        if (!ip ) {
            toast.error('Please enter a valid email address');
            return;
        }
        toast.success('You will be notified by us.');
        setIp('');

    }
  return (
    <div className="min-h-[100v]">
         <Toaster/>
      <div
        style={{ background: `url(${BackgroundImg}) center center/cover` }}
        className="min-h-[40vh] max-lg:min-h-fit h-fit py-20 flex flex-col items-center justify-center"
      >
        <div className="text-4xl text-center max-lg:text-3xl max-sm:text-2xl font-bold text-white">
          We're Crafting Creativi-tea...
        </div>
        <div className="text-4xl text-center max-lg:text-3xl max-sm:text-2xl font-bold mt-1 text-white">
          Something Exciting is Brewing!
        </div>
        <div className="mt-12 max-sm:w-full max-sm:px-8">
          <input
          value={ip} onChange={(e)=>setIp(e.target.value)}
            className="w-[400px] block py-2 max-sm:w-full placeholder:text-black bg-[#fbfae8] outline-none text-center text-black"
            placeholder="Enter your email"
          />
          <button
          onClick={handleEmailSubmit}
            className="w-[400px] block max-sm:w-full py-2 text-white mt-4 bg-[#be715f] outline-none text-center "
            placeholder="Notify me"
          >Notify me</button>
        </div>
      </div>
      <div className="py-5 bg-[#fbfae8] px-10 max-sm:px-4 flex items-center justify-center flex-col">
        <div className="w-[300px] max-sm:w-[200px]">
          <img src={Logo} />
        </div>
        <div className="font-black text-center">About</div>
        <div className="text-center mt-1">
          Welcome to SunkissedJoy, where we believe in capturing moments, celebrating milestones, and conveying heartfelt emotions through personalised gifting. Our passion for creativity and the desire to spread joy led us to create a platform that allows you to create unforgettable experiences for your loved ones. With SunkissedJoy, every gift becomes a cherished memory.
        </div>
        <div className="font-black text-center mt-4">Get in touch</div>
        <div className="text-center mt-1">
            Something amazing is on its way, and we want you to be the first to know. <br />
            Stay connected with us, and be part of SunkissedJoy.
        </div>
        <div className="flex mt-4 text-black items-center gap-5 justify-center">
          <a target="_blank" href="https://www.instagram.com/sunkissed.joy/">
          <AiOutlineInstagram
            className="hover:text-primary cursor-pointer"
            size={30}
          />
          </a>
          <a target="_blank" href="https://www.facebook.com/Sunkissedjoy.co">
          <AiOutlineFacebook
            className="hover:text-primary cursor-pointer"
            size={30}
          /></a>
          <a target="_blank" href="https://www.tiktok.com/@sunkissed.joy">
          <FaTiktok className="hover:text-primary cursor-pointer" size={25} />
          </a>
        </div>
        <div className="mt-6 w-full text-black text-center">
            &copy; Copyright 2023 Sunkissed Joy
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionV2;
