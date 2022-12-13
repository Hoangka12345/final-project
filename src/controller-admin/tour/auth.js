const { msgSuccesUpdate, msgErrDatabase, msgErrNoInfo, msgErrMissInfo } = require('../../constants')
const tourModel = require('../../models/tour.model')




// --------- authentication tour -----------
const auth = ((req, res) => {
    const { tourId, auth } = req.body
    if (!tourId || !auth)
        return res.status(400).send(msgErrMissInfo)
    tourModel.findByIdAndUpdate(tourId, { auth }, { new: true },)
        .then((tour) => {
            if (!tour)
                return res.status(204).send({ ...msgErrNoInfo })
            res.status(200).send({ ...msgSuccesUpdate, tour })
        })
        .catch(err => res.status(500).send({ ...msgErrDatabase, err }))
})

module.exports = auth