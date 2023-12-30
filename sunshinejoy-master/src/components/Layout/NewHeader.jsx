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
import SearchBar from "../Home/Searchbar";
// import products from "../../utils/data/temp/products.json";
import useProducts from "../../hooks/useProducts";

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
  const { productsData, isFetchProductsLoading, isFetchProductsError, fetchProductsError, refetchProducts, setClientState } = useProducts();
  
  return (
    <>
    <UserModal open={userModalOpen} handleClose={()=>setUserModalOpen(false)}/>
    
      <MenuSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <div className="py-12 px-20 max-lg:py-8 max-xl:px-10 max-lg:px-7 max-xs:px-4 max-content-width flex items-center justify-between relative">
        {/* <Button><Menu/></Button> */}
        <img onClick={()=>navigate('/newHome')} src={Logo} className="w-[130px] cursor-pointer max-xs:w-[100px] max-md:w-[120px]"/>
        {/* Search bar */}
        <SearchBar products={productsData} />
        <div className="items-center gap-5 max-xs:gap-2 hidden max-lg:flex">
          {/* <IconButton
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
          </IconButton> */}
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
    </>
  );
};

export default NewHeader;
