const tourModel = require('../../models/tour.model');
const { msgSucces, msgErrNoInfo, msgErrDatabase } = require('../../constants');
const { showTour } = require('../../commonFunc');

const bestSeller = async (req, res) => {
    const tourPre = showTour({}, { 'totalOrders': -1, rate: -1 })
    try {
        const tours = await tourPre.exec()
        if (!tours[0])
            return res.status(204).send({ ...msgErrNoInfo })
        res.status(200).send({ ...msgSucces, tours })

    } catch (err) {
        res.status(500).send({ ...msgErrDatabase, err })
    }
}

module.exports = {
    bestSeller
};
