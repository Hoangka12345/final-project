const { msgSucces, msgErrDatabase } = require("../../constants");
const { showTour } = require("../../commonFunc");
const tourModel = require("../../models/tour.model");
const _ = require("lodash");

const relatedTour = async (req, res) => {
  const { category, title } = req.query;

  try {
    const totalTours = await tourModel.find({ category });
    const sameCategoryTours = totalTours.filter((tour) => tour.title !== title);
    if (sameCategoryTours.length < 4) {
      const otherTours = await tourModel.find({ category: { $nin: category } });
      const tours = sameCategoryTours.concat(otherTours.slice(0, 4 - sameCategoryTours.length));
      res.status(200).send({ ...msgSucces, tours: tours });
    } else {
      res.status(200).send({ ...msgSucces, tours: sameCategoryTours.slice(0, 3) });
    }
  } catch (error) {
    res.status(500).send({ ...msgErrDatabase, error });
  }
};

module.exports = {
  relatedTour,
};
