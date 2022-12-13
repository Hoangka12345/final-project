const { default: mongoose } = require("mongoose");
const { msgErrDatabase, msgSucces, msgErrNoInfo } = require("../../constants");
const bookingModel = require("../../models/booking.model");
const ObjectId = mongoose.Types.ObjectId;

const getTotalEachMonth = (req, res) => {
  const bookingPre = bookingModel.aggregate([
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
    {
      $addFields: { total: { $multiply: ["$price", "$numberTicket"] } },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalCost: { $sum: "$price" },
      },
    },
  ]);

  bookingPre
    .exec()
    .then((dashboards) => {
      res.status(200).send({ ...msgSucces, dashboards });
    })
    .catch((err) => {
      res.status(500).send({ ...msgErrDatabase, err });
    });
};

module.exports = {
  getTotalEachMonth,
};
