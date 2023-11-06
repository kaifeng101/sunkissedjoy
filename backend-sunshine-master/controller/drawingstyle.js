const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const DrawingStyle = require('../models/DrawingStyle');


exports.createDrawingStyle = catchAsync(async(req,res,next)=>{
    let newDraw = new DrawingStyle(req.body);
    let savedDraw = await newDraw.save();
    res.json(savedDraw);
})


exports.getDrawingStyles = catchAsync(async(req,res,next)=>{
    let allDraws = await DrawingStyle.find({});
    return res.json({
        status : true,
        drawingStyles : allDraws
    })
})