const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const { promisify } = require('util');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // payload + secret + expire time
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createsendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // Remove the password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) {
    return next(new AppError("Email already exists!", 400));
  }
  let user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
  });

  // Generate Account Activation Link
  user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "Success",
    message: `Your account has been created successfully!`,
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    //  check email and password exist
    return next(new AppError("Please proveide email and password ", 400));
  }

  const user = await User.findOne({ email }).select("+password"); // select expiclity password

  if (!user)
    return next(new AppError(`No User found against email ${email}`, 404));
  if (
    !user || // check user exist and password correct
    !(await user.correctPassword(password, user.password))
  ) {
    // candinate password,correctpassword
    return next(new AppError("Incorrect email or password", 401));
  }
  if (user.activated === false)
    return next(
      new AppError(
        `Your account is not activated! Please contact admin@daily-fantasy.com to know the status.`,
        401
      )
    );

  createsendToken(user, 200, res);
});

//google Login Success
exports.handleGoogleLoginSuccess = catchAsync(async (req, res) => {
    alert('fe')
  if (req.user) {
    console.log(req.user.id, "Found User");
    let profileId = req.user.id;
    let foundUser = await User.findOne({ googleId: profileId });
    if (!foundUser) {
      return res.status(403).json({ error: true, message: "Not Authorized" });
    }
    // let token
    createsendToken(foundUser, 200, res);
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("Please provide valid email", 404));
  const user = await User.findOne({ email });
  console.log(user, "user");
  if (!user)
    return next(new AppError(`User with email ${email} was not found!`, 404));

  let token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  user.forgotPasswordUsed = false;
  user.forgotPasswordToken = token;
  await user.save();

  sendEmail(
    email,
    `<h2>Forgot password?</h2> <p>Follow this url to reset password <a href="${process.env.CLIENT_BASE_URL}/reset-password?token=${token}">Reset Link</a></p>`,
    "Reset Password | Sunshine Joy"
  );

  res.json({
    message: "Reset token has been sent successfully!",
  });
});

exports.verifyResetPasswordToken = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordUsed: false,
  });
  if (!user) {
    return next(new AppError("Token is invalid", 400));
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  res.json({
    message: "Token verified",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword || newPassword.length < 8) {
    return next(new AppError("Please provide a valid New Password", 400));
  }
  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordUsed: false,
  });
  if (!user) {
    return next(new AppError("Something went wrong! Please try again", 400));
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  user.password = newPassword;
  user.forgotPasswordUsed = true;
  user.forgotPasswordToken = null
  const savedUser = await user.save();
  console.log(savedUser, 'Saved user')
  res.json({
    message: "Password reset successfully!",
  });
});


exports.createsendToken = createsendToken;