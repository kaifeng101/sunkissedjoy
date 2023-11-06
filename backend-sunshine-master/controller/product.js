const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/Product");


exports.fetchProducts = catchAsync(async(req,res,next)=>{
    const page = req.query.page || 1;
    const offset = req.query.offset || 10;
    const products = await Product.find({}).skip((page-1)*offset).limit(offset);
    const totalProducts = await Product.countDocuments({});
    let totalPages = Math.ceil(totalProducts/offset);
    return res.json({
        status : true,
        totalPages,
        page,
        products
    })
});

exports.addProduct = catchAsync(async(req,res,next)=>{
    const {title,subTitle,description,price,note,images} = req.body;
    let newProduct = new Product({
        title,subTitle,description,price,note,images
    });
    newProduct = await newProduct.save();
    return res.json({
        status : true,
        product : newProduct
    })
})

exports.deleteProduct = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const deletedStatus = Product.findByIdAndDelete(id);
    res.json(deleteStatus);
})
