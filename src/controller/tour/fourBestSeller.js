const { msgSucces, msgErrDatabase } = require('../../constants');
const { showTour } = require('../../commonFunc');

const fourBestSeller = async (req, res) => {
    const tourPre = showTour({ auth: true, active: true }, { "totalOrders": 1, rate: -1 }).limit(4)

    try {
        const tours = await tourPre.exec()
        res.status(200).send({ ...msgSucces, tours })

    } catch (error) {
        res.status(500).send({ ...msgErrDatabase, error })
    }
}

module.exports = {
    fourBestSeller
};
