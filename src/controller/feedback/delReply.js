const { default: mongoose } = require('mongoose')
const { msgErrMissInfo, msgErrShow, msgErrDel, msgSuccesDel, msgErrNoPermission, msgErrNoInfo, msgErrDatabase } = require('../../constants')
const feedbackModel = require('../../models/feedback.model')


const delReply = ((req, res) => {
    const userId = req.id
    const replyId = req.params.id
    if (!replyId)
        return res.status(200).send({ ...msgErrMissInfo })
    feedbackModel.findOne({ 'replyFeedback._id': replyId }, (err, feedback) => {
        if (err)
            res.status(500).send({ ...msgErrDatabase })
        else if (feedback) {
            const reply = feedback.replyFeedback.id(replyId)
            if (reply.userId != userId)
                return res.status(400).send({ ...msgErrNoPermission })

            feedback.replyFeedback.pull(replyId)
            feedback.save((err) => {
                if (err)
                    res.status(500).send({ ...msgErrDatabase })
                else
                    res.status(200).send({ ...msgSuccesDel })
            })
        } else
            res.status(500).send({ ...msgErrDatabase })
    })
})
module.exports = { delReply }