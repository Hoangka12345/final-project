const { default: mongoose } = require("mongoose");
const { msgErrDatabase, msgSucces, msgErrNoInfo } = require("../../constants");
const bookingModel = require("../../models/booking.model");
const ObjectId = mongoose.Types.ObjectId;

const showBooking = (req, res) => {
  const id = req.id;
  const bookingPre = bookingModel.aggregate([
    { $sort: { auth: 1, createdAt: -1 } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: { username: 1, avatar: 1, email: 1 },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "tours",
        localField: "tourId",
        foreignField: "_id",
        as: "tour",
        pipeline: [
          {
            $project: { title: 1, image: 1, userId: 1 },
          },
        ],
      },
    },
    { $match: { "tour.userId": new ObjectId(id) } },
    {
      $addFields: { total: { $multiply: ["$price", "$numberTicket"] } },
    },
  ]);

  bookingPre
    .exec()
    .then((bookings) => {
      if (!bookings[0]) return res.status(204).send({ ...msgErrNoInfo });

      res.status(200).send({ ...msgSucces, bookings });
    })
    .catch((err) => {
      res.status(500).send({ ...msgErrDatabase, err });
    });
};

module.exports = {
  showBooking,
};
