const { msgErrDatabase, msgSuccesDel, msgErrNoInfo } = require('../../constants');
const feedbackModel = require('../../models/feedback.model');
const delReply = async (req, res) => {
    const replyId = req.params.id

    try {
        const feedback = await feedbackModel.findOne({ 'replyFeedback._id': replyId })
        if (!feedback)
            return res.status(204).send({ ...msgErrNoInfo })

        feedback.replyFeedback.pull(replyId)
        await feedback.save()
        res.status(200).send({ ...msgSuccesDel })

    } catch (err) {
        res.status(500).send({ ...msgErrDatabase, err })

    }

}

module.exports = {
    delReply
};
