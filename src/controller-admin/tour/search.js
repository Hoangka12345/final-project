const { showTour } = require('../../commonFunc');
const { msgErrNoInfo, msgSucces, msgErrDatabase, msgErrMissInfo } = require('../../constants');
const tourModel = require('../../models/tour.model');

const search = async (req, res) => {
    const { key } = req.query
    if (!key)
        return res.status(400).send(msgErrMissInfo)
    //  --------- check by title name -------
    const tourPrepare = showTour({ $or: [{"category": { $regex: key, $options: 'i' }},
                                {"city": { $regex: key, $options: 'i' }}]}, { createdAt: -1, auth: 1 })

    try {
        const tours = await tourPrepare.exec()
        if (tours[0])
            res.status(200).send({ ...msgSucces, tours })
        else
            res.status(204).send({ ...msgErrNoInfo })

    } catch (err) {
        res.status(500).send({ ...msgErrDatabase, err })

    }


}

module.exports = {
    search
};
