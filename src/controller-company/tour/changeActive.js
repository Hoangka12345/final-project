const { msgErrMissInfo, msgErrDatabase, msgErrNoInfo, msgSuccesUpdate } = require("../../constants")
const tourModel = require("../../models/tour.model")

const changeActive = (req, res) => {
    const id = req.id
    const { tourId, active } = req.body
    if (!tourId || !active)
        return res.status(400).send(msgErrMissInfo)
    // -------- update ------
    tourModel.findOneAndUpdate(
        { _id: tourId, userId: id },
        { active },
        { new: true },
        (err, tour) => {
            if (err)
                return res.status(500).send({ ...msgErrDatabase, err })
            else if (!tour)
                res.status(204).send({ ...msgErrNoInfo })
            else
                res.status(200).send({ ...msgSuccesUpdate, tour })
        })
}

module.exports = {
    changeActive
};
