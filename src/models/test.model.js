const mongoose = require('mongoose')
const packageName = mongoose.Types.Buffer

const test = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: Buffer, required: true },



}, { timestamps: true })

module.exports = mongoose.model('test', test)