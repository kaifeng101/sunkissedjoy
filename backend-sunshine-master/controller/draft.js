const moment = require("moment");
const Draft = require("../models/Draft");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");
const User = require('../models/User');
exports.updateDraft = catchAsync(async(req,res,next)=>{
    const {data,title,preview} =req.body;
    
    const draftId =req.params.id;
    let currentDraft = await Draft.findOne({draftId});
    if (!currentDraft) {
         currentDraft = await Draft.create({preview,draftId,data,title : title || `New Doc ${moment().toString('DD-MMM')}`, user : req.user._id})
         await Draft.deleteMany({
            createdAt : {"$gt" : moment().add(15,'days').toString('DD/MM/YYYY')}
         })
    }
    else {
    let updates = {};
    if (data) updates.data = data;
    if (preview) updates.preview = preview;
    if (title) updates.title = title;
        currentDraft = await Draft.findByIdAndUpdate(currentDraft._id, updates, {new : true});
    }
    console.log(currentDraft)
    res.json({
        draft : currentDraft
    });    
})


exports.getUserDrafts = catchAsync(async(req,res,next)=>{
    const drafts = await Draft.find({user : req.user._id});
    res.json({
        drafts
    });
})

exports.deleteDraft = catchAsync(async(req,res,next)=>{
    const deletedDraft = await Draft.findOneAndDelete({draftId : req.params.id});
    res.json({
        draft : deletedDraft
    })
})

exports.getDraft = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const draft = await Draft.findOne({draftId : id});
    if (!draft) {
        return next(new AppError('Draft was not found!', 404));
    }
    res.json({
        draft
    });
})