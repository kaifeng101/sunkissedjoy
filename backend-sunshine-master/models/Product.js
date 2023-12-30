const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    perPiece: Number,
    perPieceDiscounted: Number,
    per100Pieces: Number,
    per100PiecesDiscounted: Number,
    per500Pieces: Number,
    per500PiecesDiscounted: Number,
    perAbove500Pieces: Number,
    perAbove500PiecesDiscounted: Number,
  });
  
  const leadTimeSchema = new mongoose.Schema({
    perPiece: Number,
    per100Pieces: Number,
    per500Pieces: Number,
    perAbove500Pieces: Number,
  });

const productSchema = new mongoose.Schema({
    title : String,
    subTitle : String,
    description : String,
    price : priceSchema,
    leadTime: leadTimeSchema,
    note : String,
    images : [String]
});


module.exports = mongoose.model('Product',productSchema);