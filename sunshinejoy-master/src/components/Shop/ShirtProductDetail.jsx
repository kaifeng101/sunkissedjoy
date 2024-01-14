import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState, useRef } from 'react';
import { toast } from "react-hot-toast";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import useAppStore from "../../hooks/useAppStore";
import useAuth from "../../hooks/useAuth";
import { usePrices } from "../../hooks/usePrices";
import Button from "../common/Button";
import RecommendedProductsGroup from "./RecommendedProductsGroup";

import CloseIcon from '@mui/icons-material/Close';
import { FileCopy } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import useCart from "../../hooks/useCart";

// Share image
import domtoimage from 'dom-to-image';

const ShirtProductDetail = ({ data, onClose }) => {
  const setCurrentShopStep = useAppStore(state=>state.setCurrentShopStep);
  const setShowAuthModal = useAppStore(state=>state.setShowAuthModal);
  const {p,f} = usePrices();
  // const {isLoggedin} = useAuth();
  const isLoggedin = useAppStore(state=>state.isLoggedin);

  const { addItemToCart } = useCart();  // Destructure addItemToCart from the useCart hook

  const handleContinue = async () => {
    console.log(isLoggedin);
  
    if (!isLoggedin) {
      setShowAuthModal(true);
      toast.error('Please login to continue your purchase');
      return;
    }
  
    try {
      // Use addItemToCart function to add the item to the cart
      const productId = data;  // Replace with the actual productId from your data
      const pricePerUnit = calculateDiscountedPrice();

      // Add item to the cart
      await addItemToCart({
        data: {
          productId,
          quantity,
          pricePerUnit
          // Include other necessary data for adding the item to the cart
        },
      });
  
      toast.success('Product added to the cart successfully!');
    } catch (error) {
      console.error('Error adding product to the cart:', error);
  
      // Handle specific error cases
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add product to the cart. Please try again later.');
      }
    }
  };
  


  const [selectedImage, setSelectedImage] = useState(data?.images?.[0]);

  // Color selector
  const [selectedColor, setSelectedColor] = useState(null);
  const handleColorClick = (color) => {
    setSelectedColor(color.id);
    // Update the selected image based on the color
    setSelectedImage(color.imageUrl);
  };
  const extractHexCode = (url) => {
    // Extract the hex code from the URL
    const match = url.match(/\/([0-9a-f]{6})\./i);
    return match ? match[1] : null;
  };
  // Create color objects from the hex codes in data?.images URLs
  const colors = data?.images?.map((imageUrl, index) => ({
    id: index + 1,
    name: `Color ${index + 1}`,
    value: extractHexCode(imageUrl),
    imageUrl: imageUrl,
  })) || [];

  // Upload image
  const [uploadedImage, setUploadedImage] = useState(null);
  const handleImageUpload = (file) => {
    // Perform necessary actions, such as uploading to a server
    // For now, just update the state with the selected image
    setUploadedImage(URL.createObjectURL(file));
    combineImages();
  };

  // Quantity select
  const [quantity, setQuantity] = useState('1');
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleDropdownChange = (e) => {
    setQuantity(e.target.value);
  };
  // Function to calculate the discounted price based on quantity
  const calculateDiscountedPrice = () => {
    const qty = parseInt(quantity);

    if (qty >= 1 && qty <= 50) {
      return data?.price.perPieceDiscounted;
    } else if (qty >= 51 && qty <= 100) {
      return data?.price.per100PiecesDiscounted;
    } else if (qty >= 101 && qty <= 500) {
      return data?.price.per500PiecesDiscounted;
    } else if (qty > 500) {
      return data?.price.perAbove500PiecesDiscounted;
    }

    // Default to regular price if quantity doesn't fall into any category
    return data?.price.regular;
  };
  // Use the calculated price in your component
  const discountedPrice = calculateDiscountedPrice();
  // Function to calculate the total before discounted price based on quantity
  const calculateTotalBeforeDiscount = () => {
    const qty = parseInt(quantity);

    if (qty >= 1 && qty <= 50) {
      return data?.price.perPiece * qty;
    } else if (qty >= 51 && qty <= 100) {
      return data?.price.per100Pieces * qty;
    } else if (qty >= 101 && qty <= 500) {
      return data?.price.per500Pieces * qty;
    } else if (qty > 500) {
      return data?.price.perAbove500Pieces * qty;
    }

    // Default to regular price if quantity doesn't fall into any category
    return data?.price.regular * qty;
  };
  // Use the calculated price in your component
  const beforeDiscountedPrice = calculateTotalBeforeDiscount();

  // Share image
  const handleCopyToClipboard = async () => {
    try {
      const customDesignDiv = document.getElementById('customDesign');

      if (!customDesignDiv) {
        console.error('Could not find the target div.');
        return;
      }

      // Use dom-to-image to capture the content of the div
      const blob = await domtoimage.toBlob(customDesignDiv);

      if (blob) {
        // Use the clipboard-write API to write the image blob to the clipboard
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);

        toast.success('Image copied to clipboard!');
      } else {
        console.error('Failed to create blob from dom-to-image.');
        toast.error('Failed to copy image to clipboard. Please try again.');
      }
    } catch (error) {
      console.error('Failed to copy image to clipboard', error);
      toast.error('Failed to copy image to clipboard. Please try again.');
    }
  };
  
  return (
    <div className="lg:mt-20 relative">
      <div className="flex justify-end mb-2" style={{ marginRight: "5%" }}>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon style={{ fontSize: "30px" }}/>
        </IconButton>
      </div>


      <div className="flex items-start max-2xl:gap-24 max-xl:gap-10 gap-28 max-md:block">
        <section className="flex-[0.4] max-xl:flex-[0.65] max-lg:flex-[0.5]">
          {/* <div className="grid max-lg:grid-cols-1 grid-cols-[1fr_3fr] gap-16 max-xl:gap-6"> */}
            {/* <div className="space-y-6 m-auto max-lg:order-2 max-lg:justify-center max-md:justify-start max-lg:space-y-0 max-lg:flex max-lg:space-x-4 max-xl:space-y-4 max-h-[620px] overflow-auto">
              {data?.images?.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  className="w-full max-lg:h-[100px] max-lg:w-[100px] h-[200px]"
                  onClick={() => handleImageClick(img)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div> */}
            <div id="customDesign" className="w-full max-lg:order-1 max-lg:h-[500px] max-xs:h-[250px] h-[620px] max-w-lg px-10 m-auto relative">
            <img src={selectedImage} className="w-full h-full object-cover" />
            {uploadedImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/4 h-1/4 overflow-hidden rounded-md border-gray-500">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            {/* Replace the button with a copy-to-clipboard icon */}
            <button onClick={handleCopyToClipboard} className="flex m-auto mt-2">
              <FileCopy style={{ fontSize: "20px" }} />
              <div>Share your design now</div>
            </button>
          </div>
          {/* </div> */}
        </section>
        <section className="flex-[0.45] max-md:mt-12 max-lg:mx-10 max-sm:mx-10 max-sm:margin-auto">
          <div className="pb-3 border-b-[3px]">
            <div className="text-xl font-bold">{data?.title}</div>
            <div className="text-md mt-1">{data?.subTitle}</div>
          </div>
          <ul className="mt-10 text-sm opacity-90 space-y-[3px]">
          {
            data?.description?.split('|').map((desc, index) => (
              <li key={index}>{desc.trim()}</li>
            ))
          }
          </ul>

          <div className="mt-10 mb-5 text-lg font-bold">Material: {data?.material}</div>
          <img className="w-2/3" src={data?.sizeGuide} />

          <div className="mt-5 text-lg font-bold flex items-center py-3 border-t-[2px] border-b-[2px]">
            <div className="mr-4">Color:</div>
            {colors.map((color) => (
              <button
                key={color.id}
                className={`w-7 h-7 flex items-center justify-center mr-1 rounded-full transition-all ${selectedColor === color.id ? 'border-gray-500' : 'border-white-300'}`}
                onClick={() => handleColorClick(color)}
                style={{ backgroundColor: "#" + color.value, borderWidth: "3px" }}
              ></button>
            ))}
          </div>

          <div className="text-lg font-bold flex items-center py-3 border-b-[2px]">
            <div className="mr-4">Customize Design:</div>

            {/* Add image upload input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              id="image-upload"
            />
            <label htmlFor="image-upload"className="relative flex items-center">
              <div className="w-20 h-15 flex items-center justify-center mr-1 transition-all border-white-300 cursor-pointer" style={{ width: "fit-content"}}>
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-full rounded-md"
                  />
                ) : (
                  <>
                    <span className="ml-2 text-gray-500 border rounded border-black px-2 py-1 text-sm text-center">Upload Design</span>
                    <a href="#" className="ml-2 text-blue-500 text-sm">Customize more</a>
                  </>
                )}
              </div>
              {uploadedImage && (
                <div className="text-sm font-semibold text-red-700 cursor-pointer">Reupload</div>
              )}
            </label>
          </div>

          

         
          <div className="mt-8 max-md:mx-auto">
            <div className="text-lg font-bold">Now, let's work out the best price we can offer you:</div>
            
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
                QTY :
              </label>
              <div className="relative">
                <input
                  id="quantity"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <select
                  id="quantityDropdown"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  value={quantity}
                  onChange={handleDropdownChange}
                >
                  {[...Array(1000).keys()].map((num) => (
                    <option key={num + 1} value={(num + 1).toString()}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-xl font-semibold">
              <del>{f(p(beforeDiscountedPrice))}</del>
            </div>
            <div className="flex items-center">
              <div className="text-xl font-semibold">{f(p(discountedPrice * quantity))}</div>
              <div className="text-sm ml-3">{f(p(discountedPrice))}/ per piece</div>
            </div>
            <div className="text-md text-red-500 font-bold">
              You save {Math.round(((beforeDiscountedPrice - discountedPrice * quantity) / beforeDiscountedPrice) * 100)}%
            </div>



            <Button onClick={handleContinue} className="mt-5 text-md max-sm:text-lg max-xs:text-base hover:bg-opacity-80">
              Add to cart
            </Button>
            <a href="#" className="ml-2 text-blue-500 text-sm">Need more? Call our specialist now</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShirtProductDetail;
