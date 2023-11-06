const mongoose = require('mongoose');


const draftSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    data : Object,
    draftId : {
        type : String,
        unique : true
    },
    title : {
        type : String,
        default : 'New Draft'
    },
    preview : {
        type : String
    }

}, {
    timestamps : true
})



const Draft = mongoose.models.Draft || mongoose.model('Draft',draftSchema);
module.exports = Draft;