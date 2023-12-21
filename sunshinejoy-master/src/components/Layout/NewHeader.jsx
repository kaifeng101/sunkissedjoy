import { Person, Search, ShoppingCart } from "@mui/icons-material";
import { Badge, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import SelectUnstyled from "@mui/base/SelectUnstyled";
import OptionUnstyled from "@mui/base/OptionUnstyled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import CustomSelect, { StyledOption } from "../common/StyledSelect";
import SGIcon from "country-flag-icons/react/3x2/SG";
import CurrencySelector from "../common/CurrencySelector";
import { Menu } from "@mui/icons-material";
import MenuSidebar from "../common/MenuSidebar";
import useAppStore from "../../hooks/useAppStore";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import useCart from "../../hooks/useCart";
import UserModal from "../common/UserModal";
const HeaderLink = ({ title, href, secondary }) => {
  const pathName = useLocation().pathname;
  const isActive = pathName === href || pathName.includes(secondary);
  return (
    <div
      className={`${
        isActive ? "text-[#f97b64] font-[700]" : ""
      } text-lg font-[400]`}
    >
      <Link to={href || '/'}>{title}</Link>
    </div>
  );
};

const NewHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setShowCart = useAppStore((state) => state.setShowCart);
  const {totalItems : totalCartItems} = useCart()
  const setShowAuthModal = useAppStore(state=>state.setShowAuthModal);
  const navigate = useNavigate();
  // const {isLoggedin} = useAuth()
  const isLoggedin = useAppStore(state=>state.isLoggedin);
  const [userModalOpen,setUserModalOpen] = useState(false);
  return (
    <>
    <UserModal open={userModalOpen} handleClose={()=>setUserModalOpen(false)}/>
    
      <MenuSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <div className="py-12 px-20 max-lg:py-8 max-xl:px-10 max-lg:px-7 max-xs:px-4 max-content-width flex items-center justify-between relative">
        {/* <Button><Menu/></Button> */}
        <img onClick={()=>navigate('/newHome')} src={Logo} className="w-[130px] cursor-pointer max-xs:w-[100px] max-md:w-[120px]"/>
        {/* Search bar */}
        <div className="flex flex-1 max-sm:hidden ml-10 mr-5" style={{ height: '52px' }}>
          <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-top border-gray-300 rounded-tl rounded-bl dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
          </span>
          <input type="text" id="website-admin" class="rounded-none rounded-e-lg bg-gray-50 border rounded-tr rounded-br text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search items..." />
        </div>
        <div className="items-center gap-5 max-xs:gap-2 hidden max-lg:flex">
          <IconButton
            onClick={() => {
              if (!isLoggedin) {
                toast.error("Please login to view your cart");
                setShowAuthModal(true);
                return;
              }
              setShowCart(true);
            }}
            type="text"
            size="small"
            sx={{ color: "black" }}
          >
            <Badge badgeContent={totalCartItems} color="warning" sx={{ color: "#black" }}>
              <ShoppingCart sx={{ fontSize: 28 }} />
            </Badge>
          </IconButton>
          <IconButton onClick={() => setIsMenuOpen(true)}>
            <Menu sx={{ fontSize: 36, color: "#f97b64" }} />
          </IconButton>
        </div>
        <div className="flex items-center gap-6 max-lg:hidden">
          {/* <IconButton type="text" size="small" sx={{ color: "black" }}>
            <Search />
          </IconButton> */}
          <IconButton
            type="text"
            onClick={()=>{
              if(isLoggedin){
                navigate('/account')
                return;
              }else{
                setShowAuthModal(true)
              }
            }}
            size="small"
            sx={{ color: "black", paddingX: "2px" }}
          >
            <Person className="lg:hidden" />
          </IconButton>
          <IconButton
            onClick={() => {
              if (!isLoggedin) {
                toast.error("Please login to view your cart");
                setShowAuthModal(true);
                return;
              }
              setShowCart(true);
            }}
            type="text"
            size="small"
            sx={{ color: "black" }}
          >
            <Badge badgeContent={totalCartItems} color="warning">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <div className="ml-1 max-lg:hidden">
            <CurrencySelector />
          </div>
        </div>
      </div>
      {/* Search bar */}
      <div className="hidden max-sm:flex mx-5 mb-5" style={{ height: '40px' }}>
          <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-top border-gray-300 rounded-tl rounded-bl dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
          </span>
          <input type="text" id="website-admin" class="rounded-none rounded-e-lg bg-gray-50 border rounded-tr rounded-br text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search items..." />
      </div>
    </>
  );
};

export default NewHeader;
