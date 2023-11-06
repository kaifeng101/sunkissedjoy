import { ArrowBackIos } from "@mui/icons-material";
import {
  Button as MUIButton,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../hooks/useAppStore";
import Button from "../common/Button";


const CheckoutForm = ({form,setForm,error}) => {
  const [dateFocused,setDateFocused] = useState(false);
 
  const handleChange = ({target})=>setForm(prev=>({...prev,[target.name] : target.value}));

  const setCurrentShopStep = useAppStore(state=>state.setCurrentShopStep);
  const setShowCart = useAppStore(state=>state.setShowCart);
  const navigate = useNavigate();

  

  return (
    <>
      <section className="max-md:order-2">
        <div className="text-2xl max-sm:text-xl font-semibold">
          Let us remind you when it's ready!
        </div>
        <div className="mt-8 max-sm:flex-col max-sm:items-start flex items-center justify-between">
          <div className="font-[500]">Contact Information</div>
          <div className="font-[500] hidden">
            <span className="opacity-60 font-[300] mr-2">
              Already have an account?
            </span>
            Login
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <TextField
            size="small"
            fullWidth
            placeholder="Email"
            color="warning"
            name='email'
            onChange={handleChange}
            value={form.email}
            error={error.email}
            helperText={error.email}
          />
          <TextField
            size="small"
            fullWidth
            placeholder="Phone Number"
            type="tel"
            color="warning"
            name='phoneNumber'
            onChange={handleChange}
            value={form.phoneNumber}
            error={error.phoneNumber}
            helperText={error.phoneNumber}

          />
        </div>
        <div className="mt-8">
          <div className="text-xl font-semibold max-sm:text-lg">
            When do you need this by?
          </div>
          <div className="text-sm mt-1 font-[300] max-sm:text-xs">
            Usual Waiting time is 2 weeks. Joy has small hands and will do her
            best to get your products completed quick!{" "}
          </div>
          <div className="mt-3 w-full">
            <TextField  error={error.shippingDate} helperText={error.shippingDate} color='warning' onChange={(e)=>{
              setForm(prev=>({...prev,shippingDate:e.target.value}));
              let difference = moment(e.target.value).diff(moment(), 'days');
              if (difference<14 && difference>=0) {
                toast.success('your chosen date requires fast service')
                setForm(prev=>({...prev,fastService:'Yes'}));
              }
              else {
                setForm(prev=>({...prev,fastService:'No'}));
              }
            }}  name='shippingDate' size="small" fullWidth  value={form.shippingDate} placeholder="DD/MM/YYYY" type={!dateFocused?'text':'date'} onFocus={()=>setDateFocused(true)} onBlur={()=>setDateFocused(false)}  />
          </div>
        </div>
        {/*<div className="mt-8">*/}
        {/*  <div className="text-xl font-semibold max-sm:text-lg">*/}
        {/*    Do you need fast service?*/}
        {/*  </div>*/}
        {/*  <div className="text-sm mt-1 font-[300] max-sm:text-xs">*/}
        {/*    Joy will prioritise your order and have it shipped to you within 2*/}
        {/*    days!*/}
        {/*  </div>*/}
        {/*  <div className="mt-3">*/}
        {/*    <RadioGroup*/}
        {/*      row*/}
        {/*      sx={{ gap: "30px" }}*/}
        {/*      aria-labelledby="demo-radio-buttons-group-label"*/}
        {/*      defaultValue="female"*/}
        {/*      name="fastService"*/}
        {/*      value={form.fastService}*/}
        {/*      onChange={handleChange}*/}
        {/*    >*/}
        {/*      <FormControlLabel value="No" control={<Radio />} label="No" />*/}
        {/*      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />*/}
        {/*    </RadioGroup>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="mt-8">
          <div className="text-xl font-semibold max-sm:text-lg">
            Shipping Address
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <TextField
              name='firstName'
              fullWidth
              size="small"
              error={error.firstName}
              helperText={error.firstName}
              color="warning"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              error={error.lastName}
              helperText={error.lastName}
              color="warning"
              name='lastName'
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <TextField
            sx={{ marginTop: "16px" }}
            fullWidth
            rows={3}
            multiline
            size="small"
            name='address'
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            color='warning'
            error={error.address}
            helperText={error.address}
          />
        </div>
        <div className="mt-16 hidden max-md:flex justify-end">
          <Button className={'w-full'}>Make my gift!</Button>
        </div>
        <div className="mt-44 max-md:mt-16  max-sm:gap-4 max-xs:gap-3 flex items-center justify-between">
          <MUIButton onClick={()=>setShowCart(true)} sx={{ color: "black", fontSize  : {xs : 12, sm : 16} }} size='small' startIcon={<ArrowBackIos />}>
            Return To Cart
          </MUIButton>
          <Button onClick={()=>{
            setCurrentShopStep(2);
            navigate('/shop?state=another')
          }} className="py-[10px] hover:bg-opacity-80">
            Add another {<span className="max-md:hidden">product to cart</span>}
          </Button>
        </div>
      </section>
    </>
  );
};

export default CheckoutForm;
