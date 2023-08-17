const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, //one email per user
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    role: {
        // 0 : user , 1 : admin
        type: Number,
        default: 0,
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('users',userSchema);