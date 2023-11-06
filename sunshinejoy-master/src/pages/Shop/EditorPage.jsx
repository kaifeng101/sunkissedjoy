import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import EditorExport from "../../components/Editor";
import useAppStore from "../../hooks/useAppStore";
import { NoProductSVG } from "../../utils/Assets";
import shallow from "zustand/shallow";
import { getCartFormattedObject } from "../../utils/functions/getCartFormattedObject";
import useCart from "../../hooks/useCart";
import { getFileLink } from "../../utils/functions/generateImageLink";

const EditorPage = () => {
  //all cart data to be passed!
  const {
    numberOfPersonTobeDrawn,
    selectedImage,
    additionalComments,
    drawingStyle,
  } = useAppStore(
    (state) => ({
      numberOfPersonTobeDrawn: state.numberOfPersonTobeDrawn,
      selectedImage: state.selectedImage,
      drawingStyle: state.drawingStyle,
      additionalComments: state.additionalComments,
    }),
    shallow
  );

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const selectedProducts = useAppStore((state) => state.selectedProducts);
  console.log(selectedProducts, "SelectedProducts");
  //   const getProductQuantityById = useAppStore(state=>state.getProductQuantityById);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [contentArray, setContentArray] = useState([]);
  const updateSelectedProducts = useAppStore(
    (state) => state.updateSelectedProducts
  );
  const updateProductContentById = useAppStore(
    (state) => state.updateProductContentById
  );
  const navigate = useNavigate();
  const { updateCart, isUpdateCartLoading } = useCart({
    updateCartSuccessCallback: () => {
      navigate("/checkout");
    },
    updateCartErrorCallback: () => {
      console.log("failure");
    },
  });


  const addContent = (newContent)=>{
    let prevContent = selectedProducts[currentProductIndex]?.content || [];
    if (prevContent.length>currentQuantity) {
      updateSelectedProducts({
        product : selectedProducts[currentProductIndex].product,
        quantity : selectedProducts[currentProductIndex].quantity,
        content : [...prevContent.slice(0,currentQuantity-1),newContent,...prevContent.slice(currentQuantity)]
      })
    }
    else {
      updateSelectedProducts({
        product : selectedProducts[currentProductIndex].product,
        quantity : selectedProducts[currentProductIndex].quantity,
        content : [...prevContent,newContent]
      })
    }
  }

  console.log(selectedProducts)

  console.log(selectedProducts);
  const handleProceed = async(content) => {
    console.log(`Got content`, content);
    addContent(content);
    let productQuantity = selectedProducts[currentProductIndex].quantity;
    if (currentQuantity >= productQuantity) {
      // updateSelectedProducts({
      //   product: selectedProducts[currentProductIndex].product,
      //   quantity: selectedProducts[currentProductIndex].quantity,
      //   content: [...contentArray, content],
      // });
      // setContentArray([]);
      let imgSelect = selectedImage;
      if (typeof selectedImage !== 'string') {
        try {
        let url = await getFileLink(selectedImage);
        imgSelect = url;
        }catch(err) {
          console.log(err);
        } 
      }
      setCurrentQuantity(1);
      if (currentProductIndex + 1 === selectedProducts.length) {
        let cartData = getCartFormattedObject({
          additionalComments,
          drawingStyle,
          numberOfPersonTobeDrawn,
          selectedImage : imgSelect,
          selectedProducts,
        });
        console.log(cartData, "cartData");
        updateCart({ data: cartData });
        return;
      } else {
        setCurrentProductIndex(currentProductIndex + 1);
      }
    } else {
      // setContentArray([...contentArray, content]);
      setCurrentQuantity((prev) => prev + 1);
    }
  };

  console.log(selectedProducts[currentProductIndex]?.content?.at(currentQuantity-1), 'Current Content');

  const handlePrev = ()=>{
    if (currentQuantity===1) {
      setCurrentProductIndex((prev)=>prev-1);
    }
    else {
      setCurrentQuantity((prev)=>prev-1);
    }
  }
  return (
    <>
      {selectedProducts?.length === 0 ? (
        <div className="h-[100vh] flex-col max-sm:px-5 flex items-center justify-center p-12">
          <img src={NoProductSVG} className="max-w-[500px] w-full" />
          <Button className="mt-5 mx-auto">Checkout Products</Button>
        </div>
      ) : (
        selectedProducts?.length > 0 && (
          <div className="h-full w-full">
            <EditorExport
              isLoading={isUpdateCartLoading}
              handleProceed={handleProceed}
              isLast={selectedProducts?.length === currentProductIndex + 1}
              currentProduct={selectedProducts[currentProductIndex].product}
              currentQuantity={currentQuantity}
              currentContent={selectedProducts[currentProductIndex]?.content?.at(currentQuantity)}
              isFirst={currentProductIndex === 0 && currentQuantity === 1}
              handlePrev={handlePrev}
            />
          </div>
        )
      )}
    </>
  );
};

export default EditorPage;
