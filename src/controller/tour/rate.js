const mongoose = require("mongoose");
const {
  msgErrMissInfo,
  msgSuccesAdd,
  msgErrAdd,
  msgErrUpdate,
  msgSuccesUpdate,
  msgErrDatabase,
  msgErrNoInfo,
} = require("../../constants");
const ratingModel = require("../../models/rating.model");
const tourModel = require("../../models/tour.model");
const ObjectId = mongoose.Types.ObjectId;

const rating = async (req, res) => {
  const id = req.id;
  const { tourId, rate } = req.body;
  const numRate = rate * 1;
  if (!tourId || !rate) return res.status(200).send(msgErrMissInfo);
  if (rate < 1 || rate > 5)
    return res.status(200).send({ Message: "Đánh giá không hợp lệ" });

  try {
    //  ------- check xem da danh gia chuaw ------------
    const rating = await ratingModel.findOne({ tourId, userId: id });
    if (rating) {
      await ratingModel.findByIdAndUpdate(rating._id, { rate: numRate });
    } else {
      const newRate = await new ratingModel({
        rate: numRate,
        tourId,
        userId: id,
      }).save();
      if (!newRate) return res.status(400).send(msgErrUpdate);
    }
    // --------- update rate to tour -----------
    const rate = await ratingModel
      .aggregate([
        {
          $match: { tourId: new ObjectId(tourId) },
        },
        {
          $group: {
            _id: "$tourId",
            avgRate: { $avg: "$rate" },
          },
        },
      ])
      .exec();
    if (rate[0]) {
      const tour = await tourModel.findByIdAndUpdate(
        tourId,
        { rate: rate[0].avgRate.toFixed(1) },
        { new: true }
      );
      if (!tour) return res.status(204).send(msgErrNoInfo);
      res.status(200).send({ ...msgSuccesUpdate, rating: tour.rate });
    } else return res.status(204).send(msgErrNoInfo);
  } catch (err) {
    return res.status(500).send({ ...msgErrDatabase, err });
  }
};

const getTourRating = async (req, res) => {
  const tourId = req.params.tourId;
  // --------- update rate to tour -----------
  const tour = await tourModel.findById(tourId);
  if (tour) {
    const ratings = await ratingModel.find({ tourId });
    res.status(200).send({ ...msgSuccesUpdate, rating: tour.rate, ratings });
  } else return res.status(204).send(msgErrNoInfo);
};

module.exports = {
  rating,
  getTourRating,
};
