const tourModel = require('../../models/tour.model')
const { msgErrNoInfo, msgSucces, msgErrDatabase } = require('../../constants');
const { showTour } = require('../../commonFunc');

const show = async (req, res) => {
    const tourPrepare = showTour({}, { auth: 1, createdAt: -1 })

    try {
        const tours = await tourPrepare.exec()
        if (!tours[0])
            res.status(204).send({ ...msgErrNoInfo })
        else
            res.status(200).send({ ...msgSucces, tours })

    } catch (err) {
        res.status(500).send({ ...msgErrDatabase, err })

    }
}
module.exports = show