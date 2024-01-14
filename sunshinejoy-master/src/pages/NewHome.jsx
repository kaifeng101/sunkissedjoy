import React, { useEffect, useState } from "react";
import HeroComponent from "../components/common/HeroComponent";
import CaptureComponent from "../components/Home/CaptureComponent";
import NewLayout from "../components/Layout/NewLayout";
import HomeCaptureImage from "../assets/home_capture_comical.png";
import HomeComingSoonImage from "../assets/home_coming.png";
import Button from "../components/common/Button";
import CelebrateComponent from "../components/Home/CelebrateComponent";
import ExpressComponent from "../components/Home/ExpressComponent";
import Testimonials from "../components/Home/Testimonials";
import FAQs from "../components/Home/FAQs";
import ComponentGroup from "../components/common/ComponentGroup";
import useAppStore from "../hooks/useAppStore";
import Stepper from "../components/common/Stepper";
import NewProductGroup from "../components/Shop/NewProductGroup";
import ShirtProductDetail from "../components/Shop/ShirtProductDetail";
import RecommendedProductsGroup from "../components/Shop/RecommendedProductsGroup";
import { scrollSmoothly } from "../utils/functions/scrollSmoothly";
// Searchbar functionality
import { useSearchContext } from "../components/Home/SearchContext";
import useProducts from "../hooks/useProducts";

