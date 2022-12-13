const { default: mongoose } = require("mongoose");
const { msgErrNoInfo, msgSucces, msgErrDatabase, msgErrMissInfo } = require("../../constants");
const tourModel = require("../../models/tour.model");
const ObjectId = mongoose.Types.ObjectId;
const { showTour } = require("../../commonFunc");
const search = async (req, res) => {
  const { key } = req.query;
  const id = req.id;
  if (!key) return res.status(400).send(msgErrMissInfo);

  //  --------- check by city name -------

  let tourPrepare = showTour(
    {
      userId: ObjectId(id),
      $or: [
        { category: { $regex: `.*${key}.*`, $options: "i" } },
        { city: { $regex: `.*${key}.*`, $options: "i" } },
      ],
    },
    { auth: 1, createdAt: -1 }
  );

  try {
    const tours = await tourPrepare.exec();
    if (tours[0]) res.status(200).send({ ...msgSucces, tours });
    else res.status(204).send({ ...msgErrNoInfo });
  } catch (err) {
    res.status(500).send({ ...msgErrDatabase, err });
  }
};

module.exports = {
  search,
};
