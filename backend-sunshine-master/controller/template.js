const Template = require("../models/Template");
const catchAsync = require("../utils/catchAsync");

exports.createTempalte = catchAsync(async(req,res)=>{
    const {title,json,preview} = req.body;
    const template = await Template.create({
        title,
        json,
        preview
    })
    return res.json({
        template,
        success : true
    })
})

exports.getTemplates = catchAsync(async(req,res)=>{
    const templates = await Template.find({});
    return res.json({
        templates,
        success : true
    })
});

