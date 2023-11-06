import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAppStore from "../../hooks/useAppStore";
import useCart from "../../hooks/useCart";
import { useQueryParams } from "../../hooks/useQueryParams";
import AdditionalSelection from "./AdditionalSelection";
import CreativePage from "./CreativePage";
import EditorPage from "./EditorPage";
import Shop from "./Shop";

const ShopPage = () => {
  const currentShopStep = useAppStore((state) => state.currentShopStep);
  const setCurrentShopStep = useAppStore((state) => state.setCurrentShopStep);
  console.log(currentShopStep, "Current shop step!");
  const selectedProducts = useAppStore((state) => state.selectedProducts);
  const { totalItems, setClientState } = useCart();
  const [progressRestored, setProgressRestored] = useState(false);
  const params = useQueryParams();
  useEffect(()=>{
    if (params.getParam('state')) {
      setCurrentShopStep(2);
    }
    console.log(params.getParam('state'));
  }, [])

  useEffect(() => {
    if (totalItems > 0 && !progressRestored) {
      setProgressRestored(true);
      if (params.getParam('state')) {
        return setCurrentShopStep(2);
      }
      console.log(`Progress restored!`);
      setClientState();
      toast.success(`Progress restored!`, {
        position: "top-center",
        style: {
          fontSize: 20,
        },
      });
      setCurrentShopStep(1);
    }
    else if (totalItems === 0) {
      if (currentShopStep>0) setCurrentShopStep(0); 
    }
  }, [totalItems]);

  return (
    <>
      {currentShopStep === 0 && <Shop />}
      {currentShopStep === 1 && <CreativePage />}
      {currentShopStep === 2 && <AdditionalSelection />}
      {currentShopStep === 3 && <EditorPage />}
    </>
  );
};

export default ShopPage;
