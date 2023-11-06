import { AccountCircle, ArrowForwardIos, Home, ShoppingBasket } from "@mui/icons-material";
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../hooks/useAppStore";
import useAuth from "../../hooks/useAuth";
import { UserIconImg } from "../../utils/Assets";
import CurrencySelector from "./CurrencySelector";

const MenuItem = ({icon,text,link})=>{
  const navigate = useNavigate();
  return (
    <Button onClick={()=>navigate(link || '/')} variant='text' sx={{color : 'black', display : 'block', width : '100%'}}>
    <div className="px-3 py-4 border-b-[1px] flex items-center gap-5">
      {icon}
      <div className="text-xl max-xs:text-lg">{text}</div> 
    </div>
    </Button>
  )
}

const MenuSidebar = ({ isOpen, setIsOpen }) => {
  const {setLogoutState} = useAuth();
  const user = useAppStore(state=>state.user);
  const isLoggedin = useAppStore(state=>state.isLoggedin);
  const setShowAuthModal = useAppStore(state=>state.setShowAuthModal);
  const navigate = useNavigate();

  const handleLogout = ()=>{
    
    setLogoutState();
    setIsOpen(false);
    navigate('/')

  }

  const handleLogin = ()=>{
    setShowAuthModal(true);
    setIsOpen(false); 
  }
  


  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="w-[50vw] max-xs:w-[90vw] max-md:w-[60vw] bg-white relative h-full">
        <div className="px-5 py-6 max-xs:px-3 border-b-[1px] flex items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-[65px] max-xs:w-[50px] max-xs:h-[50px] max-md:w-[55px] max-md:h-[55px] h-[65px] bg-[#f97b64] rounded-full">
              <img src={UserIconImg} />
            </div>
            {!isLoggedin?<div>
              <div onClick={handleLogin} className="text-xl max-xs:text-base max-md:text-lg font-semibold">Hi there!</div>
              <div className="text-lg text:text-sm max-md:text-base opacity-70 font-[400]">Login/Signup</div>
            </div>:<div>
            <div className="text-xl max-xs:text-base max-md:text-lg font-bold">{user?.firstName} {user?.lastName}</div>
              <div onClick={handleLogout} className="text-lg text:text-sm max-md:text-base opacity-80 text-red-500 -mt-1 underline font-[400]">Logout</div>
              </div>}
          </div>
          <ArrowForwardIos sx={{ fontSize: {xs : 28, sm:32} }} />
        </div>
        <div className="mt-0 py-4">    
        <MenuItem link={'/'} icon={<Home sx={{fontSize : {xs : 25, sm : 28}}}/>} text='Home'/>      
        <MenuItem link={'/shop'} icon={<ShoppingBasket sx={{fontSize : {xs : 25, sm : 28}}}/>} text='Shop'/>      
        <MenuItem link={'/account'} icon={<AccountCircle sx={{fontSize : {xs : 25, sm : 28}}}/>} text='My Account'/>       
        </div>
        <div className="mt-5 px-4 absolute w-full bottom-8 left-[50%] -translate-x-[50%]">
          <CurrencySelector fullWidth={true} />
        </div>
      </div>
    </Drawer>
  );
};

export default MenuSidebar;
