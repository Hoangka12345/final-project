const { default: mongoose } = require('mongoose');
const { msgErrDatabase, msgErrNoInfo, msgSucces } = require('../../constants');
const bookingModel = require('../../models/booking.model');
const ObjectId = mongoose.Types.ObjectId

const show = async (req, res) => {
    const { id } = req
    const bookingPre = bookingModel.aggregate([
        {
            $match: { userId: ObjectId(id) }
        },

        {
            $addFields: { total: { $multiply: ["$price", "$numberTicket"] } }
        },
        { $sort: { auth: 1, createdAt: -1 } },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
                pipeline: [{
                    $project: { 'username': 1, 'avatar': 1 }
                }]
            }
        },
        {
            $lookup: {
                from: 'tours',
                localField: 'tourId',
                foreignField: '_id',
                as: 'tour',
                pipeline: [{
                    $project: { 'title': 1, 'image': 1 }
                }]
            }
        },])
    try {
        const bookings = await bookingPre.exec()
        if (!bookings[0])
            res.status(204).send({ ...msgErrNoInfo })
        else
            res.status(200).send({ ...msgSucces, bookings })

    } catch (error) {
        res.status(500).send({ ...msgErrDatabase, error })
    }
}

module.exports = {
    show
};
