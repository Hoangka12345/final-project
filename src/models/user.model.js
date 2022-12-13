const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    role: { type: Number, default: 1 },
    phoneNumber: { type: Number, required: true }

}, { timestamps: true })

module.exports = mongoose.model('user', User)