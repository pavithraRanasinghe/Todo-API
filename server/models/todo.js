const mongoose = require('mongoose');

const todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    completeAt: {
        type: Number,
        default: null
    }
});

module.exports = { todo };