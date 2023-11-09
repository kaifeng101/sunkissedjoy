const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId


const orderSchema = new mongoose.Schema({
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
    subTotal : {
        type : Number,
        required : true,
        default : 0
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    customerEmail : {
        type : String,
        required : true
    },
    customerPhoneNumber : {
        type : String,
        required : true
    },
    shippingDate : {
        type : String,
        required : true
    },
    fastService : {
        type : String,
        default : 'No'
    },
    customerFirstName : {
        type : String,
        required : true
    },
    customerLastName : {
        type : String,
        required : true
    },
    customerAddress : {
        type : String,
        required : true
    },
    isPayment : {
        type : Boolean,
        default : false
    },
    sessionId : {
        type: String
    }
}, {
    timestamps: true
})


if (mongoose.models.Order) {
    delete mongoose.connection.models["Order"];
  }
  
const Order = mongoose.model("Order", orderSchema);

module.exports = Order