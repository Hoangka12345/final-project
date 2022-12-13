const { default: mongoose } = require('mongoose')
const { msgErrAdd, msgErrDatabase, msgSuccesAdd, msgErrMissInfo, msgErrShow, msgErrNoPermission, msgErrDel, msgSuccesDel } = require('../../constants')
const feedbackModel = require('../../models/feedback.model')


const delFeedback = (async (req, res) => {
    const userId = req.id
    const feedbackId = req.params.id

    feedbackModel.findById(feedbackId)
        .then((feedback) => {
            if (feedback.userId != userId)
                res.status(400).send({ ...msgErrNoPermission })
            else
                feedbackModel.findByIdAndDelete(feedbackId, (err) => {
                    if (err)
                        res.status(500).send({ ...msgErrDatabase })
                    else
                        res.status(200).send({ ...msgSuccesDel })

                })
        }).catch((err) => {
            res.status(500).send({ ...msgErrDatabase, err })
        });



})



module.exports = { delFeedback }