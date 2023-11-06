import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartAndTotal from "../components/Checkout/CartAndTotal";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import HeroComponent from "../components/common/HeroComponent";
import Stepper from "../components/common/Stepper";
import Layout from "../components/Layout/Layout";
import useCart from "../hooks/useCart";
import { HomeSecondaryBannerImg } from "../utils/Assets";
import CircularProgress from "@mui/material/CircularProgress";
import { checkoutValidation } from "../validation/checkoutValidation";
import CheckoutComplete from "../components/Checkout/CheckoutComplete";
import useOrder from "../hooks/useOrder";
import { useQueryClient } from "@tanstack/react-query";
import useAppStore from "../hooks/useAppStore";
import { toast } from "react-hot-toast";
import EmptyCart from "../components/Checkout/EmptyCart";
import { useNavigate } from "react-router-dom";
import { useStripe } from "../hooks/useStripe";
import { useQueryParams } from "../hooks/useQueryParams";

const INITIAL_FORM = {
  email: "",
  phoneNumber: "",
  shippingDate: "",
  fastService: "",
  firstName: "",
  lastName: "",
  address: "",
};

const Checkout = () => {
  const { isFetchCartLoading,totalItems } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(INITIAL_FORM);
  const navigate = useNavigate();
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const queryClient = useQueryClient();
  const clearCartDetails = useAppStore((state) => state.clearCartDetails);
  const {stripeCall} = useStripe();
  const {getParam} = useQueryParams();
  const { isPlaceOrderLoading, placeOrder, placeOrderError,placeOrderData } = useOrder({
    placeOrderSuccessCallback: (data) => {
      setCheckoutCompleted(true);
      setForm(INITIAL_FORM);
      clearCartDetails();
      queryClient.invalidateQueries(["cart"]);
    },
    placeOrderErrorCallback: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
  const handleCheckout = () => {
    const isValidated = checkoutValidation(form, setError);
    if (!isValidated) return;
    let data = {
      customerEmail : form.email,
      customerAddress: form.address,
      customerPhoneNumber: form.phoneNumber,
      shippingDate: form.shippingDate,
      fastService: form.fastService,
      customerFirstName: form.firstName,
      customerLastName: form.lastName,
    }
    stripeCall.mutate({
      data
    });

    // placeOrder({data});
  };

  useEffect(()=>{
    let isCompleted = getParam('completed');
    if (isCompleted === 'true') {
      setCheckoutCompleted(true);
    }
  }, [])

  return (
    <Layout>
      {checkoutCompleted ? (
        <CheckoutComplete orderId={getParam('orderId') || ''} />
      ) : (
        <>
          {isFetchCartLoading ? (
            <div className="h-[20vh] w-full flex items-center flex-col justify-center">
              <CircularProgress sx={{ color: "#f97b64" }} size={40} />
              <div className="mt-4 text-center text-lg font-[500]">
                Fetching Cart...
              </div>
            </div>
          ) : !totalItems?<div className="mt-16 py-8"><EmptyCart/></div>:(
            <>
            <HeroComponent
            hideButton={true}
            backgroundImage={HomeSecondaryBannerImg}
            title="Create your Gift in 3 Simple Steps!"
          />
            <div className="mt-6 max-sm:mt-36 max-xs:mt-6 px-20 max-xl:px-10 max-lg:px-7 max-sm:px-3 max-content-width">
              <Stepper stepTwoClick={()=>navigate('/shop')} activeValue={2} />
              <div className="grid mt-16 max-md:mt-12 max-sm:mt-8 max-lg:gap-12 max-md:gap-9 max-md:grid-cols-1 gap-20 max-xl:grid-cols-[2fr_1.7fr] grid-cols-[2fr_1.4fr]">
                <CheckoutForm
                  error={error}
                  setError={setError}
                  form={form}
                  setForm={setForm}
                />
                <CartAndTotal
                  isLoading={stripeCall.isLoading}
                  fastService={form.fastService === "Yes"}
                  handleCheckout={handleCheckout}
                />
              </div>
            </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default Checkout;
