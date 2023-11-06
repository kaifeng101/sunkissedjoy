import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import shallow from "zustand/shallow";
import useAppStore from "../../hooks/useAppStore";
import AuthModal from "../Auth/AuthModal";
import HoverTotal from "../common/HoverTotal";
import SideCart from "../common/SideCart";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const { setShowAuthModal, setShowCart } = useAppStore(
    (state) => ({
      setShowAuthModal: state.setShowAuthModal,
      setShowCart: state.setShowCart,
    }),
    shallow
  );

  const location = useLocation();

  useEffect(() => {
    setShowAuthModal(false);
    setShowCart(false);
  }, [location.pathname]);

  

  return (
    <>
      <Header />
      <AuthModal />
      <SideCart />
      {location.pathname.includes("/shop") && <HoverTotal />}
      {children}
      <Footer />
      <Toaster position="top-center" />
    </>
  );
};

export default Layout;
