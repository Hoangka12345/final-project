const { msgErrDatabase, msgSuccesDel, msgErrNoInfo } = require('../../constants');
const feedbackModel = require('../../models/feedback.model');
const delFeedback = (req, res) => {
    const feedbackId = req.params.id
    feedbackModel.findByIdAndDelete(feedbackId).then((result) => {
        if (!result)
            return res.status(204).send({ ...msgErrNoInfo })
        res.status(200).send({ ...msgSuccesDel })

    }).catch((err) => {
        res.status(500).send({ ...msgErrDatabase, err })
    });
}

module.exports = {
    delFeedback
};
