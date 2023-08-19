const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    productId: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required:true,
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('carts',cartSchema);