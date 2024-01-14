const Cart = require("../models/Cart");
const Order = require("../models/Order");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const createOrder = async (req, res) => {
  const {
    customerEmail,
    customerPhoneNumber,
    shippingDate,
    fastService,
    customerFirstName,
    customerLastName,
    customerAddress,
  } = req.body;
  console.log(req.body);

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart || cart.items?.length === 0)
    return res.status(400).json({ message: "Cart is empty" });
  const {
    drawingStyle,
    items,
    total,
    numberOfPeople,
    additionalComments,
    momentsImage,
  } = cart;
  let order = new Order({
    user: req.user._id,
    items: items,
    subTotal: total,
    customerEmail,
    customerPhoneNumber,
    shippingDate,
    fastService,
    customerFirstName,
    customerLastName,
    customerAddress,
    drawingStyle,
    numberOfPeople,
    additionalComments,
    momentsImage,
    total: total + 4 + (fastService === "Yes" ? 10 : 0),
  });

  let savedorder = await order.save();
  return savedorder;
};

exports.placeOrder = catchAsync(async (req, res) => {
  let savedorder = await createOrder(req, res);

  res.json({
    message: "Order placed successfully",
    order: savedorder,
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id, isPayment: true })
    .populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .populate("drawingStyle");
  return res.json({
    orders,
    message: "Orders fetched!",
  });
});

exports.getAdminOrder = catchAsync(async (req, res, next) => {
  const token = req.body.token
  if (!token)
    return res.status(401).json({ message: "Invalid Token" });
  const decode = await promisify(jwt.verify)(
    token,
    process.env.ORDER_VIEW_SECRET
  );
  let order = await Order.findById(decode.orderId)
    .populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .populate("drawingStyle");
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  return res.json({
    order,
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .populate("drawingStyle");
  console.log("order");
  res.json({
    order,
  });
});

exports.createOrder = createOrder;
