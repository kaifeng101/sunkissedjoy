import React, { useState } from "react";


const UnderConstruction = () => {
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
    <div  className="w-full min-h-[100vh]  flex flex-col justify-between">
        <Toaster/>
      <div style={{background : `url(${BackgroundImg}) center center/cover`}} className="flex max-md:px-6 pt-32 max-xs:px-3 max-[350px]:h-fit max-[350px]:shrink-0 max-xl:pt-10 items-center flex-col justify-center">
        <div className="text-5xl max-sm:text-3xl font-black max-[350px]:text-2xl">We're Coming Soon</div>
        <div className="w-[400px] max-sm:w-full">
            <input value={ip} onChange={(e)=>setIp(e.target.value)} className="mt-8 w-full  py-2 px-2" placeholder="Enter your email"/>
            <button onClick={handleEmailSubmit} className="w-full py-2 bg-black text-white mt-5 block">Notify me</button>
        </div>
      </div>
      <div className=" max-sm:mt-12 flex items-center justify-center flex-col text-center bg-black py-8 pb-0">
        <div className="text-2xl max-md:px-6 font-semibold text-white max-sm:text-xl">About</div>
        <div className="w-[600px] max-md:px-6 max-md:w-full max-sm:text-sm max-[350px]:text-xs text-white mt-3 text-base opacity-75 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
          aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
          nihil repudiandae eveniet in soluta? Fuga sapiente eveniet neque quod
          officiis.
        </div>
        <div className="text-2xl max-sm:text-xl max-md:px-6 mt-10 font-semibold text-white">
          Be in touch
        </div>
        <div className="w-[600px] max-sm:text-sm max-md:px-6 max-md:w-full text-white mt-3 text-base opacity-75 text-center">
          Lorem ipsum dolor sit amet.
        </div>
        <div className="flex mt-8 text-white items-center gap-5 max-xs:justify-center">
          <AiOutlineInstagram
            className="hover:text-primary cursor-pointer"
            size={30}
          />
          <AiOutlineFacebook
            className="hover:text-primary cursor-pointer"
            size={30}
          />
          <FaTiktok className="hover:text-primary cursor-pointer" size={25} />
        </div>
        <div className="mt-6 py-2 w-full text-white bg-[#151515] ">
            Copyright 2023 Sunkissed Joy
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
