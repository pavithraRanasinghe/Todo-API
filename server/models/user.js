const mongoose = require('mongoose');

const user = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        default: null,
        trim: true,
        minlength: 5
    }
});

module.exports = {user};
