const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { send } = require("process");
const user = require("../models/user");



//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log('ALOJAMIENTO')
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "products/dsvbpny402gelwugv2le",
      url: "https://res.cloudinary.com/diz5eh6wd/image/upload/v1666590806/samples/animals/three-dogs.jpg",
    },
  });

  sendToken(user, 200, res);
});

//* Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //* check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  //* Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //* Check is password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//* Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  //* Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //* Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "User Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//* Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

  console.log('Reset Password...')
  //* Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  //* Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User logged in details

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

// Update/Change password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

  const user = await (await User.findById(req.user.id)).isSelected('+password');

  const isMatched = await user.comparePassword(req.body.oldPassword);
  if(!isMatched){
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }
  user.password = req.body.password;
  await user.save();

  sendToken(user,200,res);
});

// Update User Profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

  const newUserData = {
    name: req.body.name,
    email: req.body.email
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true
  });
});

//* Logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
  console.log("Logout...");
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out!",
  });
});

// Admin Routes
//Get All Users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {

  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  });
});

//Get User details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler(`User does not exist with the ID: ${req.params.id}`, 400));
  }

  res.status(200).json({
    success: true,
    user
  });
});

//Update User
exports.updateUser = catchAsyncErrors(async (req, res, next) => {

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true
  });
});

//Delete User

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler(`User does not exist with the ID: ${req.params.id}`, 400));
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});