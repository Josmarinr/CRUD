const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tshirt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tshirt'
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        trim: true
    },
    total: {
        type: Number,
        required: [true, 'Total is required'],
        trim: true
    }
});

module.exports = mongoose.model('Order', orderSchema);