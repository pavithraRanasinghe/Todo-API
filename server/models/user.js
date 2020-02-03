const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('user', {
    email: {
        type: String,
        default: null,
        trim: true,
        minlength: 5,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength: 8
    },
    token:[{
        access:{
            type: String,
            required:true
        },
        token:{
            type: String,
            required:true
        }
    }]
});

module.exports = User;
