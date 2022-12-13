const { default: mongoose } = require("mongoose");
const { msgErrNoInfo, msgErrDatabase, msgSuccesDel } = require("../../constants");
const tourModel = require("../../models/tour.model");
const ObjectId = mongoose.Types.ObjectId

const delTour = async (req, res) => {
    const { tourId } = req.body
    const id = req.id
    const tourPre = tourModel.aggregate([
        { $match: { _id: ObjectId(tourId), userId: ObjectId(id) } },
        {
            $lookup: {
                from: 'bookings',
                localField: '_id',
                foreignField: 'tourId',
                as: 'booking'
            }
        }
    ])
    try {
        const tour = await tourPre.exec()
        if (!tour)
            return res.status(400).send(msgErrNoInfo)
        // -------- turn off tour -------
        if (tour[0].booking[0]) {
            const tourDel = await tourModel.findByIdAndUpdate(tourId, { active: false })
            if (!tourDel)
                res.status(400).send(msgErrNoInfo)
            else
                res.status(200).send({ Message: 'Tour đang trong booking và đã dừng phục vụ' })
        } else {
            // -------- del tour --------
            const tourDel = await tourModel.findByIdAndDelete(tourId)
            if (!tourDel)
                res.status(400).send(msgErrNoInfo)
            else
                res.status(200).send(msgSuccesDel)

        }
    } catch (err) {
        res.status(500).send({ msgErrDatabase, err })
    }
}

module.exports = {
    delTour
};
