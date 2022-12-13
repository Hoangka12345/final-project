const { msgErrAdd, msgErrDatabase, msgSuccesAdd, msgErrMissInfo, msgErrNoInfo } = require('../../constants')
const feedbackModel = require('../../models/feedback.model')


const addReply = ((req, res) => {
    const id = req.id
    const { feedbackId, content } = req.body

    if (!feedbackId || !content || !id)
        return res.status(200).send({ ...msgErrMissInfo })

    feedbackModel.findById(feedbackId)
        .then(feedback => {
            feedback.replyFeedback.push({ userId: id, content })
            feedback.save((err, feedback) => {
                if (err)
                    res.status(500).send({ ...msgErrDatabase, err })
                else
                    res.status(200).send({ ...msgSuccesAdd, feedback })
            })
        })
        .catch(err => res.status(500).send({ ...msgErrDatabase, err }))


})



module.exports = { addReply }