const { default: mongoose } = require("mongoose");
const { msgErrDatabase, msgSucces, msgErrNoInfo } = require("../../constants");
const userModel = require("../../models/user.model");
const ObjectId = mongoose.Types.ObjectId;

const getIncomeEachCompany = (req, res) => {
  const bookingPre = userModel.aggregate([
    { $match: { role: 2 } },
    { $project: { username: 1 } },
    {
      $lookup: {
        from: "tours",
        localField: "_id",
        foreignField: "userId",
        as: "tours",
        pipeline: [
          {
            $project: { title: 1 },
          },

          {
            $lookup: {
              from: "bookings",
              localField: "_id",
              foreignField: "tourId",
              as: "booked",
              pipeline: [
                {
                  $group: {
                    _id: {
                      year: { $year: "$createdAt" },
                    },
                    totalCost: { $sum: "$price" },
                  },
                },
              ],
            },
          },

          { $unwind: "$booked" },
        ],
      },
    },
    { $unwind: "$tours" },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        totalCost: { $sum: "$tours.booked.totalCost" },
        year: { $first: "$tours.booked._id.year" },
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
  getIncomeEachCompany,
};
