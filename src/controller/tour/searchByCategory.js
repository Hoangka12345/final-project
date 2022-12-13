const { showTour } = require("../../commonFunc");
const { msgErrNoInfo, msgSucces, msgErrDatabase, msgErrMissInfo } = require("../../constants");

const searchBycategory = async (req, res) => {
  const { key } = req.query;
  if (!key) return res.status(400).send(msgErrMissInfo);

  //  --------- check by title name -------
  const tourPrepare = showTour(
    { $or: [{ category: { $regex: `.*${key}.*`, $options: "i" } }], auth: true, active: true },
    { createdAt: -1 }
  );

  try {
    const tours = await tourPrepare.exec();
    if (tours[0]) res.status(200).send({ ...msgSucces, tours });
    else res.status(204).send({ ...msgErrNoInfo });
  } catch (error) {
    res.status(500).send({ ...msgErrDatabase });
  }
};

module.exports = {
  searchBycategory,
};
