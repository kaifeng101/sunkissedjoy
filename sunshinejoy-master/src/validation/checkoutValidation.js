import ValidateEmail from "../utils/functions/validateEmail";
import moment from 'moment'
export const checkoutValidation = (form,setError)=>{
    let errObj = {};
    if (!form.email) errObj.email = 'A valid email is required';
    if (form.email && !ValidateEmail(form.email)) errObj.email = 'Enter a valid email address';
    if (!form.firstName) errObj.firstName = 'First name is required';
    if (!form.lastName) errObj.lastName = 'Last name is required';
    if (!form.address) errObj.address = 'Address is required';
    if (!form.phoneNumber) errObj.phoneNumber = 'Phone Number is required';
    if (!form.shippingDate) errObj.shippingDate = 'Shipping Date is required';
    if (form.shippingDate) {
        if (moment(form.shippingDate).isBefore(moment(), 'day')) errObj.shippingDate = 'Shipping Date must be after today';
    }
    if (setError) setError(errObj);

    return Object.keys(errObj).length === 0;
}