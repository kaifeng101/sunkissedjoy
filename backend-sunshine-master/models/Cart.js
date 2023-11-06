const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    user : {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    drawingStyle : {
        type: ObjectID,
        ref: 'DrawingStyle'    
    },
    momentsImage : String,
    numberOfPeople : Number,
    additionalComments : String,
    items: [{
        product: {
            type: ObjectID,
            ref: 'Product',
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        content : Array,
        price: Number
    }],
    total: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart