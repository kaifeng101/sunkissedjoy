const mongoose = require('mongoose');


const templateSchema = new mongoose.Schema({
    title : {
        type : String,
        default : 'New Template'
    },
    json : {
        type : Object,
        required : true
    },
    preview : {
        type : String
    }
});


module.exports = mongoose.model('Template',templateSchema);