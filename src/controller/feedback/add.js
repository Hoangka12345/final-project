const { msgErrDatabase, msgSuccesAdd, msgErrMissInfo } = require('../../constants')
const feedbackModel = require('../../models/feedback.model')


const addFeedback = ((req, res) => {
    const id = req.id
    const { tourId, content } = req.body

    if (!tourId || !content || !id)
        return res.status(400).send({ ...msgErrMissInfo })

    // ------ crate feedback ---------
    feedbackModel.create({ userId: id, tourId, content }, (err, feedback) => {
        if (err)
            res.status(500).send({ ...msgErrDatabase, err })
        else
            res.status(200).send({ ...msgSuccesAdd, feedback })
    })
})



module.exports = { addFeedback }