const { default: mongoose } = require("mongoose");
const { msgErrDatabase, msgSucces, msgErrNoInfo } = require("../../constants");
const userModel = require("../../models/user.model");
const ObjectId = mongoose.Types.ObjectId;

const getTotalEachTour = (req, res) => {
  const id = req.id;
  console.log(id);
  const bookingPre = userModel.aggregate([
    { $match: { _id: ObjectId(id) } },
    { $project: { username: 1 } },
    {
      $lookup: {
        from: "tours",
        localField: "_id",
        foreignField: "userId",
        as: "tour",
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
          {
            $group: {
              _id: "$_id",
              title: { $first: "$title" },
              totalCost: { $sum: "$booked.totalCost" },
              year: { $first: "$booked._id.year" },
            },
          },
        ],
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
  getTotalEachTour,
};
