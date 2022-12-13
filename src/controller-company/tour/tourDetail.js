const { msgErrDatabase, msgErrNoInfo, msgSucces } = require("../../constants");
const tourModel = require("../../models/tour.model");
const bookingModel = require("../../models/booking.model");
const ratingModel = require("../../models/rating.model");

const tourDetail = async (req, res) => {
  const tourId = req.params.id;
  try {
    const tour = await tourModel.findById(tourId);
    if (!tour) {
      return res.status(204).send({ ...msgErrNoInfo });
    } else {
      const bookings = await bookingModel.find({ tourId });
      const ratings = await ratingModel.find({ tourId });

      res.status(200).send({ ...msgSucces, tour, bookings, ratings });
    }
  } catch (err) {
    res.status(500).send({ ...msgErrDatabase, err });
  }
};
module.exports = {
  tourDetail,
};
