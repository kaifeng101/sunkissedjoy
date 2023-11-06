const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const DrawingStyle = require("../models/DrawingStyle");
exports.getCart = catchAsync(async (req, res, next) => {
  const userId = req?.user?._id || req.body.userId;
  const cart = await Cart.findOne({ user: userId })
    .populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .populate("drawingStyle");
  if (cart && cart.items.length > 0) {
    return res.json({
      status: true,
      cart,
    });
  } else {
    return res.json({
      status: false,
      cart: [],
    });
  }
});

exports.addItemToCart = catchAsync(async (req, res, next) => {
  const userId = req?.user?._id || req?.body?.userId;
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: userId });
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    return next(new AppError("Product Id is invalid!", 404));
  }

  if (quantity === 0) {
    if (!cart) return res.json({ message: "Invalid Cart", cart: [] });
    cart.items = cart.items.filter((item) => item.productId != productId);
    cart.total = cart.items.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    let upCart = await cart.save();
    let nextCart = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "productId",
        model: "Product",
      },
    });
    return res.json({
      status: true,
      cart: nextCart,
    });
  }

  const price = product.price;
  const name = product.title;
  //If cart already exists for user,
  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId == productId
    );
    //check if product exists or not

    if (itemIndex > -1) {
      let product = cart.items[itemIndex];
      product.quantity = quantity;

      cart.total = cart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      cart.items[itemIndex] = product;
      await cart.save();
      let nextCart = await Cart.findOne({ user: userId }).populate({
        path: "items",
        populate: {
          path: "productId",
          model: "Product",
        },
      });
      res.status(200).json({
        status: true,
        cart: nextCart,
      });
    } else {
      cart.items.push({ productId, name, quantity, price });
      cart.total = cart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      await cart.save();
      let nextCart = await Cart.findOne({ user: userId }).populate({
        path: "items",
        populate: {
          path: "productId",
          model: "Product",
        },
      });
      return res.status(201).json({ status: true, cart: nextCart });
    }
  } else {
    //no cart exists, create ones
    const newCart = await Cart.create({
      user: userId,
      items: [{ productId, name, quantity, price }],
      total: quantity * price,
    });
    let nextCart = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "productId",
        model: "Product",
      },
    });
    return res.status(201).json({ status: true, cart: nextCart });
  }
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const {
    products,
    additionalComments,
    momentsImage,
    numberOfPeople,
    drawingStyle,
  } = req.body;
  console.log(req.body);
  const user = req.user;
  await Cart.findOneAndDelete({ user: user._id });
  let productIds = products.map((p) => p.productId);
  let selectedDrawingStyle = await DrawingStyle.findById(drawingStyle);
  let Products = await Product.find({ _id: { $in: productIds } });
  let productsFiltered = products.map((p) => {
    let product = Products.find(
      (product) => product._id.toString() === p.productId.toString()
    );
    return {
      ...p,
      product,
      price: product.price,
    };
  });
  console.log(productsFiltered);

  let total = 0;
  for (let i = 0; i < productsFiltered.length; i++) {
    total += productsFiltered[i].quantity * productsFiltered[i].price;
  }
  total += (+numberOfPeople || 1) * +selectedDrawingStyle.price;

  const newCart = await Cart.create({
    user: user._id,
    items: productsFiltered.map((item) => ({
      product: item.productId,
      name: item.product.title,
      quantity: item.quantity,
      price: item.price,
      content: item.content,
    })),
    additionalComments: additionalComments,
    momentsImage: momentsImage || '',
    numberOfPeople: numberOfPeople,
    drawingStyle: drawingStyle,
    total,
  });
  let filledCart = await Cart.findOne({ user: user._id })
    .populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .populate("drawingStyle");

  res.json({
    cart: filledCart,
  });
});

exports.clearCart = catchAsync(async (req, res) => {
  const result = await Cart.findOneAndDelete({ user: req.user._id });
  res.json({
    status: true,
    result,
  });
});
