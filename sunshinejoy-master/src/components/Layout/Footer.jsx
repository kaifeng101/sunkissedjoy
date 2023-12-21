import { Facebook, FacebookOutlined, Instagram } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import {FaTiktok} from 'react-icons/fa';
import {AiOutlineFacebook,AiOutlineInstagram} from 'react-icons/ai'
import { LogoImg } from "../../utils/Assets";
import RemindMeModal from "../common/RemindMeModal";
const FooterLink = ({ title, link }) => {
  return (
    <div className="font-[400] max-xs:text-center">
      <Link to={link}>{title}</Link>
    </div>
  );
};

const Footer = () => {
  const [remindMeModal,setRemindMeModal] = useState(false); 
  return (
    <div className="px-20 max-xl:px-10  max-lg:px-7 max-xs:px-4 max-content-width mt-20 border-t-[1px] py-5">
      <RemindMeModal open={remindMeModal} handleClose={()=>setRemindMeModal(false)}/>
      <div className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-md:gap-y-12 w-full items-start">
        <section className="">
          <div className="text-lg font-semibold max-xs:text-center">{FOOTER_LINKS.ABOUT.title}</div>
          <div className="mt-3 space-y-2">
          {FOOTER_LINKS.ABOUT.subLinks.map((link, index) => (
            <FooterLink key={index} title={link.title} link={link.link} />
          ))}
          </div>
        </section>
        <section className="">
          <div className="text-lg font-semibold max-xs:text-center">{FOOTER_LINKS.HELP.title}</div>
          <div className="mt-3 space-y-2">
          {FOOTER_LINKS.HELP.subLinks.map((link, index) => (
            <FooterLink key={index} title={link.title} link={link.link} />
          ))}
          </div>
        </section>
        <section>
          <div className="text-lg font-semibold max-xs:text-center">We'll keep you on your toes</div>
          <div className="mt-2 max-xs:mt-1 max-xs:text-center underline">Sunkissedjoy.co@gmail</div>
          <div className="max-xs:flex mt-4  max-xs:justify-center ">
          <Button onClick={()=>setRemindMeModal(true)} className='max-xs:py-[6px] max-xs:mx-auto max-xs:w-fit' primary={true}>Remind Me</Button>
          </div>
        </section>
        <section>
          <div className="font-semibold text-lg max-xs:text-center">Join Our Family</div>
          <div className="flex mt-2 items-center gap-5 max-xs:justify-center">
            <a target="_blank" href="https://instagram.com/sunkissed.joy?igshid=MXU2MWUyd2ZhejAyZw=="><AiOutlineInstagram className="hover:text-primary cursor-pointer" size={30} /></a>
            <a target="_blank" href="https://www.facebook.com/Sunkissedjoy.co?mibextid=LQQJ4d"><AiOutlineFacebook className="hover:text-primary cursor-pointer" size={30} /></a>
            <a target="_blank" href="https://www.tiktok.com/@sunkissed.joy?_t=8hEgCXt2bsP&_r=1"><FaTiktok className="hover:text-primary cursor-pointer" size={25}/></a>
          </div>
          <div className="mt-3 text-sm opacity-70 max-xs:text-center">© copyright 2022. Sunkissed Joy</div>
        </section>
      </div>
      <div className="flex items-center justify-center mt-12">
        <img src={LogoImg}/>
      </div>
    </div>
  );
};

const FOOTER_LINKS = {
  ABOUT: {
    title: "About",
    subLinks: [
      { title: "Home", link: "/" },
      { title: "Shop", link: "/shop" },
      { title: "My Account", link: "/account" },
      { title: "My Orders", link: "/account/mygifts" },
      // { title: "Joy's story", link: "/" },
      // { title: "Help", link: "/" },
      // { title: "Get Involved", link: "/" },
    ],
  },
  HELP: {
    title: "Help",
    subLinks: [
      { title: "FAQs", link: "/faq" },
      { title: "Contact Us", link: "/contact" },
      { title: "Terms & Conditions", link: "/terms" },
      // { title: "Shipping & Delivery", link: "/" },
      // { title: "Reward System", link: "/" },
      // { title: "Track your Parcel", link: "/" },
    ],
  },
};

export default Footer;
