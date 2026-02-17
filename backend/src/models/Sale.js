const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        default: 0.0,
    },
    status: {
        type: String,
        enum: ['completed', 'cancelled', 'refunded'],
        default: 'completed',
    },
}, {
    timestamps: true,
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
