const { default: mongoose } = require('mongoose');
const { msgErrMissInfo, msgErrDatabase, msgSuccesAdd } = require('../../constants');
const ConversationModel = require('../../models/conversation.model');
const ObjectId = mongoose.Types.ObjectId

const addMessage = async (req, res) => {
    const id = req.id
    const { receiverId, content } = req.body
    if (!receiverId || !content)
        return res.status(400).send({ ...msgErrMissInfo })
    try {
        let conversation = await ConversationModel.findOne(
            { userId: { $all: [ObjectId(receiverId), ObjectId(id)] } }
        )
        if (!conversation)
            conversation = new ConversationModel({ userId: [receiverId, id] })

        conversation.messages.push({ senderId: id, content })
        conversation.save()
            .then((result) => {
                res.status(200).send({ ...msgSuccesAdd, result })
            })

    } catch (err) {
        res.status(500).send({ ...msgErrDatabase, err })
    }
}

module.exports = {
    addMessage
};
