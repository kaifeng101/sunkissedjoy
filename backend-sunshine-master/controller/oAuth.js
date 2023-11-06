const { default: axios } = require("axios");
const User = require("../models/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { createsendToken } = require("./auth");
const generateUniqueId = require('generate-unique-id');

exports.GoogleRegister = catchAsync(async(req,res,next)=>{
    const {accessToken} = req.body;
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    let email = data?.email;
    let name = data?.name;
    let picture = data?.picture;
    let googleId = data?.sub;
    let givenName = data?.given_name;
    let familyName = data?.family_name;
    const checkUserEmail = await User.findOne({email});
    console.log(checkUserEmail)
    if(checkUserEmail){
        return next(new AppError("Email already exists!", 400));
    }
    let user = await User.create({
      firstName : givenName,
      lastName : familyName,
      email,
      googleId
    })

    user = await user.save({
        validateBeforeSave : false
    });

    createsendToken(user, 200, res);

})

exports.GoogleLogin = catchAsync(async(req,res,next)=>{
    const {accessToken} = req.body;
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    let email = data?.email;
    let googleId = data?.sub;

    let user = await User.findOne({
        googleId
    });
    let isUserEmail = await User.findOne({
        email
    });

    if (isUserEmail && !user) {
        return next(new AppError("Please use password login to access your account!", 400));
    }

    if (!user){
        return next(new AppError("User does not exist, Please Register.", 400));
    }

    createsendToken(user, 200, res);
})