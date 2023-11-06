const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title : String,
    subTitle : String,
    description : String,
    price : String,
    note : String,
    images : [String]
});


module.exports = mongoose.model('Product',productSchema);