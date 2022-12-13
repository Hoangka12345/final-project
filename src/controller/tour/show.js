const { msgErrNoInfo, msgSucces, msgErrDatabase } = require("../../constants");
const { showTour } = require("../../commonFunc");
const tourModel = require("../../models/tour.model");

const show = async (req, res) => {
  const search = req.query._key;
  const priceSort = parseInt(req.query._price);
  const durationFilter = parseInt(req.query._duration);
  const gtePrice = parseFloat(req.query._gte);
  const ltePrice = parseFloat(req.query._lte);
  const categories = req.query._categories;
  console.log(req.query);

  const filter = {
    auth: true,
    active: true,
  };

  if (search) {
    filter.$or = [
      { title: { $regex: `.*${search}.*`, $options: "i" } },
      { city: { $regex: `.*${search}.*`, $options: "i" } },
      { category: { $regex: `.*${search}.*`, $options: "i" } },
    ];
  }

  if (ltePrice && gtePrice && gtePrice < ltePrice) {
    filter.$and = [
      { price: { $gte: gtePrice } },
      { price: { $lte: ltePrice } },
    ];
  } else {
    delete filter.price;
  }

  if (durationFilter) {
    filter.duration = { $lte: durationFilter };
  } else {
    delete filter.duration;
  }

  if (typeof categories == "string") {
    filter.$expr = { $or: { $eq: ["$category", categories] } };
  } else if (typeof categories == "object") {
    const categoryCondition = [];
    categories.forEach((category) => {
      categoryCondition.push({ $eq: ["$category", category] });
    });

    filter.$expr = { $or: categoryCondition };
  } else {
    delete filter.category;
  }

  const tourPrepare = showTour(filter, { price: priceSort ? priceSort : 1 });

  try {
    const tours = await tourPrepare.exec();
    if (!tours[0]) res.status(204).send({ ...msgErrNoInfo });
    else res.status(200).send({ ...msgSucces, tours });
  } catch (err) {
    console.log(err);
    res.status(500).send({ ...msgErrDatabase, err });
  }

  // try {
  //   const tours = await tourModel.find({
  //     category: "Explore - experience",
  //     category: "Resort",
  //   });
  //   console.log(tours);
  //   if (!tours[0]) {
  //     res.status(204).send({ ...msgErrNoInfo });
  //   } else {
  //     res.status(200).send({ ...msgSucces, tours });
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  // const tour = tourModel.aggregate([
  //   {$match: }
  // ])
};
module.exports = show;