const NewHome = () => {
  const currentShopStep = useAppStore(state=>state.currentShopStep)
  const clearCartDetails = useAppStore(state=>state.clearCartDetails);
  // const {products : PRODUCTS_DATA} = useContent();
  const setCurrentProduct = useAppStore(state=>state.setProduct);
  const currentProduct =useAppStore(state=>state.product);
  // Searchbar functionality
  const { searchTerm } = useSearchContext();
  const { productsData, isFetchProductsLoading, isFetchProductsError, fetchProductsError, refetchProducts, setClientState } = useProducts();

  useEffect(()=>{
    if (currentProduct) {
      scrollSmoothly('.start-content')
    }
  }, [currentProduct])

  useEffect(()=>{
    clearCartDetails('.start-content');
  }, [])

  const [selectedQuantity, setSelectedQuantity] = useState('0-50');
  const [selectedBudget, setSelectedBudget] = useState('Default');
  const [selectedLeadTime, setSelectLeadTime] = useState('Default');

  const selectQuantity = (event) => {
    // Handle the selection change here
    const { value } = event.target;

    setSelectedQuantity(value);
  };

  const selectBudget = (budget) => {
    setSelectedBudget(budget);
  };

  const selectLeadTime = (leadTime) => {
    setSelectLeadTime(leadTime);
  };

  const [showProductDetail, setShowProductDetail] = useState(true);
  const handleProductDetailClose = () => {
    setCurrentProduct(null);
    setShowProductDetail(false);
  };
  const handleProductSelection = (product) => {
    setShowProductDetail(true);
    setCurrentProduct(product);
  };

  return (
    <NewLayout>
      {/* Choose quantity */}
      <div className="flex bg-gray-200 pt-5">
        <div id="chooseBudget" className="flex-1 grid max-sm:mx-5 max-md:mx-10 md:mx-10 lg:mx-20">
          <h1 className="font-bold bg-zinc-100 rounded-t-md py-2 flex">
            <div className="rounded-full bg-black mx-3 w-5 text-white text-center">
              1
            </div>
            Choose Quantity
          </h1>
          <div className="bg-white gap-2 rounded-b-md place-items-center py-3">
            <select onChange={selectQuantity} id="countries" className=" mx-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" style={{ width: "-webkit-fill-available"}}>
              <option value="0-50" selected>0-50</option>
              <option value="51-100">51-100</option>
              <option value="101-500">101-500</option>
              <option value=">500">> 500</option>
            </select>
          </div>
        </div>
      </div>

      {/* Choose budget */}
      <div className="flex bg-gray-200	pt-3">
        <div id="chooseBudget" className="flex-1 grid max-sm:mx-5 max-md:mx-10 md:mx-10 lg:mx-20">
          <h1 className="font-bold bg-zinc-100 rounded-t-md py-2 flex">
            <div className="rounded-full bg-black mx-3 w-5 text-white text-center">
              2
            </div>
            Choose Budget /piece
          </h1>
          <div className="bg-white grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 gap-2 rounded-b-md place-items-center py-3">
            <div onClick={() => selectBudget('Default')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Default' ? 'bg-gray-200' : ''}`}>Default</div>
            <div onClick={() => selectBudget('Below $2.00')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Below $2.00' ? 'bg-gray-200' : ''}`}>Below $2.00</div>
            <div onClick={() => selectBudget('Below $5.00')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Below $5.00' ? 'bg-gray-200' : ''}`}>Below $5.00</div>
            <div onClick={() => selectBudget('Below $10.00')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Below $10.00' ? 'bg-gray-200' : ''}`}>Below $10.00</div>
            <div onClick={() => selectBudget('Below $15.00')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Below $15.00' ? 'bg-gray-200' : ''}`}>Below $15.00</div>
            <div onClick={() => selectBudget('Below $20.00')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Below $20.00' ? 'bg-gray-200' : ''}`}>Below $20.00</div>
            <div onClick={() => selectBudget('Below $30.00')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Below $30.00' ? 'bg-gray-200' : ''}`}>Below $30.00</div>
            <div onClick={() => selectBudget('Below $50.00')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Below $50.00' ? 'bg-gray-200' : ''}`}>Below $50.00</div>
            <div onClick={() => selectBudget('Below $100.00')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Below $100.00' ? 'bg-gray-200' : ''}`}>Below $100.00</div>
            <div onClick={() => selectBudget('Below $500.00')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedBudget === 'Below $500.00' ? 'bg-gray-200' : ''}`}>Below $500.00</div>
          </div>
        </div>
      </div>

      {/* Choose lead time */}
      <div className="flex bg-gray-200 pt-5 pb-5">
        <div id="chooseBudget" className="flex-1 grid max-sm:mx-5 max-md:mx-10 md:mx-10 lg:mx-20">
          <h1 className="font-bold bg-zinc-100 rounded-t-md py-2 flex">
            <div className="rounded-full bg-black mx-3 w-5 text-white text-center">
              3
            </div>
            Choose Lead Time
          </h1>
          <div className="bg-white gap-4 grid md:grid-cols-6 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 rounded-b-md place-items-center py-3">
            <div onClick={() => selectLeadTime('Default')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedLeadTime === 'Default' ? 'bg-gray-200' : ''}`}>Default</div>
            <div onClick={() => selectLeadTime('2 work days')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedLeadTime === '2 work days' ? 'bg-gray-200' : ''}`}>2 work days</div>
            <div onClick={() => selectLeadTime('5 work days')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedLeadTime === '5 work days' ? 'bg-gray-200' : ''}`}>5 work days</div>
            <div onClick={() => selectLeadTime('10 work days')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedLeadTime === '10 work days' ? 'bg-gray-200' : ''}`}>10 work days</div>
            <div onClick={() => selectLeadTime('15 work days')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedLeadTime === '15 work days' ? 'bg-gray-200' : ''}`}>15 work days</div>
            <div onClick={() => selectLeadTime('20 work days')} className={`border rounded w-fit text-center px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedLeadTime === '20 work days' ? 'bg-gray-200' : ''}`}>20 work days</div>
          </div>
        </div>
      </div>

      <Stepper activeValue={currentShopStep} />

      {showProductDetail && currentProduct ? (
          <>
          <ShirtProductDetail data={currentProduct} onClose={handleProductDetailClose} />
          <div className="mt-24">
            <RecommendedProductsGroup setCurrentProduct={handleProductSelection} products={productsData?.filter(product=>product?._id !== currentProduct?._id)} />
          </div>
          </>
        ) : (
          <>

            {isFetchProductsLoading ? (
              <div>Loading...</div>
            ) : isFetchProductsError ? (
              <div>Error fetching products: {fetchProductsError}</div>
            ) : productsData && productsData.length > 0 ? (
              <div className="mt-12">
                <NewProductGroup
                  products={productsData}
                  setCurrentProduct={handleProductSelection}
                  selectedBudget={selectedBudget}
                  selectedQuantity={selectedQuantity}
                  selectedLeadTime={selectedLeadTime}
                  selectedProductTitle={searchTerm}
                />
              </div>
            ) : (
              <div>No products available.</div>
            )}


          </>
        )}

    </NewLayout>
  );
};

export default NewHome;
