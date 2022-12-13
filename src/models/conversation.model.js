
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const message = new mongoose.Schema({
    senderId: { type: ObjectId, required: true },
    content: { type: String, required: true },

}, { timestamps: true })
const ConversationModel = mongoose.Schema({
    userId: [{ type: ObjectId, required: true }, { type: ObjectId, required: true }],
    messages: [message]
}, { timestamps: true })

module.exports = mongoose.model('conversation', ConversationModel)
