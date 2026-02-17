const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
