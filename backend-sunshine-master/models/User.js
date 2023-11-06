const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true,'Last name is required']
    },
    lastName : {
        type : String,
        required : [true,'Last name is required']
    },
    email : {
        type : String,
        required : [true,'Email is required'],
        unique : [true,'Email should be unique']
    },
    googleId : {
        type : String,
        unique : [true,'Google id must be unique']
    },
    forgotPasswordToken : {
        type : String
    },
    forgotPasswordUsed : {
        type : Boolean,
        default : true
    },
    password: {
        type: String,
        // required: [true, 'Please provide a password'],
        minlength: [8, 'must be greater than 8'],
        select: false,
    },
}, {
    timestamps : true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      //  only run if password is modified
      return next();
    }
    this.password = await bcrypt.hash(this.password, 12); // hashing password
    next();
});

userSchema.methods.correctPassword = async function (candidate_Password, user_Password) {
    console.log(candidate_Password);
    return await bcrypt.compare(candidate_Password, user_Password);
};
  

const User = mongoose.models.User || mongoose.model('User',userSchema);
module.exports = User;