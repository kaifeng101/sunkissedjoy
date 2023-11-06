const mongoose = require('mongoose');


const drawingStyleSchema = new mongoose.Schema({
    title : String,
    price : Number,
    images : [String]
});


module.exports = mongoose.model('DrawingStyle',drawingStyleSchema);