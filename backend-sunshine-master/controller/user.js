const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/User");
const Product = require("../models/Product");

exports.updateCart = catchAsync(async(req,res,next)=>{
    const {productId,quantity} = req.body;
    const userId = req?.user?._id || req.body.userId
    const user = await User.findById(userId)
    let cartItems = user.cart;
    console.log(cartItems);

    const ProductFound = await Product.findById(productId);
    if (!ProductFound) {
        return next(new AppError('Invalid product id', 404));
    }
    if (quantity===0) {
        cartItems = cartItems.filter(p=>p.product!==productId);

    }
    else {
        let cartFilter = cartItems.filter(p=>p.product===productId);
        console.log(cartFilter);
        if (cartFilter.length>0) {
        cartItems = cartItems.map(p=>{
            if (p.product===productId) {
                return {...p,quantity}
            }
        })
    }else {
        cartItems.push({
            product : ProductFound,
            quantity
        })
    }
    }
    user.cart = cartItems;
    let updatedUser = await user.save();
    const usersPopulated = await User.findById(userId).populate({
        path : 'cart',
        populate : {
            path : 'product',
            model : 'Product'
        }
    });
    
    return res.json({
        cart : usersPopulated.cart,
        success : true
    })
})


exports.editUser = catchAsync(async(req,res,next)=>{
    const {firstName,lastName,address} = req.body;
    if (!firstName || !lastName || !address) return next(new AppError('Please provide valid fields!', 400));
    let updatedUser = await User.findByIdAndUpdate(req.user._id, {firstName,lastName,address}, {new : true});
    res.json({
        user : updatedUser
    })
})