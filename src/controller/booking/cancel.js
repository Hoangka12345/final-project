const { msgErrMissInfo, msgErrNoPermission, msgErrNoInfo, msgErrDatabase, msgSuccesDel } = require("../../constants");
const bookingModel = require("../../models/booking.model");


const cancelTour = async (req, res) => {
    const id = req.id
    const { bookingId } = req.body
    if (!bookingId)
        return res.status(200).send(msgErrMissInfo)
    const booking = await bookingModel.findById(bookingId)
        .catch(err => res.status(500).send(msgErrDatabase))
    if (!booking)
        return res.status(200).send(msgErrNoInfo)
    if (booking.userId != id)
        return res.status(200).send(msgErrNoPermission)
    if (booking.auth !== 0)
        return res.status(200).send({ Message: "Đơn hàng không thể huỷ" })
    bookingModel.findByIdAndDelete(bookingId, (err) => {
        if (err)
            res.status(500).send(msgErrDatabase)
        else
            res.status(200).send(msgSuccesDel)
    })
}

module.exports = {
    cancelTour
};
